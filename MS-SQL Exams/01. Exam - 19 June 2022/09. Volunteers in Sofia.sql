SELECT
    v.Name,
    v.PhoneNumber,
    SUBSTRING(v.Address, CHARINDEX(',', v.Address) + 2, LEN(v.Address) - CHARINDEX(',', v.Address))
FROM Volunteers AS v
WHERE 
    v.Address LIKE '%Sofia%' AND 
    v.DepartmentId = 
        (
          SELECT Id
          FROM VolunteersDepartments 
          WHERE DepartmentName = 'Education program assistant'
        )
ORDER BY v.Name ASC