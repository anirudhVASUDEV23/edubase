# Node.js School API

A RESTful API built with Node.js, Express, and MySQL for managing school data. The API supports adding new schools and retrieving a list sorted by proximity to a given location using the Haversine formula.

## 🌐 Hosted URL

All endpoints are hosted on:


---

## 📌 API Endpoints

### ➕ Add a School

- **Endpoint:** `POST https://edubase-ip9l.onrender.com/addSchool`
- **Description:** Adds a new school to the database.
- **Request Body (JSON):**

```json
{
  "name": "Riverdale Academy",
  "address": "303 River Road",
  "latitude": 12.9500,
  "longitude": 77.6200
}

Success Response:

{
  "message": "School added successfully"
}

📍 List Schools by Distance
Endpoint: GET https://edubase-ip9l.onrender.com/listSchools/:latitude/:longitude

Description: Lists all schools sorted by distance from the specified coordinates.

Example:

GET https://edubase-ip9l.onrender.com/listSchools/12.9716/77.5946


Sample Response:
[
  {
    "id": 6,
    "name": "Yellow Valley High School",
    "address": "101 Green Street",
    "latitude": 22.96,
    "longitude": 57.58,
    "distance": 6718.32252126593
  },
  {
    "id": 4,
    "name": "Sunshine Public School",
    "address": "202 Sunshine Avenue",
    "latitude": 12.975,
    "longitude": 77.59,
    "distance": 8663.38611770962
  },
  {
    "id": 1,
    "name": "Maple Leaf School",
    "address": "505 Maple Street",
    "latitude": 13,
    "longitude": 77.61,
    "distance": 8665.68767791801
  },
  {
    "id": 3,
    "name": "Riverdale Academy",
    "address": "303 River Road",
    "latitude": 12.95,
    "longitude": 77.62,
    "distance": 8666.49613940931
  },
  {
    "id": 2,
    "name": "Hilltop International School",
    "address": "404 Hilltop Drive",
    "latitude": 12.99,
    "longitude": 77.63,
    "distance": 8667.79717043845
  },
  {
    "id": 5,
    "name": "Blue Valley High School",
    "address": "101 Green Street",
    "latitude": 16.96,
    "longitude": 79.58,
    "distance": 8899.80970657715
  }
]

📦 Postman Collection
Open Postman.

Click Import → File → Select the collection .json file.

Use the pre-configured addSchool and listSchools requests with live endpoints:

POST https://edubase-ip9l.onrender.com/addSchool

GET https://edubase-ip9l.onrender.com/listSchools/12.9716/77.5946
