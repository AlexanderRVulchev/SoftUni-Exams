CREATE TABLE Clients
(
    ClientId INT PRIMARY KEY IDENTITY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Phone CHAR(12) NOT NULL
)

CREATE TABLE Mechanics
(
    MechanicId INT PRIMARY KEY IDENTITY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Address VARCHAR(255) NOT NULL
)

CREATE TABLE Models
(
    ModelId INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) UNIQUE NOT NULL
)

CREATE TABLE Jobs
(
    JobId INT PRIMARY KEY IDENTITY,
    ModelId INT NOT NULL FOREIGN KEY REFERENCES Models(ModelId),
    Status VARCHAR(11) NOT NULL DEFAULT 'Pending' CHECK (Status IN ('Pending', 'In Progress', 'Finished')),
    ClientId INT NOT NULL FOREIGN KEY REFERENCES Clients(ClientId),
    MechanicId INT FOREIGN KEY REFERENCES Mechanics(MechanicId),
    IssueDate DATE NOT NULL,
    FinishDate DATE
)

CREATE TABLE Orders
(
    OrderId INT PRIMARY KEY IDENTITY,
    JobId INT NOT NULL FOREIGN KEY REFERENCES Jobs(JobId),
    IssueDate DATE,
    Delivered BIT DEFAULT 0
)

CREATE TABLE Vendors
(
    VendorId INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) NOT NULL UNIQUE
)

CREATE TABLE Parts
(
    PartId INT PRIMARY KEY IDENTITY,
    SerialNumber VARCHAR(50) NOT NULL UNIQUE,
    Description VARCHAR(255) NOT NULL,
    Price MONEY NOT NULL CHECK (Price > 0),
    VendorId INT NOT NULL FOREIGN KEY REFERENCES Vendors(VendorId),
    StockQty INT NOT NULL DEFAULT 0 CHECK (StockQty >= 0)    
)

CREATE TABLE OrderParts
(
    OrderId INT NOT NULL FOREIGN KEY REFERENCES Orders(OrderId),
    PartId INT NOT NULL FOREIGN KEY REFERENCES Parts(PartId),
    Quantity INT NOT NULL DEFAULT 1 CHECK (Quantity > 0),
    PRIMARY KEY (OrderId, PartId)
)

CREATE TABLE PartsNeeded
(
    JobId INT NOT NULL FOREIGN KEY REFERENCES Jobs(JobId),
    PartId INT NOT NULL FOREIGN KEY REFERENCES Parts(PartId),
    Quantity INT NOT NULL DEFAULT 1 CHECK (Quantity > 0),
    PRIMARY KEY (JobId, PartId)
)
