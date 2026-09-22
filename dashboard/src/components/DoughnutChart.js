import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const OPTIONS = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 10,
                boxHeight: 10,
                padding: 8,
                font: { size: 10, family: "'Inter', sans-serif" },
                color: '#64748b',
            },
        },
        tooltip: {
            bodyFont: { size: 11, family: "'Inter', sans-serif" },
            titleFont: { size: 11, family: "'Inter', sans-serif" },
        },
    },
    cutout: '60%',
};

export function DoughnutChart({ data }) {
    return (
        <div style={{
            padding: '12px 16px',
            borderTop: '1px solid #f1f5f9',
            background: '#fff',
        }}>
            <p style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                color: '#94a3b8',
                margin: '0 0 8px 0',
            }}>
                Allocation
            </p>
            <div style={{ height: '160px', position: 'relative' }}>
                <Doughnut data={data} options={OPTIONS} />
            </div>
        </div>
    );
}
