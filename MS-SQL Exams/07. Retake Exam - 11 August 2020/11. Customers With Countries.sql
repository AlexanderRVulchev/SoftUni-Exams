CREATE VIEW v_UserWithCountries
AS
SELECT 
    CONCAT(cu.FirstName, ' ', cu.LastName) AS CustomerName,
    cu.Age,
    cu.Gender,
    co.Name AS CountryName
FROM Customers AS cu
JOIN Countries AS co ON cu.CountryId = co.Id