import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

// Redux
import { useAppSelector } from "@/redux/hook";

function DashboardPage() {
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <Box>
      <Typography
        variant="h4"
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        Welcome to the dashboard: {user ? user?.username : ""}
      </Typography>
      <br />

      <Typography
        variant="h6"
        component="div"
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
      >
        Code challenge, please read the instructions here:
      </Typography>
      <a
        href="https://github.com/Wainercrb/LP-Code-Challenge-Backend"
        target="_blank"
      >
        Backend Code
      </a>
      <br />
      <a
        href="https://github.com/Wainercrb/LP-Code-Challenge-Frontend"
        target="_blank"
      >
        Fronted Code
      </a>
    </Box>
  );
}

export default DashboardPage;
