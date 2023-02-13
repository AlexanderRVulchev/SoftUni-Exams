SELECT
    f1.Id,
    f1.Name,
    CAST(f1.Size AS varchar) + 'KB'
FROM Files AS f1
LEFT JOIN Files AS f2 ON f1.Id = f2.ParentId
WHERE f2.Id IS NULL
ORDER BY f1.Id ASC, f1.Name ASC, f1.Size DESC
