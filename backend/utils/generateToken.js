const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '10d' } // You can adjust the expiry
    );
};

module.exports = { generateToken };
