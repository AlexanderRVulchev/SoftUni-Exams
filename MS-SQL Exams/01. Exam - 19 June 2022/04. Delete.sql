DECLARE @departmentId INT = (SELECT Id FROM VolunteersDepartments WHERE DepartmentName = 'Education program assistant')

DELETE FROM Volunteers
WHERE DepartmentId = @departmentId

DELETE FROM VolunteersDepartments
WHERE Id = @departmentId