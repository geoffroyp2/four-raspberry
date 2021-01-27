SELECT id, name, description FROM records;
SELECT id, name, description FROM targets;
SELECT "targetId", "recordId" FROM "RecordTargets";

SELECT 
    r.id, r.name, r.description,
    t.id, t.name, t.description
FROM
    records r
    INNER JOIN "RecordTargets" rt ON r.id=rt."recordId"
    INNER JOIN targets t ON t.id=rt."targetId"
