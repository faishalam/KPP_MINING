import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import LoadingSkeletonChartPie from '../loading/LoadingSkeletonChartPie';

type StatusRealisasiPieChartProps = {
    waitingTotal: number | undefined;
    approvedTotal: number | undefined;
    loading: boolean
}

export default function ChartStatusApproval({ waitingTotal, approvedTotal, loading }: StatusRealisasiPieChartProps) {
    const data = [
        { name: 'Approved', value: approvedTotal, color: '#44855d' }, // Hijau untuk worked
        { name: 'Waiting', value: waitingTotal, color: '#d3e3d9' }, // Abu-abu untuk hold
    ];

    return (
        <>
            {loading ? (
                <LoadingSkeletonChartPie />
            ) : (
                <div className='w-full bg-white rounded-md shadow p-5'>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}

        </>

    );
}
