import { useEffect, useState } from "react";
import { getPlainErrorText } from "@/redux/utils/errors";

// Yup Validator
import * as yup from "yup";

// Formik Setup
import { useFormik } from "formik";

// Material Components
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

// Redux
import { useSignInMutation } from "@/redux/services/appApi";
import { Role } from "@/models/User";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/userSlice";

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Password should be of minimum 3 characters length")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password should be of minimum 3 characters length")
    .required("Password is required"),
});

function SignInPage() {
  const dispatch = useAppDispatch();

  const [errorStackBarOpen, setErrorStackBarOpen] = useState(false);

  const [handleSignIn, { isLoading, isError, error, isSuccess, data }] =
    useSignInMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ username, password }) => {
      handleSignIn({
        username,
        password,
        role: Role.guess,
        balance: 0,
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
    } else if (isError) {
      setErrorStackBarOpen(true);
    }
  }, [isError, isSuccess, data, dispatch]);

  return (
    <Grid
      container
      marginTop={12}
      spacing={1}
      component="div"
      justifyContent="center"
      alignItems="center"
    >
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorStackBarOpen}
        autoHideDuration={6000}
        onClose={() => setErrorStackBarOpen(false)}
      >
        <Alert
          onClose={() => setErrorStackBarOpen(false)}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {getPlainErrorText(error)}
        </Alert>
      </Snackbar>

      <Grid item md={4}>
        <Card>
          <CardHeader title="Sign In"></CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Grid item container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
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
                <Button
                  disabled={isLoading}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  {isLoading ? <CircularProgress /> : <>Submit</>}
                </Button>
              </Box>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default SignInPage;
