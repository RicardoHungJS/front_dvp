import { useEffect, useState } from 'react'
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

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Users Data',
    },
  },
};

function ChartComponent({ users }: any) {

  const [data, setData] = useState<any>(
    {
      labels: [],
      datasets: [
        {
          label: 'Followers',
          data: [],
          backgroundColor: '#3730a3',
        },
      ],
    }
  );

  useEffect(() => {
    if (users) {
      setData({
        labels: users.labels,
        datasets: [
          {
            label: 'Followers',
            data: users.data,
            backgroundColor: '#3730a3',
          },
        ],
      })
    }
  }, [users]);

  return (
    <div className='col-span-2 col-start-3 row-start-2 w-full h-full px-4'>
      {data?.labels?.length !== 0 ? <Bar options={options} data={data} />
        : <p className='w-full h-full bg-[#3730a3] flex justify-center items-center text-center text-3xl font-bold text-white'>
          No hay data para mostrar
        </p>}
    </div>
  )
}

export default ChartComponent