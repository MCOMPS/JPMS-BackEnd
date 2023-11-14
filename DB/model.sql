	
CREATE TABLE Property (
    PropertyID INT PRIMARY KEY,
    PropertyName VARCHAR(255),
    PropertyType VARCHAR(255),
    Address VARCHAR(255),
    AvailabilityStatus BOOLEAN,
    Rent DECIMAL(10, 2)  
);

CREATE TABLE Tenant (
    TenantID INT PRIMARY KEY,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255),
    PhoneNumber VARCHAR(20)
);


CREATE TABLE LeaseContract (
    ContractID INT PRIMARY KEY,
    PropertyID INT,
    TenantID INT,
    LeaseStartDate DATE,
    LeaseEndDate DATE,
    
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID),
    FOREIGN KEY (TenantID) REFERENCES Tenant(TenantID)
);


CREATE TABLE Caretaker (
    CaretakerID INT PRIMARY KEY,
    PropertyID INT,
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255),
    PhoneNumber VARCHAR(20),
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID)
);


CREATE TABLE Expense (
    ExpenseID INT PRIMARY KEY,
    ContractID INT,
    CaretakerID INT,
    ExpenseDescription VARCHAR(255),
    ExpenseAmount DECIMAL(10, 2),
    ExpenseDate DATE,
    FOREIGN KEY (ContractID) REFERENCES LeaseContract(ContractID),
    FOREIGN KEY (CaretakerID) REFERENCES Caretaker(CaretakerID)
);


CREATE TABLE Report (
    ReportID INT PRIMARY KEY,
    PropertyID INT,
    ReportDate DATE,
    ReportContent TEXT,
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID)
);