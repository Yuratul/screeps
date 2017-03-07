let harvester = require('Role harvester')
let builder = require('Role builder')
module.exports = {
run: function(creep) {
    let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.hits < s.hitsMax
    });
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            if (structure) {
                if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure)
                } else {
                creep.repair(structure)
                }
            } else {
                harvester.run(creep)
            }
        } else if (creep.memory.working == false) {
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source)
            } else {
                creep.harvest(source)
            }
        }
    }
};