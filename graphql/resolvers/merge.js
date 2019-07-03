const User = require('../../models/user')
const Tank = require('../../models/tank')
const Match = require('../../models/match')
const {dateToString} = require('../../helpers/date')

const tanks = async tankIds =>{
    try{
        const tanks = await Tank.find({_id:{$in: tankIds}})
        return tanks.map(tank =>{
            return transformTank(tank)
        })
    }catch(err){
        throw err
    }
}

const matchs = async matchIds =>{
    try{
        const matchs = await Match.find({_id:{$in:matchIds}})
        return matchs.map(match =>{
            return transformMatch(match)
        })
    }catch(err){
        throw err
    }
}

const users = async userIds =>{
    try{
        const users = await User.find({_id:{$in:userIds}})
        return users.map(user =>{
            return tranformUser(user)
        })
    }catch(err){
        throw err
    }
}

const user = async userId =>{
    try{
        const user = await User.findById(userId)
        return{
            ...user._doc,
            _id: user.id,
            createdTanks: tanks.bind(this, user._doc.createdTanks)
        }
    }catch(err){
        throw err
    }
}

const transformTank = tank =>{
    return{
        ...tank._doc,
        _id: tank.id,
        creator: user.bind(this, tank.creator),
        followingMatch: matchs.bind(this, tank._doc.followingMatch)
    }
}

const transformMatch = match =>{
    return{
        ...match._doc,
        _id: match.id,
        date: dateToString(match._doc.date)
    }
}

const tranformUser = user =>{
    return{
        ...user._doc,
        _id: user.id,
        createdTank: tanks.bind(this, user._doc.createdTank)
    }
}

exports.tranformUser = tranformUser
exports.transformMatch = transformMatch
exports.transformTank = transformTank
exports.users = users
exports.tanks = tanks
exports.matchs = matchs