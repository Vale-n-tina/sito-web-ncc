import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import 'bootstrap-icons/font/bootstrap-icons.css';
import"./css/HomeCss.css"
import "./css/AccordionCss.css"
import"./css/ReservationCss.css"
import"./css/LoginCss.css"
import"./css/Tour.css"

createRoot(document.getElementById("root")!).render(<App />);
