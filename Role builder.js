let harvester = require('Role harvester')
module.exports = {
run: function(creep) {
    let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    let constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            if (constructionSite) {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite)
                } else {
                creep.build(constructionSite)
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
