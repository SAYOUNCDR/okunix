import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Feb 8",
          "Feb 9",
          "Feb 10",
          "Feb 11",
          "Feb 12",
          "Feb 13",
          "Feb 14",
        ],
        datasets: [
          {
            label: "Visitors",
            data: [16, 9, 8, 4, 1, 0, 0],
            backgroundColor: "#fb923cff", // orange-400 (light)
            borderRadius: 4,
            barPercentage: 0.8,
            categoryPercentage: 0.6,
          },
          {
            label: "Views",
            data: [27, 28, 1, 6, 2, 0, 0],
            backgroundColor: "#ea580cff", // orange-600 (dark)
            borderRadius: 4,
            barPercentage: 0.8,
            categoryPercentage: 0.6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            align: "center",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              padding: 20,
              font: {
                size: 12,
                family: "'Geist', sans-serif",
              },
              color: "#6b7280", // gray-500
            },
          },
          tooltip: {
            backgroundColor: "#1f2937",
            padding: 12,
            titleFont: {
              size: 13,
            },
            bodyFont: {
              size: 13,
            },
            cornerRadius: 8,
            displayColors: true,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af", // gray-400
              font: {
                size: 11,
              },
            },
          },
          y: {
            grid: {
              color: "#e2e8f0", // slate-200
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af", // gray-400
              font: {
                size: 11,
              },
              stepSize: 5,
            },
            beginAtZero: true,
            max: 45, // Match image roughly
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <canvas ref={chartRef} />;
};

export default BarChart;
