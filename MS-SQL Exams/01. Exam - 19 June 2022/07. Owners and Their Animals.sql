SELECT TOP(5)
    o.Name AS Owner,    
    COUNT(a.Name) AS CountOfAnimals
FROM Animals AS a
JOIN Owners AS o ON o.Id = a.OwnerId
GROUP BY o.Name
ORDER BY CountOfAnimals DESC, Owner ASC