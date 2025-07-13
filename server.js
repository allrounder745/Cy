// server.js
const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/raw", async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing 'url' parameter" });
  }

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get("content-type");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", contentType || "text/plain");

    const data = await response.text();
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch URL", details: err.message });
  }
});

app.listen(PORT, () => console.log(`CORS Proxy running on port ${PORT}`));
