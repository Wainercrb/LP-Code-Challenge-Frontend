import Typography from "@mui/material/Typography";

function DashboardPage() {
  return (
    <Typography
      variant="h6"
      component="div"
      sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
    >
      Welcome to the dashboard
    </Typography>
  );
}

export default DashboardPage;
