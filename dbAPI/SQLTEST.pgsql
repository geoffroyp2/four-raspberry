SELECT id, name, description, color, "targetId" FROM records;
SELECT id, name, description, color FROM targets;
SELECT id, name, description FROM pieces;
SELECT id, "pieceId", url FROM photos;
-- SELECT "recordId", "pieceId" FROM "RecordPieces";

-- SELECT 
--     t.id, t.name,
--     r.id, r.name,
--     p.id, p.name
-- FROM
--     targets t
--     LEFT JOIN records r             ON r."targetId" = t.id
--     INNER JOIN "RecordPieces" rp    ON r.id=rp."recordId"
--     INNER JOIN pieces p             ON p.id = rp."pieceId";

SELECT 
    p.id, p.name, ph.url
FROM
    pieces p
    JOIN photos ph ON ph."pieceId" = p.id;