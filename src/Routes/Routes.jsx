import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import Error from "../Pages/Error";
import DashboardLayout from "../Layouts/DashboardLayout";
import AddPublishers from "../Pages/Dashboard/AddPublishers";
import AllUser from "../Pages/Dashboard/AllUser";
import AddArticles from "../Pages/AddArticles";
import AdminRoute from "./AdminRoute";
import AllArticles from "../Pages/Dashboard/AllArticles";
import AllArticle from "../Pages/AllArticle";
import ArticleDetails from "../Pages/ArticleDetails";
import MyArticles from "../Pages/MyArticles";
import PrivateRoute from "./PrivateRoute";
import Subscription from "../Pages/Subscription";
import Payment from "../Pages/Payment";
import PremiumArticles from "../Pages/PremiumArticles";
import UpdateArticle from "../Pages/Dashboard/UpdateArticle";
import Statistics from "../Pages/Dashboard/Statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/add-articles',
        element: <AddArticles />
      },
      {
        path: '/all-article',
        element: <AllArticle />
      },
      {
        path: '/article/:id',
        element: <ArticleDetails />
      },
      {
        path: '/my-articles',
        element: <PrivateRoute><MyArticles /></PrivateRoute>
      },
      {
        path: '/premium-articles',
        element: <PrivateRoute><PremiumArticles /></PrivateRoute>
      },
      {
        path: '/update-article/:id',
        element: <PrivateRoute><UpdateArticle /></PrivateRoute>,
        loader: ({params})=>fetch(`${import.meta.env.VITE_API_URL}/article/${params.id}`)
      },
      {
        path: '/subscription',
        element: <Subscription />
      },
      {
        path: '/payment',
        element: <Payment />
      },
    ]
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <AdminRoute>
          <Statistics />
        </AdminRoute>
      },
      {
        path: 'all-user',
        element: <AdminRoute>
          <AllUser />
        </AdminRoute>
      },
      {
        path: 'all-user',
        element: <AdminRoute>
          <AllUser />
        </AdminRoute>
      },
      {
        path: 'all-articles',
        element: <AdminRoute>
          <AllArticles />
        </AdminRoute>
      },
      {
        path: 'add-publishers',
        element: <AdminRoute>
          <AddPublishers />
        </AdminRoute>
      },
    ]
  }
]);