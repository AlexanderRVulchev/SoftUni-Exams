DECLARE @UserId INT = (SELECT Id FROM Owners WHERE Name = 'Kaloqn Stoqnov')

UPDATE Animals
SET OwnerId = @UserId
WHERE OwnerId IS NULL