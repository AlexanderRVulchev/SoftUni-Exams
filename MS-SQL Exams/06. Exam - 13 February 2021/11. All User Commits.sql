CREATE FUNCTION udf_AllUserCommits(@username VARCHAR(30)) 
RETURNS INT
AS 
BEGIN
DECLARE @UserId INT = (SELECT Id FROM Users WHERE Username = @username)
RETURN ISNULL(
(
    SELECT                 
        COUNT(@@ROWCOUNT)
    FROM Commits 
    WHERE ContributorId = @UserId
    GROUP BY ContributorId
), 0)
END