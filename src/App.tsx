import { RouterProvider } from "react-router-dom";
import { router } from "@/routes";

// Redux
import { useVerifyUserQuery } from "@/redux/services/appApi";
import { useAppSelector } from "@/redux/hook";

// Material UI
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

function App() {

  const { isFetching } = useVerifyUserQuery(null, {});
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <>
      {isFetching ? (
        <Stack
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
          minWidth="100vw"
        >
          <CircularProgress />
        </Stack>
      ) : (
        <RouterProvider router={router(user)} />
      )}
    </>
  );
}

export default App;
