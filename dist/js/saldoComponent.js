"use strict";
let saldo = 5000;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoData = document.querySelector(".block-saldo time");
if (elementoSaldo != null) {
    elementoSaldo.textContent = formatarMoeda(saldo);
}
if (elementoData != null) {
    const dataAcesso = new Date();
    elementoData.textContent = formatarData(dataAcesso, TipoData.DIA_SEMANA_DIA_MES_ANO);
}
