CREATE FUNCTION udf_GetAvailableRoom
(@HotelId INT, @Date DATE, @People INT)
RETURNS VARCHAR(255)
AS
BEGIN
DECLARE @result VARCHAR(255) = (
SELECT 'Room ' + CAST(temp.RoomId AS varchar) + ': ' + temp.RoomType + ' (' + CAST(temp.Beds AS varchar) + ' beds) - $' + CAST(temp.TotalPrice AS varchar)
FROM
(
    SELECT TOP 1 
        r.Id AS RoomId, 
        r.[Type] AS RoomType,
        r.Beds AS Beds,
        (r.Price + h.BaseRate) * @People AS TotalPrice
    FROM Rooms AS r
    JOIN Trips AS t ON r.Id = t.RoomId
    JOIN Hotels AS h ON r.HotelId = h.Id
    WHERE         
        HotelId = @HotelId 
        AND Beds >= @People
        AND r.Id NOT IN
        (
            SELECT RoomId FROM Trips
            WHERE @Date BETWEEN ArrivalDate AND ReturnDate AND CancelDate IS NULL
        )
    ORDER BY TotalPrice DESC) AS temp
)

RETURN ISNULL(@result, 'No rooms available')
END