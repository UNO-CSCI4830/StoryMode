import os
import pyodbc, struct
from azure import identity

from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

AZURE_SQL_CONNECTIONSTRING="Driver={ODBC Driver 18 for SQL Server};Server=tcp:csci4830-group.database.windows.net,1433;Database=csci4830-group;Uid=ttroj;Pwd=onomatopoeita82Spaghetti;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"

class BookLibrary(BaseModel):
    Title: str
    Author: str
    PublicationYear: int
    PageCount: int
    ISBN: str

connection_string = AZURE_SQL_CONNECTIONSTRING

app = FastAPI()

@app.get("/")
def root():
    
    print("Root of Book API")
    try:
        conn = get_conn()
        cursor = conn.cursor()

        # Table should be created ahead of time in production app.
        cursor.execute("""
            CREATE TABLE BookLibrary (
                Title varchar(80) NOT NULL PRIMARY KEY IDENTITY,
                Author varchar(80) NOT NULL,
                PublicationYear int NOT NULL,
                PageCount int NOT NULL,
                ISBN varchar(20) NOT NULL,
            );
        """)

        conn.commit()
    except Exception as e:
        # Table may already exist
        print(e)
        
    return "Book API"

@app.get("/all")
def get_books():
    rows = []
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM BookLibrary")

        for row in cursor.fetchall():
            print(row.Title, row.Author, row.PublicationYear, row.PageCount, row.ISBN)
            rows.append(f"{row.Title}, {row.Author}, {row.PublicationYear}, {row.PageCount}, {row.ISBN}")
    return rows

@app.get("/title/{title}")
def get_book(title: str):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM BookLibrary WHERE Title = ?", title)

        row = cursor.fetchone()
        return f"{row.Title}, {row.Author}, {row.PublicationYear}, {row.PageCount}, {row.ISBN}"

@app.post("/book")
def create_book(item: BookLibrary):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute(f"INSERT INTO BookLibrary (Title, Author, PublicationYear, PageCount, ISBN) VALUES (?, ?, ?, ?, ?)", item.Title, item.Author, item.PublicationYear, item.PageCount, item.ISBN)
        conn.commit()

    return item

def get_conn():

    conn = pyodbc.connect(connection_string)

    return conn