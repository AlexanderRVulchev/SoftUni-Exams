SELECT 
    Id, 
    Name, 
    CAST(Size AS VARCHAR) + 'KB' AS Size
FROM Files
WHERE Id NOT IN 
(
    SELECT ParentId 
    FROM Files 
    WHERE ParentId IS NOT NULL
)