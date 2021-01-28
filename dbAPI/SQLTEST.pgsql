SELECT id, name, description, color, "targetId" FROM records;
-- SELECT * FROM records;
SELECT id, name, description, color FROM targets;
SELECT id, name, description FROM pieces;
SELECT "recordId", "pieceId" FROM "RecordPieces";



SELECT 
    t.id, t.name,
    r.id, r.name,
    p.id, p.name
FROM
    targets t
    LEFT JOIN records r             ON r."targetId" = t.id
    INNER JOIN "RecordPieces" rp    ON r.id=rp."recordId"
    INNER JOIN pieces p             ON p.id = rp."pieceId";

-- SELECT 
--     r.id, r.name,
--     p.id, p.name
-- FROM
--     records r
--     INNER JOIN "RecordPieces" rp ON r.id=rp."recordId"
--     INNER JOIN pieces p ON p.id=rp."pieceId"