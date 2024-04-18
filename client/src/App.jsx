import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Main />} />
            <Route path="products" element={<Products />} />
            <Route path="about" element={<About />} />
          </Route>

          <Route>
            <Route element={<AccountLayout />}>
              <Route path="account" element={<Account />} />
              <Route path="settings" element={<Settings />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<p>Orders</p>} />
              <Route path="order/:id" element={<p>Order</p>} />
            </Route>
          </Route>

          <Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
