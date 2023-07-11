import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from './views/ErrorPage';
import Login from './views/Login';
import Register from './views/Register';
import AdminLayout from './views/AdminLayout';
import Orders from './views/Orders';
import Customers from './views/Customers';
import Products from './views/Products';
import Categories from './views/Categories';
import Brands from './views/Brands';
import AddCategory from './views/forms/AddCategory';
import AddBrand from './views/forms/AddBrand';
import AddProduct from './views/forms/AddProduct';
import ShowHomePage from './views/customers/ShowHomePage';
import CustomerLayout from './views/customers/CustomerLayout';
import ProductsList from './views/customers/ProductsList';
import ProductDetail from './views/customers/ProductDetail';

const router = createBrowserRouter([
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path:'orders', element: <Orders/>},
          { path:'customers', element: <Customers/>},
          { path:'products', element: <Products/>},
          { path:'categories', element: <Categories/>},
          { path:'brands', element: <Brands/>},
          { path:'categories/add', element: <AddCategory/>},
          { path:'brands/add', element: <AddBrand/>},
          { path:'products/add', element: <AddProduct/>}
        ],
    },
    {
        path: "/",
        element: <CustomerLayout />,
        children: [
          { index:true, element: <ProductsList/>},
          { path:'/product-detail', element: <ProductDetail/>},
          { path:'home', element: <ShowHomePage/>},
        ],
    },
    { path:'/login', element: <Login /> },
    { path:'/register', element: <Register /> },
    
])

export default router;