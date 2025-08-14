export const normalfindings_invasive_diagnostics = {
    "invasive_diagnostics": {
        "cytology_pathology": {
            "pap_smear": {
                "normal": {
                    "static_value": "PAP I / PAP II (Normalbefund). Kein zytologischer Anhalt für Malignität oder Dysplasie."
                }
            },  
            "hpv_test": {
                "normal": {
                    "static_value": "Kein Nachweis einer Hochrisiko-HPV-Infektion."
                }
            },
            "breast_biopsy": {
                "normal": {
                    "static_value": "Reguläre Architektur des Brustdrüsengewebes. Kein Nachweis atypischer Epithelien, Mikroverkalkungen oder inflammatorischer Prozesse. Kein Hinweis auf Malignität."
                }
            },
            "cervical_biopsy": {
                "normal": {
                    "static_value": "Reguläres Zervixepithel mit regelrechter Plattenepithel- und Drüsenarchitektur. Kein Hinweis auf intraepitheliale Neoplasie (CIN) oder Malignität. Kein Anzeichen für chronische oder akute Entzündung."
                }
            },
            "endometrial_biopsy": {
                "normal_": {
                    "static_value": "Proliferatives oder sekretorisches Endometrium entsprechend der Zyklusphase mit regelrechter Drüsen-Stroma-Architektur. Kein Nachweis einer Hyperplasie oder Dysplasie. Kein Hinweis auf Malignität."
                },
                "normal_during_postmenopause": {
                    "static_value": "Atrophes Endometrium mit schmalen, inaktiven Drüsenstrukturen und zellarmem Stroma entsprechend eines postmenopausalen Normalbefundes. Kein Nachweis einer Hyperplasie oder Dysplasie. Kein Hinweis auf Malignität."
                }
            },
            "ovarian_biopsy": {
                "normal": {
                    "static_value": "Reguläre Architektur des Ovarialgewebes. Kein Nachweis atypischer Zellproliferationen oder inflammatorischer Prozesse. Kein Nachweis von Endometriose. Kein Hinweis auf Malignität."
                }
            },
            "vulvar_biopsy": {
                "normal": {
                    "static_value": "Reguläres Plattenepithel der Vulva mit regelrechter Plattenepithelarchitektur. Kein Nachweis atypischer Epithelien oder inflammatorischer Prozesse. Kein Hinweis auf Malignität."
                }
            }
        }
    }
}

export const normalfindings_microbiology = {
    "microbiology": {
        "urinalysis": {
            "normal": {
                "urine_culture": {
                    "static_value": "Keimzahl: Kein signifikantes Wachstum. Identifizierte Erreger: Keine oder vereinzelte nicht-pathogene Bakterien."
                }
             },
            "normal_during_pregnancy": {
                "urine_culture": {
                    "static_value": "Keimzahl: Geringes Wachstum nicht-pathogener Bakterien. Identifizierte Erreger: Wenige nicht-pathogene Bakterien."
                }
            }
        },
        "vaginal_swab": {
            "normal": {
                "static_value": "Vaginaler pH-Wert 3.8–4.5 (physiologisch). Dominanz von Laktobazillen (Döderlein-Bakterien). Kein Nachweis von pathogenen Bakterien, Hefepilzen, Trichomonaden oder Schlüsselzellen (Clue Cells). Normale Vaginalflora, keine Hinweise auf Infektion oder Dysbiose."
            },
            "normal_during_postmenopause": {
                "static_value": "Vaginaler pH-Wert 5.0–7.0. Reduzierte Anzahl an Laktobazillen (Döderlein-Bakterien). Kein Nachweis von pathogenen Bakterien, Hefepilzen, Trichomonaden oder Schlüsselzellen (Clue Cells). Altersentsprechende Vaginalflora, keine Hinweise auf Infektion oder Dysbiose."
            }
        }
    }
}

export const vitalGroups = [
    {
        "id": "vitals",
        "measurements":["temperature", "respiratory_rate", "blood_pressure_systolic", "blood_pressure_diastolic", "heart_rate"]
    }
]

