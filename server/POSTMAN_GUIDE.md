# Postman Testing Guide for OpenPulse

This guide walks you through the complete flow of testing the OpenPulse API using Postman.

**Base URL**: `http://localhost:5000` (Make sure your server is running!)

---

## 1. User Registration & Login

### Step 1: Register a New User

- **Method**: `POST`
- **URL**: `{{baseUrl}}/api/auth/register`
- **Body** (JSON):
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response**: `201 Created`

### Step 2: Login

- **Method**: `POST`
- **URL**: `{{baseUrl}}/api/auth/login`
- **Body** (JSON):
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Expected Response**: `200 OK` containing an `accessToken`.
- **Action**: Copy the `accessToken` from the response. You will need this for the next step.

---

## 2. Website Management

### Step 3: Create a Website

- **Method**: `POST`
- **URL**: `{{baseUrl}}/api/website/createWebsite`
- **Headers**:
  - `Authorization`: `Bearer <YOUR_ACCESS_TOKEN>` (Paste the token from Step 2)
- **Body** (JSON):
  ```json
  {
    "websiteName": "My Awesome Blog",
    "domain": "myblog.com"
  }
  ```
- **Expected Response**: `201 Created` containing the `newWebsite` object.
- **Action**: Copy the `websiteId` (UUID) from the response (e.g., `550e8400-e29b-41d4-a716-446655440000`).

---

## 3. Tracking Simulation

### Step 4: Simulate a Page Visit (The Tracker)

- **Method**: `POST`
- **URL**: `{{baseUrl}}/api/track/collect`
- **Note**: This request is what the `tracker.js` script sends automatically. You don't need the Auth Token here!
- **Body** (JSON):
  ```json
  {
    "websiteId": "<YOUR_WEBSITE_ID>",
    "url": "https://myblog.com/post/hello-world",
    "referrer": "https://google.com",
    "width": 1920,
    "height": 1080,
    "sessionId": "test-session-id-12345"
  }
  ```
- **Expected Response**: `200 OK` - "Data tracked successfully"

---

## 4. Verification

### Step 5: Check Database

1.  Open MongoDB Compass or your database viewer.
2.  Go to the `trackeddatas` collection.
3.  You should see a new document with the `websiteId`, URL, and enriched location data (if your IP was valid).

### Step 6: Verify Script Access

- **Method**: `GET`
- **URL**: `{{baseUrl}}/scripts/tracker.js`
- **Expected Response**: `200 OK` - You should see the JavaScript code of the tracker.
