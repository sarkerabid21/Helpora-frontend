import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";

import SignIn from "../pages/SignIn/SignIn";
import VolunteerDetails from "../pages/VolunteerDetails.jsx/VolunteerDetails";
import PrivateRoute from "../routes/PrivateRoute";
import ApplyVolunteer from "../pages/Shared/ApplyVolunteer";
import AllVolNeeds from "../pages/Home/AllVolNeeds";
import Register from "../pages/Register/register";
import MyRequestPage from "../pages/MyRequestPage/MyRequestPage";
import AddNeeds from "../pages/Home/AddNeeds";
import MyPosts from "../pages/MyPosts/MyPosts";
import UpdatePost from "../pages/Shared/UpdatePost";
import Error from "../pages/Shared/Error";


const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
        {
            index: true,
            Component: Home
        },
        {
            path: '/volunteer/:id',
            Component: VolunteerDetails,
            loader: ({params}) => fetch(`https://volunteer-server-blush.vercel.appvolunteer/${params.id}`)
        },
        
        {
          path: '/allNeeds',
          loader: async () => {
           const res = await fetch('https://volunteer-server-blush.vercel.appvolunteer');
            return res.json();
},
          element: <PrivateRoute>
            <AllVolNeeds></AllVolNeeds>
          </PrivateRoute>
        },

        {
          path: '/applyVolunteer/:id',
          element: <PrivateRoute>
            <ApplyVolunteer></ApplyVolunteer>
          </PrivateRoute>
        },
        {
            path: '/myRequests',
            element: <PrivateRoute>
              <MyRequestPage></MyRequestPage>
            </PrivateRoute>
        },
        {
            path: '/myPosts',
            element: <PrivateRoute>
              <MyPosts></MyPosts>
            </PrivateRoute>
        },
        {
            path: '/addNeeds',
            element: <PrivateRoute>
              <AddNeeds></AddNeeds>
            </PrivateRoute>
        },
        {
           path: '/update/:id',
           element: <PrivateRoute>
              <UpdatePost></UpdatePost>
            </PrivateRoute>

        },
        {
            path: '/register',
            Component: Register

        },
        {
            path: '/signin',
            Component: SignIn

        },
        {
            path:"/*",
           Component: Error
        },
    ]
  },
]);
export default router;