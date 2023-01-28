CREATE FUNCTION udf_GetTouristsCountOnATouristSite
(@Site VARCHAR(100))
RETURNS INT
BEGIN
DECLARE @siteId INT = (SELECT Id FROM Sites WHERE Name = @Site)
RETURN (SELECT COUNT(*) FROM SitesTourists WHERE SiteId = @siteId)
END