const express = require("express");
const { chromium } = require("playwright");

const app = express();

app.get("/render", async (req, res) => {
  try {
    const params = new URLSearchParams(req.query).toString();

    const url =
      "https://zarbi263.github.io/musculation/muscle_front_h.html?" +
      params;

    const browser = await chromium.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage({
      viewport: { width: 800, height: 1200 },
    });

    await page.goto(url, { waitUntil: "networkidle" });

    const buffer = await page.screenshot({ type: "png" });

    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(buffer);
  } catch (err) {
    console.error(err);
    res.status(500).send("Render error");
  }
});

app.listen(3000, () => {
  console.log("Serveur actif");
});
