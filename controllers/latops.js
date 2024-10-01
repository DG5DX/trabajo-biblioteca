const Laptop = require("../models/latops");
const qrCodigo = require("qrcode");  // Asegúrate de agregar esta línea

const getListarTodos = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.json({ laptops });
  } catch (error) {
    res.status(400).json({ error: "Operación no se realizó correctamente" });
    console.log(error);
  }
};

const getListarId = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await Laptop.findById(id);
    if (!laptop) {
      return res.status(404).json({ error: "Laptop no encontrada" });
    }
    res.json({ laptop });
  } catch (error) {
    res.status(400).json({ error: "Operación no se realizó correctamente" });
    console.log(error);
  }
};

const postLaptop = async (req, res) => {
  try {
    const { holder, serial, qrcode, state, observations } = req.body;
    const laptop = new Laptop({ holder, serial, qrcode, state, observations });
    await laptop.save();
    res.status(201).json({ laptop });
  } catch (error) {
    res.status(400).json({ error: "Operación no se realizó correctamente" });
    console.log(error);
  }
};

const putLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const { holder, serial, qrcode, state, observations } = req.body;
    const laptop = await Laptop.findByIdAndUpdate(id, { holder, serial, qrcode, state, observations }, { new: true });

    if (!laptop) {
      return res.status(404).json({ error: "Laptop no encontrada" });
    }

    res.json({ laptop });
  } catch (error) {
    res.status(400).json({ error: "Operación no se realizó correctamente" });
    console.log(error);
  }
};

const deleteLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const laptop = await Laptop.findByIdAndDelete(id);

    if (!laptop) {
      return res.status(404).json({ error: "Laptop no encontrada" });
    }

    res.json({ message: "Laptop eliminada", laptop });
  } catch (error) {
    res.status(400).json({ error: "Operación no se realizó correctamente" });
    console.log(error);
  }
};

// Función para generar el código QR
const generarQr = async (req, res) => {
  try {
    const { serial } = req.params;
    
    // Generar el código QR basado en el número de serie
    const QRCodigo = await qrCodigo.toDataURL(serial);
    
    // Actualizar la laptop con el QR generado
    const laptop = await Laptop.findOneAndUpdate({ serial }, { qrcode: QRCodigo }, { new: true });

    if (!laptop) {
      return res.status(404).json({ error: "Laptop no encontrada" });
    }

    res.json({ laptop });
  } catch (error) {
    res.status(400).json({ error: "Operación fallida" });
    console.log(error);
  }
};

module.exports = { getListarTodos, getListarId, postLaptop, putLaptop, deleteLaptop, generarQr };
