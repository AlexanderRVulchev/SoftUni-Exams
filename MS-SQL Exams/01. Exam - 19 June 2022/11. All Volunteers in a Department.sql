CREATE FUNCTION udf_GetVolunteersCountFromADepartment 
(@VolunteersDepartment VARCHAR(30))
RETURNS INT
AS
BEGIN
    DECLARE @departmentId INT = 
    (
        SELECT Id 
        FROM VolunteersDepartments 
        WHERE DepartmentName = @VolunteersDepartment
    )
    RETURN 
    (
        SELECT COUNT(*)
        FROM Volunteers
        WHERE DepartmentId = @departmentId
        GROUP BY DepartmentId
    )    
END