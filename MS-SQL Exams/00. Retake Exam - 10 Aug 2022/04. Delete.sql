DECLARE @BonusPrizeId INT = (SELECT Id FROM BonusPrizes WHERE Name = 'Sleeping bag')

DELETE FROM TouristsBonusPrizes
WHERE BonusPrizeId = @BonusPrizeId

DELETE FROM BonusPrizes
WHERE Id = @BonusPrizeId