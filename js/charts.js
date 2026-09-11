let revenueChart;

function buildRevenueChart(range = 30) {
  const canvas = document.getElementById("revenueChart");

  if (!canvas) return;

  const dataset = revenueData[range];

  let labels;

  if (range === 7) {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  } else if (range === 30) {
    labels = Array.from(
      { length: dataset.current.length },
      (_, index) => `${index + 1}`
    );
  } else {
    labels = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
  }

  if (revenueChart) {
    revenueChart.destroy();
  }

  revenueChart = new Chart(canvas, {
    type: "line",

    data: {
      labels,

      datasets: [
        {
          label: "Current",
          data: dataset.current,
          borderColor: "#111111",
          backgroundColor: "rgba(17, 17, 17, 0.08)",
          borderWidth: 2,
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true
        },
        {
          label: "Previous",
          data: dataset.previous,
          borderColor: "#b8b8b8",
          borderWidth: 1.5,
          borderDash: [6, 6],
          tension: 0.35,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: false
        }
      ]
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      interaction: {
        mode: "index",
        intersect: false
      },

      plugins: {
        legend: {
          display: false
        },

        tooltip: {
          backgroundColor: "#111111",
          titleColor: "#ffffff",
          bodyColor: "#ffffff",
          padding: 12,
          displayColors: false,

          callbacks: {
            label(context) {
              return `€${Number(
                context.raw
              ).toLocaleString()}`;
            }
          }
        }
      },

      scales: {
        x: {
          grid: {
            display: false
          },

          border: {
            display: false
          },

          ticks: {
            color: "#999999",
            maxTicksLimit: range === 30 ? 6 : 12,
            font: {
              size: 10
            }
          }
        },

        y: {
          beginAtZero: false,

          grid: {
            color: "rgba(0,0,0,0.06)"
          },

          border: {
            display: false
          },

          ticks: {
            color: "#999999",

            font: {
              size: 10
            },

            callback(value) {
              if (range === 90) {
                return `€${Math.round(value / 1000)}k`;
              }

              return `€${value}`;
            }
          }
        }
      }
    }
  });
}

function updateRevenueChart(range) {
  buildRevenueChart(Number(range));
}
