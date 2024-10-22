const {Router} = require('express')
const {postHolders,postLogin, putHolders, getHolders, getHolder, putActive, putUnactivate} = require("../controllers/holders")
const {helperHolder}=require('../helpers/holders')
const {validarCampos} = require('../middleware/validar-campos');
const {validarJWT} = require ('../middleware/validar-jwt')
const { check } = require('express-validator');
const router= Router();
const {validar_jwt} = require ('jsonwebtoken') 

router.post("/",[

    check("email","El email es obligatorio").notEmpty(),
    check("email","El email debe ser unico").custom(helperHolder.validarEmail),
    check("password","la contraseña es obligatoria").notEmpty(),
    check("password","Minimo 8 caracteres").isLength({min:8}),
    check("password", "la contraseña debe ser unica").custom(helperHolder.validarContraseña),
    check("document", "el documento es obligatorio").notEmpty(),
    check("document","El documento ya existe").custom(helperHolder.validarDocument),
    check("ficha","La ficha debe de ser un numero").isNumeric(),
    check("ficha","La ficha ya existe").custom(helperHolder.validarFicha),
    check("name","El nombre es obligatorio").notEmpty(),
    check("rol","El rol es obligatorio").notEmpty(),
    check("phone","El telefono es obligatorio").notEmpty(),
    validarCampos
], postHolders)

router.put("/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
],putHolders)

router.get("/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
], getHolder)

router.get("/", getHolders)

router.put("/activate/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
], putActive)

router.put("/unactivate/:id",[
    validarJWT,
    check("id","El id no es valido").isMongoId(),
    check("id","El id no existe").custom(helperHolder.validarId),
    validarCampos
], putUnactivate)

router.post("/login",[
    check("email","El email es obligatorio").notEmpty(),
    check("password","la contraseña es obligatoria").notEmpty(),
],postLogin)

module.exports=router