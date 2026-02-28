"use client";

import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    ChartData,
    ChartOptions
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function LeadPriceChart() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
    }, []);

    const gridColor = isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    const textColor = isDarkMode ? '#9ca3af' : '#6b7280';

    const data: ChartData<"line"> = {
        labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [
            {
                label: 'Lead Budget',
                data: [2400, 2450, 2500, 2600, 2550, 2600],
                borderColor: '#D9F856',
                backgroundColor: 'rgba(217, 248, 86, 0.1)',
                borderWidth: 4,
                pointBackgroundColor: '#D9F856',
                pointBorderColor: isDarkMode ? '#1A1A1A' : '#FFFFFF',
                pointBorderWidth: 3,
                pointRadius: 6,
                fill: true,
                tension: 0.4
            },
            {
                label: 'Market Average',
                data: [2200, 2300, 2350, 2400, 2380, 2450],
                borderColor: '#9ca3af',
                borderWidth: 2,
                borderDash: [8, 8],
                pointRadius: 0,
                fill: false,
                tension: 0.4
            }
        ]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#000',
                titleColor: '#fff',
                bodyColor: '#D9F856',
                cornerRadius: 12,
                padding: 12,
                usePointStyle: true,
                boxPadding: 6,
                titleFont: { family: 'Plus Jakarta Sans', weight: 'bold' },
                bodyFont: { family: 'Plus Jakarta Sans' }
            }
        },
        scales: {
            y: {
                grid: { color: gridColor },
                ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10, weight: 'bold' } },
                border: { display: false }
            },
            x: {
                grid: { display: false },
                ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', size: 10, weight: 'bold' } },
                border: { display: false }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return (
        <div className="w-full h-full relative">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-2xl hidden md:block z-10 border border-gray-800 uppercase tracking-widest scale-110">
                <div className="opacity-50 mb-0.5">August 2025</div>
                <div className="text-primary text-sm tracking-normal">$2,650 / m²</div>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 translate-y-px w-3 h-3 bg-black rotate-45 border-b border-r border-gray-800"></div>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}
