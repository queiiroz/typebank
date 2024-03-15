let saldo: number = 5000;

const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;

const elementoData = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoSaldo != null) {
  elementoSaldo.textContent = formatarMoeda(saldo);
}

if (elementoData != null) {
  const dataAcesso: Date = new Date();
  elementoData.textContent = formatarData(
    dataAcesso,
    TipoData.DIA_SEMANA_DIA_MES_ANO
  );
}
