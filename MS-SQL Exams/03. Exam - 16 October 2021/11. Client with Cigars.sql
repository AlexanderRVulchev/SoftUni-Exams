CREATE FUNCTION udf_ClientWithCigars
(@name NVARCHAR(30)) 
RETURNS INT
AS
BEGIN
    DECLARE @clientID INT = (SELECT Id FROM Clients WHERE FirstName = @name)
    RETURN (SELECT COUNT(CigarId) FROM ClientsCigars WHERE ClientId = @clientID)
END