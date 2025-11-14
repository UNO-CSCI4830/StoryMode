-- StoryMode Project Database Schema (Azure SQL)

-- Drop existing tables 
IF OBJECT_ID('dbo.ClubBooks', 'U') IS NOT NULL DROP TABLE ClubBooks;
IF OBJECT_ID('dbo.Members', 'U') IS NOT NULL DROP TABLE Members;
IF OBJECT_ID('dbo.BookClubs', 'U') IS NOT NULL DROP TABLE BookClubs;
IF OBJECT_ID('dbo.Books', 'U') IS NOT NULL DROP TABLE Books;
IF OBJECT_ID('dbo.Authors', 'U') IS NOT NULL DROP TABLE Authors;

---------------------------------------------------------
-- Authors
---------------------------------------------------------
CREATE TABLE Authors (
    AuthorID INT IDENTITY(1,1) PRIMARY KEY,
    FullName NVARCHAR(255) NOT NULL,
    Biography NVARCHAR(MAX),
    BirthDate DATE,
    Nationality NVARCHAR(100)
);

---------------------------------------------------------
-- Books  (Azure SQL version)
---------------------------------------------------------
CREATE TABLE Books (
    BookID INT IDENTITY(1,1) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    AuthorID INT NOT NULL,
    Genre NVARCHAR(100),
    PageCount INT,
    ReleaseDate DATE,
    Summary NVARCHAR(MAX),
    ISBN NVARCHAR(50) UNIQUE,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID)
);

---------------------------------------------------------
-- Book Clubs
---------------------------------------------------------
CREATE TABLE BookClubs (
    ClubID INT IDENTITY(1,1) PRIMARY KEY,
    ClubName NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX),
    Location NVARCHAR(255),
    URL NVARCHAR(255),
    AdminCode NVARCHAR(50)
);

---------------------------------------------------------
-- ClubBooks (Many-to-Many)
---------------------------------------------------------
CREATE TABLE ClubBooks (
    ClubBookID INT IDENTITY(1,1) PRIMARY KEY,
    ClubID INT NOT NULL,
    BookID INT NOT NULL,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (ClubID) REFERENCES BookClubs(ClubID) ON DELETE CASCADE,
    FOREIGN KEY (BookID) REFERENCES Books(BookID) ON DELETE CASCADE
);

---------------------------------------------------------
-- Sample Data
---------------------------------------------------------

INSERT INTO Authors (FullName, Biography, BirthDate, Nationality)
VALUES 
('George Orwell', 'Author of dystopian fiction.', '1903-06-25', 'British'),
('Jane Austen', 'English novelist known for Pride and Prejudice.', '1775-12-16', 'British');

INSERT INTO Books (Title, AuthorID, Genre, PageCount, ReleaseDate, Summary, ISBN)
VALUES
('1984', 1, 'Dystopian', 328, '1949-06-08', 'A dystopian social science fiction novel.', '9780451524935'),
('Pride and Prejudice', 2, 'Romance', 279, '1813-01-28', 'A romantic novel about manners.', '9780141040349');

INSERT INTO BookClubs (ClubName, Description, Location, URL, AdminCode)
VALUES
('Downtown Readers', 'A local Omaha-based reading group.', 'Omaha, NE', 'https://storymode-club.com/downtown', 'ADM123'),
('Classic Lit Lovers', 'A virtual club for fans of classic literature.', 'Online', 'https://storymode-club.com/classic', 'ADM456');

INSERT INTO ClubBooks (ClubID, BookID, StartDate)
VALUES
(1, 1, '2025-10-01'),
(2, 2, '2025-10-05');