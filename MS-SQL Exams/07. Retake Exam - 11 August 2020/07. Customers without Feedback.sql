SELECT
    CONCAT(c.FirstName, ' ', c.LastName) AS CustomerName,
    c.PhoneNumber,
    c.Gender
FROM Customers AS c
LEFT JOIN Feedbacks AS f ON c.Id = f.CustomerId
WHERE f.Id IS NULL
ORDER BY c.Id