from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_user_success():
    payload = {"id": "0", "user_name": "John"}

    response = client.post(
        "/api/v1/users?user_name=John",
        json=payload
    )

    assert response.status_code == 201
    data = response.json()

    assert data["user_name"] == "John"
    assert "id" in data

def test_create_user_duplicate():
    payload = {"id": "0", "user_name": "Bob"}

    # First create
    client.post("/api/v1/users?user_name=Bob", json=payload)

    # Duplicate
    response = client.post("/api/v1/users?user_name=Bob", json=payload)

    assert response.status_code == 409
    detail = response.json()["detail"]
    assert "already exists" in detail.lower()

def test_list_users():
    client.post("/api/v1/users?user_name=Carol", json={"id": "0", "user_name": "Carol"})
    client.post("/api/v1/users?user_name=Dave", json={"id": "0", "user_name": "Dave"})

    response = client.get("/api/v1/users")

    assert response.status_code == 200

    users = response.json()
    assert len(users) >= 2
    assert "Carol" in [u["user_name"] for u in users]
    assert "Dave" in [u["user_name"] for u in users]

def test_delete_user_success():
    # Create user
    res = client.post(
        "/api/v1/users?user_name=Eve",
        json={"id": "0", "user_name": "Eve"}
    )
    uid = res.json()["id"]

    # Delete
    response = client.delete(f"/api/v1/users/{uid}")
    assert response.status_code == 200

    data = response.json()
    assert data["deleted"] == uid
