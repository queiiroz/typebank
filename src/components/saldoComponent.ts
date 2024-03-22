import { TipoData } from "../types/formatoData.js";
import { formatarData, formatarMoeda } from "../utils/formatadores.js";

let saldo: number = 4000;

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

const elementoData = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoData != null) {
  const dataAcesso: Date = new Date();
  elementoData.textContent = formatarData(
    dataAcesso,
    TipoData.DIA_SEMANA_DIA_MES_ANO
  );
}

export function getSaldo(): number {
  return saldo;
}

atualizarSaldo(saldo);

export function atualizarSaldo(novoSaldo: number): void {
  saldo = novoSaldo;
  if (elementoSaldo != null) {
    elementoSaldo.textContent = formatarMoeda(saldo);
  }
}
