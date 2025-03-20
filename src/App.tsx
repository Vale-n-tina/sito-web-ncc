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
import MyTour2 from "./components/MyTour2";
import TourData from "./types/TourData";

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

  const checkBox: string[] = [
    "Colosseum",
    "Trevi fountain",
    "Pantheon",
    "Saint Peter",
  ];
  const[tour, setTour]= useState<TourData>({

    pickUp: "",
    dropOff: "",
    passengers: 1,
    date: "",
    time: "",
    passengerName: "",
    email: "",
    phoneNumber: "",
    price:0,
    optionalStops: checkBox,
  })
  


  const updateForm = (newForm: ReserveData) => {
    setForm(newForm);
  };
  const updateTour = (newTour: TourData) => {
    setTour(newTour);
  };


  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route
          path="/reservation"
          element={<MyReservation form={form} setForm={updateForm} />}
        />
        <Route path="/tour" element={<MyTour2 tour={tour} setTour={updateTour} checkBox={checkBox}/>}/>
        <Route
          path="/CheckoutDetails/:type"
          element={<CheckoutDetails form={form} setForm={updateForm} tour={tour}  setTour={setTour} />}
        />
        <Route index element={<Home />} />
        <Route path="/login" element={<MyLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/MyAdministration" element={<MyAdministration />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
