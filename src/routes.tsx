import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './views/ErrorPage';
import Login from './views/Login';
import Register from './views/Register';
import HomePage from './views/HomePage';
import AdminLayout from './views/AdminLayout';
import Orders from './views/Orders';
import Customers from './views/Customers';
import Products from './views/Products';
import Categories from './views/Categories';
import Brands from './views/Brands';
import AddCategory from './views/forms/AddCategory';

const router = createBrowserRouter([
    {
        path: "/",
        element: <AdminLayout />,
        children: [
          { path:'/orders', element: <Orders/>},
          { path:'/customers', element: <Customers/>},
          { path:'/products', element: <Products/>},
          { path:'/categories', element: <Categories/>},
          { path:'/brands', element: <Brands/>},
          { path:'/categories/add', element: <AddCategory/>}
        ],
    },
    { path:'/login', element: <Login /> },
    { path:'/register', element: <Register /> },
    
])

export default router;