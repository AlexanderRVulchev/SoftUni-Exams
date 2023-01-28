CREATE PROC usp_AnnualRewardLottery
(@TouristName VARCHAR(50)) 
AS
BEGIN
DECLARE @touristId INT = (SELECT Id FROM Tourists WHERE Name = @TouristName)
DECLARE @countOfSites INT = (SELECT COUNT(*) FROM SitesTourists WHERE TouristId = @touristId)
DECLARE @reward VARCHAR(20) = NULL

IF (@countOfSites >= 100) SET @reward = 'Gold badge'
    ELSE IF (@countOfSites >= 50 ) SET @reward = 'Silver badge'
        ELSE IF (@countOfSites >= 25) SET @reward = 'Bronze badge'

IF (@reward IS NOT NULL)
    UPDATE Tourists
    SET Reward = @reward

SELECT Name, Reward FROM Tourists WHERE Id = @touristId
END