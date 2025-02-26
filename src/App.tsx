import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap-icons/font/bootstrap-icons.css'
import MyNavbar from "./components/MyNavbar";
import MyReservation from "./components/MyReservation";
import CheckoutDetails from "./components/CheckoutDetails";
import FormInterface from "./types/Form";
import { useState } from "react";


function App() {
  const [form, setForm] = useState<FormInterface>({
    pickUp: "",
    dropOff: "",
    passengers: 1,
    suitcases: 1,
    backpack: 1,
    pickUpDate: "",
    pickUpTime: "",
    flightNumber: "",
    nameOnBoard: "",
    childSeats: "noChildSeats",
    requests: "",
    nameAndSurname: "",
    email: "",
    phone: "",
  });
  const updateForm = (newForm: FormInterface) => {
    setForm(newForm);
  };
  return(
<BrowserRouter>
    <MyNavbar/>
    <Routes>
      <Route path="/reservation"
      element={<MyReservation form={form} setForm={updateForm} />} />
      <Route path="/CheckoutDetails"
      element={<CheckoutDetails form={form} setForm={updateForm} />} />

    </Routes>

</BrowserRouter>

  )
}

export default App;
