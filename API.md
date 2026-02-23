# Okunix API Reference

Welcome to the Okunix API documentation. The backend provides a fast, RESTful interface for authenticating users, managing tracked web properties, ingesting telemetry data, and querying aggregated analytics metrics.

## Base Architecture

All backend endpoints are securely namespaced beneath the `/api` route.

- **Local Development**: `http://localhost:5000/api`
- **Production URL**: `https://okunix.tech/api`

## Authentication

Protected routes require valid authorization via a JWT Bearer token passed in the header. Requests attempting to access protected endpoints without a token will be refused with a `401 Unauthorized` status.

```http
Authorization: Bearer <your_jwt_token>
```

---

## 1. Authentication Routing (`/api/auth`)

These endpoints handle session initialization, credential manipulation, and identity verification.

| Method   | Endpoint           | Description                                                          | Auth Required | Rate Limiter |
| :------- | :----------------- | :------------------------------------------------------------------- | :------------ | :----------- |
| `POST`   | `/register`        | Securely registers a new identity                                    | No            | **Strict**   |
| `POST`   | `/login`           | Authenticates user logic and issues JWT                              | No            | **Strict**   |
| `POST`   | `/refresh-token`   | Rotates a targeted access token                                      | No            | Standard     |
| `POST`   | `/logout`          | Destroys the active cookie and terminates session                    | No            | Standard     |
| `GET`    | `/verify-email`    | Authenticates a one-time validation link                             | No            | Standard     |
| `GET`    | `/me`              | Fetches the protected user object data                               | **Yes**       | Standard     |
| `DELETE` | `/delete-account`  | Permanently destroys the user identity and relational tables         | **Yes**       | Standard     |
| `POST`   | `/forgot-password` | Dispatches an algorithmic password configuration token via email     | No            | **Strict**   |
| `POST`   | `/reset-password`  | Accepts the one-time token resetting the cryptographic password hash | No            | **Strict**   |
| `POST`   | `/change-email`    | Generates an identity transfer authorization object                  | **Yes**       | **Strict**   |

---

## 2. Tracking Infrastructure (`/api/track`)

The hyper-concurrent endpoints actively targeted by injected HTML `<script>` tags capturing raw event interactions on external client websites.

| Method | Endpoint   | Description                                                                                                                                    | Auth Required | Rate Limiter  |
| :----- | :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------- | :------------ | :------------ |
| `POST` | `/collect` | Highly optimized endpoint catching and decrypting streaming analytics beacon payloads (Pageviews, Leaves, Referrers) via background intervals. | No            | **Event Cap** |

---

## 3. Analytics Aggregation Pipelines (`/api/analytics`)

Complex MongoDB read-replica pipelines compiling huge volumes of unstructured interaction objects into dense, manageable geometric arrays feeding the React interface.
**Standardized Parameter Constraints:** Target endpoints will gracefully accept dynamically generated `?range=X` filtering variables (`?range=24h`, `?range=7d`, `?range=30d`).

| Method | Endpoint                  | Description                                                                                                                                                                          | Auth Required |
| :----- | :------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `GET`  | `/stats/:websiteId`       | Mathematically evaluates concurrent timeline metrics retrieving KPI objects (`Visitors`, `Visits`, `Views`, `Bounce Rate`, `Duration`) and their % deltas against historical ranges. | **Yes**       |
| `GET`  | `/chart/:websiteId`       | Retrieves temporal node mapping arrays for plotting X/Y axis activity visualizers.                                                                                                   | **Yes**       |
| `GET`  | `/location/:websiteId`    | Groups unique global footprint origins into hierarchical geographic structures (`{Countries, Regions, Cities}`).                                                                     | **Yes**       |
| `GET`  | `/environment/:websiteId` | Scrapes hardware properties from the interaction requests organizing outputs cleanly into `{Browsers, OS, Devices}`.                                                                 | **Yes**       |
| `GET`  | `/heatmap/:websiteId`     | Casts the activity timeframe across a 7x24 week matrix exposing dense traffic density vectors.                                                                                       | **Yes**       |
| `GET`  | `/sources/:websiteId`     | Parses and truncates explicit entry referrers (e.g. tracking Google, X, Facebook referral hits).                                                                                     | **Yes**       |
| `GET`  | `/pages/:websiteId`       | Traverses explicit web paths, separating standard `Path` arrays from extreme bounds `Entry` or `Exit` page definitions.                                                              | **Yes**       |

---

## 4. Environment Configuration (`/api/website`)

Control-layer handling traditional REST CRUD logic for deployment assets and registered web properties.

| Method   | Endpoint                        | Description                                                                                                                  | Auth Required |
| :------- | :------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `POST`   | `/createWebsite`                | Initialize and secure a new domain to the current user token                                                                 | **Yes**       |
| `GET`    | `/getUserWebsites`              | Returns the absolute array listing all active websites underneath user control                                               | **Yes**       |
| `GET`    | `/getWebsite/:websiteId`        | Returns the expanded details for a solitary entity                                                                           | **Yes**       |
| `GET`    | `/getTrackedData/:websiteId`    | Fetches the unparsed, raw underlying activity node table                                                                     | **Yes**       |
| `GET`    | `/getTrackingScript/:websiteId` | Extrapolates the final customized `<script>` tag snippet                                                                     | **Yes**       |
| `PUT`    | `/updateWebsite/:websiteId`     | Re-configures property domain string                                                                                         | **Yes**       |
| `DELETE` | `/resetWebsite/:websiteId`      | Initiates a localized soft-delete dropping ONLY relational tracked payload instances without harming the domain registration | **Yes**       |
| `DELETE` | `/deleteWebsite/:websiteId`     | Fires a destructive hard-delete annihilating both the tracked payloads and the domain target table entirely                  | **Yes**       |
