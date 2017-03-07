let harvester = require('Role harvester')
let builder = require('Role builder')
module.exports = {
    run: function(creep) {
        let enemies = creep.room.find(FIND_HOSTILE_CREEPS) 
        if (enemies.length == 0) {
            builder.run(creep)
        } else if (enemies.length > 0) {
            if(creep.memory.role == "defender") {
                if (creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(enemies[0]);
                } else {
                    creep.attack(enemies[0]);
                    }
                } if(creep.memory.role == "ranged defender") {
                    if (creep.rangedAttack(enemies[0]) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(enemies[0]);
                    } else {
                        creep.rangedAttack(enemies[0]);
                    }
                }
            }
        }
    };