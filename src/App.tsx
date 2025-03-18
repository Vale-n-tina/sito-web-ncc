import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from "./components/MyNavbar";
import MyReservation from "./components/MyReservation";
import CheckoutDetails from "./components/CheckoutDetails";

import { useState } from "react";
import ReserveData from "./types/ReserveData";
import Home from "./components/Home";
import MyLogin from "./components/MyLogin";
import ProtectedRoute from "./components/PretectedRoute";
import MyAdministration from "./components/MyAdministration";
import TransferListPage from "./components/TransfertListPage";
import MyTour from "./components/MyTour";

function App() {
  const [form, setForm] = useState<ReserveData>({
    pickUp: "",
    dropOff: "",
    passengers: 1,
    suitcases: 1,
    backpack: 1,
    pickUpDate: "",
    pickUpTime: "",
    transportType: "",
    transportDetails: "",
    nameOnBoard: "",
    childSeats: "noChildSeats",
    requests: "",
    nameAndSurname: "",
    email: "",
    phone: "",
    price: 0,
  });
  const updateForm = (newForm: ReserveData) => {
    setForm(newForm);
  };
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route
          path="/reservation"
          element={<MyReservation form={form} setForm={updateForm} />}
        />
        <Route path="/tour" element={<MyTour/>}/>
        <Route
          path="/CheckoutDetails"
          element={<CheckoutDetails form={form} setForm={updateForm} />}
        />
        <Route index element={<Home />} />
        <Route path="/login" element={<MyLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/MyAdministration" element={<MyAdministration />} />
          <Route path="/transfers/:date" element={<TransferListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
