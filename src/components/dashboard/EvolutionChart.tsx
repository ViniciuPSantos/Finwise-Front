import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatBRL } from "../../lib/format";

type Point = { mes: string; receitas: number; despesas: number };

export default function EvolutionChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#242840" />
        <XAxis dataKey="mes" stroke="#A0AEC0" />
        <YAxis stroke="#A0AEC0" width={80} tickFormatter={(v) => formatBRL(v)} />
        <Tooltip
          formatter={(value) => formatBRL(Number(value))}
          contentStyle={{ background: "#1A1D2E", border: "none", borderRadius: 8 }}
        />
        <Area type="monotone" dataKey="receitas" stroke="#4ADE80" fill="#4ADE80" fillOpacity={0.2} />
        <Area type="monotone" dataKey="despesas" stroke="#F87171" fill="#F87171" fillOpacity={0.2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}