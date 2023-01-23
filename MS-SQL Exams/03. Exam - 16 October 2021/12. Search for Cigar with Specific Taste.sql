CREATE PROC usp_SearchByTaste
(@taste VARCHAR(20))
AS
SELECT
    ci.CigarName,
    '$' + CAST(ci.PriceForSingleCigar AS VARCHAR) AS Price,
    @taste AS TasteType,
    b.BrandName,
    CAST(s.Length AS VARCHAR) + ' cm' AS CigarLength,
    CAST(s.RingRange AS VARCHAR)  + ' cm' AS CigarRingRange -- Error in description: No extra zero needed
FROM Cigars AS ci
JOIN Brands AS b ON ci.BrandId = b.Id
JOIN Sizes AS s ON ci.SizeId = s.Id
WHERE ci.TastId = (SELECT Id FROM Tastes WHERE TasteType = @taste)
ORDER BY CigarLength ASC, CigarRingRange DESC