DROP FUNCTION if exists search_ref_icd(character varying);
CREATE OR REPLACE FUNCTION public.search_ref_icd(search_term varchar)
RETURNS table(id int8, primary1 text, text text, similarity real)
LANGUAGE plpgsql
AS $$
	begin
		return query
			SELECT b.id, b.primary1, b.text, similarity(search_term, b.conc)
			FROM ref_icd b 
			WHERE search_term % ANY(STRING_TO_ARRAY(b.conc, ' ')) AND b.primary1 != ''
			order by similarity DESC;
	end;
$$;