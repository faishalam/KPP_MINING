const {User, Asset} = require("../models");

async function authorization(req, res, next) {
    try {
        
        const {id} = req.user
        const user = await User.findByPk(id)
        
        if(!user) throw {name : `notFound`}

        if(user.role === 'admin') {
            next()
        } else {
            const lodging = await Lodging.findByPk(req.params.id) 
            // console.log(lodging.authorId, '<<< ini id lodging')
            if(user.id === lodging.authorId) {
                next()
            } else {
                throw {name : "Forbidden"}
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization