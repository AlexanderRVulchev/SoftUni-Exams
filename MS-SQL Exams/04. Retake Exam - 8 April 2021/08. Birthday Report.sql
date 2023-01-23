SELECT
    u.Username,
    c.Name AS CategoryName
FROM Users AS u
JOIN Reports AS r ON u.Id = r.UserId
JOIN Categories AS c ON r.CategoryId = c.Id
WHERE DATEPART(DAY, u.Birthdate) = DATEPART(DAY, r.OpenDate) AND
      DATEPART(MONTH, u.Birthdate) = DATEPART(MONTH, r.OpenDate)
ORDER BY u.Username ASC, CategoryName ASC