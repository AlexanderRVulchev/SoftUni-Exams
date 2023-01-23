SELECT
    p.FirstName,
    p.LastName,
    a.Manufacturer,
    a.Model,
    a.FlightHours
FROM Pilots AS p
JOIN PilotsAircraft AS pa ON pa.PilotId = p.Id
JOIN Aircraft AS a ON pa.AircraftId = a.Id
WHERE FlightHours IS NOT NULL AND FlightHours <= 304
ORDER BY FlightHours DESC, FirstName ASC