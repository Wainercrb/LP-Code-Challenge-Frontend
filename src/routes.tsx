import { createBrowserRouter } from "react-router-dom";

// Models
import { User } from "@/models/User";

// Material Icons
import HomeIcon from "@mui/icons-material/Home";
import ListIcon from "@mui/icons-material/List";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CalculateIcon from "@mui/icons-material/Calculate";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// Layouts
import PrivateLayout from "@/layouts/Private";
import PublicLayout from "@/layouts/Public";

// Pages
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import RecordsPage from "@/pages/ListRecord";
import CreateRecord from "@/pages/CreateRecord";
import DashboardPage from "@/pages/Dashboard";
import ProfilePage from "@/pages/Profile";

type UserRole = "admin" | "guess";

export interface AppRouter {
  name: string;
  path: string;
  roles: UserRole[];
  element: JSX.Element;
  icon: JSX.Element;
}

const publicRouterList: AppRouter[] = [
  {
    name: "Sign In",
    path: "/",
    roles: ["guess"],
    icon: <HomeIcon />,
    element: (
      <PublicLayout>
        <SignInPage />
      </PublicLayout>
    ),
  },
   {
    name: "Sign Up",
    path: "/sign-up",
    roles: ["guess"],
    icon: <HomeIcon />,
    element: (
      <PublicLayout>
        <SignUpPage />
      </PublicLayout>
    ),
  },
];

const privateRouterList: AppRouter[] = [
  {
    name: "Dashboard",
    path: "/",
    roles: ["guess"],
    icon: <DashboardIcon />,
    element: (
      <PrivateLayout>
        <DashboardPage />
      </PrivateLayout>
    ),
  },
  {
    name: "Records",
    path: "/records",
    roles: ["guess"],
    icon: <ListIcon />,
    element: (
      <PrivateLayout>
        <RecordsPage />
      </PrivateLayout>
    ),
  },
  {
    name: "Create Record",
    path: "/create-record",
    roles: ["guess"],
    icon: <CalculateIcon />,
    element: (
      <PrivateLayout>
        <CreateRecord />
      </PrivateLayout>
    ),
  },
  {
    name: "Profile",
    path: "/profile",
    roles: ["guess"],
    icon: <AccountCircleIcon />,
    element: (
      <PrivateLayout>
        <ProfilePage />
      </PrivateLayout>
    ),
  },
];

const router = (user?: User) => {
  const routerList = user ? privateRouterList : publicRouterList;
  return createBrowserRouter(
    routerList.map(({ path, element }) => ({ path, element }))
  );
};

export { router, publicRouterList, privateRouterList };
