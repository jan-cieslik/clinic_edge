export const labValueGroups = [
    {
        "id": "blood_gases_arterial",
        "measurements": ["ph", "pco2", "hco3", "po2", "so2"]
    },
    {
        "id": "blood_count",
        "measurements": ["leukocytes", "erythrocytes", "haemoglobin", "hematocrit", "reticulocytes", "mcv", "mch", "mchc", "thrombocytes"]
    },
    {
        "id": "diff_blood_count",
        "measurements": ["band_neutrophils", "segmented_neutrophils", "lymphocytes", "monocytes", "eosinophils", "basophils"]
    },
    {
        "id": "urine_status",
        "measurements": ["urine_rbc", "urine_wbc", "urine_bakteria", "urine_protein_creatinine"]
    }
]

export const labValueRanges = {
    "leukocytes": {
        "unit": "cells/µL",
        "normal": [4000, 10000]
    },
    "erythrocytes": {
        "unit": "cells/pL",
        "normal": {
            "m": [4.3, 5.9],
            "w": [3.5, 5.0]
        }
    },
    "haemoglobin": {
        "unit": "g/dL",
        "normal": {
            "m": [13, 17],
            "w": [12, 15]
        }
    },
    "hematocrit": {
        "unit": "%",
        "normal": {
            "m": [40, 51],
            "w": [35, 45]
        }
    },
    "reticulocytes": {
        "unit": "%",
        "normal": [1.1, 3.5]
    },
    "mcv": {
        "unit": "fL",
        "normal": [81, 100]
    },
    "mch": {
        "unit": "pg",
        "normal": [27, 34]
    },
    "mchc": {
        "unit": "g/L",
        "normal": [320, 360]
    },
    "thrombocytes": {
        "unit": "cells/nL",
        "normal": [150, 400]
    },
    "band_neutrophils": {
        "unit": "cells/µL",
        "normal": [150, 400]
    },
    "segmented_neutrophils": {
        "unit": "cells/µL",
        "normal": [3000, 5800]
    },
    "lymphocytes": {
        "unit": "cells/µL",
        "normal": [1500, 3000]
    },
    "monocytes": {
        "unit": "cells/µL",
        "normal": [285, 500]
    },
    "eosinophils": {
        "unit": "cells/µL",
        "normal": [50, 250]
    },
    "basophils": {
        "unit": "cells/µL",
        "normal": [15, 50]
    },
    "sodium": {
        "unit": "mmol/L",
        "normal": [135, 145]
    },
    "potassium": {
        "unit": "mmol/L",
        "normal": [3.6, 5.2]
    },
    "chloride": {
        "unit": "mmol/L",
        "normal": [98, 106]
    },
    "calcium_total": {
        "unit": "mmol/L",
        "normal": [2.20, 2.65]
    },
    "phosphate": {
        "unit": "mmol/L",
        "normal": [0.84, 1.45]
    },
    "magnesium": {
        "unit": "mg/dL",
        "normal": {
            "m": [1.8, 2.6],
            "w": [1.9, 2.5]
        }
    },
    "creatinine": {
        "unit": "mg/dL",
        "normal": {
            "m": [null, 1.1],
            "w": [null, 0.9]
        }
    },
    "urea": {
        "unit": "mg/dL",
        "normal": {
            "18-65": [9, 23],
            "66-100": [null, 33]
        }
    },
    "uric_acid": {
        "unit": "mg/dL",
        "normal": {
            "m": [3.6, 8.2],
            "w": [2.3, 6.1]
        }
    },
    "ast": {
        "unit": "U/L",
        "normal": {
            "m": [null, 35],
            "w": [null, 30]
        }
    },
    "alt": {
        "unit": "U/L",
        "normal": {
            "m": [null, 45],
            "w": [null, 35]
        }
    },
    "ggt": {
        "unit": "U/L",
        "normal": {
            "m": [null, 55],
            "w": [null, 38]
        }
    },
    "ap": {
        "unit": "U/L",
        "normal": {
            "m": [40, 130],
            "w": [35, 105]
        }
    },
    "albumin": {
        "unit": "g/L",
        "normal": [35, 50]
    },
    "total_protein": {
        "unit": "g/L",
        "normal": [65, 85]
    },
    "bilirubin_total": {
        "unit": "mg/dL",
        "normal": [null, 1.1]
    },
    "bilirubin_direct": {
        "unit": "mg/dL",
        "normal": [null, 0.6]
    },
    "amylase": {
        "unit": "U/L",
        "normal": [null, 100]
    },
    "lipase": {
        "unit": "U/L",
        "normal": [null, 60]
    },
    "hba1c": {
        "unit": "%",
        "normal": [4, 6]
    },
    "fasting_glucose": {
        "unit": "mg/dL",
        "normal": [55, 99],
        "normal_during_pregnancy": [55, 91]
    },
    "2-h-ogtt": {
        "unit": "mg/dL",
        "normal": [null, 139],
        "normal_during_pregnancy": [null, 152]
    },
    "total_cholesterol": {
        "unit": "mg/dL",
        "normal": [null, 200]
    },
    "hdl": {
        "unit": "mg/dL",
        "normal": [35, null]
    },
    "ldl": {
        "unit": "mg/dL",
        "normal": [null, 155]
    },
    "triglycerides": {
        "unit": "mg/dL",
        "normal": [null, 200]
    },
    "ck": {
        "unit": "U/L",
        "normal": {
            "m": [null, 189],
            "w": [null, 169]
        }
    },
    "ck_mb": {
        "unit": "U/L",
        "normal": [null, 24]
    },
    "troponin": {
        "unit": "pg/mL",
        "normal": [null, 13]
    },
    "bnp": {
        "unit": "pg/mL",
        "normal": [null, 125],
    },
    "crp": {
        "unit": "mg/L",
        "normal": [0, 5]
    },
    "pct": {
        "unit": "ng/mL",
        "normal": [0, 0.5]
    },
    "ferritin": {
        "unit": "µg/L",
        "normal": {
            "m": {
                "18-45": [30, 233],
                "46-100": [32, 284]
            },
            "w": {
                "18-45": [6, 81],
                "46-100": [14, 186]
            }
        }
    },
    "iron": {
        "unit": "µg/dL",
        "normal": [7, 29]
    },
    "transferrin": {
        "unit": "mg/dL",
        "normal": [200, 360]
    },
    "aptt": {
        "unit": "s",
        "normal": [26, 36]
    },
    "ptz": {
        "unit": "s",
        "normal": [17, 24]
    },
    "fibrinogen": {
        "unit": "g/L",
        "normal": [1.8, 3.5]
    },
    "d_dimer": {
        "unit": "mg/L",
        "normal": [0, 0.5],
        "normal_during_pregnancy": {
            "1st_trimenon": [0, 701],
            "2nd_trimenon": [0, 1205],
            "3rd_trimenon": [0, 2584]
        }
    },
    "quick": {
        "unit": "%",
        "normal": [70, 130]
    },
    "atIII": {
        "unit": "g/L",
        "normal": [0.14, 0.39]
    },
    "ph": {
        "unit": "",
        "normal": [7.35, 7.45]
    },
    "pco2": {
        "unit": "mmHg",
        "normal": [32, 45]
    },
    "po2": {
        "unit": "mmHg",
        "normal": [65, 100]
    },
    "hco3": {
        "unit": "mmol/L",
        "normal": [22, 26]
    },
    "so2": {
        "unit": "%",
        "normal": [94, 98]
    },
    "tsh": {
        "unit": "mU/L",
        "normal": [0.4, 4.0]
    },
    "ft3": {
        "unit": "pmol/L",
        "normal": [5.4, 12.3]
    },
    "t3": {
        "unit": "nmol/L",
        "normal": [1.4, 2.8]
    },
    "ft4": {
        "unit": "pmol/L",
        "normal": [10, 23]
    },
    "t4": {
        "unit": "nmol/L",
        "normal": [77, 142]
    },
    "lh": {
        "unit": "IE/L",
        "normal": {
            "w": [0.5, 76.3]
        },
        "normal_during_postmenopause": [15.9, 54.0]
    },
    "fsh": {
        "unit": "IE/L",
        "normal": {
            "w": [1.5, 33.4]
        },
        "normal_during_postmenopause": [23.0, 116.3]
    },
    "lh_fsh_ratio": {
        "unit": "",
        "normal": {
            "w": [null, 1.9]
        },
        "normal_during_postmenopause": [null, 0.7]
    },
    "estradiol": {
        "unit": "ng/L",
        "normal": {
            "w": [20, 357]
        },
        "normal_during_postmenopause": [null, 31]
    },
    "progesterone": {
        "unit": "µg/L",
        "normal": {
            "w": [0.2, 25.6]
        },
        "normal_during_pregnancy": {
            "1st_trimenon": [11, 45],
            "2nd_trimenon": [22, 77],
            "3rd_trimenon": [55, 245]
        },
        "normal_during_postmenopause": [null, 0.7]
    },
    "prolactin": {
        "unit": "mIU/L",
        "normal": {
            "w": [null, 620]
        },
        "normal_during_pregnancy": [null, 4400],
        "normal_during_postmenopause": [null, 430]
    },
    "testosterone": {
        "unit": "ng/dL",
        "normal": {
            "w": {
                "18-49": [8, 35],
                "50-100": [null, 36]
            }
        }
    },
    "shbg": {
        "unit": "nmol/L",
        "normal": {
            "w": {
                "18-49": [11, 180],
                "50-100": [23, 159]
            }
        }
    },
    "amh": {
        "unit": "ng/mL",
        "normal": {
            "w": {
                "18-20": [1.0, 8.0],
                "20-24": [1.2, 11.7],
                "25-29": [0.89, 9.9],
                "30-34": [0.58, 8.1],
                "35-39": [0.15, 7.5],
                "40-44": [null, 5.5],
                "45-49": [null, 2.7],
                "50-100": [null, 0.1]
            }
        }
    },
    "dhea": {
        "unit": "ng/mL",
        "normal": {
            "w": {
                "19-30": [2.2, 18.0],
                "31-40": [2.7, 12.9],
                "41-50": [2.2, 9.3],
                "51-100": [1.4, 8.2]
            }
        }
    },
    "ca_125": {
        "unit": "E/mL",
        "normal": [0, 35]
    },
    "ca_19_9": {
        "unit": "E/mL",
        "normal": [0, 25]
    },
    "cea": {
        "unit": "μg/L",
        "normal": [null, 5]
    },
    "afp": {
        "unit": "µg/L",
        "normal": {
            "w": [0, 7]
        },
        "normal_during_pregnancy": [null, null]
    },
    "scc": {
        "unit": "µg/L",
        "normal": [0, 1.9]
    },
    "ca_72_4": {
        "unit": "E/mL",
        "normal": [0, 6]
    },
    "ca_15_3": {
        "unit": "E/mL",
        "normal": [0, 25]
    },
    "ldh": {
        "unit": "U/L",
        "normal": [null, 250]
    },
    "beta_hcg": {
        "unit": "IU/L",
        "normal": [0, 5],
        "normal_during_pregnancy": [null, null],
        "normal_during_postmenopause": [null, 8]
    },
    "afp_mom": {
        "unit": "MoM",
        "normal": [0.5, 2.5]
    },
    "bileacids": {
        "unit": "µmol/l",
        "normal": [null, 8]
    },
    "haptoglobin": {
        "unit": "mg/dl",
        "normal": [30, 200]
    },
    "urine_rbc": {
        "unit": "cells/µl",
        "normal": [null, 23]
    },
    "urine_wbc": {
        "unit": "cells/µl",
        "normal": [null, 25]
    },
    "urine_bakteria": {
        "unit": "cells/µl",
        "normal": [null, 1200]
    },
    "urine_protein_creatinine": {
        "unit": "mg/gC",
        "normal": [null, 150]
    }
}  
