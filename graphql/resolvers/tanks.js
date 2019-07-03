const Tank = require('../../models/tank')
const User = require('../../models/user')

const {transformTank} = require('./merge')

module.exports = {
    tanks: async()=>{
        try{
            const tanks = await Tank.find()
            return tanks.map(tank =>{
                return transformTank(tank)
            })
        }catch(err){
            throw err
        }
    },
    createTank: async(args, req) =>{
        // if(!req.isAuth){
        //     throw new Error('unauthenticated!')
        // }
        const tank = new Tank({
            name: args.tankInput.name,
            logic: args.tankInput.logic,
            creator: "5d1aa472415a18068817fe03"
        })
        let createdTank
        try{
            const result = await tank.save()

            createdTank = transformTank(result)
            const creator = await User.findById("5d1aa472415a18068817fe03")

            if(!creator){
                throw new Error('User Not Found!')
            }
            creator.createdTank.push(tank)
            await creator.save()

            return createdTank
        }catch(err){
            console.log(err)
            throw err
        }
    }
}