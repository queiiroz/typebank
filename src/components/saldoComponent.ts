import Conta from "../types/Conta.js";
import { TipoData } from "../types/formatoData.js";
import { formatarData, formatarMoeda } from "../utils/formatadores.js";

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

const elementoData = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoData != null) {
  elementoData.textContent = formatarData(
    Conta.getDataAcesso(),
    TipoData.DIA_SEMANA_DIA_MES_ANO
  );
}

renderizarSaldo();
function renderizarSaldo(): void {
  if (elementoSaldo != null) {
    elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
  }
}

const SaldoComponent = {
  atualizar() {
    renderizarSaldo();
  },
};

export default SaldoComponent;
