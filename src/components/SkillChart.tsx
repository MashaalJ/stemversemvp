import { 
  Chart as ChartJS, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import type { Skill } from '../types';

// Register Chart.js components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillChartProps {
  skills: Skill[];
}

export default function SkillChart({ skills }: SkillChartProps) {
  // Extract data from skills
  const labels = skills.map(skill => skill.name);
  const data = skills.map(skill => skill.progress);
  const backgroundColor = skills.map(skill => `${skill.color}40`); // 40 is hex for 25% opacity
  const borderColor = skills.map(skill => skill.color);
  
  // Chart data
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Skill Mastery',
        data,
        backgroundColor: backgroundColor[0],
        borderColor: borderColor[0],
        borderWidth: 2,
        fill: true,
        pointBackgroundColor: borderColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: borderColor,
        pointRadius: 4,
      },
    ],
  };
  
  // Chart options
  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.2)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
        pointLabels: {
          color: '#6B7280',
          font: {
            size: 12,
            weight: 'bold' as const,
          },
        },
        ticks: {
          backdropColor: 'transparent',
          color: '#9CA3AF',
          showLabelBackdrop: false,
          stepSize: 20,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#F3F4F6',
        bodyColor: '#D1D5DB',
        borderColor: '#4B5563',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}% mastery`;
          }
        }
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };
  
  return (
    <div className="w-full h-64 md:h-72 flex items-center justify-center p-2">
      <Radar data={chartData} options={options} />
    </div>
  );
} 