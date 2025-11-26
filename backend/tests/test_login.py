from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_ping_ok():
    response = client.get("/ping")
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True

def test_login_success():
    payload = {"username": "testuser", "password": "password123"}
    response = client.post("/api/v1/login-test", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is True
    assert data["username"] == "testuser"

def test_login_invalid_credentials():
    payload = {"username": "wrong", "password": "bad"}
    response = client.post("/api/v1/login-test", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["ok"] is False
    assert "invalid" in data["error"].lower()

def test_login_missing_username():
    payload = {"password": "password123"}
    response = client.post("/api/v1/login-test", json=payload)
    assert response.status_code == 422
