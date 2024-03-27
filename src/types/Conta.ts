import { JsxEmit } from "../../node_modules/typescript/lib/typescript.js";
import { formaterParse } from "../utils/formatadores.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo = formaterParse<number>("saldo") || 0;

const transacoes = formaterParse<Transacao[]>("transacoes") || [];

function debitar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que zero");
  }
  if (valor > saldo) {
    throw new Error("Saldo insuficiente");
  }
  saldo -= valor;
  localStorage.setItem("saldo", saldo.toString())
}

function depositar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser depositado deve ser maior que zero");
  }
  saldo += valor;
  localStorage.setItem("saldo", saldo.toString())
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso(): Date {
    return new Date();
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      debitar(novaTransacao.valor);
    } else {
      throw new Error("Tipo de Transação é inválido!");
    }
    transacoes.push(novaTransacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
    console.log(transacoes);
  },
};

export default Conta;