const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
    try {
        let token = req.headers.authorization
        console.log(token)

        if (!token) return res.status(401).json({ message: "Invalid token" })
        if (token.slice(0, 7) !== "Bearer ") return res.status(401).json({ message: "Invalid token" })

        token = token.slice(7)
        const payload = verifyToken(token)

        const user = await User.findByPk(payload.id)
        if (!user) return res.status(401).json({ message: "Invalid token" })

        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            dept: user.department,
            site: user.site
        }

        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = authentication
