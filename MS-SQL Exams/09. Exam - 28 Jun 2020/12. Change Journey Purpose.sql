CREATE PROC usp_ChangeJourneyPurpose
(@JourneyId INT, @NewPurpose VARCHAR(11))
AS
BEGIN
IF (@JourneyId NOT IN (SELECT Id FROM Journeys)) 
    THROW 50001, 'The journey does not exist!', 1
IF (SELECT Purpose FROM Journeys WHERE Id = @JourneyId) = @NewPurpose 
    THROW 50002, 'You cannot change the purpose!', 1
UPDATE Journeys
SET Purpose = @NewPurpose
END