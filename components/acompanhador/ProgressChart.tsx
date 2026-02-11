
'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProgressChartProps {
    data: any[];
    startWeight: number;
    goalWeight: number;
}

export default function ProgressChart({ data, startWeight, goalWeight }: ProgressChartProps) {
    // Processar dados para o gráfico
    const chartData = data.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        // weight: Number(item.peso_atual),
        weight: item.peso_atual, // Assumindo que já vem numérico ou string válida
    }));

    // Placeholder data se não tiver histórico
    if (chartData.length === 0) {
        chartData.push({ date: 'Início', weight: startWeight });
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis
                    dataKey="date"
                    tickFormatter={(value) => value}
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    domain={['dataMin - 5', 'dataMax + 5']}
                    stroke="#9ca3af"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}kg`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    labelStyle={{ color: '#6b7280', marginBottom: '4px' }}
                    formatter={(value: any) => [`${value} kg`, 'Peso']}
                />
                <Area
                    type="monotone"
                    dataKey="weight"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorWeight)"
                    strokeWidth={3}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
