CREATE PROC usp_SearchByTaste
(@taste VARCHAR(20))
AS
SELECT
    ci.CigarName,
    '$' + CAST(ci.PriceForSingleCigar AS varchar),
    t.TasteType,
    b.BrandName,
    CAST(s.Length AS VARCHAR) + ' cm',
    CAST(s.RingRange AS varchar) + ' cm'
FROM Cigars AS ci
join Tastes AS t ON ci.TastId = t.Id
join Sizes AS s ON ci.SizeId = s.Id
JOIN Brands AS b ON ci.BrandId = b.Id
WHERE t.TasteType = @taste
ORDER BY s.Length ASC, s.RingRange DESC
