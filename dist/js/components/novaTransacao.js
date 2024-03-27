import Conta from "../types/Conta.js";
import SaldoComponent from "./saldoComponent.js";
import ExtratoComponent from "./extratoComponent.js";
const elementoFormulario = document.querySelector(".block-nova-transacao form");
elementoFormulario.addEventListener("submit", function (e) {
    try {
        e.preventDefault();
        if (!elementoFormulario.checkValidity()) {
            alert("Por favor, preencha todos o campos da transação");
            return;
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
        const inputValor = elementoFormulario.querySelector("#valor");
        const inputData = elementoFormulario.querySelector("#data");
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + " 00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        Conta.registrarTransacao(novaTransacao);
        SaldoComponent.atualizar();
        ExtratoComponent.atualizar();
        elementoFormulario.reset();
    }
    catch (err) {
        if (err instanceof Error) {
            alert(`Erro no novaTransacao: ${err.message}`);
        }
        else {
            alert("Erro desconhecido");
        }
    }
});
