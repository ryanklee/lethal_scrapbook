CREATE TABLE Games (
    GameID SERIAL PRIMARY KEY,
    StartDate DATE NOT NULL,
    FinalQuota INT NOT NULL
);

CREATE TABLE Moons (
    MoonID SERIAL PRIMARY KEY,
    MoonName VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Runs (
    RunID SERIAL PRIMARY KEY,
    GameID INT REFERENCES Games(GameID),
    MoonID INT REFERENCES Moons(MoonID),
    Day INT NOT NULL,
    Date DATE,
    ScrapCollected INT NOT NULL,
    QuotaAtTimeOfRun INT NOT NULL,
    CrewFatalities INT,
    Survived BOOLEAN NOT NULL,
    Strategies TEXT,
    EntrancesUsed TEXT
);

CREATE TABLE Facilities (
    FacilityID SERIAL PRIMARY KEY,
    MoonID INT REFERENCES Moons(MoonID)
);

CREATE TABLE Entrances (
    EntranceID SERIAL PRIMARY KEY,
    FacilityID INT REFERENCES Facilities(FacilityID),
    Type VARCHAR(255) NOT NULL
);

CREATE TABLE Strategies (
    StrategyID SERIAL PRIMARY KEY,
    Description TEXT NOT NULL
);

CREATE TABLE RunEntrances (
    RunID INT REFERENCES Runs(RunID),
    EntranceID INT REFERENCES Entrances(EntranceID),
    PRIMARY KEY (RunID, EntranceID)
);

CREATE TABLE RunStrategies (
    RunID INT REFERENCES Runs(RunID),
    StrategyID INT REFERENCES Strategies(StrategyID),
    PRIMARY KEY (RunID, StrategyID)
);
CREATE TABLE Games (
    GameID SERIAL PRIMARY KEY,
    StartDate DATE NOT NULL,
    FinalQuota INT NOT NULL
);

CREATE TABLE Moons (
    MoonID SERIAL PRIMARY KEY,
    MoonName VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Runs (
    RunID SERIAL PRIMARY KEY,
    GameID INT REFERENCES Games(GameID),
    MoonID INT REFERENCES Moons(MoonID),
    Day INT NOT NULL,
    Date DATE,
    ScrapCollected INT NOT NULL,
    QuotaAtTimeOfRun INT NOT NULL,
    CrewFatalities INT,
    Survived BOOLEAN NOT NULL,
    Strategies TEXT,
    EntrancesUsed TEXT
);

CREATE TABLE Facilities (
    FacilityID SERIAL PRIMARY KEY,
    MoonID INT REFERENCES Moons(MoonID)
);

CREATE TABLE Entrances (
    EntranceID SERIAL PRIMARY KEY,
    FacilityID INT REFERENCES Facilities(FacilityID),
    Type VARCHAR(255) NOT NULL
);

CREATE TABLE Strategies (
    StrategyID SERIAL PRIMARY KEY,
    Description TEXT NOT NULL
);

CREATE TABLE RunEntrances (
    RunID INT REFERENCES Runs(RunID),
    EntranceID INT REFERENCES Entrances(EntranceID),
    PRIMARY KEY (RunID, EntranceID)
);

CREATE TABLE RunStrategies (
    RunID INT REFERENCES Runs(RunID),
    StrategyID INT REFERENCES Strategies(StrategyID),
    PRIMARY KEY (RunID, StrategyID)
);
