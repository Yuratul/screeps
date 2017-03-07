let harvester = require('Role harvester')
let builder = require('Role builder')
module.exports = {
run: function(creep) {
    let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
    let hurt_creep = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        filter: s => s.hits < s.hitsMax
    });
    if (hurt_creep) {
        if (creep.heal(hurt_creep) == ERR_NOT_IN_RANGE) {
            creep.moveTo(hurt_creep)
        } else {
            creep.heal(hurt_creep)
        }
    } else {
        harvester.run(creep)
        }
    }
};