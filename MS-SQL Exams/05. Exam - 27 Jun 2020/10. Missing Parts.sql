SELECT
    p.PartId,
    p.[Description],
    SUM(pn.Quantity) AS Required,
    SUM(p.StockQty) AS InStock,
    ISNULL(SUM(op.Quantity), 0) AS Ordered
FROM Parts AS p
LEFT JOIN PartsNeeded AS pn ON p.PartId = pn.PartId
LEFT JOIN Jobs AS j ON pn.JobId = j.JobId
LEFT JOIN Orders AS o ON j.JobId = o.JobId
LEFT JOIN OrderParts AS op ON o.OrderId = op.OrderId
WHERE j.[Status] <> 'Finished'
GROUP BY p.PartId, p.[Description]
HAVING SUM(pn.Quantity) > SUM(p.StockQty) + ISNULL(SUM(op.Quantity), 0)
ORDER BY p.PartId
