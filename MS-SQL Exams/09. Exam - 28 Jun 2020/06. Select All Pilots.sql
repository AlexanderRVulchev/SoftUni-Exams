SELECT
    c.Id,
    CONCAT(c.FirstName, ' ' + c.LastName) AS FullName
FROM Colonists AS c
JOIN TravelCards AS tc ON c.Id = tc.ColonistId
WHERE tc.JobDuringJourney = 'Pilot'
ORDER BY c.Id