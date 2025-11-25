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

def delete_book():
    with get_conn() as conn:
        cursor = conn.cursor()
        cursor.execute(f"DELETE FROM BookLibrary WHERE Title='The Grapes of Wrath'")
        conn.commit()

    return 0


def create_book(item: BookLibrary):
    with get_conn() as conn:
        cursor = conn.cursor()
        data = (item[0], item[1], item[2], item[3], item[4])
        insert_stmt = f"INSERT INTO BookLibrary (Title, Author, PublicationYear, PageCount, ISBN) VALUES (%s, %s, %s, %s, %s)"
        cursor.execute( insert_stmt, data)
        conn.commit()

    return item

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
    assert create_book(("The Grapes of Wrath", "John Steinbeck", 1939, 464, "978-0-14-018640-6")) == ('The Grapes of Wrath', 'John Steinbeck', 1939, 464, '978-0-14-018640-6')
    delete_book()