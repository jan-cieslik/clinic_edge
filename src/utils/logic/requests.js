// DO NOT USE DASH ("-") IN ANY KEY NAME! IT IS USED AS A SEPARATOR IN THE CODE!
export const requestGroups = {
  laboratory: {
    items: ["labs", "virology", "microbiology", "bloodbank"],
  },
  imaging: {
    items: ["mri", "ct", "us", "xray", "ctg", "ecg"],
  },
  invasive_diagnostics: {
    items: ["surgery", "cytology_pathology"],
  }
};

export const requestConfig = {
  labs: {
    call: "requestLab"
  },
  bloodbank: {
    call: "multiRequest"
  }
}

export const requestItems = {
  labs: {
    form: {
      haematology: {
        type: "checkbox",
        required: false,
        choices: {
          blood_count: {
            type: "option",
          },
          diff_blood_count: {
            type: "option",
          },
          haptoglobin: {
            type: "option",
          },
        },
      },
      electrolytes: {
        type: "checkbox",
        required: false,
        choices: {
          sodium: {
            type: "option",
          },
          potassium: {
            type: "option",
          },
          chloride: {
            type: "option",
          },
          calcium_total: {
            type: "option",
          },
          phosphate: {
            type: "option",
          },
          magnesium: {
            type: "option",
          },
        },
      },
      renal_function_tests: {
        type: "checkbox",
        required: false,
        choices: {
          creatinine: {
            type: "option",
          },
          urea: {
            type: "option",
          },
          uric_acid: {
            type: "option",
          },
        },
      },
      liver_function_tests: {
        type: "checkbox",
        required: false,
        choices: {
          ast: {
            type: "option",
          },
          alt: {
            type: "option",
          },
          ggt: {
            type: "option",
          },
          ap: {
            type: "option",
          },
          albumin: {
            type: "option",
          },
          total_protein: {
            type: "option",
          },
          bilirubin_total: {
            type: "option",
          },
          bilirubin_direct: {
            type: "option",
          },
          ldh: {
            type: "option",
          },
          bileacids: {
            type: "option",
          },
        },
      },
      pancreatic_function_tests: {
        type: "checkbox",
        required: false,
        choices: {
          amylase: {
            type: "option",
          },
          lipase: {
            type: "option",
          },
        },
      },
      diabetes_diagnostics: {
        type: "checkbox",
        required: false,
        choices: {
          hba1c: {
            type: "option",
          },
          "2-h-ogtt": {
            type: "option",
          },
          fasting_glucose: {
            type: "option",
          },
        },
      },
      lipid_panel: {
        type: "checkbox",
        required: false,
        choices: {
          total_cholesterol: {
            type: "option",
          },
          triglycerides: {
            type: "option",
          },
          hdl: {
            type: "option",
          },
          ldl: {
            type: "option",
          },
        },
      },
      inflammatory_markers: {
        type: "checkbox",
        required: false,
        choices: {
          crp: {
            type: "option",
          },
          pct: {
            type: "option",
          },
        },
      },
      iron_panel: {
        type: "checkbox",
        required: false,
        choices: {
          ferritin: {
            type: "option",
          },
          iron: {
            type: "option",
          },
          transferrin: {
            type: "option",
          },
        },
      },
      coagulation: {
        type: "checkbox",
        required: false,
        choices: {
          quick: {
            type: "option",
          },
          aptt: {
            type: "option",
          },
          ptz: {
            type: "option",
          },
          fibrinogen: {
            type: "option",
          },
          atIII: {
            type: "option",
          },
          d_dimer: {
            type: "option",
          },
        },
      },
      cardiac_markers: {
        type: "checkbox",
        required: false,
        choices: {
          bnp: {
            type: "option",
          },
          ck: {
            type: "option",
          },
          troponin: {
            type: "option",
          }
        }
      },
      blood_gases: {
        type: "checkbox",
        required: false,
        choices: {
          blood_gases_arterial: {
            type: "option",
          },
          blood_gases_venous: {
            type: "option",
          }
        },
      },
      thyroid_function_tests: {
        type: "checkbox",
        required: false,
        choices: {
          tsh: {
            type: "option",
          },
          ft3: {
            type: "option",
          },
          t3: {
            type: "option",
          },
          ft4: {
            type: "option",
          },
          t4: {
            type: "option",
          },
        },
      },
      hormone_diagnostics_women: {
        type: "checkbox",
        required: false,
        choices: {
          lh: {
            type: "option",
          },
          fsh: {
            type: "option",
          },
          lh_fsh_ratio: {
            type: "option",
          },
          estradiol: {
            type: "option",
          },
          progesterone: {
            type: "option",
          },
          prolactin: {
            type: "option",
          },
          amh: {
            type: "option",
          },
          dhea: {
            type: "option",
          },
          testosterone: {
            type: "option",
          },
          shbg: {
            type: "option",
          },
        },
      },
      tumor_markers: {
        type: "checkbox",
        required: false,
        choices: {
          ca_125: {
            type: "option",
          },
          ca_19_9: {
            type: "option",
          },
          cea: {
            type: "option",
          },
          afp: {
            type: "option",
          },
          scc: {
            type: "option",
          },
          ca_72_4: {
            type: "option",
          },
          ca_15_3: {
            type: "option",
          },
        },
      },
      pregnancy_panel: {
        type: "checkbox",
        required: false,
        choices: {
          beta_hcg: {
            type: "option",
          },
          afp_mom: {
            type: "option",
          },
        },
      },
      urinalysis: {
        type: "checkbox",
        required: false,
        choices: {
          urine_status: {
            type: "option",
          },
        },
      },
    },
  },
  virology: {
    form: {},
  },
  microbiology: {
    form: {
      urinalysis: {
        type: "checkbox",
        required: false,
        choices: {
          urine_culture: {
            type: "option",
          },
        },
      },
      vaginal_swab: {
        type: "checkbox",
        required: false,
        choices: {
          vaginal_swab: {
            type: "option",
          },
        },
      },
    },
  },
  bloodbank: {
    form: {
      bloodgroup: {
        type: "checkbox",
        required: false,
        choices: {
          blood_group: {
            type: "option",
          },
          blood_antibodies: {
            type: "option",
          },
        },
      }
    }
  },
  mri: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          mri_skull: {
            type: "heading",
          },
          mri_skull_whole: {
            type: "option",
          },
          mri_skull_brainstem: {
            type: "option",
          },
          mri_skull_pituitary: {
            type: "option",
          },
          mri_skull_orbital: {
            type: "option",
          },
          mri_thorax: {
            type: "heading",
          },
          mri_thorax_whole: {
            type: "option",
          },
          mri_thorax_heart: {
            type: "option",
          },
          mri_abdomen: {
            type: "heading",
          },
          mri_abdomen_whole: {
            type: "option",
          },
          mri_abdomen_liver: {
            type: "option",
          },
          mri_abdomen_pancreas: {
            type: "option",
          },
          mri_abdomen_spleen: {
            type: "option",
          },
          mri_mamma: {
            type: "heading",
          },
          mri_mamma_whole: {
            type: "option",
          },
          mri_pelvic: {
            type: "heading",
          },
          mri_pelvic_whole: {
            type: "option",
          },
        },
      },
    },
  },
  ct: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          ct_skull: {
            type: "heading",
          },
          ct_skull_whole: {
            type: "option",
          },
          ct_skull_stroke: {
            type: "option",
          },
          ct_trunk: {
            type: "heading",
          },
          ct_thorax_abdomen: {
            type: "option",
          },
          ct_thorax_whole: {
            type: "option",
          },
          ct_abdomen_whole: {
            type: "option",
          },
        },
      },
    },
  },
  us: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          us_abdominal: {
            type: "option",
          },
          us_abdominal_preg: {
            type: "option",
          },
          us_tv: {
            type: "option",
          },
          us_rectal: {
            type: "option",
          },
          us_mamma: {
            type: "option",
          },
          us_tte: {
            type: "option",
          },
          us_tee: {
            type: "option",
          },
        },
      },
    },
  },
  xray: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          xray_skull: {
            type: "option",
          },
          xray_thorax: {
            type: "option",
          },
          xray_abdomen: {
            type: "option",
          },
        },
      },
    },
  },
  ctg: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          ctg_regular: {
            type: "option",
          },
        },
      },
    },
  },
  ecg: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          ecg_regular: {
            type: "option",
          },
        },
      },
    },
  },
  surgery: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          hsc: {
            type: "option",
          },
          lsc: {
            type: "option",
          },
          colposcopy: {
            type: "option",
          },
        },
      },
    },
  },
  cytology_pathology: {
    form: {
      diagnosis: {
        type: "text",
        required: true,
      },
      comment: {
        type: "text",
        required: false,
      },
      question: {
        type: "text",
        required: true,
      },
      type: {
        type: "select",
        required: true,
        choices: {
          pap_smear: {
            type: "option",
          },
          hpv_test: {
            type: "option",
          },
          breast_biopsy: {
            type: "option",
          },
          cervical_biopsy: {
            type: "option",
          },
          endometrial_biopsy: {
            type: "option",
          },
          ovarian_biopsy: {
            type: "option",
          },
          vulvar_biopsy: {
            type: "option",
          },
        },
      },
    },
  },
};
