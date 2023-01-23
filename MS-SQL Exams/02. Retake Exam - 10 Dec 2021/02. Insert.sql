INSERT INTO Passengers
SELECT 
    p.FirstName + ' ' + p.LastName,
    p.FirstName + p.LastName + '@gmail.com'
FROM Pilots AS p
WHERE p.Id BETWEEN 5 AND 15