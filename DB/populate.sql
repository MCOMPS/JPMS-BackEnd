-- Populate Property table
INSERT INTO Property (PropertyID, PropertyName, PropertyType, Address, AvailabilityStatus, Rent)
VALUES
(1, 'Luxury Apartment', 'Apartment', '123 Sheikh Zayed Road, Dubai', TRUE, 3000.00),
(2, 'Villa Oasis', 'Villa', 'Palm Jumeirah, Dubai', TRUE, 8000.00),
(3, 'Coastal Condo', 'Condo', 'Al Khan, Sharjah', FALSE, 2500.00),
(4, 'Downtown Residence', 'Apartment', 'Downtown Dubai', TRUE, 3500.00),
(5, 'Marina View', 'Apartment', 'Dubai Marina', TRUE, 4000.00),
(6, 'Garden Villa', 'Villa', 'Al Barsha, Dubai', TRUE, 6000.00);

-- Populate Tenant table with more male names
INSERT INTO Tenant (TenantID, FirstName, LastName, Email, PhoneNumber)
VALUES
(7, 'Omar', 'Al-Mazrouei', 'omar.almazrouei@email.com', '555-111-2222'),
(8, 'Gopal', 'Singh', 'gopal.singh@email.com', '777-999-8888'),
(9, 'Fernando', 'Cruz', 'fernando.cruz@email.com', '333-444-5555'),
(10, 'Hassan', 'Rizvi', 'hassan.rizvi@email.com', '666-222-3333'),
(11, 'Arif', 'Abbas', 'arif.abbas@email.com', '999-555-6666');

-- Populate LeaseContract table
INSERT INTO LeaseContract (ContractID, PropertyID, TenantID, LeaseStartDate, LeaseEndDate)
VALUES
(4, 4, 7, '2023-05-01', '2023-10-31'),
(5, 5, 8, '2023-06-01', '2023-12-31'),
(6, 6, 9, '2023-07-01', '2023-11-30'),
(7, 1, 10, '2023-08-01', '2023-09-30'),
(8, 2, 11, '2023-09-01', '2023-12-31');

-- Populate Caretaker table (keeping the existing ones)
INSERT INTO Caretaker (CaretakerID, PropertyID, FirstName, LastName, Email, PhoneNumber)
VALUES
(4, 4, 'Mustafa', 'Khan', 'mustafa.khan@email.com', '111-222-3333'),
(5, 5, 'Rajiv', 'Sharma', 'rajiv.sharma@email.com', '444-555-6666'),
(6, 6, 'Miguel', 'Lopez', 'miguel.lopez@email.com', '777-888-9999');

-- Populate Expense table with more records
INSERT INTO Expense (ExpenseID, ContractID, CaretakerID, ExpenseDescription, ExpenseAmount, ExpenseDate)
VALUES
(4, 4, 4, 'Utilities', 150.00, '2023-06-15'),
(5, 5, 5, 'Security Deposit Refund', 200.00, '2023-07-20'),
(6, 6, 6, 'Gardening Services', 100.00, '2023-08-10'),
(7, 7, 4, 'Painting', 80.00, '2023-09-01'),
(8, 8, 5, 'Appliance Repair', 120.00, '2023-10-05');
