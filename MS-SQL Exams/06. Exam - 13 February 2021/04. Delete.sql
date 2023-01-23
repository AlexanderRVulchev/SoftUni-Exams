DECLARE @repositoryId INT = 
(
    SELECT Id 
    FROM Repositories 
    WHERE Name = 'Softuni-Teamwork'
)

DELETE FROM RepositoriesContributors
WHERE RepositoryId = @repositoryId

DELETE FROM Issues
WHERE RepositoryId = @repositoryId