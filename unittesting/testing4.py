#run using python -m pytest

import pyodbc, struct
 #from azure import identity
import mysql.connector

# AZURE_SQL_CONNECTIONSTRING="Driver={ODBC Driver 18 for SQL Server};Server=tcp:csci4830-group.database.windows.net,1433;Database=csci4830-group;Uid=ttroj;Pwd=onomatopoeita82Spaghetti;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"





class BookLibrary():
    Title: str
    Author: str
    PublicationYear: int
    PageCount: int
    ISBN: str

#connection_string = AZURE_SQL_CONNECTIONSTRING


def get_books():
    rows = []
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM BookLibrary")

        for row in cursor.fetchall():
#            print(row.Title, row.Author, row.PublicationYear, row.PageCount, row.ISBN)
            rows.append(f"{row}")
    return rows


def get_conn():
    conn = -1
    conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="FacetiousCards",
    database="classproject"
)

    return conn


def test_answer():
   assert get_books() == ["('Frog and Toad Are Friends', 'Arnold Lobel', 1970, 64, '9780060239572')"]