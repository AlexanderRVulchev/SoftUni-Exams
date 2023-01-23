CREATE PROC usp_SearchByAirportName
(@airportName VARCHAR(70))
AS
SELECT
    ap.AirportName,
    p.FullName,
        CASE WHEN fd.TicketPrice <= 400 THEN 'Low'
        ELSE 
            CASE WHEN fd.TicketPrice <= 1500 THEN 'Medium'
            ELSE 'High'
            END 
        END AS LevelOfTicketPrice,
    ac.Manufacturer,
    ac.Condition,
    act.TypeName
FROM Airports AS ap
JOIN FlightDestinations AS fd ON ap.Id = fd.AirportId
JOIN Passengers AS p ON fd.PassengerId = p.Id
JOIN Aircraft AS ac ON fd.AircraftId = ac.Id
JOIN AircraftTypes AS act ON ac.TypeId = act.Id
WHERE ap.AirportName = @airportName
ORDER BY Manufacturer, FullName