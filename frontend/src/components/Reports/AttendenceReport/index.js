import { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

function AttendanceReport() {
  const [data, setData] = useState([]);
  const [assistantNames, setAssistantNames] = useState({});
  

  useEffect(() => {
    async function getAttendanceData() {
      try {
        const response = await fetch('https://mcms_api.mtron.me/get_attendance');
        const rawData = await response.json();

        // Group the attendance records by assistant and by month
        const groupedData = rawData.reduce((acc, record) => {
          const date = new Date(record.date);
          const month = date.getMonth();
          const assistant = record.assit_id;

          if (!acc[assistant]) {
            acc[assistant] = {};
          }

          if (!acc[assistant][month]) {
            acc[assistant][month] = [];
          }

          acc[assistant][month].push(record);

          return acc;
        }, {});

        const attendanceData = Object.entries(groupedData).map(([assistant, months]) => {
          const totalAttendance = Object.values(months).reduce((total, records) => 
            total + records.filter((record) => !record.leave).length, 0
          );

          return {
            name: `Assistant ${assistant}`,
            value: totalAttendance,
          };
        });

        
        const totalAttendance = attendanceData.reduce((acc, assistant) => acc + assistant.value, 0); // Added

        
        attendanceData.forEach(assistant => assistant.percentage = ((assistant.value / totalAttendance) * 100).toFixed(2)); // Added

        setData(attendanceData);
      } catch (error) {
        console.error(error);
      }
    }

    getAttendanceData();
  }, []);

  useEffect(() => {
    async function fetchAssistantNames() {
      const ids = data.map(item => item.name.replace('Assistant ', ''));
      const names = {};
      for (const id of ids) {
        const response = await fetch(`https://mcms_api.mtron.me/get_assistants/${id}`);
        const assistant = await response.json();
        names[id] = assistant[0].first_name;
      }
      setAssistantNames(names);
    }  

    if (data.length > 0) {
      fetchAssistantNames();
    }
  }, [data]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const assistantId = payload[0].payload.name.replace('Assistant ', '');
      const assistantName = assistantNames[assistantId];
      return (
        <div className="custom-tooltip" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '5px' }}>
          <p className="label" style={{ marginBottom: '0px' }}>{`Name: ${assistantName}`}</p>
          <p className="intro" style={{ marginTop: '0px' }}>{`Attendance: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x  = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy  + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={30}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ paddingTop: '64px', paddingLeft: '240px' }}>
      <h1 style={{ textAlign: 'center' }}>Attendance Report</h1>
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie dataKey="value" nameKey="name" data={data} cx="50%" cy="50%" outerRadius={200} fill="#8884d8" label={renderCustomizedLabel} labelLine={false} />
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AttendanceReport