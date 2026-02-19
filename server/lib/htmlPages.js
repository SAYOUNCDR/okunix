const getEmailVerifiedPage = (frontendUrl) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified - OKUnix</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #1f2937;
    }
    .container {
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }
    .icon-container {
      background-color: #dcfce7;
      color: #16a34a;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }
    .icon-container svg {
      width: 40px;
      height: 40px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #111827;
    }
    p {
      color: #6b7280;
      margin-bottom: 32px;
      line-height: 1.5;
    }
    .btn {
      display: inline-block;
      background-color: #f97316; /* Orange-500 matching your theme likely */
      color: white;
      font-weight: 600;
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      transition: background-color 0.2s;
      width: 100%;
      box-sizing: border-box;
    }
    .btn:hover {
      background-color: #ea580c; /* Orange-600 */
    }
    .footer {
      margin-top: 24px;
      font-size: 14px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-container">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <h1>Email Verified!</h1>
    <p>Your email address has been successfully verified. You can now access all features of OKUnix.</p>
    <a href="${frontendUrl}" class="btn">Go to Dashboard</a>
    <div class="footer">
      <p>Redirecting automatically in <span id="countdown">5</span> seconds...</p>
    </div>
  </div>

  <script>
    let timeLeft = 5;
    const countdownEl = document.getElementById('countdown');
    
    const timer = setInterval(() => {
      timeLeft -= 1;
      countdownEl.textContent = timeLeft;
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        window.location.href = "${frontendUrl}";
      }
    }, 1000);
  </script>
</body>
</html>
  `;
};

const getErrorPage = (message) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Failed - OKUnix</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f9fafb;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      color: #1f2937;
    }
    .container {
      background-color: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 40px;
      text-align: center;
      max-width: 400px;
      width: 90%;
    }
    .icon-container {
      background-color: #fee2e2;
      color: #dc2626;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }
    .icon-container svg {
      width: 40px;
      height: 40px;
    }
    h1 {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #111827;
    }
    p {
      color: #6b7280;
      margin-bottom: 32px;
      line-height: 1.5;
    }
    .footer {
      margin-top: 24px;
      font-size: 14px;
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="icon-container">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
    <h1>Verification Failed</h1>
    <p>${message}</p>
    <div class="footer">
      <p>Please contact support if this issue persists.</p>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = { getEmailVerifiedPage, getErrorPage };
