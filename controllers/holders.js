const Holder = require("../models/holders");

const getListarTodos = async (req, res) => {
  try {
    const holders = await Holder.find();
    res.json({ holders });
  } catch (error) {
    res.status(400).json({ error: "Operacion no se realizo correctamente" });
    console.log(error);
  };
};

const getListarId = async (req, res) => {
  try {
    const { id } = req.params;
    const holder = await Holder.findById(id);
    res.json({ holder });
  } catch (error) {
    res.status(400).json({ error: "Operacion no se realizo correctamente" });
    console.log(error);
  }
};

const postHolder = async (req, res) => {
  try {
    const { email, password, document, name, rol, ficha, photo, phone, state, createdAt } = req.body;
    const holder = new Holder({email, password, document, name, rol, ficha, photo, phone, state, createdAt});
    await holder.save();
    res.json({ holder });
  } catch (error) {
    res.status(400).json({ error: "Operacion no se realizo correctamente" });
    console.log(error);
  }
};

const putHolder = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, document, name, rol, ficha, photo, phone, state, createdAt } = req.body;
    const holder =  await Holder.findByIdAndUpdate(id,{email, password, document, name, rol, ficha, photo, phone, state, createdAt},{new:true})
    
    res.json({ holder });
  } catch (error) {
    res.status(400).json({ error: "Operacion no se realizo correctamente" });
    console.log(error);
  }
};

const deleteHolder = async (req, res) => {
    try {
      const { id } = req.params;

      const holder =  await Holder.findByIdAndDelete(id)
      
      res.json({ holder });
    } catch (error) {
      res.status(400).json({ error: "Operacion no se realizo correctamente" });
      console.log(error);
    }
  };



const putActive = async (req, res)=>{
  try {
      const {id} = req.params
      const holder = await Holder.findByIdAndUpdate(id,{state:1},{new:true});
      res.json({holder});
  } catch (error) {
      res.status(400).json({error : "la operacion ha fallado"});
      console.log(error);
  }
}

const putUnactivate = async (req, res)=>{
  try {
      const {id} = req.params
      const holder = await Holder.findByIdAndUpdate(id,{state:0},{new:true});
      res.json({holder});
  } catch (error) {
      res.status(400).json({error : "la operacion ha fallado"});
      console.log(error);
  }
}


module.exports = { getListarTodos, getListarId, postHolder, putHolder, deleteHolder, putActive, putUnactivate};