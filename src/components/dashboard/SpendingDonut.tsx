import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { formatBRL } from "../../lib/format";
import type { CategorySpending } from "../../services/dashboardService";

const COLORS = ["#6C63FF", "#F87171", "#4ADE80", "#FBBF24", "#A0AEC0", "#818CF8"];

export default function SpendingDonut({ data }: { data: CategorySpending[] }) {
  if (data.length === 0) {
    return <p className="text-text-secondary text-sm">Sem gastos no período.</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="categoryName"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => formatBRL(Number(value))}
          contentStyle={{ background: "#1A1D2E", border: "none", borderRadius: 8 }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}