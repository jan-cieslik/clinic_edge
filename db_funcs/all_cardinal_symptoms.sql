DROP VIEW IF EXISTS all_cardinal_symptoms;

CREATE VIEW all_cardinal_symptoms AS
SELECT DISTINCT 
    cs.cs_id AS cs_id,
    cs.cs_data AS cs_data,
    cb.cardinal_symptom AS cs_key
FROM (
    SELECT DISTINCT jsonb_array_elements_text(case_data->'cardinal_symptoms') AS cardinal_symptom
    FROM "CaseTemplates"
) cb
LEFT JOIN "CardinalSymptoms" cs
ON cs.cs_key = cb.cardinal_symptom;
