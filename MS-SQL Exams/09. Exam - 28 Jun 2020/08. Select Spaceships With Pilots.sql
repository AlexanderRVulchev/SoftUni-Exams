SELECT
    s.Name,
    s.Manufacturer
FROM Spaceships AS s
JOIN Journeys AS j ON s.Id = j.SpaceshipId
JOIN TravelCards AS tc ON j.Id = tc.JourneyId
JOIN Colonists AS c ON tc.ColonistId = c.Id
WHERE c.BirthDate > '1989-01-01' AND tc.JobDuringJourney = 'Pilot'
ORDER BY s.Name