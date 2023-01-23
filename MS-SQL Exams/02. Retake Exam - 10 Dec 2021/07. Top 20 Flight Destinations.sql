SELECT TOP (20)
    fd.Id AS DestinaionId,
    fd.Start,
    p.FullName,
    a.AirportName,
    fd.TicketPrice
FROM FlightDestinations AS fd
JOIN Passengers AS p ON fd.PassengerId = p.Id
JOIN Airports AS a ON fd.AirportId = a.Id
WHERE DATEPART(DAY, fd.Start) % 2 = 0
ORDER BY TicketPrice DESC, AirportName ASC