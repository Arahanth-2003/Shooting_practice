import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function AccuracyBarGraph({ accuracyData }) {
  const data = {
    labels: ['Easy', 'Medium', 'Hard', 'Extreme'],
    datasets: [
      {
        label: 'Accuracy',
        data: accuracyData,
        backgroundColor: ['#4caf50', '#ff9800', '#f44336', '#9c27b0'],
        borderColor: ['#388e3c', '#f57c00', '#d32f2f', '#7b1fa2'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Accuracy by Difficulty',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
}
