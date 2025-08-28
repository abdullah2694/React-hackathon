import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import theme from "./theme/theme";

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import UserDashboard from "./dashboards/UserDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";
import ManagerDashboard from "./dashboards/ManagerDashboard";

// Admin modules
import ProductManagement from "./components/admin/ProductManagement";
import OfferManagement from "./components/admin/OfferManagement";
import BranchManagement from "./components/admin/BranchManagement";
import InventoryManagement from "./components/admin/InventoryManagement";
import EmployeeList from "./components/admin/EmployeeList";

// Manager modules
import BranchInventory from "./components/manager/BranchInventory";
import BranchSummary from "./components/manager/BranchSummary";
import EmployeeManagement from "./components/manager/EmployeeManagement";
import ReviewList from "./components/manager/ReviewList";

// User modules
// import ProductList from "./components/user/ProductList";
import Cart from "./components/user/Cart";
import OrderList from "./components/user/OrderForm";
import ReviewForm from "./components/user/ReviewForm";
import ProductPage from "./components/user/ProductPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* User Dashboard with nested routes */}
<Route path="/user" element={<UserDashboard />}>
  <Route path="products" element={<ProductPage />} />
  <Route path="cart" element={<Cart />} />
  <Route path="orders" element={<OrderList />} />
  <Route path="reviews" element={<ReviewForm />} />
</Route>

          {/* Manager Dashboard with nested routes */}
          <Route path="/manager" element={<ManagerDashboard />}>
            <Route path="summary" element={<BranchSummary />} />
            <Route path="inventory" element={<BranchInventory />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="reviews" element={<ReviewList />} />
            <Route index element={<Navigate to="summary" />} />
          </Route>

          {/* Admin Dashboard with nested routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="products" element={<ProductManagement />} />
            <Route path="offers" element={<OfferManagement />} />
            <Route path="branches" element={<BranchManagement />} />
            <Route path="inventory" element={<InventoryManagement />} />
            <Route path="employees" element={<EmployeeList />} />
            <Route index element={<Navigate to="products" />} />
          </Route>

          {/* Default & 404 */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Typography>404 - Not Found</Typography>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
