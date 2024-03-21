"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatarData = exports.formatarMoeda = void 0;
const formatoData_js_1 = require("../types/formatoData.js");
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-br", {
        style: "currency",
        currency: "BRL",
    });
}
exports.formatarMoeda = formatarMoeda;
function formatarData(data, formato = formatoData_js_1.TipoData.PADRAO) {
    if (formato === formatoData_js_1.TipoData.DIA_SEMANA_DIA_MES_ANO) {
        return data.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    else if (formato === formatoData_js_1.TipoData.DIA_MES) {
        return data.toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "2-digit",
        });
    }
    return data.toLocaleDateString("pt-br");
}
exports.formatarData = formatarData;
function formatarInformacoes(valor, data, formatoData) {
    const dataFormatada = formatarData(data, formatoData);
    const valorFormatado = formatarMoeda(valor);
    return `${dataFormatada} - ${valorFormatado}`;
}
