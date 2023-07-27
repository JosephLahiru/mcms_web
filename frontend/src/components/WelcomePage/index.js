import React, { useState, useEffect } from "react";
import { Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/system";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProfitData from "../DashboardSections/ProfitData";
import AppWidgetSummary from "../DashboardSections/AppWidgetSummary";

function formatDate(date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

const today = new Date();
const date = formatDate(today);

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(10),
}));

function WelcomePage() {
  const [dailyProfit, setDailyProfit] = useState(null);
  const [weeklyProfit, setWeeklyProfit] = useState(null);
  const [monthlyProfit, setMonthlyProfit] = useState(null);
  const [weeklySales, setWeeklySales] = useState(null);
  const [weeklyAppointments, setWeeklyAppointments] = useState(null);
  const [totalMedicineSold, setTotalMedicineSold] = useState(null);
  const [profitType, setProfitType] = useState('daily');

  useEffect(() => {
    const fetchDailyProfit = async () => {
      const result = await fetch(`https://mcms_api.mtron.me/get_profit/${date}`);
      const data = await result.json();
      setDailyProfit(data);
    };

    const fetchWeeklyProfit = async () => {
      const result = await fetch(`https://mcms_api.mtron.me/get_weekly_profit/${date}`);
      const data = await result.json();
      setWeeklyProfit(data);
    };

    const fetchMonthlyProfit = async () => {
      const result = await fetch(`https://mcms_api.mtron.me/get_monthly_profit/${date}`);
      const data = await result.json();
      setMonthlyProfit(data);
    };

    const fetchWeeklySales = async () => {
      const result = await fetch(`https://mcms_api.mtron.me/get_total_sales_last_week`);
      const data = await result.json();
      const sales = data[0].previous_week_bill_count;
      setWeeklySales(sales);
    };

    const fetchWeeklyAppointments = async () => {
      const result = await fetch(`https://mcms_api.mtron.me/get_lastweek_app`);
      const data = await result.json();
      const appointments = data[0].appointment_count;
      setWeeklyAppointments(appointments);
    };

    const fetchTotalMedicineSold = async () => {
      const result = await fetch(`https://mcms_api.mtron.me/get_total_sold_drug_quantity`);
      const data = await result.json();
      const total = data[0].total_drug_quantity;
      setTotalMedicineSold(total);
    };

    fetchWeeklySales();
    fetchWeeklyAppointments();
    fetchTotalMedicineSold();
    fetchDailyProfit();
    fetchWeeklyProfit();
    fetchMonthlyProfit();
  }, []);

  if (!dailyProfit || !weeklyProfit || !monthlyProfit) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer maxWidth="lg" style={{ marginBottom: '10px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Weekly Sales" total={weeklySales} icon={ShoppingCartIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Weekly Appointments" total={weeklyAppointments} color="secondary" icon={EventNoteIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Total Medicine Sold" total={totalMedicineSold} color="warning" icon={HealthAndSafetyIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Total Profit" total={monthlyProfit[0].total_profit} color="success" icon={AttachMoneyIcon} />
        </Grid>

        <Grid item xs={12} md={12} lg={12}> 
          {profitType === 'daily' && 
            <ProfitData
              title="Daily Profit Data"
              subheader={date}
              data={dailyProfit}
            />
          }
          {profitType === 'weekly' && 
            <ProfitData
              title="Weekly Profit Data"
              subheader={date}
              data={weeklyProfit}
            />
          }
          {profitType === 'monthly' && 
            <ProfitData
              title="Monthly Profit Data"
              subheader={date}
              data={monthlyProfit}
            />
          }
        </Grid>
        <Grid item xs={12} md={12} lg={12} sx={{ textAlign: "center" }}> 
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setProfitType('daily')}>Daily Profit</Button>
          <Button variant="outlined" sx={{ mr: 1 }} onClick={() => setProfitType('weekly')}>Weekly Profit</Button>
          <Button variant="outlined" onClick={() => setProfitType('monthly')}>Monthly Profit</Button>
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default React.memo(WelcomePage);