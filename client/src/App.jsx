import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { queryClient } from "./store/queryClient";

import AppLayout from "./ui/AppLayout";
import Main from "./pages/Main";
import Products from "./pages/Products";
import AccountLayout from "./ui/AccountLayout";
import Account from "./pages/Account";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import About from "./pages/About";
import ProtectedRoute from "./ui/ProtectedRoute";
import GetUser from "./ui/GetUser";
import ProtectedAuth from "./ui/ProtectedAuth";
import PageNotFound from "./ui/PageNotFound";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<GetUser />}>
            <Route element={<AppLayout />}>
              <Route index element={<Main />} />
              <Route path="products" element={<Products />} />
              <Route path="about" element={<About />} />
            </Route>

            <Route>
              <Route
                element={
                  <ProtectedRoute>
                    <AccountLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="account" element={<Account />} />
                <Route path="settings" element={<Settings />} />
                <Route path="cart" element={<Cart />} />
                <Route path="orders" element={<p>Orders</p>} />
                <Route path="order/:id" element={<p>Order</p>} />
              </Route>
            </Route>

            <Route element={<ProtectedAuth />}>
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          success: { duration: 5000 },
          error: { duration: 5000 },
          style: {
            // background: "var(--color-primary)",
            background: "var(--color-yellow-light)",
            color: "var(--color-grey-dark)",
            fontSize: "15px",
            // boxShadow: "0 0 3px rgba(0, 0, 0, 0.25)",
            border: "1px solid var(--color-grey-light)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
