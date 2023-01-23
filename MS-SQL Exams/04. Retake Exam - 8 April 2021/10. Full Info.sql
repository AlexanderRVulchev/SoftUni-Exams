SELECT    
    IIF(e.FirstName IS NULL AND e.LastName IS NULL, 'None', e.FirstName + ' ' + e.LastName) AS Employee,
    IIF(d.Name IS NULL, 'None', d.Name) AS Department,
    c.Name AS Category,
    r.Description AS Description,
    FORMAT(r.OpenDate, 'dd.MM.yyyy') AS OpenDate,
    s.Label AS Status,
    u.Name AS [User]
FROM Reports AS r
LEFT JOIN Employees AS e ON r.EmployeeId = e.Id
LEFT JOIN Departments AS d ON e.DepartmentId = d.Id
LEFT JOIN Categories AS c ON r.CategoryId = c.Id
LEFT JOIN Status AS s ON r.StatusId = s.Id
LEFT JOIN Users AS u on r.UserId = u.Id
ORDER BY e.FirstName DESC, e.LastName DESC, Department, Category, Description, OpenDate, Status, User