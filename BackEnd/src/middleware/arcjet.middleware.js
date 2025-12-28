const isSpoofedBot = require("@arcjet/inspect");
const aj = require("../lib/arcjet.js");

const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({
                    error: "RateLimitExceeded",
                    message: "Too many requests. Please try again later."
                });
            } else if (decision.reason.isBot()) {
                return res.status(403).json({
                    error: "BotAccessDenied",
                    message: "Bot access denied."
                });
            } else {
                return res.status(403).json({
                    error: "AccessDenied",
                    message: "Access denied by security policy."
                });
            }
        }

        if (decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "SpoofedBotDetected",
                message: "Malicious bot activity detected."
            });
        }

        next();
    } catch (err) {
        console.error("Arcjet Protection Error:", err);
        return res.status(500).json({
            error: "InternalSecurityError",
            message: "An error occurred during security checks."
        });
    }
};

module.exports = arcjetProtection;