export const vitalRanges = {
    "temperature": {
        "unit": "°C",
        "normal": [36.0, 37.2],
        "fever": [38.0, 40.0],
        "hypothermia": [34.0, 35.0],
        "decimal_precision": 1
    },
    "respiratory_rate": {
        "unit": "breaths/min",
        "normal": [12, 20],
        "tachypnea": [21, 40],
        "decimal_precision": 0
    },
    "blood_pressure_systolic": {
        "unit": "mmHg",
        "normal": [100, 139],
        "hypotension": [60, 89],
        "hypertension": [140, 180],
        "decimal_precision": 0
    },
    "blood_pressure_diastolic": {
        "unit": "mmHg",
        "normal": [70, 100],
        "hypotension": [40, 60],
        "hypertension": [100, 120],
        "decimal_precision": 0
    },
    "heart_rate": {
        "unit": "bpm",
        "normal": [60, 85],
        "tachycardia": [100, 140],
        "decimal_precision": 0
    }
}

export const normalfindings_history = {
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
            },
            "pre_existing_conditions": {
                "common_pre_existing_conditions_women": {
                    "diabetes_mellitus": 0.10,
                    "depression": 0.15,
                    "anxiety_disorder": 0.15,
                    "migraine": 0.1,
                    "iron_deficiency": 0.10,
                    "vitamin_d_deficiency": 0.25,
                    "nicotine_abuse": 0.20,
                    "uterine_myoma": 0.20,
                    "pcos": 0.10,
                    "endometriosis": 0.10,
                    "recurring_urinary_tract_infections": 0.1,
                    "autoimmune_disease": 0.1, 
                    "hypothyroidism": 0.1,
                    "hyperthyroidism": 0.05,
                    "hypertension": 0.25
                }
            }
        },
        "menstruation": {
            "normal": {
                "menarche": {
                    "12y": 0.1,
                    "13y": 0.2,
                    "14y": 0.4,
                    "15y": 0.2,
                    "16y": 0.1,
                    "singular": true
                },
                "last_menstrual_period": {
                    "1-7_days_ago": 0.225,
                    "8-14_days_ago": 0.225,
                    "15-21_days_ago": 0.225,
                    "22-28_days_ago": 0.225,
                    "29-35_days_ago": 0.1,
                    "36-41_days_ago": 0.0,
                    "singular": true
                },
                "bleeding_pattern": {
                    "regular": 1.0,
                    "irregular": 0.0,
                    "singular": true
                },
                "cycle_length": {
                    "21-24_days": 0.1,
                    "25-28_days": 0.4,
                    "29-32_days": 0.4,
                    "33-35_days": 0.09,
                    "36-40_days": 0.01,
                    "singular": true
                },
                "menstrual_duration": {
                    "3_days": 0.1,
                    "4_days": 0.3,
                    "5_days": 0.4,
                    "6_days": 0.2,
                    "singular": true
                },
                "intermenstrual_bleeding": {
                    "none": 0.95,
                    "sporadic": 0.05,
                    "singular": true
                },
                "bleeding_intensity": {
                    "light": 0.25,
                    "medium": 0.45,
                    "heavy": 0.25,
                    "very_heavy": 0.05,
                    "singular": true
                },
                "dysmenorrhea_occurence": {
                    "none": 0.1,
                    "sporadic": 0.6,
                    "always": 0.3,
                    "singular": true
                },
                "contraception": {
                    "none": 0.15,
                    "condom": 0.3,
                    "pill": 0.35,
                    "IUD": 0.2,
                    "singular": true
                }
            },
            "normal_during_postmenopause": {
                "menarche": {
                    "12y": 0.1,
                    "13y": 0.2,
                    "14y": 0.4,
                    "15y": 0.2,
                    "16y": 0.1,
                    "singular": true
                },
                "last_menstrual_period": {
                    "1-3_years_ago": 0.3,
                    "3-5_years_ago": 0.3,
                    "6-9_years_ago": 0.3,
                    "singular": true
                },
                "bleeding_pattern": {
                    "none": 1.0,
                    "singular": true
                },
                "contraception": {
                    "none": 1.0,
                    "singular": true
                }
            }
        }
    }
}
