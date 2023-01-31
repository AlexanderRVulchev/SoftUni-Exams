CREATE FUNCTION udf_GetVolunteersCountFromADepartment 
(@VolunteersDepartment VARCHAR(30))
RETURNS INT
AS
BEGIN
DECLARE @DepartmentId INT = (SELECT Id FROM VolunteersDepartments WHERE DepartmentName = @VolunteersDepartment)
RETURN (SELECT COUNT(*) FROM Volunteers WHERE DepartmentId = @DepartmentId)
END
