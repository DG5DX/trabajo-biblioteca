const Latops = require('../models/latops');

const helperLatop={

    validarId: async (id)=>{
        const holder = await Latops.findById(id);    
        if(!holder){
            throw new Error ("el id:"+ id + " no existe");
        }
    },

    validarSerial:async (serial)=>{
        const Serial=await Latops.find({serial:serial})
        if(Serial.length == 0){
            throw new Error ("el serial no existe")
        }
    }

}

module.exports={helperLatop}