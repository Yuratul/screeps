require ('prototype Spawning') ();
let harvester = require('Role harvester')
let upgrader = require('Role upgrader')
let builder = require('Role builder')
let defender = require('Role defender')
let repaircreeps = require('Role repairCreeps')
let healer = require('Role healer')
module.exports.loop = function () {
    for(let i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    } 
    let towers = Game.rooms.W8N3.find(FIND_STRUCTURES, {
        filter: (s) => s.structureType == STRUCTURE_TOWER
    });
    for(let tower of towers) {
        let enemy = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        if (enemy) {
            console.log("target found")
            tower.attack(enemy)
        }
    };
    
    for (let name in Game.creeps) {
        let creep = Game.creeps[name]

        if (creep.memory.role == "harvester") {
            harvester.run(creep);
            
        } else if(creep.memory.role == "upgrader") {
            upgrader.run(creep);
            
        } else if (creep.memory.role == "builder") {
            builder.run(creep)
            
        } else if (creep.memory.role == "defender" ) {
            defender.run(creep)
        }  else if(creep.memory.role == "ranged defender") {
            defender.run(creep)
        } else if(creep.memory.role == "repair creep") {
            repaircreeps.run(creep);
            
        } else if(creep.memory.role == "healer") {
            healer.run(creep);
            
        }
    };
   
    let numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
    let numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
    let numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
    let numberOfDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'defender')
    let numberOfRepairCreeps = _.sum(Game.creeps, (c) => c.memory.role == 'repair creep');
    let numberOfRangedDefenders = _.sum(Game.creeps, (c) => c.memory.role == 'ranged defender')
    let numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer');
    
    console.log(numberOfHarvesters + " Harvesters")
    console.log(numberOfUpgraders + " Upgraders")
    console.log(numberOfBuilders + " Builders")
    console.log(numberOfDefenders + " Defenders")
    console.log(numberOfRangedDefenders + " Ranged defenders")
    console.log(numberOfRepairCreeps + " Repair creeps")
    console.log(numberOfHealers + " Healers")
    let minimumNumberOfHarvesters = 1
    let minimumNumberOfUpgraders = 1
    let minimumNumberOfBuilders = 1
    let minimumNumberOfRepairCreeps = 1
    let minimumNumberOfDefenders = 1
    let minimumNumberOfRangedDefenders = 1
    let minimumNumberOfHealers = 1
    let energy = Game.spawns.Yuratul.room.energyCapacityAvailable
    console.log(energy)     
    if(numberOfHarvesters < minimumNumberOfHarvesters) {
       name = Game.spawns.Yuratul.createCustomCreep(energy, "harvester")
       console.log("spawned new creep")
    } else if(numberOfUpgraders < minimumNumberOfUpgraders) {
        name = Game.spawns.Yuratul.createCustomCreep(energy, "upgrader")
    } else if (numberOfBuilders < minimumNumberOfBuilders) {
        name = Game.spawns.Yuratul.createCustomCreep(energy, "builder")
    } else if (numberOfRepairCreeps < minimumNumberOfRepairCreeps) {
        name = Game.spawns.Yuratul.createCustomCreep(energy, "repair creep")
    } else if (numberOfDefenders < minimumNumberOfDefenders) {
      Game.spawns.Yuratul.createCreep([TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,ATTACK,], {role: 'defender', working: false})
    } else if (numberOfRangedDefenders < minimumNumberOfRangedDefenders ) {
        Game.spawns.Yuratul.createCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,WORK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK], {role: 'ranged defender', working: false})
    } else if (numberOfHealers < minimumNumberOfHealers ) {
        Game.spawns.Yuratul.createCreep([CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,WORK,HEAL,HEAL,HEAL,HEAL,HEAL,HEAL], {role: 'healer', working: false})
    } 
};