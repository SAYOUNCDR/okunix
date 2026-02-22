(function () {
    const SCRIPT_URL = document.currentScript.src;
    const ATTRIBUTE_NAME = "data-website-id";
    const API_ENDPOINT = "/api/track/collect"; // Relative path if on same domain, else absolute

    // Get Website ID
    const websiteId = document.currentScript.getAttribute(ATTRIBUTE_NAME);

    if (!websiteId) {
        console.error("OpenPulse: Website ID is missing in the tracker script.");
        return;
    }

    function getSessionId() {
        let sessionId = sessionStorage.getItem("openpulse_session");
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            sessionStorage.setItem("openpulse_session", sessionId);
        }
        return sessionId;
    }

    function getVisitorId() {
        let visitorId = localStorage.getItem("openpulse_visitor");
        if (!visitorId) {
            visitorId = crypto.randomUUID();
            localStorage.setItem("openpulse_visitor", visitorId);
        }
        return visitorId;
    }

    function sendData(event = "pageview") {
        const payload = {
            websiteId: websiteId,
            url: window.location.href,
            referrer: document.referrer || "Direct",
            width: window.innerWidth,
            height: window.innerHeight,
            sessionId: getSessionId(),
            visitorId: getVisitorId(),
            event: event,
        };

        // Determine if we need to send to a different origin
        // Assuming the script is served from the same API server, we can construct the URL
        const scriptOrigin = new URL(SCRIPT_URL).origin;
        const endpoint = `${scriptOrigin}${API_ENDPOINT}`;

        fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
            keepalive: true, // Ensures request completes even if page unloads
        }).catch((err) => console.error("OpenPulse: Failed to send data", err));
    }

    // Track on load
    if (document.readyState === "complete") {
        sendData("pageview");
    } else {
        window.addEventListener("load", () => sendData("pageview"));
    }

    // Optional: Track History API changes (SPA support - basic)
    const originalPushState = history.pushState;
    history.pushState = function () {
        originalPushState.apply(this, arguments);
        sendData("pageview");
    };

    window.addEventListener("popstate", () => sendData("pageview"));

    // Track when user leaves/closes the tab (for Visit Duration)
    window.addEventListener("visibilitychange", function () {
        if (document.visibilityState === "hidden") {
            sendData("leave");
        }
    });

})();
