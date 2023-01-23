SELECT
    CountryName,
    DistributorName
FROM
(
    SELECT
        c.Name AS CountryName, 
        d.Name AS DistributorName,             
        RANK() OVER (PARTITION BY c.Name ORDER BY COUNT(i.Id) DESC) AS Rank    
    FROM Countries AS c
    LEFT JOIN Distributors AS d ON c.Id = d.CountryId
    LEFT JOIN Ingredients AS i ON d.Id = i.DistributorId    
    GROUP BY c.Name, d.Name
) AS rankedTable
WHERE Rank = 1
ORDER BY CountryName, DistributorName