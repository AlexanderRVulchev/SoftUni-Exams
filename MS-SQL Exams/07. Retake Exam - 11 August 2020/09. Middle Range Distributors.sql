SELECT
    d.Name AS DistributorName,
    i.Name AS IngredientName,
    p.Name AS ProductName,
    AVG(f.Rate) AS AverageRate    
FROM Distributors AS d
JOIN Ingredients AS i ON d.Id = i.DistributorId
JOIN ProductsIngredients AS pi ON i.Id = pi.IngredientId
JOIN Products AS p ON pi.ProductId = p.Id
JOIN Feedbacks AS f ON p.Id = f.ProductId
GROUP BY d.Name, i.Name, p.Name
HAVING AVG(f.Rate) BETWEEN 5 AND 8