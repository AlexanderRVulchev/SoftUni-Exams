DELETE FROM FlightDestinations
WHERE PassengerId IN 
(
    SELECT Id
    FROM Passengers
    WHERE LEN(FullName) <= 10
)

DELETE FROM Passengers
WHERE LEN(FullName) <= 10