<div align="center">
  <h1>Okunix Analytics</h1>
  <p>A lightweight, privacy-focused analytics engine built for modern web applications.</p>

<a href="https://okunix.tech">Website Link 1</a> •
<a href="https://okunix.sayoun.studio">Website Link 2</a> •
<a href="https://github.com/SAYOUNCDR/okunix">GitHub Repository</a> •
<a href="./API.md">API Reference</a>

</div>

<div align="center">
  <img src="./client/public/Okunix.webp" alt="Okunix Analytics Dashboard" width="800" />
</div>

<br />

Okunix is a powerful, self-hostable web analytics platform designed to track, aggregate, and visualize key telemetry metrics in real-time. Built with a focus on simplicity and performance, Okunix provides developers with immediate insights into their application traffic without compromising end-user privacy.

## Core Features

### Telemetry & Metrics

- **Live Viewers**: Real-time websocket tracking of concurrent active sessions.
- **Traffic Analytics**: Accurate aggregation of Unique Visitors and Total Visits.
- **Engagement Tracking**: Automated Bounce Rate calculation and Session Duration tracking.

### Data Visualization

- **Geographic Distribution**: Interactive world mapping and detailed tabular breakdown by Country, Region, and City.
- **Traffic Heatmaps**: visual matrix representations of activity intensity sorted by day and operational hours (24h).
- **Environment Profiling**: Device, Operating System, and Browser telemetry extraction.

### Deep Routing Analytics

- **Referrer Attribution**: Track incoming traffic channels (Social Media, Direct, Organic Search).
- **Path Analysis**: Monitor specific route performance, visualizing standard pageviews alongside Entry and Exit nodes.

## Architecture & Technology Stack

Okunix is built on the MERN stack, delivering high-performance telemetry processing via Node.js streams and efficient aggregation pipelines via MongoDB.

- **Frontend**: React.js, TailwindCSS, Chart.js, Lucide Icons
- **Backend**: Node.js, Express.js (See [API Reference](API.md))
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JWT-based stateless authentication

## Getting Started

### Prerequisites

Ensure the following runtimes and services are available on your host machine:

- Node.js (v18.0.0 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn package manager

### Local Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/SAYOUNCDR/okunix.git
   cd okunix
   ```

2. **Install Backend Dependencies**

   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../client
   npm install
   ```

4. **Environment Configuration**

   #### Server Environment Variables

   Create a .env file in the server directory by copying the .env.example file.

   ```bash
   cd server
   cp .env.example .env
   ```

   #### Client Environment Variables - Must Read the .env.example in client directory for /api setup

   Create a .env file in the client directory by copying the .env.example file.

   ```bash
   cd client
   cp .env.example .env
   ```

5. **Initialize the Application**

   ```bash
   # Terminal 1: Start the Backend API
   cd server
   npm run dev

   # Terminal 2: Start the React Client
   cd client
   npm run dev
   ```

## Integration Guide

To begin tracking analytics on a target website, embed the Okunix tracking script into the `<head>` of your application. The script acts as an asynchronous unblocking beacon.

```html
<script
  defer
  src="https://okunix.tech/api/tracker/script.js"
  data-website-id="YOUR_WEBSITE_ID"
></script>
```

## Contributing

We welcome contributions to the Okunix engine. Please read through our open issues or submit a detailed Pull Request outlining your proposed architectural changes.

## License

This project is generously open-sourced and available under the [MIT License](LICENSE).
