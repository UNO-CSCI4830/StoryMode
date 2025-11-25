#run using python -m pytest

import pyodbc, struct
 #from azure import identity
import mysql.connector

# AZURE_SQL_CONNECTIONSTRING="Driver={ODBC Driver 18 for SQL Server};Server=tcp:csci4830-group.database.windows.net,1433;Database=csci4830-group;Uid=ttroj;Pwd=onomatopoeita82Spaghetti;Encrypt=yes;TrustServerCertificate=no;Connection Timeout=30;"






def get_conn():
    conn = -1
    conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="FacetiousCards"
    database="classproject"
)

    return conn


def test_answer():
    assert get_conn() == -1
