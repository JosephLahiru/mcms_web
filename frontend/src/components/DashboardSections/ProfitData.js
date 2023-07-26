import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box } from '@mui/material';
// components
import { useChart } from './chart';

// ----------------------------------------------------------------------

ProfitData.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  data: PropTypes.array.isRequired,
};


export default function ProfitData({ title, subheader, data, ...other }) {
  // check if data is not empty and get the first item in the array
  const firstItem = data && data[0] ? data[0] : {};

  const selling_cost_free_med = firstItem.selling_cost_free_med || "0";
  const actual_cost_free_med = firstItem.actual_cost_free_med || "0";
  const selling_cost_issued_med = firstItem.selling_cost_issued_med || "0";
  const actual_cost_issued_med = firstItem.actual_cost_issued_med || "0";
  const daily_profit = firstItem.daily_profit || "0";

  const chartData = [
    {
      name: 'Profit Data',
      data: [
        parseFloat(selling_cost_free_med),
        parseFloat(actual_cost_free_med),
        parseFloat(selling_cost_issued_med),
        parseFloat(actual_cost_issued_med),
        parseFloat(daily_profit)
      ]
    }
  ];

  const chartOptions = useChart({
  plotOptions: { bar: { columnWidth: '16%' } },
  xaxis: { categories: ['Selling Cost Free Med', 'Actual Cost Free Med', 'Selling Cost Issued Med', 'Actual Cost Issued Med', 'Daily Profit'] },
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: (y, { series, seriesIndex, dataPointIndex, w }) => {
        if (typeof y !== 'undefined') {
          const category = w.globals.labels[dataPointIndex];
          return `${category}: Rs. ${y.toFixed(0)}`;
        }
        return y;
      },
    },
  },
});

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box sx={{ p: 3, pb: 1, width: '100%'}}  dir="ltr">
        <ReactApexChart type="bar" series={chartData} options={chartOptions} height={400} />
      </Box>
    </Card>
  );
}