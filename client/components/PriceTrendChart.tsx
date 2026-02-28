"use client";

import { useEffect, useRef } from "react";
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

export default function PriceTrendChart() {
    const data: ChartData<"line"> = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            label: 'Price Trend',
            data: [1100, 1150, 1080, 1220, 1190, 1250, 1320, 1280, 1300, 1310],
            borderColor: '#60a5fa',
            borderWidth: 3,
            tension: 0.4,
            pointBackgroundColor: '#ffffff',
            pointBorderColor: '#60a5fa',
            pointBorderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 6,
            fill: false
        }]
    };

    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: false
            }
        },
        scales: {
            x: {
                display: false,
                grid: {
                    display: false
                }
            },
            y: {
                display: false,
                grid: {
                    display: false
                },
                min: 1000
            }
        },
        interaction: {
            intersect: false,
            mode: 'index',
        },
    };

    return (
        <div className="w-full h-full relative">
            <div className="absolute left-1/3 top-0 transform -translate-x-1/2 bg-black text-white p-3 rounded-xl z-10 shadow-lg text-center min-w-[100px] pointer-events-none">
                <p className="text-[10px] text-gray-400">August 2025</p>
                <p className="font-bold text-sm">$1320 / m²</p>
                <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-black transform rotate-45"></div>
            </div>
            <Line data={data} options={options} />
        </div>
    );
}
