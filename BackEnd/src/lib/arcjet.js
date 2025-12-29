
const arcjet = require("@arcjet/node").default;
const { shield, detectBot, slidingWindow } = require("@arcjet/node");
const aj = arcjet({
    key: process.env.ARCJET_KEY,
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({ mode: "LIVE", allow: ["CATEGORY:SEARCH_ENGINE"] }),
        slidingWindow({ mode: "LIVE", max: 100, interval: 60 }),
    ],
});

module.exports = aj;