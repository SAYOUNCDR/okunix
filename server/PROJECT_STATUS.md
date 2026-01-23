# Project Status: Server Implementation

## ✅ Completed

- **Data Models**:
  - `User`: Basic user info (username, email, password).
  - `Website`: Stores website metadata (name, domain, unique `websiteId`).
  - `TrackedData`: Schema for storing analytics data (page views, session info, location). _Recently updated to link with `Website` model._
- **Authentication**:
  - User registration and login flows.
  - JWT middleware for protected routes.
- **Website Management**:
  - API to add a new website (generates UUID).
  - List and delete user's websites.
- **Resources**:
  - `GeoLite2-City.mmdb` is present in `server/geo/`.

## 🚧 In Progress / Next Steps

- **Tracker Script (`tracker.js`)**
  - [x] **Current State**: Implemented in `server/scripts/tracker.js`.
  - [x] **Todo**: Implement client-side script to capture:
    - `websiteId` (from script tag attribute).
    - `url` (window.location.href).
    - `referrer` (document.referrer).
    - `screenSize` (window.innerWidth/Height).
    - `userAgent` (navigator.userAgent).
  - [x] **Todo**: Logic to send beacon/POST request to `/api/collect`.

- **Data Collection Endpoint (`/api/collect`)**
  - [x] **Current State**: Implemented in `trackerController.js` and `trackerRoute.js`.
  - [x] **Todo**: Create `trackerController.js` and `trackerRoute.js`.
  - [x] **Todo**: Handle "Ping" from tracker.
  - [x] **Todo**: Parse User-Agent (Browser, OS, Device).
  - [x] **Todo**: IP Geolocation using `GeoLite2-City.mmdb`.
  - [x] **Todo**: Store data in `TrackedData` collection.

- **Data Aggregation & Visualization**
  - [x] **New**: endpoints for `getTrackingScript` (helper) and `getTrackedData` (verification).
  - [ ] **Current State**: Basic `getTrackedData` exists but raw dump only.
  - [ ] **Todo**: Implement aggregation queries for:
    - Unique Visitors (count distinct `sessionId`).
    - Real-time views.
    - Bounce rate calculation.
    - Time-series data (charts).

## 📚 Guides

- [x] `POSTMAN_GUIDE.md`: For API-only testing.
- [x] `REAL_WORLD_TESTING.md`: For detailed end-to-end integration testing with a real site.
