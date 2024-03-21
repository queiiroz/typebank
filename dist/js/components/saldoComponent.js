"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atualizarSaldo = exports.getSaldo = void 0;
const formatoData_js_1 = require("../types/formatoData.js");
const formatadores_js_1 = require("../utils/formatadores.js");
let saldo = 5000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoData = document.querySelector(".block-saldo time");
if (elementoData != null) {
    const dataAcesso = new Date();
    elementoData.textContent = (0, formatadores_js_1.formatarData)(dataAcesso, formatoData_js_1.TipoData.DIA_SEMANA_DIA_MES_ANO);
}
function getSaldo() {
    return saldo;
}
exports.getSaldo = getSaldo;
atualizarSaldo(saldo);
function atualizarSaldo(novoSaldo) {
    saldo = novoSaldo;
    if (elementoSaldo != null) {
        elementoSaldo.textContent = (0, formatadores_js_1.formatarMoeda)(saldo);
    }
}
exports.atualizarSaldo = atualizarSaldo;
