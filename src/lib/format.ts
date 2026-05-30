const brl = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export function formatBRL(value: number): string {
    return brl.format(value);
}

const MESES = ["jan","fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
export function monthLabel(ym: string): string{
    const [, m] = ym.split("-");
    return MESES[Number(m) - 1] ?? ym;
}