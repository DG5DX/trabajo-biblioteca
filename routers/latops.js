const { Router } = require("express");
const { getListarTodos, getListarId, postLaptop, putLaptop, deleteLaptop, generarQr } = require("../controllers/latops");

const router = Router();

// Listar todas las laptops
router.get("/", getListarTodos);

// Listar por ID
router.get("/:id", getListarId);

// Agregar una laptop
router.post("/", postLaptop);

// Modificar una laptop
router.put("/:id", putLaptop);

// Eliminar una laptop
router.delete("/:id", deleteLaptop);

// Generar QR
router.put("/qr/:serial", generarQr);

module.exports = router;
