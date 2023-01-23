SELECT
    m.FirstName + ' ' + m.LastName AS Mechanic,
    AVG(DATEDIFF(DAY, j.IssueDate, j.FinishDate)) AS AverageDays
FROM Mechanics AS m
JOIN Jobs AS j ON m.MechanicId = j.MechanicId
GROUP BY m.FirstName, m.LastName, j.MechanicId
ORDER BY j.MechanicId