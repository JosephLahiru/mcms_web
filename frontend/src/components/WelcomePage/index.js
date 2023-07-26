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
          <AppWidgetSummary title="Weekly Sales" total={250} icon={ShoppingCartIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Weekly Appointments" total={100} color="secondary" icon={EventNoteIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Total Medicine Sold" total={1200} color="warning" icon={HealthAndSafetyIcon} />
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