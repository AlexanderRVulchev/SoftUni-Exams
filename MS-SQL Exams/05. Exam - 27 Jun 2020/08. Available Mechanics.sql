SELECT
    FirstName + ' ' + LastName AS Available
FROM Mechanics
WHERE MechanicId NOT IN
(
    SELECT MechanicId 
    FROM Jobs
    WHERE [Status] = 'In Progress'
)
ORDER BY MechanicId