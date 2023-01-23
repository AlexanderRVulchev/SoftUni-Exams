CREATE FUNCTION udf_FlightDestinationsByEmail
(@email VARCHAR(50))
RETURNS INT
AS
BEGIN
DECLARE @passengerId INT = (SELECT Id FROM Passengers WHERE Email = @email)
DECLARE @count INT =
(
    SELECT COUNT(Id) FROM FlightDestinations 
    WHERE PassengerId = @passengerId 
    GROUP BY PassengerId    
)
RETURN IIF(@count IS NULL, 0, @count)
END