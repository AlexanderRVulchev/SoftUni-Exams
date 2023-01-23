SELECT
    f.ProductId,
    f.Rate,
    f.Description,
    f.CustomerId,
    c.Age,
    c.Gender
FROM Feedbacks AS f
JOIN Customers AS c ON f.CustomerId = c.Id
WHERE f.Rate < 5.0
ORDER BY ProductId DESC, Rate ASC