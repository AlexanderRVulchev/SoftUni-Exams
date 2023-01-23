SELECT
    a.FirstName, 
    a.LastName, 
    FORMAT(a.BirthDate, 'MM-dd-yyyy') AS BirthDate,
    c.Name AS Hometown,
    a.Email
FROM Accounts AS a
JOIN Cities AS c ON a.CityId = c.Id
WHERE Email LIKE 'e%'
ORDER BY Hometown ASC