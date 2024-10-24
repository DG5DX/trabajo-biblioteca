const { Router } = require("express")
const { postEntry, getlistarPorHolder, getListarPorDia, getListarPorFechas, putEntradaSalida } = require("../controllers/Entrys")
const { helperEntry } = require('../helpers/entrys')
const { validarCampos } = require('../middleware/validarCampos.js');
const { check } = require('express-validator');
const router = Router()

router.post("/", [
    check("laptop", "El campo laptop es obligatorio").notEmpty(),
    check("type", "El tipo es obligatorio").notEmpty(),
    check("entrytime", "La hora de entrada es obligatoria").notEmpty(),
    check("checkout", "La hora de salida es obligatoria").notEmpty(),
    check("type", "El tipo debe de ser un numero").isNumeric(),
    validarCampos
], postEntry)

router.get("/holder/:id", [
    check("id", "El id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperEntry.validarIdHolder),
    validarCampos
], getlistarPorHolder)

router.get("/:dia", [
    check("dia", "La fecha no es valida").isDate(),
    check("dia", "La fecha no existe").custom(helperEntry.validarDia),
    validarCampos
], getListarPorDia)

router.get("/fechas/:fechaInicio/:fechaFinal", [
    check("fechaInicio", "La fecha no es valida").isDate(),
    check("fechaFinal", "La fecha no es valida").isDate(),
    check("fechaInicio", "La fecha no existe").custom(helperEntry.validarFechas),
    check("fechaFinal", "La fecha no existe").custom(helperEntry.validarFechas),
    validarCampos
], getListarPorFechas)

router.put("/:salida?", [
    check("salida", "debe ingresar 1 si es entrada o 0 si es salida").notEmpty(),
    check("id", "El id no es valido").isMongoId(),
    check("id", "El id no existe").custom(helperEntry.putValidarIdHolder),
    validarCampos
], putEntradaSalida)

module.exports = router