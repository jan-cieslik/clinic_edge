export const medication = {
    "history": {
        "general_history": {
            "pre_existing_conditions": {
                "common_pre_existing_conditions_women": {
                    "anxiety_disorder": {
                        "medication": {
                            "escitalopram_10mg": 0.1,
                            "venlafaxin_75mg": 0.05,
                            "venlafaxin_150mg": 0.05,
                            "venlafaxin_225mg": 0.05,
                            "singular": true
                        }
                    },
                    "autoimmune_disease": {
                        "medication": {
                            "prednisolon_5mg": 0.05,
                            "prednisolon_10mg": 0.05,
                            "prednisolon_20mg": 0.05,
                            "prednisolon_50mg": 0.02,
                            "singular": true
                        }
                    },                     
                    "depression": {
                        "medication": {
                            "citalopram_20mg": 0.03,
                            "escitalopram_10mg": 0.03,
                            "fluoxetin_40mg": 0.03,
                            "fluvoxamin_150mg": 0.03,
                            "paroxetin_30mg": 0.03,
                            "sertralin_100mg": 0.03,
                            "bupropion_300mg": 0.03,
                            "venlafaxin_150mg": 0.03,
                            "mirtazapin_15mg": 0.03,
                            "singular": true
                        }
                    },
                    "diabetes_mellitus": {
                        "type_1": {
                            "probability": 0.1,
                            "medication": {
                                "insulin": 1,                           
                            }
                        },
                        "type_2": {
                            "probability": 0.1,
                            "medication": {
                                "insulin": 0.1,  
                                "metformin_1500mg": 0.5,
                                "dapagliflozin_10mg": 0.2,
                                "glibenclamid_3_5mg": 0.2,
                                "semaglutid_0_5mg": 0.2
                            }                            
                        },
                        "singular": true
                    },
                    "endometriosis": {
                        "medication": {
                            "ibuprofen_400mg": 0.5,
                            "naproxen_250mg": 0.5,
                            "pill": 0.5,
                            "dienogest_2mg": 0.3,
                            "buserelin_9_45mg": 0.1,
                            "letrozol_2_5mg": 0.05,
                        }
                    },
                    "hypertension": {
                        "medication": {
                            "ramipril_2_5mg": 0.2,
                            "candesartan_8mg": 0.2,
                            "xipamid_10mg": 0.2,
                            "amlodipin_5mg": 0.2,
                            "metoprolol_50mg": 0.2, 
                        }
                    },
                    "hyperthyroidism": {
                        "medication": {
                            "thiamazol_5mg": 0.25,
                            "carbimazol_10mg": 0.25,
                            "propylthiouracil_200mg": 0.25,
                            "natriumperchlorat": 0.25,
                            "singular": true
                        }
                    },
                    "hypothyroidism": {
                        "medication": {
                            "l_thyroxin_25µg": 0.25,
                            "l_thyroxin_50µg": 0.25,
                            "l_thyroxin_75µg": 0.25,
                            "l_thyroxin_100µg": 0.25,
                            "singular": true
                        }
                    },
                    "iron_deficiency": {
                        "supplements": {
                            "iron_supplement": 0.5
                        }
                    },                  
                    "migraine": {
                        "medication": {
                            "ibuprofen_400mg": 0.3,
                            "naproxen_250mg": 0.2,
                            "ass_500mg": 0.2,
                            "paracetamol": 0.1,
                            "sumatriptan_50mg": 0.05,
                            "sumatriptan_100mg": 0.05,
                            "almotriptan": 0.1,                           
                            "singular": true
                        }
                    },
                    "nicotine_abuse": {},
                    "pcos": {
                        "medication": {
                            "metformin_1500mg": 0.2,
                            "clomifen": 0.05,
                            "pill": 0.5
                        },
                        "supplements": {
                            "myo_inositol_4g": 0.5
                        }
                    },
                    "recurring_urinary_tract_infections": {},
                    "uterine_myoma": {},
                    "vitamin_d_deficiency": {
                        "supplements": {
                            "vit_d_supplement": 0.6
                        }
                    },
                },
                "pre_existing_conditions_pregnancy": {
                    "chromosomal_abnormalities": {},
                    "ectopic_pregnancy": {},
                    "gestational_diabetes_mellitus": {
                        "medication": {
                            "insulin": 0.3
                        }
                    },
                    "maternal_alcohol_abuse": {},
                    "maternal_nicotine_abuse": {},
                    "multiple_pregnancy": {},
                    "perineal_tear": {},
                    "placental_disorder": {},
                    "preeclampsia": {
                        "medication": {
                            "methyldopa_250mg": 0.5,
                            "metoprolol_50mg": 0.2,
                            "nifedipin_10mg": 0.1,
                            "singular": true
                        }
                    },
                    "prolonged _labor": {},
                    "previous_gestational_diabetes_mellitus": {},                    
                },
                "acne": {
                    "medication": {
                        "differin_0.1%_creme": 0.5,
                        "tretinoin_10mg": 0.5,
                        "singular": true
                    }
                },
                "adnexitis": {
                    "medication": {
                       "ceftriaxon_1g": 0.3,
                       "doxycyclin_100mg": 0.5,
                       "metronidazol": 0.3 
                    }
                },
                "antiphospholipid_syndrome": {
                    "medication": {
                        "phenprocoumon_3mg": 0.4,
                        "warfarin_5mg": 0.4,
                        "ass_500mg": 0.1,
                        "heparin": 0.1,
                        "singular": true
                    }
                },
                "BRCA_mutation": {},
                "breast_cancer": {
                    "medication": {
                        "tamoxifen_20mg": 0.2,
                        "tamoxifen_40mg": 0.1,
                        "goserelin_3_6mg": 0.05,
                        "anastrozol_1mg": 0.05,
                        "letrozol_2_5mg": 0.05,
                        "singular": true
                    }
                },
                "chlamydia": {
                    "medication": {
                        "doxycyclin_100mg": 1
                    }
                },
                "female_fertility_disorder": {
                    "medication": {
                        "clomifen_50mg": 0.1,
                        "progesteron": 0.1,
                        "metformin_1500mg": 0.1, 
                        "metformin_1000mg": 0.1,
                        "bromocriptin": 0.05,
                        "singular": true
                    }
                },
                "fibrocystic_mastopathy": {
                    "medication": {
                        "bromocriptin": 0.1,
                        "progesteron": 0.1,
                        "singular": true
                    }
                },
                "gonorrhea": {
                    "medication": {
                        "ceftriaxon_2g": 1,
                        "azithromycin_500mg": 1
                    }
                },
                "hair_loss": {},
                "hirsutism": {},
                "hiv": {
                    "medication": {
                        "lamivudin_300mg": 0.2,
                        "tenofovir_204mg": 0.2,
                        "emtricitabin_200mg": 0.2,
                        "efavirenz_600mg": 0.2,
                        "nevirapin_200mg": 0.2,
                        "darunavir_800mg": 0.2,
                        "atazanavir_300mg": 0.2,
                        "ritonavir_100mg": 0.3,
                        "elvitegravir_50mg": 0.2,
                        "cobicistat_150mg": 0.3
                    }
                },
                "hormonal_imbalance": {
                    "medication": {
                        
                    }
                },
                "hormone_replacement_therapy": {
                    "medication": {
                        "oestrogen_mono": 0.5,
                        "oestrogen_gestagen": 0.5,
                        "singular": true
                    }
                },
                "hpv_infection": {},
                "immunosuppression": {
                    "medication": {
                        "prednisolon_5mg": 0.1,
                        "prednisolon_10mg": 0.1,
                        "prednisolon_20mg": 0.1,
                        "prednisolon_50mg": 0.1,
                        "methotrexat_10mg_weekly": 0.1,
                        "methotrexat_7_5mg_weekly": 0.1,
                        "azathioprin_50mg": 0.05,
                        "mycophenolatmofetil_1g": 0.05,
                        "leflunomid_10mg": 0.05,
                        "cyclophosphamid_500mg": 0.1,
                        "ciclosporin_25mg": 0.05,
                        "cyclosporin_50mg": 0.05,
                        "sirolimus_2mg": 0.05,
                        "everolimus_0_75mg": 0.05,
                        "singular": true
                    }
                },
                "lactation": {},
                "menstrual_disorder": {},
                "multiparity": {},
                "nulliparity": {},
                "pelvic_floor_dysfunction": {},
                "postpartum_hemorrhage": {
                    "medication": {
                        "methylergometrin": 0.25,
                        "oxytocin": 0.25,
                        "tranexamsaure": 0.25,
                        "sulproston": 0.25,
                        "singular": true                        
                    }
                },
                "previous_adnexitis": {},
                "previous_bacterial_vaginosis": {},
                "previous_mastitis": {},
                "previous_miscarriage": {},
                "previous_preeclampsia": {},
                "previous_radiation_exposure": {},
                "previous_sexually_transmitted_infections": {},
                "recent_antibiotic_use": {},
                "stress_incontinence": {},
                "tamoxifen_use": {
                    "medication": {
                        "tamoxifen_20mg": 0.8,
                        "tamoxifen_40mg": 0.2,
                        "singular": true
                    }
                },        
                "trauma": {},
                "uterine_anomaly": {}
            }
        }
    }
}