const jwt = require("jsonwebtoken");

// Middleware to verify JWT token for protected routes
const verifyToken = (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.headers.authorization;

        // If no token is provided, return unauthorized response
        if (!token) {
            return res.status(401).json({
                token: true,
                status: false,
                message: "No token provided",
            });
        }

        // Remove "Bearer " prefix if it exists
        // Example header format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        const actualToken = token.startsWith("Bearer ")
            ? token.split(" ")[1]
            : token;

        // Verify the token using the secret key
        // This will throw an error if the token is invalid or expired
        const decoded = jwt.verify(actualToken, process.env.JWTSECRETKEY);

        // Attach decoded user information (e.g., user id) to the request object
        // So it can be accessed in the next middleware or controller
        req.user = decoded;

        // Continue to the next middleware or route handler
        next();

    } catch (error) {
        // If token verification fails, return unauthorized response
        return res.status(401).json({
            token: true,
            status: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = verifyToken;