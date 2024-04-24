import { useEffect, useState } from "react";
import { getPlainErrorText } from "@/redux/utils/errors";
import { buildPagination } from "@/utils/pagination";

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
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Alert from "@mui/material/Alert";

// Redux
import {
  useCrateRecordMutation,
  useGetOperationsQuery,
} from "@/redux/services/appApi";

const validationSchema = yup.object({
  operation: yup.number().required("Operation is required"),
  valueA: yup
    .number()
    .min(0, "Value A should be of minimum 1 characters length")
    .required("Value A is required"),
  valueB: yup
    .number()
    .min(0, "Value B should be of minimum 1 characters length")
    .required("Value B is required"),
});

function CreateRecordPage() {
  const [errorStackBarOpen, setErrorStackBarOpen] = useState(false);
  const [successStackBarOpen, setSuccessStackBarOpen] = useState(false);

  const { isFetching, data: operations } = useGetOperationsQuery(
    buildPagination({
      page: 0,
      size: 50,
    })
  );

  const [handleCreateRecord, { isLoading, error, isSuccess, isError }] =
    useCrateRecordMutation();

  const formik = useFormik({
    initialValues: {
      valueA: 0,
      valueB: 0,
      operation: "",
    },
    validationSchema: validationSchema,
    onSubmit: ({ valueA, valueB, operation }) => {
      handleCreateRecord({
        operation_id: Number(operation),
        operationPayload: {
          valueA,
          valueB,
        },
      });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setSuccessStackBarOpen(true)
      formik.resetForm();
    } else if (isError) {
      setErrorStackBarOpen(true);
    }
  }, [isSuccess, formik, isError]);

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

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={successStackBarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessStackBarOpen(false)}
      >
        <Alert
          onClose={() => setSuccessStackBarOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          Record created successfully!
        </Alert>
      </Snackbar>

      <Grid item md={6}>
        <Card>
          <CardHeader title="Create Record"></CardHeader>
          <form onSubmit={formik.handleSubmit}>
            <CardContent>
              <Grid item container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                    error={
                      formik.touched.operation &&
                      Boolean(formik.errors.operation)
                    }
                  >
                    <InputLabel id="demo-simple-select-error-label">
                      Operation
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-error-label"
                      id="demo-simple-select-error"
                      label="Operation"
                      value={formik.values.operation}
                      onChange={(e) =>
                        formik.setFieldValue("operation", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {operations?.rows.map(({ type, cost, id }) => {
                        return (
                          <MenuItem value={id} key={id}>
                            {type} - {cost}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {formik.touched.operation &&
                      Boolean(formik.errors.operation) && (
                        <FormHelperText>
                          {formik.errors.operation}
                        </FormHelperText>
                      )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="valueA"
                    name="valueA"
                    label="Value A"
                    type="number"
                    value={formik.values.valueA}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.valueA && Boolean(formik.errors.valueA)
                    }
                    helperText={formik.touched.valueA && formik.errors.valueA}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="valueB"
                    name="valueB"
                    label="Value B"
                    type="number"
                    value={formik.values.valueB}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.valueB && Boolean(formik.errors.valueB)
                    }
                    helperText={formik.touched.valueB && formik.errors.valueB}
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
                  {isLoading || isFetching ? <CircularProgress color="inherit" /> : <>Submit</>}
                </Button>
              </Box>
            </CardActions>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default CreateRecordPage;
