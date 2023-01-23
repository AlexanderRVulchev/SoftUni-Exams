SELECT
    ap.AirportName,
    fd.Start AS DayTime,
    fd.TicketPrice,
    p.FullName,
    ac.Manufacturer,
    ac.Model
FROM FlightDestinations AS fd
JOIN Airports AS ap ON fd.AirportId = ap.Id
JOIN Passengers AS p ON fd.PassengerId = p.Id
JOIN Aircraft AS ac ON fd.AircraftId = ac.Id
WHERE 
    DATEPART(HOUR, fd.Start) BETWEEN 6 AND 20 AND
    fd.TicketPrice > 2500
ORDER BY Model ASC