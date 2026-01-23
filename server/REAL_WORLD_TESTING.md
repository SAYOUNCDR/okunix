# Real-World Testing Guide

This guide walks you through testing OpenPulse with a **real website**.

**Prerequisites**:

1.  Your server must be running (`npm run dev` in `server` folder).
2.  You need a real project (e.g., an `index.html` file on your desktop or a hosted site) to paste the script into.
3.  Postman.

---

## 🏗️ Phase 1: Setup & Configuration (Postman)

### 1. Register & Login

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/auth/register` -> `http://localhost:5000/api/auth/login`
- **Action**: Copy the `accessToken` from the login response.

### 2. Create Your Digital Property

- **Method**: `POST`
- **URL**: `http://localhost:5000/api/website/createWebsite`
- **Headers**: `Authorization: Bearer <YOUR_TOKEN>`
- **Body**:
  ```json
  { "websiteName": "My Real Test Site", "domain": "localhost" }
  ```
- **Action**: Copy the `websiteId` (e.g., `550e84...`).

### 3. Generate the Tracking Script

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/website/getTrackingScript/<YOUR_WEBSITE_ID>`
- **Headers**: `Authorization: Bearer <YOUR_TOKEN>`
- **Response**: You will get a JSON object with a `script` field.
  ```json
  {
    "script": "<script src=\"http://localhost:5000/scripts/tracker.js\" data-website-id=\"...\"></script>"
  }
  ```
- **Action**: Copy the **exact content** of the `script` value (remove the escape slashes if you are copying manually, or just take the string).

---

## 🌐 Phase 2: live Integration

### 4. Inject the Script

- Open your real-world project (e.g., a simple `index.html` file).
- Paste the copied script tag inside the `<head>` section.
  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Test Site</title>
      <!-- PASTE HERE -->
      <script
        src="http://localhost:5000/scripts/tracker.js"
        data-website-id="YOUR_WEBSITE_ID"
      ></script>
    </head>
    <body>
      <h1>Welcome to my tracked website!</h1>
    </body>
  </html>
  ```

### 5. Generate Traffic

- Open this `index.html` file in your browser.
- Refresh it a few times.
- Resize your browser window (to test screen width tracking).
- Navigate around if it has links.

---

## 📊 Phase 3: Verify Data (Postman)

### 6. View Tracked Data

- **Method**: `GET`
- **URL**: `http://localhost:5000/api/website/getTrackedData/<YOUR_WEBSITE_ID>`
- **Headers**: `Authorization: Bearer <YOUR_TOKEN>`
- **Expected Result**:
  You should see a list of JSON objects representing your visits!
  ```json
  {
    "message": "Tracked data fetched successfully",
    "trackedData": [
      {
        "country": "Local",
        "browser": "Chrome",
        "device": "Desktop",
        "url": "file:///C:/Users/...",
        "websiteId": "..."
      }
    ]
  }
  ```

### Troubleshooting

- **Empty Data?** Check the "Console" tab in your browser (F12) on the test site.
  - If you see `ERR_CONNECTION_REFUSED`, your server might not be running.
  - If you see `CORS` errors, we might need to adjust `app.js` CORS settings (currently allowed for all via `cors()`).
