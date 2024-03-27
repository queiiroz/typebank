import { TipoData } from "../types/formatoData.js";

export function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
export function formatarData(
  data: Date,
  formato: TipoData = TipoData.PADRAO
): string {
  if (formato === TipoData.DIA_SEMANA_DIA_MES_ANO) {
    return data.toLocaleDateString("pt-br", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } else if (formato === TipoData.DIA_MES) {
    return data.toLocaleDateString("pt-br", {
      day: "2-digit",
      month: "2-digit",
    });
  }
  return data.toLocaleDateString("pt-br");
}

function formatarInformacoes(
  valor: number,
  data: Date,
  formatoData: TipoData.DIA_MES
): string {
  const dataFormatada = formatarData(data, formatoData);
  const valorFormatado = formatarMoeda(valor);
  return `${dataFormatada} - ${valorFormatado}`;
}

export function formaterParse<T>(key: string, callback?:(key:string, value:string) => any): T | null {
  try {
    const item = localStorage.getItem(key);
    if (item == null) {
      return null
    }
    return JSON.parse(item, callback) as T;
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Erro desconhecido");
    } return null
  }
}
