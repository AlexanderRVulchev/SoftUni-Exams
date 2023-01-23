SELECT TOP 5
    r.Id,
    r.Name, 
    COUNT (c.Id) AS Commits
FROM Repositories as r
JOIN Commits as c ON r.Id = c.RepositoryId
JOIN RepositoriesContributors AS rc ON rc.RepositoryId = r.Id
GROUP BY r.Id, r.Name
ORDER BY Commits DESC , Id ASC, Name ASC