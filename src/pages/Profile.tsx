import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";

// Redux
import { useGetProfileQuery } from "@/redux/services/appApi";

function ProfilePage() {
  const { isFetching, data } = useGetProfileQuery(undefined);

  return (
    <Grid
      container
      marginTop={12}
      spacing={1}
      component="div"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item md={5}>
        <Card>
          <CardHeader title="Profile"></CardHeader>
          <form>
            <CardContent>
              <Grid item container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <InputLabel htmlFor="username">Username</InputLabel>
                  <TextField
                    disabled
                    fullWidth
                    id="username"
                    name="username"
                    value={data?.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="role">Role</InputLabel>
                  <TextField
                    disabled
                    fullWidth
                    id="role"
                    name="role"
                    defaultValue=""
                    value={data?.role}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="balance">Balance</InputLabel>
                  <TextField
                    disabled
                    fullWidth
                    id="balance"
                    name="balance"
                    value={data?.balance}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Box
                sx={{
                  paddingX: 1,
                  paddingY: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isFetching && <CircularProgress />}
              </Box>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default ProfilePage;
