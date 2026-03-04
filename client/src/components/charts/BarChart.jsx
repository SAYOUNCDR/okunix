import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const BarChart = ({ data = [], filterType = "Day" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const labels = data.map((d) => d.date);
    const visitorsData = data.map((d) => d.Visitors);
    const viewsData = data.map((d) => d.Views);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Visitors",
            data: visitorsData,
            backgroundColor: "#fb923cff",
            borderRadius: 4,
            barPercentage: 0.8,
            categoryPercentage: 0.6,
          },
          {
            label: "Views",
            data: viewsData,
            backgroundColor: "#ea580cff",
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
              color: "#6b7280",
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
            callbacks: {
              title: (context) => {
                const index = context[0].dataIndex;
                const item = data[index];
                if (
                  (filterType === "Hour" || filterType === "Month") &&
                  item.fullDate
                ) {
                  return item.fullDate;
                }
                return context[0].label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 11,
              },
            },
          },
          y: {
            grid: {
              color: "#e2e8f0",
              drawBorder: false,
            },
            ticks: {
              color: "#9ca3af",
              font: {
                size: 11,
              },
              stepSize: 5,
            },
            beginAtZero: true,
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
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default BarChart;
