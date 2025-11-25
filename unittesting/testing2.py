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




def get_book(title: str):
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM BookLibrary WHERE Title = %s", [title])

        row = cursor.fetchone()
        return f"{row}"


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
    assert get_book("Frog and Toad Are Friends") == "('Frog and Toad Are Friends', 'Arnold Lobel', 1970, 64, '9780060239572')"
