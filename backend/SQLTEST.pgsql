-- SELECT id, name, description, color, "targetId" FROM records;
-- SELECT id, name, description, color FROM targets;
-- SELECT id, name, description FROM pieces;
-- SELECT id, "pieceId", url FROM photos;
-- SELECT id, name, description FROM formulas;
-- SELECT id, name, "chemicalName", density FROM chemicals;
-- SELECT "targetId", time, temperature, oxygen FROM "targetPoints" ORDER BY "targetId", time;
-- SELECT "targetId", time, temperature, oxygen 
--      FROM "targetPoints" p
--      WHERE p."targetId" = 7
--      ORDER BY "targetId", time;

-- SELECT COUNT (*) FROM "recordPoints" ;

SELECT * 
     FROM targets
     JOIN records ON records."targetId" = targets.id
     WHERE targets.id = 11


-- EXPLAIN ANALYZE VERBOSE
-- SELECT "recordId", time, temperature, oxygen
--      FROM "recordPoints" p 
--      WHERE p."recordId" = 99 
--      ORDER BY "recordId", time 

-- SELECT "recordId", "pieceId" FROM "RecordPieces";
-- SELECT "chemicalId", "formulaId", amount FROM ingredients;

-- SELECT 
--     t.id, t.name,
--     r.id, r.name,
--     p.id, p.name
-- FROM
--     targets t
--     LEFT JOIN records r             ON r."targetId" = t.id
--     INNER JOIN "RecordPieces" rp    ON r.id=rp."recordId"
--     INNER JOIN pieces p             ON p.id = rp."pieceId";

-- SELECT 
--     p.id, p.name, ph.url
-- FROM
--     pieces p
--     JOIN photos ph ON ph."pieceId" = p.id;

-- SELECT
--     f.id, f.name,
--     i.amount,
--     c.id, c.name, c.density
-- FROM
--     formulas f
--     JOIN ingredients i ON f.id = i."formulaId"
--     JOIN chemicals c ON c.id = i."chemicalId";

-- SELECT
--     t.id, p.time, p.temperature, p.oxygen
-- FROM
--     targets t
--     JOIN "targetPoints" p ON t.id = p."targetId"
-- WHERE
--     t.id = 6
-- ORDER BY
--     time;
