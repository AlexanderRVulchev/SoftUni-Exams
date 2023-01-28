CREATE TABLE Categories
(
    Id INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) NOT NULL

)

CREATE TABLE Locations
(
    Id INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) NOT NULL,
    Municipality VARCHAR(50),
    Province VARCHAR(50)
)

CREATE TABLE Sites
(
    Id INT PRIMARY KEY IDENTITY,
    Name VARCHAR(100) NOT NULL,
    LocationId INT NOT NULL REFERENCES Locations(Id),
    CategoryId INT NOT NULL REFERENCES Categories(Id),
    Establishment VARCHAR(15)
)

CREATE TABLE Tourists
(
    Id INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) NOT NULL,
    Age INT NOT NULL CHECK (Age BETWEEN 0 AND 120),
    PhoneNumber VARCHAR(20) NOT NULL,
    Nationality VARCHAR(30) NOT NULL,
    Reward VARCHAR(20)
)

CREATE TABLE SitesTourists
(
    TouristId INT NOT NULL REFERENCES Tourists(Id),
    SiteId INT NOT NULL REFERENCES Sites(Id),
    PRIMARY KEY (TouristId, SiteId)
)

CREATE TABLE BonusPrizes
(
    Id INT PRIMARY KEY IDENTITY,
    Name VARCHAR(50) NOT NULL
)

CREATE TABLE TouristsBonusPrizes
(
    TouristId INT NOT NULL REFERENCES Tourists(Id),
    BonusPrizeId INT NOT NULL REFERENCES BonusPrizes(Id),
    PRIMARY KEY (TouristId, BonusPrizeId)
)