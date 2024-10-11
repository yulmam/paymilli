import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import NotFound from "pages/NotFound";
import Main from "pages/Main";
import Login from "pages/member/Login";
import Signup from "pages/member/Signup";
import MemberInfo from "pages/member/MemberInfo";
import Payment from "pages/payment/Payment";
import RefundProcess from "pages/refund/RefundProcess";
import CardManagementPage from "pages/card/CardManagementPage";
import PaymentHistoryPage from "pages/card/PaymentHistoryPage";
import ProductList from "pages/shoppingmall/food/ProductList";
import ShoppingBasket from "pages/shoppingmall/food/Basket";
import OrderSheet from "pages/shoppingmall/food/OrderSheet";
import OrderComplete from "pages/shoppingmall/food/OrderComplete";

import ProductList_Electronic from "pages/shoppingmall/electronic/ProductList";
import ShoppingBasket_Electronic from "pages/shoppingmall/electronic/Basket";
import OrderSheet_Electronic from "pages/shoppingmall/electronic/OrderSheet";
import OrderComplete_Electronic from "pages/shoppingmall/electronic/OrderComplete";

import ApiCheckPage from "pages/ApiCheckPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/check" element={<ApiCheckPage />} />
        <Route path="/member/info" element={<MemberInfo />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/refund" element={<RefundProcess />} />
        <Route path="/card/management" element={<CardManagementPage />} />
        <Route path="/payment/history" element={<PaymentHistoryPage />} />

        {/* food 쇼핑몰 */}
        <Route path="/mall/food/shopping" element={<ProductList />} />
        <Route path="/mall/food/basket" element={<ShoppingBasket />} />
        <Route path="/mall/food/order" element={<OrderSheet />} />
        <Route path="/mall/food/order/complete" element={<OrderComplete />} />

        {/* electronic 쇼핑몰 */}
        <Route
          path="/mall/electronic/shopping"
          element={<ProductList_Electronic />}
        />
        <Route
          path="/mall/electronic/basket"
          element={<ShoppingBasket_Electronic />}
        />
        <Route
          path="/mall/electronic/order"
          element={<OrderSheet_Electronic />}
        />
        <Route
          path="/mall/electronic/order/complete"
          element={<OrderComplete_Electronic />}
        />
      </Routes>
    </Router>
  );
}

export default App;
