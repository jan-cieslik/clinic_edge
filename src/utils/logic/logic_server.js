"use server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "../supabase/server";
import { labValueGroups, labValueRanges } from "./labvalues";
import {
  vitalGroups,
  vitalRanges,
} from "./normalfindings_collection";
import {
  generateReport,
  getCaseTemplates,
  getDiagnosis,
  getEventsWrapper,
  getPatient,
  getTemplate,
  mergeNestedObjects,
  processObjectWrapper,
} from "./logic";
import { redirect } from "next/navigation";
import { requestConfig } from "./requests";

export async function getUser() {
  const { sessionClaims, userId } = await auth()
  return ({ userId, isAdmin: sessionClaims?.metadata?.isAdmin })
}

export async function getClassroomsAll() {
  const supabase = await createClient();
  var res = await supabase
    .from("classrooms")
    .select("*")
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getClassrooms() {
  const supabase = await createClient();
  const { userId } = await getUser();
  const userClassrooms = await supabase
    .from("classrooms")
    .select("id, name, classroom_cases(case_id, internal_name, internal_comment), classroom_users!inner()")
    .eq("classroom_users.userid", userId);
  if (userClassrooms.error) {
    console.error(userClassrooms.error);
  }
  const defaultClassrooms = await supabase
    .from("classrooms")
    .select("id, name, classroom_cases(case_id, internal_name, internal_comment)")
    .eq("default", true);
  if (defaultClassrooms.error) {
    console.error(defaultClassrooms.error);
  }

  const mergedClassrooms = Object.fromEntries(
    [...new Map(
      [...userClassrooms.data, ...defaultClassrooms.data].map(cls => [
        cls.id,
        {
          ...cls,
          classroom_cases: cls.classroom_cases.map(c => ({
            case_id: c.case_id,
            internal_name: c.internal_name,
            internal_comment: c.internal_comment
          }))
        }
      ])
    )]
  );
  return await mergedClassrooms;
}

// Helper function to generate a random value within a range
function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

export async function generateLabValues(req_data, path_lab_ranges) {
  const results = {};

  // Create a map for quick group ID lookup
  const groupMap = labValueGroups.reduce((acc, group) => {
    acc[group.id] = group.measurements;
    return acc;
  }, {});

  // Keep track of generated measurements to avoid duplicates
  const generatedMeasurements = new Set();

  // Helper function to generate and add the value to results
  function generateValue(measurement, groupName, gender = "w") {
    if (generatedMeasurements.has(measurement)) {
      // Value already generated
      return;
    }
    generatedMeasurements.add(measurement);
    let rangeInfo;
    if (measurement in path_lab_ranges) {
      rangeInfo = path_lab_ranges[measurement];
    } else {
      rangeInfo = labValueRanges[measurement];
    }

    if (!rangeInfo) {
      console.warn(`No range info for measurement: ${measurement}`);
      return;
    }

    let value;
    if (rangeInfo.static_value !== undefined && rangeInfo.static_value !== null) {
      value = rangeInfo.static_value;
    } else {
      let low, high;
      if (Array.isArray(rangeInfo.normal)) {
        [low, high] = rangeInfo.normal;
      } else if (typeof rangeInfo.normal === "object") {
        [low, high] = rangeInfo.normal[gender] || [null, null];
      }

      if (measurement in path_lab_ranges) {
        low = path_lab_ranges[measurement].min;
        high = path_lab_ranges[measurement].max;
      }

      if (low !== null && high !== null) {
        value = randomInRange(low, high);
      } else if (low === null && high !== null) {
        value = randomInRange(0, high);
      } else if (low !== null && high === null) {
        value = randomInRange(low, low * 2); // Arbitrary upper bound
      } else {
        console.warn(
          `Cannot generate value for measurement with no bounds: ${measurement}`
        );
        return;
      }
    }

    // Round the value to two decimal places
    const precision = labValueRanges[measurement]?.decimal_precision ?? 2;
    const factor = Math.pow(10, precision);
    value = Math.round(value * factor) / factor;

    if (groupName) {
      if (!results[groupName]) {
        results[groupName] = {};
      }
      results[groupName][measurement] = value;
    } else {
      results[measurement] = value;
    }
  }

  // Iterate over requested data to generate values
  for (const category in req_data) {
    const items = req_data[category];
    for (const key in items) {
      if (items[key] === "on") {
        if (groupMap[key]) {
          // It's a group
          const groupName = key;
          groupMap[key].forEach((measurement) =>
            generateValue(measurement, groupName)
          );
        } else if (labValueRanges[key]) {
          // It's a single measurement
          generateValue(key);
        } else {
          console.warn(`Unknown measurement or group: ${key}`);
        }
      }
    }
  }

  const labResult = {
    created_at: new Date().toISOString(),
    date: new Date().toISOString(),
    measurements: results,
  };
  return labResult;
}

export async function generateVitalValues(req_data) {
  function getMatchingRanges(vitalRanges, vitals) {
    const results = {};

    for (const [key, value] of Object.entries(vitalRanges)) {
      const match = Object.keys(value).find(k => vitals.includes(k));
      results[key] = match ? value[match] : value["normal"];
    }

    return results;
  }
  const ranges = getMatchingRanges(vitalRanges, req_data)

  const randomVitals = {};
  Object.keys(ranges).forEach(key => {
    const [low, high] = ranges[key];
    const precision = vitalRanges[key]?.decimal_precision ?? 2
    const value = randomInRange(low, high);
    randomVitals[key] = parseFloat(value.toFixed(precision));
  });
  return randomVitals;
}

export async function generateFinding(
  pat,
  req_data,
  case_data,
  request_group,
  request_item
) {
  const template = await getTemplate(
    request_group,
    request_item,
    req_data.type
  );

  if (case_data?.static_report !== undefined && case_data?.static_report !== null) {
    return {
      title: template.title,
      text: case_data.static_report.text,
      ...(case_data.static_report.images && { images: case_data.static_report.images })
    };
  }
  const findings_path = getEventsWrapper(case_data, template?.vars_path ?? {}, pat.pat_data?.findings_global ?? {});
  const findings = processObjectWrapper(template?.vars ?? {}, true);
  const vars = {
    req: req_data,
    findings: mergeNestedObjects(findings, findings_path),
  };
  const report = generateReport(template.template, vars);
  return {
    title: template.title,
    text: report,
  };
}

export async function requestWrapper(patid, request_group, request_item, data) {
  let res
  if (requestConfig?.[request_item]?.call == "requestLab") {
    res = await requestLab(patid, data)
  } else if (requestConfig?.[request_item]?.call == "multiRequest") {
    const allRequests = Object.values(data).flatMap(innerObj => Object.keys(innerObj))
    res = await Promise.all(allRequests.map((key, index) => (
      requestFinding(patid, request_group, request_item, { type: key })
    )))
  } else {
    res = await requestFinding(patid, request_group, request_item, data)
  }
  return (res)
}

export async function requestLab(patid, req_data) {
  const { userId } = await getUser();
  const supabase = await createClient();
  const pat = await getPatient(patid);
  const case_data = await getCaseTemplates(pat.case_id);
  var data = await generateLabValues(req_data, case_data.case_data.labs);
  const res = await supabase.rpc("append_lab_results", {
    input_pat_id: patid,
    input_userid: userId,
    new_lab_result: data,
  });
  if (res.error) {
    console.error(res.error);
  }
  return res.data;
}

export async function requestFinding(
  patid,
  request_group,
  request_item,
  req_data
) {
  const supabase = await createClient();
  const pat = await getPatient(patid);
  const case_data = await getCaseTemplates(pat.case_id);
  const report = await generateFinding(
    pat,
    req_data,
    case_data.case_data.findings?.[request_item]?.[req_data.type],
    request_group,
    request_item
  );
  const insert = {
    pat_id: patid,
    data: report,
    request_group,
    request_item,
    request_type: req_data.type,
  };
  const res = await supabase.from("PatFindings").insert(insert);
  if (res.error) {
    console.error(res.error);
  }
}

export async function addRx(patid, data) {
  const supabase = await createClient();
  const insert = {
    pat_id: patid,
    "rx_key-0": data[0]?.rx_key,
    "data-0": data[0]?.rx_key ? data[0] : null,
    "rx_key-1": data[1]?.rx_key,
    "data-1": data[1]?.rx_key ? data[1] : null,
    "rx_key-2": data[2]?.rx_key,
    "data-2": data[2]?.rx_key ? data[2] : null,
  };
  const res = await supabase.from("PatRx").insert(insert);
  if (res.error) {
    console.error(res.error);
  }
}

export async function addDiagnosis(patid, icd_id, lang) {
  const supabase = await createClient();
  const diag_cur = await getDiagnosis(patid);
  if (
    diag_cur &&
    diag_cur.length > 0 &&
    diag_cur.some((item) => item.diagnosis_id == icd_id)
  ) {
    redirect("/" + lang + "/pat/" + patid + "/diagnosis");
  }
  const res = await supabase
    .from("PatDiagnosis")
    .insert({ pat_id: patid, diagnosis_id: icd_id });

  if (res.error) {
    console.error(res.error);
  }
  redirect("/" + lang + "/pat/" + patid + "/diagnosis");
}

export async function removeDiagnosis(patid, diag_id, lang) {
  const supabase = await createClient();
  const diag_cur = await getDiagnosis(patid);
  if (
    diag_cur &&
    diag_cur.length > 0 &&
    diag_cur.some((item) => item.id == diag_id)
  ) {
    const res = await supabase.from("PatDiagnosis").delete().eq("id", diag_id);

    if (res.error) {
      console.error(res.error);
    }
  }
  redirect("/" + lang + "/pat/" + patid + "/diagnosis");
}

export async function getRx(pat_id) {
  "use server";
  const { userId } = await getUser();
  const supabase = await createClient();
  var res = await supabase
    .from("PatRx")
    .select(
      "rx_id, PatBase(userId), pat_id, rx_key-0, data-0, rx_key-1, data-1, rx_key-2, data-2"
    )
    .eq("PatBase.userId", userId)
    .eq("pat_id", pat_id);
  if (res.error) {
    console.error(res.error);
  }
  return res.data;
}

export async function pushCaseTemplates(data) {
  "use server";
  const supabase = await createClient();
  var res = await supabase.from("CaseTemplates").insert([data]).select();
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}
