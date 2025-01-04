import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import MyNavbar from "./components/MyNavbar";
import MyReservation from "./components/MyReservation";
import CheckoutDetails from "./components/CheckoutDetails";

function App() {
  return(
<BrowserRouter>
    <MyNavbar/>
    <Routes>
      <Route path="/reservation"
      element={<MyReservation/>} />
      <Route path="/CheckoutDetails"
      element={<CheckoutDetails/>} />

    </Routes>

</BrowserRouter>

  )
}

export default App;
