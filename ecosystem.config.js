// Below is deployment code for pm2 
module.exports = {
    apps: [
        {
            name: "okunix-backend",
            script: "server.js",
            cwd: "/home/azureuser/projects/okunix/server",
            env_file: "/home/azureuser/projects/okunix/server/.env",
            env: {
                NODE_ENV: "production",
            }
        },
        {
            name: "okunix-frontend",
            script: "serve",
            // CHANGE THIS LINE:
            env: {
                PM2_SERVE_PATH: '/home/azureuser/projects/okunix/client-dist',
                PM2_SERVE_PORT: 5173,
                PM2_SERVE_SPA: 'true',
                PM2_SERVE_MAX_AGE: 31536000,
                NODE_ENV: "production"
            }
        }
    ]
};



