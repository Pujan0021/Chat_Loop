const validator = require("validator")
const signUp = async (req, res) => {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        res.status(400).json({
            message: "All Fields are Required!"
        })
    }
    if (password.length < 6) {
        res.status(400).json({
            message: "Password must be at least of 6 characters!"
        })
    }
    if (validator.isEmail(email)) {
        res.status(400).json({
            message: "Not a Valid Email!"
        })
    }

}

module.exports = signUp;