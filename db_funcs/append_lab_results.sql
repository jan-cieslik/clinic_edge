CREATE OR REPLACE FUNCTION public.append_lab_results(
  input_pat_id INTEGER,
  input_userId TEXT,
  new_lab_result JSONB
)
RETURNS VOID AS $$
BEGIN
  -- Check if a lab entry with the same created_at timestamp already exists
  IF NOT EXISTS (
    SELECT 1
    FROM "PatBase"
    WHERE pat_id = input_pat_id
      AND EXISTS (
        SELECT 1 FROM jsonb_array_elements(pat_data->'labs') AS elem
        WHERE elem->>'created_at' = new_lab_result->>'created_at'
      )
  ) THEN
    -- Append the new lab result to the labs array
    UPDATE "PatBase"
    SET pat_data = jsonb_set(
      pat_data,
      '{labs}',
      COALESCE(
        pat_data->'labs',
        '[]'::JSONB
      ) || jsonb_build_array(new_lab_result),
      TRUE
    )
    WHERE pat_id = input_pat_id and "userId" = input_userId;
  END IF;
END;
$$ LANGUAGE plpgsql;
