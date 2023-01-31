SELECT
    v.Name,
    v.PhoneNumber,
    SUBSTRING(v.Address, CHARINDEX(',', v.Address) + 2, LEN(v.Address) - CHARINDEX(',', v.Address))    
FROM Volunteers AS v
JOIN VolunteersDepartments AS vd ON v.DepartmentId = vd.Id
WHERE vd.DepartmentName = 'Education program assistant' AND
    v.Address LIKE '%Sofia%'
ORDER BY v.Name ASC
