SELECT
    o.Name + '-' + a.Name AS OwnersAnimals,
    o.PhoneNumber,
    ac.CageId
FROM Owners AS o
JOIN Animals AS a ON o.Id = a.OwnerId
JOIN AnimalsCages AS ac ON a.Id = ac.AnimalId
WHERE AnimalTypeId = (SELECT Id FROM AnimalTypes WHERE AnimalType = 'Mammals')
ORDER BY o.Name ASC, a.Name DESC