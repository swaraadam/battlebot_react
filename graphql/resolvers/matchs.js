const Match = require('../../models/match')
const Tank = require('../../models/tank')

const {transformMatch} = require('./merge')

module.exports ={
    matchs: async() =>{
        try{
            const matchs = await Match.find()
            return matchs.map(match =>{
                return transformMatch(match)
            })
        }catch(err){
            throw err
        }
    },
    createMatch: async(args, req) =>{
        if(!req.isAuth){
            throw new Error('Unauthenticated!')
        }
        const match = new Match({
            date: new Date(args.matchInput.date),
            winner: args.matchInput.winner,
            loser: args.matchInput.loser
        })
        let createdMatch
        try{
            const result = await match.save()
            createdMatch = transformMatch(result)
            const tank = await Tank.findById(req.matchInput.tankId)

            if(!tank){
                throw new Error('we got no tank')
            }
            tank.followingMatch.push(match)
            await tank.save()

            return createdMatch
        }catch(err){
            console.log(err)
            throw err
        }
    }
}