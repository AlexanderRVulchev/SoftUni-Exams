CREATE FUNCTION udf_HoursToComplete
(@StartDate DATETIME, @EndDate DATETIME)
RETURNS INT
BEGIN
IF (@StartDate IS NULL OR @EndDate IS NULL) RETURN 0
RETURN DATEDIFF(HOUR, @StartDate, @EndDate)
END