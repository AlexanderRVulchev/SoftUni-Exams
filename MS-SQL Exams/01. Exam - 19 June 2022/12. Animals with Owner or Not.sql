CREATE PROC usp_AnimalsWithOwnersOrNot
(@AnimalName VARCHAR(30))
AS
SELECT
    a.Name,
    IIF(o.Name IS NULL, 'For adoption', o.Name) AS OwnersName
FROM Animals AS a
LEFT JOIN Owners AS o ON a.OwnerId = o.Id
WHERE a.Name = @AnimalName