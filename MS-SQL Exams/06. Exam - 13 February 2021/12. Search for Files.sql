CREATE PROCEDURE usp_SearchForFiles
(@fileExtension VARCHAR(100))
AS
SELECT 
    Id, 
    Name, 
    CAST(Size AS varchar) + 'KB'
FROM Files
WHERE Name LIKE '%' + @fileExtension
ORDER BY Id ASC, Name ASC, Size DESC