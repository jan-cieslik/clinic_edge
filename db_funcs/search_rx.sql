DROP FUNCTION if exists search_ref_rx(character varying);
CREATE OR REPLACE FUNCTION public.search_ref_rx(search_term varchar)
RETURNS table(key int8, ppn int8, count_substances int8, name_strength text, adm_short text, adm_long text, adm_detail text, similarity real)
LANGUAGE plpgsql
AS $$
	begin
		return query
			SELECT b."id", b."ppn", b."count_substances", b."name_strength", b."adm_short", b."adm_long", b."adm_detail", similarity(search_term, b."name_strength")
			FROM ref_rx b 
			WHERE search_term % ANY(STRING_TO_ARRAY(b."name_strength", ' '))
			 order by similarity DESC;
	end;
$$;