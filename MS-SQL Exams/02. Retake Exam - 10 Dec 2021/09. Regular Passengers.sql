SELECT
    p.FullName,
    t.CountOfAircraft,
    SUM(fd.TicketPrice) AS TotalPayed
FROM Passengers AS p
JOIN FlightDestinations AS fd ON p.Id = fd.PassengerId
JOIN (    
    SELECT
        PassengerId,
        COUNT(AircraftId) AS CountOfAircraft
    FROM FlightDestinations
    GROUP BY PassengerId
    ) AS t ON p.Id = t.PassengerId
WHERE FullName LIKE '_a%'
GROUP BY FullName, CountOfAircraft
HAVING CountOfAircraft > 1
ORDER BY FullName