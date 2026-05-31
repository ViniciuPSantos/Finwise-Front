import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { formatBRL } from "../../lib/format";

type Point = { mes: string; receitas: number; despesas: number };

export default function EvolutionChart({ data }: { data: Point[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 4" stroke="#E2E0D4" vertical={false} />
        <XAxis
          dataKey="mes"
          stroke="#7E8C83"
          tickLine={false}
          axisLine={{ stroke: "#E2E0D4" }}
          tick={{ fontFamily: "'Space Mono', monospace", fontSize: 11 }}
        />
        <YAxis
          stroke="#7E8C83"
          width={80}
          tickLine={false}
          axisLine={false}
          tick={{ fontFamily: "'Space Mono', monospace", fontSize: 11 }}
          tickFormatter={(v) => formatBRL(v)}
        />
        <Tooltip
          formatter={(value) => formatBRL(Number(value))}
          contentStyle={{
            background: "#FFFFFF",
            border: "1px solid #E2E0D4",
            borderRadius: 10,
            boxShadow: "0 4px 16px rgba(20,32,27,0.07)",
          }}
          labelStyle={{ color: "#14201B" }}
        />
        <Area type="monotone" dataKey="receitas" stroke="#1FA971" fill="#1FA971" fillOpacity={0.14} strokeWidth={2.5} />
        <Area type="monotone" dataKey="despesas" stroke="#D9543D" fill="#D9543D" fillOpacity={0.12} strokeWidth={2.5} />
      </AreaChart>
    </ResponsiveContainer>
  );
}