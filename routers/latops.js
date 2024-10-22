const {Router} = require("express")
const {postInsertar, putModificar, getListar, getListarPorId, putActivar, putDesactivar, generarQr} = require("../controllers/latops")
const {helperLaptop}= require ('../helpers/latops')
const {validarCampos} = require('../middleware/validar-campos');
const {check} = require('express-validator');
const router = Router()

router.post("/",[
    check("serial","El serial es obligatorio").notEmpty(),
    check("holder","El id del holder es obligatorio").notEmpty(),
    check("holder","El id del holder no es valido").isMongoId(),
    check("state","El estado es obligatorio").notEmpty(),
    check("state","El estado debe de ser un numero").isNumeric(),
    validarCampos
],postInsertar)

router.put("/:id",[
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperLatop.validarId)
    ,validarCampos
], putModificar)

router.get("/",getListar)

router.get("/:id",[
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperLatop.validarId),
    validarCampos
], getListarPorId )

router.put("/activate/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperLatop.validarId),
    validarCampos
], putActivar )

router.put("/unactivate/:id",[
    check("id","el id no es valido").isMongoId(),
    check("id","el id no existe").custom(helperLatop.validarId),
    validarCampos
], putDesactivar)

router.put("/qr/:Serial",[
    check("Serial","El serial no es valido").notEmpty(),
    check("Serial","El serial no existe").custom(helperLatop.validarSerial),
    validarCampos
], generarQr)

module.exports=router  