import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatBRL } from "../../lib/format";
import type { CategorySpending } from "../../services/dashboardService";

const COLORS = [
  "#0B5E43", "#D9B25A", "#2E7D8C", "#C0683E",
  "#7A5CA3", "#1FA971", "#B5495E", "#5C6B63",
];

export default function SpendingDonut({ data }: { data: CategorySpending[] }) {
  if (data.length === 0) {
    return <p className="text-ink-500 text-sm">Sem gastos no período.</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="categoryName"
          innerRadius={62}
          outerRadius={100}
          paddingAngle={2}
          stroke="none"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
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
        <Legend
          iconType="circle"
          wrapperStyle={{ fontSize: 13, color: "#2E3A33" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}