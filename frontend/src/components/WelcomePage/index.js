import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
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
  const [state, setState] = useState({
    data: null,
    isLoading: true,
  });

  const [totalProfit, setTotalProfit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `https://mcms_api.mtron.me/get_profit/${date}`,
      );
      const data = await result.json();
      setState({
        data,
        isLoading: false,
      });
    };
    const fetchProfit = async () => {
      const result = await fetch(
        `https://mcms_api.mtron.me/get_monthly_profit/${date}`,
      );
      const pofitData = await result.json();
      const totalProfit = pofitData[0].total_profit;
      setTotalProfit(totalProfit);
    };
    fetchProfit();
    fetchData();
  }, []);

  if (state.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer maxWidth="lg" style={{ marginBottom: '10px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Weekly Sales" total={250} icon={ShoppingCartIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Weekly Appoinments" total={100} color="info" icon={EventNoteIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Total Medicine Sold" total={1200} color="warning" icon={HealthAndSafetyIcon} />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary title="Profit of the Month (Rs.)" total={totalProfit} color="error" icon={AttachMoneyIcon} />
        </Grid>
        <Grid item xs={12} md={12} lg={12}> 
          <ProfitData
            title="Financial Revenue Data"
            subheader={date}
            data={state.data}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default React.memo(WelcomePage);