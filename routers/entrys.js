const { Router } = require("express");
const { 
  getListarTodos, 
  getListarId, 
  getListarActivos, 
  postEntry, 
  putEntry, 
  deleteEntry 
} = require("../controllers/entrys");

const router = Router();

// Listar todas las entradas
router.get("/", getListarTodos);

// Obtener una entrada por ID
router.get("/:id", getListarId);

// Obtener entradas activas (debes definir la lógica en el controlador)
router.get("/activos/:id", getListarActivos);

// Insertar nueva entrada
router.post("/", postEntry);

// Modificar entrada existente
router.put("/:id", putEntry);

// Eliminar entrada
router.delete("/:id", deleteEntry);

module.exports = router;
