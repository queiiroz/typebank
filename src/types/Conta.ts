import { formaterParse } from "../utils/formatadores.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo = formaterParse<number>("saldo") || 0;

const transacoes =
  formaterParse<Transacao[]>("transacoes", (key, value) => {
    if (key === "data") {
      return new Date(value);
    }
    return value;
  }) || [];

function debitar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que zero");
  }
  if (valor > saldo) {
    throw new Error("Saldo insuficiente");
  }
  saldo -= valor;
  localStorage.setItem("saldo", saldo.toString());
}

function depositar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser depositado deve ser maior que zero");
  }
  saldo += valor;
  localStorage.setItem("saldo", saldo.toString());
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso(): Date {
    return new Date();
  },

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes = structuredClone(transacoes);
    const transacoesOrdenadas = listaTransacoes.sort(
      (t1, t2) => new Date(t2.data).getTime() - new Date(t2.data).getTime()
    );
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = new Date(
        transacao.data
      ).toLocaleDateString("pt-br", { month: "long", year: "numeric" });
      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      gruposTransacoes[gruposTransacoes.length - 1].transacoes.push(transacao);
    }

    return gruposTransacoes;
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
    transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  },
};

export default Conta;
