const {Router}=require("express")
const {getListarTodos, getListarId, postHolder, putHolder, putActive, putUnactivate}=require("../controllers/holders")
const httpHolders=require("../controllers/holders")

const router=Router()

//insertar
router.post("/", postHolder )

//modificar
router.put("/:id", putHolder)

//listar todos
router.get("/", getListarTodos)

//listar por id
router.get("/:id", getListarId)

//activar
router.put("/:id/activate", putActive)

//desactivar
router.put("/:id/unactivate", putUnactivate)


module.exports=router