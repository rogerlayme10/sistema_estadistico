import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  ArcElement,
} from 'chart.js';

import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);


export const specificChartOptions = {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true
    },
    legend: {
      display: true,  // Asegúrate de que la leyenda esté visible
      position: 'top',  // Puedes cambiar a 'bottom', 'left', o 'right' si prefieres
      labels: {
        font: {
          size: 12
        }
      }
    },
    datalabels: {
      display: true,
      color: 'black',
      align: 'end',  // Puedes cambiar esto a 'center' o 'start' si prefieres
      anchor: 'end',
      offset: -10,  // Ajusta el valor para mover los números hacia abajo si están muy cerca de la leyenda
      font: {
        weight: 'bold',
        size: 14
      },
      formatter: (value, context) => {
        if (context.dataset.label === 'Total') {
          return value;
        }
        return '';
      }
    }
  },
  layout: {
    padding: {
      top: 20,  // Agrega espacio adicional en la parte superior para evitar que la leyenda y los números se superpongan
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        display: true
      }
    }
  }
};





