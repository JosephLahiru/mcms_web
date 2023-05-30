import React from "react";
import { Typography, Container, Grid, Paper, Avatar } from "@mui/material";
import { styled } from "@mui/system";
import devteam from "./../../images/dev-team.jpg";

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
}));

const ContentContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const AvatarImage = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(2),
}));

function WelcomePage() {
  return (
    <PageContainer maxWidth="md">
      <ContentContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Medical Center Management System
        </Typography>
        <Typography variant="body1" paragraph>
          The Medical Center Management System is a web-based application that
          helps medical centers streamline their operations and manage various
          aspects of their day-to-day tasks efficiently.
        </Typography>
        <Typography variant="body1" paragraph>
          With this system, medical centers can manage patient records,
          appointments, inventory, billing, and more. It provides a user-friendly
          interface and powerful features to enhance the overall management and
          organization of the medical center.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Developer's Message
        </Typography>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <AvatarImage
              alt="Developer Team"
              src={devteam}
            />
          </Grid>
          <Grid item>
            <Typography variant="body1" paragraph>
              We, the developer team of the Medical Center Management System,
              are dedicated to providing a comprehensive and efficient solution
              to medical centers. Our goal is to simplify the management
              processes and improve the overall experience for both medical
              staff and patients. We hope this system will streamline your
              operations and contribute to better patient care.
            </Typography>
            <Typography variant="body1" paragraph>
              Thank you for choosing the Medical Center Management System. If
              you have any questions or need assistance, please feel free to
              reach out to our support team.
            </Typography>
            <Typography variant="body1" paragraph>
              Best regards,
              <br />
              Developer Team
            </Typography>
          </Grid>
        </Grid>
      </ContentContainer>
    </PageContainer>
  );
}

export default WelcomePage;
