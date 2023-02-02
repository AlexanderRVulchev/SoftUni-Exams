CREATE PROC usp_SearchByAirportName
(@airportName varchar(70))
AS
BEGIN
SELECT
    a.AirportName,
    p.FullName,
    CASE 
        WHEN (fd.TicketPrice <= 400) THEN 'Low'
        WHEN (fd.TicketPrice <= 1500) THEN 'Medium'
        ELSE 'High'
    END AS LevelOfTickerPrice,
    ac.Manufacturer,
    ac.Condition,
    at.TypeName
FROM Airports AS a
JOIN FlightDestinations AS fd ON a.Id = fd.AirportId
JOIN Passengers AS p ON fd.PassengerId = p.Id
JOIN Aircraft AS ac ON fd.AircraftId = ac.Id
JOIN AircraftTypes AS at ON ac.TypeId = at.Id
WHERE AirportName = @airportName
ORDER BY Manufacturer, p.FullName
END
