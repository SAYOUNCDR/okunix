# OkUnix

OkUnix is a simple yet powerful web-analytics platform designed to track and visualize key metrics such as visits, visitors, bounce rate, and more. It provides real-time insights into your website's performance.

## 🚀 Features

### Core Metrics
- **Live Viewers**: See how many users are on your site right now.
- **Traffic Overview**: Track Unique Visitors and Total Visits.
- **Engagement**: Monitor Bounce Rate and Visit Duration.

### Visualizations
- **Traffic Graphs**: Visual representation of Visitors and Views over time.
- **Geographic Data**:
    - **World Map**: Highlighting visitor locations.
    - **Location Breakdown**: Detailed stats by Countries, Regions, and Cities.
- **Heat Maps**:
    - **Daily**: Activity intensity by day.
    - **Hourly**: Operational hours tracking (12am - 11pm).

### Detailed Analytics
- **Page Tracking**: Analyze performance of specific paths (e.g., `/`, `/payment`, `/about`).
    - Entry Paths
    - Exit Paths
- **Sources & Channels**: Identify traffic origins (LinkedIn, X/Twitter, YouTube, etc.).
- **Environment Stats**: Breakdown by Browsers, Operating Systems, and Devices.

## 🛠️ Tech Stack

- **Frontend**: React, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL

## 📦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/okunix.git
   ```

2. Install dependencies for server and client:
   ```bash
   cd okunix
   # Setup Server
   cd server
   npm install
   
   # Setup Client
   cd ../client
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in the `server` directory and add your database credentials.

4. Run the application:
   ```bash
   # Run Server
   cd server
   npm start

   # Run Client
   cd client
   npm start
   ```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
