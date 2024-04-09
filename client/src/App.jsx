import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "./store/queryClient";

import Main from "./pages/Main";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route index element={<Main />} />
          <Route path="products" element={<p>Products</p>} />

          <Route>
            <Route path="account" element={<p>Account</p>} />
            <Route path="settings" element={<p>Settings</p>} />
            <Route path="cart" element={<p>Cart</p>} />
            <Route path="orders" element={<p>Orders</p>} />
            <Route path="order/:id" element={<p>Order</p>} />
          </Route>

          <Route>
            <Route path="login" element={<p>Login</p>} />
            <Route path="singup" element={<p>Singup</p>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
