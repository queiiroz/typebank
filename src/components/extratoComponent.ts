import Conta from "../types/Conta.js";
import { TipoData } from "../types/formatoData.js";
import { formatarData, formatarMoeda } from "../utils/formatadores.js";
import { GrupoTransacao } from "../types/GrupoTransacao.js";

const elementoRegistroTransacoesExtrato = document.querySelector(
  ".extrato .registro-transacoes"
) as HTMLElement;

renderizarExtrato();

function renderizarExtrato(): void {
  const gruposTransacoes: GrupoTransacao[] = Conta.getGruposTransacoes();
  elementoRegistroTransacoesExtrato.innerHTML = "";
  let htmlRegistroTransacoes: string = "";

  for (let grupoTransacoes of gruposTransacoes) {
    let htmlTransacaoItem: string = "";
    for (let transacao of grupoTransacoes.transacoes) {
      htmlTransacaoItem += `
            <div class="transacao-item">
                <div class="transacao-info">
                    <span class="tipo">${transacao.tipoTransacao}</span>
                    <strong class="valor">${formatarMoeda(
                      transacao.valor
                    )}</strong>
            </div>
            <time class="data">${formatarData(
              transacao.data,
              TipoData.DIA_MES
            )}</time>
        </div>
        `;
    }

    htmlRegistroTransacoes += `
        <div class="transacoes-group">
            <strong class="mes-group">${grupoTransacoes.label}</strong>
            ${htmlTransacaoItem}
        </div>
    `;
  }
  if (htmlRegistroTransacoes === "") {
    htmlRegistroTransacoes = "<div> Não há transações registradas.</div>";
  }

  elementoRegistroTransacoesExtrato.innerHTML = htmlRegistroTransacoes;
}

const ExtratoComponent = {
  atualizar(): void {
    renderizarExtrato();
  },
};

export default ExtratoComponent;
