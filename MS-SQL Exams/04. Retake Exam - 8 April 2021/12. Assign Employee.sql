CREATE PROC usp_AssignEmployeeToReport
(@EmployeeId INT, @ReportId INT)
AS
BEGIN
DECLARE @departmentIdEmployee INT = 
(
    SELECT DepartmentId 
    FROM Employees 
    WHERE Id = @EmployeeId
)
DECLARE @departmentIdReport INT = 
(
    SELECT c.DepartmentId 
    FROM Reports AS r 
    JOIN Categories AS c ON r.CategoryId = c.Id
    WHERE r.Id = @ReportId
)
IF @departmentIdEmployee <> @departmentIdReport 
    THROW 50001, 'Employee doesn''t belong to the appropriate department!', 1
ELSE 
    UPDATE Reports 
    SET EmployeeId = @EmployeeId 
    WHERE Id = @ReportId
END