SELECT
    a.Name,
    DATEPART(YEAR, a.BirthDate) AS BirthYear,
    at.AnimalType
FROM Animals AS a
JOIN AnimalTypes AS at ON a.AnimalTypeId = at.Id
WHERE    
    a.OwnerId IS NULL AND 
    AnimalType <> 'Birds' AND 
    a.BirthDate >= '2018-01-01'
ORDER BY a.Name