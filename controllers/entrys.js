const Entry = require("../models/entrys"); // Asegúrate de que el nombre del modelo sea correcto

const getListarTodos = async (req, res) => {
  try {
    const entries = await Entry.find();
    res.json({ entries });
  } catch (error) {
    res.status(500).json({ error: "Error al listar las entradas" });
    console.error(error);
  }
};

const getListarId = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Entry.findById(id);
    
    if (!entry) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }
    
    res.json({ entry });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la entrada" });
    console.error(error);
  }
};

const getListarActivos = async (req, res) => {
  try {
    const { id } = req.params;
    const entry = await Entry.findById(id);
    
    if (!entry) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }
    
    res.json({ entry });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la entrada" });
    console.error(error);
  }
};

const postEntry = async (req, res) => {
  try {
    const { laptop, entrytime, checkout, type } = req.body;
    const entry = new Entry({ laptop, entrytime, checkout, type });
    await entry.save();
    res.status(201).json({ entry });
  } catch (error) {
    res.status(400).json({ error: "Error al crear la entrada" });
    console.error(error);
  }
};

const putEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { laptop, entrytime, checkout, type } = req.body;

    const entry = await Entry.findByIdAndUpdate(id, { laptop, entrytime, checkout, type }, { new: true });
    
    if (!entry) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }
    
    res.json({ entry });
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la entrada" });
    console.error(error);
  }
};

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await Entry.findByIdAndDelete(id);
    
    if (!entry) {
      return res.status(404).json({ error: "Entrada no encontrada" });
    }
    
    res.json({ message: "Entrada eliminada", entry });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la entrada" });
    console.error(error);
  }
};

module.exports = { getListarTodos, getListarId, getListarActivos, postEntry, putEntry, deleteEntry };
