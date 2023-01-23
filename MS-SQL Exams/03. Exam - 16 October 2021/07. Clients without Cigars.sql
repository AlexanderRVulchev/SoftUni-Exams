SELECT
    cl.Id,
    cl.FirstName + ' ' + LastName AS ClientName,
    cl.Email
FROM Clients AS cl
LEFT JOIN ClientsCigars AS cc ON cl.Id = cc.ClientId
WHERE cc.ClientId IS NULL
ORDER BY ClientName ASC