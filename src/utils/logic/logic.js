import { auth } from "@clerk/nextjs/server";
import { createClient } from "../supabase/server";
import { dummy_defaults } from "./dummydata";
import { labValueGroups, labValueRanges } from "./labvalues";
import { vitalGroups, vitalRanges } from "./normalfindings_collection";
import { cache } from "react";
import { generateLabValues, generateVitalValues } from "./logic_server";

export async function checkPatient(pat_id, userId) {
  "use server";
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("PatBase")
    .select("pat_id", { count: "exact" })
    .eq("userId", userId)
    .eq("pat_id", pat_id);
  if (error) {
    console.error("Error checking access:", error);
    return false;
  }

  return count > 0;
}

export const getPatient = cache(async (pat_id) => {
  "use server";
  const { userId } = await auth();
  const supabase = await createClient();
  var res = await supabase
    .from("PatBase")
    .select("*")
    .eq("userId", userId)
    .eq("pat_id", pat_id)
    .single();
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
});

export async function getFindings(pat_id) {
  "use server";
  const { userId } = await auth();
  const supabase = await createClient();
  var res = await supabase
    .from("PatFindings")
    .select(
      "id, date, data, request_group, request_item, request_type, PatBase(userId)"
    )
    .eq("PatBase.userId", userId)
    .eq("pat_id", pat_id);
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getLabs(pat_id) {
  "use server";
  const data = await getPatient(pat_id);
  return {
    labs:
      data.pat_data && Array.isArray(data.pat_data.labs)
        ? data.pat_data.labs
        : [],
    ranges: labValueRanges,
    groups: labValueGroups,
  };
}

export async function getVitals(pat_id) {
  "use server";
  const data = await getPatient(pat_id);
  return {
    vitals:
      data.pat_data && Array.isArray(data.pat_data.vitals)
        ? data.pat_data.vitals
        : [],
    ranges: vitalRanges,
    groups: vitalGroups,
  };
}

export async function getDiagnosis(pat_id) {
  "use server";
  const { userId } = await auth();
  const supabase = await createClient();
  var res = await supabase
    .from("PatDiagnosis")
    .select("id, pat_id, diagnosis_id, PatBase(userId), ref_icd(primary1, text))")
    .eq("PatBase.userId", userId)
    .eq("pat_id", pat_id);
  if (res.error) {
    console.error(res.error);
  }
  return res.data;
}

export async function getAllPatients(userId) {
  "use server";
  const supabase = await createClient();
  var res = await supabase
    .from("PatBase")
    .select("pat_id, pat_data, requested_at, created_at, case_id")
    .eq("userId", userId);
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getAllCardinalSymptoms() {
  "use server";
  const supabase = await createClient();
  //var res = await supabase.from("CardinalSymptoms").select("*");
  var res = await supabase.from("all_cardinal_symptoms").select("*");
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getCardinalSymptom(cs_id, cs_key) {
  "use server";
  const supabase = await createClient();
  if (cs_id != null) {
    var res = await supabase
      .from("all_cardinal_symptoms")
      .select("*")
      .eq("cs_id", cs_id)
      .maybeSingle();
  } else if (cs_key != null) {
    var res = await supabase
      .from("all_cardinal_symptoms")
      .select("*")
      .eq("cs_key", cs_key)
      .maybeSingle();
  } else {
    return null;
  }
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getAllCaseTemplates(cs_key = null, all_cols = false) {
  "use server";
  const supabase = await createClient();
  var cols = "";
  if (all_cols) {
    cols = "*";
  } else {
    cols = "case_id, internal_name, internal_comment";
  }

  if (cs_key != null) {
    var res = await supabase
      .from("CaseTemplates")
      .select(cols)
      .contains("case_data", { cardinal_symptoms: [cs_key] });
  } else {
    var res = await supabase.from("CaseTemplates").select(cols);
  }
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getCaseTemplates(caseid) {
  "use server";
  const supabase = await createClient();
  var res = await supabase
    .from("CaseTemplates")
    .select("*")
    .eq("case_id", caseid)
    .maybeSingle();
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getTemplate(request_group, request_item, request_type) {
  "use server";
  const supabase = await createClient();
  var res = await supabase
    .from("FindingsTemplate")
    .select("*")
    .eq("request_group", request_group)
    .eq("request_item", request_item)
    .eq("request_type", request_type)
    .maybeSingle();
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getAllTemplates() {
  "use server";
  const supabase = await createClient();
  var res = await supabase.from("FindingsTemplate").select("*");
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function checkPatientExists(userId, timestamp) {
  const allcases = await getAllPatients(userId);
  const already_requested = allcases.some(
    (item) => item.requested_at === Number(timestamp)
  );
  const case_preexist_index = allcases.findIndex(
    (item) => item.requested_at === Number(timestamp)
  );
  if (already_requested) {
    return allcases[case_preexist_index].pat_id;
  } else {
    return null;
  }
}

export async function generateAndPushPatient(case_id, userId, timestamp) {
  const inital_data = await generatePatient(case_id, userId, timestamp);
  return pushPatient(inital_data);
}

export async function generatePatient(case_id, userId, timestamp) {
  const CaseTemplates = await getCaseTemplates(case_id);
  const data = CaseTemplates.case_data;
  const patdata = await generateCaseData(data)
  var inital_data = {
    userId: userId,
    case_id: CaseTemplates.case_id,
    requested_at: Number(timestamp),
    pat_data: patdata,
  };
  return inital_data;
}

export async function pushPatient(data) {
  "use server";
  const supabase = await createClient();
  var res = await supabase.from("PatBase").insert([data]).select();
  if (res.error) {
    console.error(res.error);
  }
  return await res.data;
}

export async function getICD(searchtext) {
  "use server";
  const supabase = await createClient();
  if (searchtext != null) {
    var searchtext_mod = "'" + searchtext.split(" ").join("' & '") + "'";
    var data = await supabase
      .rpc("search_ref_icd", { search_term: searchtext })
      .limit(100);
  } else {
    var data = await supabase
      .from("ref_icd")
      .select("id, primary1, text")
      .limit(100);
  }
  if (data.error) {
    console.error(data.error);
  }
  return data.data;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function getRandomDate(data) {
  const currentYear = new Date().getFullYear();
  var birthYear = null;
  if (data.static_value) {
    birthYear = getRandomInt(
      currentYear - data.static_value,
      currentYear - data.static_value
    );
  } else {
    birthYear = getRandomInt(currentYear - data.max, currentYear - data.min);
  }
  const birthMonth = getRandomInt(0, 11);
  const birthDay = getRandomInt(1, 28); // Simplified for all months
  return new Date(birthYear, birthMonth, birthDay);
}

export function getEvents(probabilities) {
  var events = Object.keys(probabilities);
  var result = [];
  if (probabilities.static_findings !== undefined) {
    result = probabilities.static_findings;
    events = events.filter((item) => item !== "static_findings");
  }
  events.forEach((event) => {
    const probability = probabilities[event];
    // Generate a random number between 0 and 1
    if (Math.random() < probability) {
      result.push(event);
    }
  });

  return result;
}

export function getEventsGlobalWrapper(data) {
  var events = {};
  Object.keys(data).forEach((key) => {
    if (data[key] != null) {
      events[key] = getEvents(data[key]);
    }
  });
  return events;
}

export function getEventsWrapper(input_data, vars_path, findings_global) {
  var data = { ...input_data };
  if (findings_global !== undefined && findings_global !== null) {
    Object.keys(findings_global).forEach((key) => {
      if (!data[key]) {
        data[key] = { static_findings: findings_global[key] };
      } else {
        data[key].static_findings = data[key].static_findings
          ? [...data[key].static_findings, ...findings_global[key]]
          : findings_global[key];
      }
    });
  }
  const processedData = {};
  Object.keys(data)
    .filter((key) => Object.keys(vars_path).includes(key))
    .forEach((key) => {
      if (data[key] != null) {
        processedData[key] = {
          pathology: getEvents(data[key])
            .map((event) => vars_path[key]?.[event])
            .filter((value) => value !== undefined)
            .join(", "),
        };
      }
    });
  return processedData;
}

export function selectWeightedRandom(options) {
  const totalWeight = Object.values(options).reduce(
    (sum, weight) => sum + weight,
    0
  );
  const random = Math.random() * totalWeight;
  let cumulative = 0;

  for (const [key, weight] of Object.entries(options)) {
    cumulative += weight;
    if (random <= cumulative) {
      return key;
    }
  }
  return null; // Fallback in case no key is selected
}

export function processObject(data, nested = false) {
  var result = {};
  Object.keys(data).forEach((key) => {
    var value = data[key];
    if (nested) {
      value = value?.normal
    }
    // Static Value
    if (value?.static_value !== undefined) {
      result[key] = value.static_value;
    }
    // Check if value has "max" and "min", call genRandomInt
    else if (value?.max !== undefined && value?.min !== undefined) {
      result[key] = getRandomInt(value.min, value.max);
    }
    // Otherwise, if the value is an object of probabilities, call generateEvents
    else if (typeof value === "object" && !Array.isArray(value)) {
      if (value.singular) {
        // Exclude the "singular" key and its value
        const weightedOptions = Object.fromEntries(
          Object.entries(value).filter(([key]) => key !== "singular")
        );
        // Select a random key based on weights
        result[key] = selectWeightedRandom(weightedOptions);
      } else {
        result[key] = getEvents(value);
      }
    }
  });
  if (result.bmi !== undefined && result.height !== undefined) {
    result = {
      ...result,
      weight: (result.bmi * (result.height / 100) ** 2).toFixed(0), // Round to 2 decimal places for readability
    };
  }

  return result;
}

function getMaxDepth(obj) {
  if (typeof obj !== 'object' || obj === null) return 0;
  if (Array.isArray(obj)) {
    return 1 + Math.max(0, ...obj.map(getMaxDepth));
  }
  return 1 + Math.max(0, ...Object.values(obj).map(getMaxDepth));
}

export function processObjectWrapper(data, altmode = false) {
  return traverse(data, altmode);
}

function traverse(data, altmode) {
  if (typeof data !== 'object' || data === null) {
    return data;
  }

  const levelsRemaining = getMaxDepth(data);

  const triggerDepth = altmode ? 3 : 2;
  if (levelsRemaining === triggerDepth) {
    return processObject(data, altmode);
  }

  const processed = Array.isArray(data) ? [] : {};

  for (const key in data) {
    processed[key] = traverse(data[key], altmode);
  }

  return processed;
}

export function calculateAge(dob) {
  const diffMs = Date.now() - dob.getTime();
  const ageDt = new Date(diffMs);
  return Math.abs(ageDt.getUTCFullYear() - 1970);
}

export async function generateCaseData(spec) {
  const defaults = dummy_defaults;
  const gender = getRandomElement(spec.gender);
  const firstName =
    gender === "w"
      ? getRandomElement(defaults.name_first_w)
      : getRandomElement(defaults.name_first_m);
  const lastName = getRandomElement(defaults.name_last);
  const address = getRandomElement(defaults.address);
  const insurance = getRandomElement(defaults.insurance);
  const dependant = getRandomElement(defaults.dependants);
  const dateOfBirth = getRandomDate(spec.age);
  const age = calculateAge(dateOfBirth);
  const findings_global =
    spec.findings.global !== undefined && spec.findings.global !== null
      ? getEventsGlobalWrapper(spec.findings.global)
      : null;
  const vitals_path = spec.vitals === "normal" ? [] : getEvents(spec.vitals)
  const vitals_values = await generateVitalValues(vitals_path)
  const vitals = await { "text": vitals_path, "values": vitals_values }
  var return_val = {
    name_first: firstName,
    name_last: lastName,
    age: age,
    dob: dateOfBirth.toISOString().split("T")[0].replace(/-/g, "."), // Convert to YYYY-MM-DD format
    address: address,
    insurance: insurance,
    dependants: [dependant],
    gender: gender,
    cardinal_symptoms: spec.cardinal_symptoms,
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    vitals: vitals,
    history: processObjectWrapper(spec.history),
    findings_global: findings_global,
    findings: [],
    labs: [],
  }
  if (spec?.vignette !== undefined && spec?.vignette !== null) {
    return_val.vignette = generateReport(spec.vignette, return_val)
  } else {
    return_val.vignette = null
  }
  if (spec?.vignette_patient !== undefined && spec?.vignette_patient !== null) {
    return_val.vignette_patient = generateReport(spec.vignette_patient, return_val)
  } else {
    return_val.vignette_patient = null
  }

  return (return_val)
}

export function mergeNestedObjects(obj1, obj2) {
  const merged = {};

  // Get all unique keys from both objects
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  keys.forEach((key) => {
    // Merge the properties of both objects for the same key
    merged[key] = {
      ...(obj1[key] || {}),
      ...(obj2[key] || {}),
    };
  });

  return merged;
}

export function generateReport(template, variables) {
  function resolveNestedVariable(path, data) {
    return path.split(".").reduce((acc, key) => acc && acc[key], data);
  }
  return template.replace(/\$\w+(\.\w+)*/g, (match) => {
    const path = match.slice(1); // Remove the `$`
    const value = resolveNestedVariable(path, variables);
    return value !== undefined ? value : ""; // Replace if found, otherwise keep original
  });
}
