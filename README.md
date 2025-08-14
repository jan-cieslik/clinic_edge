# CLINIC EDGE

Clinic Edge is a patient case simulator designed for medical education that generates realistic clinical case scenarios in gynecology and obstetrics. It is comprised of static and dynamic patient cases, with the latter being build upon probabilistic case templates to randomly generate an endless number of non-repititive patient cases. Supabase is used as the backend database. 

For full docs please see [https://clinic-edge.org/]

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

## Folder and Table Structure
## SQL Tables

The database is structured into different tables, which are shortly described here. A more precise description is given in the respective subsections.

| Table                   | Description                                                                 |
|-------------------------|-----------------------------------------------------------------------------|
| `CardinalSymptoms`      | Cardinal symptoms associated with each diagnosis                           |
| `CaseTemplates`         | Static case/diagnosis templates (`case_id`)                                |
| `FindingsTemplate`      | Templates for rendering examination reports                                |
| `PatBase`               | Dynamically generated patient cases (`pat_id`)                             |
| `PatChat`               | Chat logs between user and patient                                         |
| `PatDiagnosis`          | Contains diagnoses assigned to patients via `pat_id`                       |
| `PatFindings`           | Stores requested findings of patient cases                                 |
| `PatReports`            |                                                                            |
| `PatRx`                 | Contains medications prescribed to patients                                |
| `all_cardinal_symptoms` |                                                                            |
| `bfarm_ref_med`         | BfArM reference data for ...                                               |
| `bfarm_ref_pharm`       | BfArM reference data for ...                                               |
| `bfarm_ref_substance`   | BfArM reference data for ...                                               |
| `icd10`                 | ICD-10 diagnosis codes                                                     |

## CardinalSymptoms

The `CardinalSymptoms` table defines a reference list of common cardinal symptoms. It serves as a **symptom dictionary** that allows diagnoses to be grouped based on shared clinical manifestations. These symptoms are displayed on the landing page, where users can select one to receive a randomly generated patient case linked to that symptom.

### Table Structure
Each symptom is presented on the landing page using a title (`manifestation`) and an optional image, both defined in the `cs_data` field.

| Column     | Format | Type   | Description                                                              |
|------------|--------|--------|--------------------------------------------------------------------------|
| `cs_id`    | bigint | number | Internal ID for each cardinal symptom                                    |
| `cs_key`   | text   | string | Unique identifier for each cardinal symptom (e.g., `"breast_pain"`)      |
| `cs_data`  | jsonb  | json   | JSON object containing display metadata, such as title and optional image|

### Integration with CaseTemplates
Each diagnosis JSON in CaseTemplates includes a cardinal_symptoms array.
Example Data:
```json
"cardinal_symptoms": [
    "abdominal_pain",
    "fever",
    "acute_abdomen",
    "menstrual_disorder"
]
```

## CaseTemplates

Each clinical case (diagnosis) is defined in a separate JSON file. All case files are in CaseTemplates, including dynamic and static cases, which are discussed in the following sections. 

### Dynamic Cases

Dynamic case files are stored as separate JSON files, and transferred into a single csv table using a python script to then import the csv into Supabase.
The csv table is structured as follows:

#### Dynamic Case Data

- Example diagnosis: **Adnexitis**
- Contains expected ranges and probabilities for:
  - `age`: min/max
  - `gender`
  - `labs`: min/max or fixed ranges (with optional gender/age stratification)
  - `vitals`: probabilities for fever, tachypnea, etc.
  - `findings`: imaging, surgery, physical exam, microbiology, etc.
  - `history`: pre-existing conditions, surgeries, menstrual cycle, etc. 
  - `cardinal_symptoms`: key symptoms like fever, abdominal pain, etc.

Each case is assigned a `case_id` (e.g., `1 = adnexitis`). Data under findings need to follow the same structure as in `src/utils/logic/requests.js`` e.g. "imaging" -> "us" -> "us_tv". Case templates Templates are static and remain unchanged.

Example Data:
```json
{
  "age": {
    "max": 45,
    "min": 25
  },
  "labs": {
    "crp": {
      "max": 15,
      "min": 2
    },
    "pct": {
      "max": 0.5,
      "min": 2
    },
    "leukocytes": {
      "max": 20,
      "min": 14
    }
  },
  "gender": [
    "w"
  ],
  "vitals": {
    "fever": 0.5,
    "tachypnea": 0.4,
    "hypotension": 0.1,
    "tachycardia": 0.4
  },
  "history": {
    "bmi": {
      "max": 17,
      "min": 29
    },
    "height": {
      "max": 180,
      "min": 150
    },
    "period": {
      "heavy": 0.1,
      "irregular": 0.1,
      "dysmenorrhea": 0.1
    },
    "surgeries": {
      "appendectomy": 0.4,
      "cesarean_section": 0.1
    },
    "contraception": {
      "iud": 0.1,
      "hormonal": 0.4
    },
    "last_menstrual_period": {
      "max": 14,
      "min": 7
    },
    "pre_existing_conditions": {
      "endometriosis": 0.1
    }
  },
  "findings": {
    "us": {
      "us_tv": {
        "common": {
          "free_fluid": 0.8
        },
        "ovary_l": {
          "hydrosalpinx": 1,
          "tuboovarian_abscess": 1
        },
        "ovary_r": {
          "hydrosalpinx": 0.1,
          "tuboovarian_abscess": 0.8
        }
      }
    },
    "surgery": {
      "hsk": {
        "inflammation": 0.9
      },
      "lsk": {
        "adhesions": 0.5,
        "inflammation": 0.9,
        "tuboovarian_abscess": 0.2
      }
    },
    "physical": {
      "vaginal": {
        "pelvic_pain": 0.8,
        "adnexal_tenderness": 0.8,
        "cervical_motion_tenderness": 0.95
      },
      "speculum": {
        "purulent_discharge": 0.6
      },
      "abdominal": {
        "guarding": 0.8,
        "abdominal_pain": 0.8,
        "abdominal_tension": 0.6
      }
    },
    "microbiology": {
      "vaginal_swab": {
        "pathogens": {
          "Chlamydia trachomatis": 0.5,
          "Neisseria gonorrhoeae": 0.5,
          "Polymicrobial infection": 0.5
        }
      }
    }
  },
  "cardinal_symptoms": [
    "abdominal_pain",
    "fever",
    "acute_abdomen"
  ]
}
```

### Static Cases

Static cases can be created to specify values and reports deterministically. This can for example be useful, if you want to include an anonymized real medical case.
The data of static cases is also stored in CaseTemplates and follows a similar structure as in dynamic cases. The main difference to dynamic cases lies in the additional keys `static_value` and `static_report`. 

#### How to use `static_value`and `static_report`

`static_value` is used to set specific values without declaring a range or probabilities. This can be applied to numerical values and strings, including arrays of strings. Examples are shown below.

```json
{ "age": {
    "static_value": 38
  },
  "labs": {
    "cea": {
      "static_value": 12
    },
    "scc": {
      "static_value": 9
    },
    "ca_125": {
      "static_value": 130
    }
  },
  "gender": "w",
  "history": {
    "menstruation": {
      "cycle_length": {
        "static_value": "25-28_days"
      },
      "menstrual_duration": {
        "static_value": "6_days"
      }
    },
    "general_history": {
      "bmi": {
        "static_value": 20
      },
      "height": {
        "static_value": 170
      },
      "surgeries": {
        "static_value": "appendectomy"
      },
      "pre_existing_conditions": {
        "static_value": [
          "nicotine_abuse",
          "hpv_infection"
        ]
      }
    }
  }
}
```

`static_report` can be used to specify a report as a complete text. Images (e.g. ultrasound images) can be included, but are not necessarily needed. An example of what it can look like is shown in the following.

```json
{ "findings": {
    "imaging": {
      "us": {
        "us_tv": {
          "static_report": {
            "text": "Here, you can write your report about the associated images.",
            "images": [
              "https://files.clinic-edge.org/images/tvus/example_image.jpg"
            ]
          }
        }
      }
    }
  }
}
```

Another option is to only write reports about specific organs as shown below. The other organs, that aren't described here, will be treated as `normal`.

```json
{ "findings": {
    "imaging": {
      "us": {
        "us_tv": {
          "cervix": {
            "static_report": {
              "text": "Here, you can write your report about the cervix."
            } 
          }, 
          "ovary_r": {
            "static_report": {
              "text": "Here, you can write your report about the right ovary."
            }
          }
        }
      }
    }
  }
}
```

Normal values as well as normal findings do not have to be specified. They will be inserted as described in the next section. 

### Normal Findings

If a value is defined as `"normal"` in `case_data`, data is automatically retrieved from different reference files. The retrieved values are injected into `pat_data` before rendering in `FindingsTemplate`.

1. `normalfindings_collection.json`: contains static written findings or probabilistically generated values for diagnostic categories such as microbiology, menstruation, history, and vitals
2. `labvalues.json`: contains numeric reference ranges for laboratory values, optionally including gender and age stratification or multiple units

#### `normalfindings_collection.json`

All entries are structured under category keys (e.g., `"history"`, `"menstruation"`, `"microbiology"`). Normal findings can take the form of:

##### 1. Static written normal findings
Predefined report text can be inserted into `pat_data` when `"normal"` is defined. 

**Example:**
```json
"microbiology": {
  "urinalysis": {
    "normal": {
      "urine_culture": {
        "text": "Keimzahl: Kein signifikantes Wachstum. Identifizierte Erreger: Keine oder vereinzelte nicht-pathogene Bakterien."
      }
    }
  }
}
```

##### 2. Probabilistic value generation with singular constraint
Some values are generated based on defined probabilities. This allows the simulation of realistic clinical distributions for findings such as menstrual characteristics or pre-existing conditions.

**Example:**
```json
"history": {
  "general_history": {
    "menstruation": {
      "normal": {
        "menarche": {
          "12y": 0.1,
          "13y": 0.2,
          "14y": 0.4,
          "15y": 0.2,
          "16y": 0.1,
          "singular": true
        }
      }
    }
  } 
}  
```         

One value will be selected based on the probabilities. The singular: true flag ensures only one value from the set is selected.

##### 3. Probabilistic value generation without singular constraint
The probabilistic model can also be used to without the singular: true flag to generate multiple co-occurring findings, such as past surgeries or pre-existing conditions. Each entry has a chance of being included.

**Example:**
```json
"history": {
  "general_history": {
    "surgeries": {
      "common_surgeries_women": {
        "colonoscopy": 0.15,
        "gastroscopy": 0.15,
        "cholecystectomy": 0.05,
        "appendectomy": 0.05,
        "tonsillectomy": 0.05,
        "wisdom_tooth_removal": 0.1
      }
    }
  }
} 
```
Each entry has an independent chance of being selected. Probabilities in this file can reflect general prevalences.

##### 4. Vitals: Value ranges
When "normal" is specified for vitals in case_data, values are randomly selected from predefined normal ranges. 

**Example:**
```json
"temperature": {
  "unit": "°C",
  "normal": [36.0, 37.2],
  "fever": [38.0, 40.0],
  "hypothermia": [34.0, 35.0]
} 
``` 

If "temperature": "normal" is specified in case_data, a value between 36.0 and 37.2 °C is randomly generated.

#### `labvalues.json`
This file provides numeric normal reference ranges for laboratory values, including:
- Gender-specific reference ranges (e.g., "m" and "w")
- Age-dependent values (e.g., "18-45", "46-100")
- Support for multiple measurement units (e.g., "mg/dL", "µmol/L")

**Example: General range**
```json
"leukocytes": {
  "unit": "cells/µL",
  "normal": [4000, 10000]
}
```

**Example: Gender stratification**
```json
"haemoglobin": {
  "unit": "g/L",
  "normal": {
    "m": [136, 172],
    "w": [120, 150]
  }
}
```

When a lab value in case_data is set to "normal", the system will:
1. check for a match by age and gender.
2. randomly select a value within the corresponding normal range.
3. fallback to general values if no subgroup match is found.

## PatBase
Dynamic patient cases are generated from `case_data` within `CaseTemplates` applying probabilistic variations.

- age:
- lab values: randomized between min/max or from normal range
- findings: rendered based on the probabilities (e.g., "tuboovarian_abscess": 0.2)

Each generated case receives a unique `pat_id`. This structure allows infinite, non-repeating patient cases.

## PatChat

Clinic Edge offers the functionality to take the medical history of a patient via chatting with an AI bot (text or audio). The information, which is gathered during the anamnesis, is stored in the table `PatChat` and assigned to the patient case using the `pat_id`. In addition to the `content` of the conversation, the table also contains some audio information if this functionality is used.

## PatDiagnosis

`PatDiagnosis` contains the diagnoses, which were assigned to the patients by users. The table cointains the `id`, which is unique for every given diagnosis, the `pat_id`, so it is linked to the right patient (-> `PatBase`), and the `diagnosis_id`, which refers to the ICD-10 diagnosis codes.

## PatFindings

Every time, a finding is requested for a patient, it will be saved in `PatFindings` and given an `id`. In addition to the `pat_id`, which refers to the patient the finding was requested for, the following information is stored in this table:

| Column     | Format | Type   | Description                                                              |
|------------|--------|--------|--------------------------------------------------------------------------|
| `data`    | jsonb | json | Reports of the findings, including text, title and images                    |
| `request_group`   | text   | string | Examination group (e.g., imaging, physical or microbiology)       |
| `request_item`  | text   | string   | Requested examination type (e.g., `us` = ultrasound or `mri`)     | 
| `request_type`  | text   | string   | Specific examination type (e.g., `us_tv` = transvaginal ultrasound or `mri_abdomen`)| 

### Integration with FindingsTemplate and PatBase
When a user requests a diagnostic method (e.g., "Transvaginal Ultrasound"), the system:
1. fetches relevant findings from `pat_data` within `PatBase`
2. uses the matching template for the requested test or examination from `FindingsTemplate`
3. renders the output report
4. stores the rendered result in `PatFindings`

## PatReports

`PatReport` stores the `report_info` and refers to a specific patient via `pat_id`. Each report is assigned a `report_id`.

## PatRx

If the user prescribes a medication to a patient, the information is saved in `PatRx` and the prescription gets a `rx_id`. The table contains also:

- `data-0`, `data-1`, `data-2`: prescribed medications in JSON format (with ppn, title and rx_key)
- `rx_key-0`, `rx_key-1`, `rx_key-2`: refer to the `RMP_KEY` of the respective medication in the table `bfarm_ref_med`
- `pat_id`: refers to the patient to which the medication is prescribed

## FindingsTemplate
The FindingsTemplate table enables automated rendering of written medical reports for each diagnostic method (e.g., ultrasound, physical exam, surgery). Each `request_type` defines how a specific finding in `pat_data`, rendered based on the probabilities in `case_data`, should be reported, when the user requests a diagnostic method.

**title**: Title of the Finding Report
**request_group**: General category (e.g., "imaging", "physical", "surgery") -> refers to src/utils/logic/requests.js, e.g. "imaging"
**request_item**: -> Modality (e.g., "us", "mri", "abdominal") -> refers to src/utils/logic/requests.js, e.g. "us"
**request_type**: -> Specific subtype (e.g., "us_tv", "ct_abdomen") -> refers to src/utils/logic/requests.js, e.g. "us_tv"

**template**: defines the report structure including the available variables under `$findings` e.g.

```
Fragestellung: $req.question
Diagnosis: $req.diagnosis
Kommentar: $req.comment

Uterus: 
$findings.uterus.position $findings.uterus.height cm x $findings.uterus.width cm x $findings.uterus.depth cm
$findings.uterus.pathology

Ovar links: 
$findings.ovary_l.height cm x $findings.ovary_l.width cm
$findings.ovary_l.pathology

Ovar rechts: $findings.ovary_r.height cm x $findings.ovary_r.width cm x $findings.ovary_r.depth cm
$findings.ovary_r.pathology

Allgemein:
Gute Ultraschallbedingungen
$findings.common.pathology
```

The template serves as a text template. Values and written findings descriptions are injected dynamically during case rendering.

**vars**: defines quantitative and qualitative variables for randomization under `$findings` e.g.
```json
{
    "uterus": {
        "depth": {
        "max": 5,
        "min": 1
        },
        "position": {
        "av/af": 0.9,
        "retro": 0.1,
        "singular": true
        }
    }
}
```

- Quantitative values (min, max) → generated randomly from a range
- Categorical values (position) → picked based on defined probability
- singular: true → ensures only one value is selected (e.g., one uterus position)

**vars_path**: generates textual descriptions for pathological findings from `pat_data` e.g.:
```json
{
  "common": {
    "free_fluid": "Freie Flüssigkeit im Douglasraum"
  },
  "ovary_l": {
    "hydrosalpinx": "Hydrosalpinx",
    "tuboovarian_abscess": "Tuboovarialabszess"
  },
  "ovary_r": {
    "hydrosalpinx": "Hydrosalpinx",
    "tuboovarian_abscess": "Tuboovarialabszess"
  }
}
```
When a pathology is detected in the patient data (e.g., "tuboovarian_abscess": 1.0), the corresponding text is inserted into the report.

### Logic behind Findings Template
1. User requests an examination (e.g. us_tv)
2. The template defines the report layout
3. vars provides randomized measurements
4. If any pathology is present in pat_data, it is matched via vars_path
5. If no pathology is found, a normal result is inserted
6. The result is a fully written findings report

### Adding a new examination
To add a new exam (e.g., breast_us):
1. Create a new FindingsTemplate entry
2. Add the corresponding request_group, request_item, and request_type
3. Write a new template for the report output and include all variables 
4. Define vars for all relevant anatomical measurements or features
5. Define vars_path for all diagnosis-specific findings (cross-link with case_data)

### Adding a new case/diagnosis
1. Add a JSON case to CaseTemplates
  - Assign a new `case_id`
  - Choose the type of your case (dynamic/static)
  - Define age, gender, labs, vitals, history, findings, cardinal_symptoms
2. Add or reuse vars_path entries in FindingsTemplate
  - ensure to add case-specific findings to vars_path of all applicable examinations in FindingsTemplate
3. extend normalfindings_collection.json and labvalues.json if necessary