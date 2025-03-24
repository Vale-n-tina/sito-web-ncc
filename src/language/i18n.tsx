import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: "en",

  resources: {
    en: {
      translation: {
        BarHome: "Home",
        BarReservation: "Reservation",
        BarTour: "Tour",
        BarLogin: "Login",
        BarContacts: "Contacts",
        FooterFollow: "Follow us",
        HomeRomeChauffeuredCar: "Rome Chauffeured Car",
        HomeServiceDescription:
          "An exclusive <1>service in Rome</1> offering private transfers, personalized tours, and trips to any location. Enjoy comfort, reliability, and professionalism at every step.",
        HomeBOOKNOW: " BOOK NOW ",
        HomeVIEWTOUR: "VIEW TOUR",
        HomeWhyChooseUs: "Why choose us?",
        HomePunctuality: "Punctuality",
        HomePuntualityX:
          "Always available to assist you, offering quick and reliable transfers for a smooth and worry-free journey",
        HomePuntualityY: "No waiting, just smooth and reliable transfers.",
        HomeConfort: "Confort",
        HomeConfortX:
          "Vehicles equipped with all the comforts for a stress-free and comfortable journey",
        HomeConfortY:
          "Incredible experiences tailored for your ultimate comfort.",
        HomePersonalization: "Personalization",
        HomePersonalizationX:
          "Transfers and tours tailored to meet your individual preferences and requirements, ensuring a personalized experience every time",
        HomePersonalizationY: " Each aspect is crafted with your needs in mind",
        HomeContactUs: " Contact Us Anytime",
        HomeContactUsText:
          " We’re always here to answer your questions and provide the best assistance. Whether you need information about our services or help with your next transfer, don’t hesitate to reach out. Your satisfaction is our priority.",
        HomeContactUsButton: " Contact us",
        HomeOurPriority: " Your Journey, Our Priority",
        HomeOurPriorityText:
          " Whether you're heading to a business meeting or enjoying a leisurely trip, we are here to make your ride comfortable and stress-free. Our professional drivers ensure that your journey is safe, punctual, and enjoyable. We’re committed to providing you with the best transportation experience every time you travel with us.",
        HomeFAQ: "Frequently Asked Questions",
        HomeAccordion1: "What does NCC stand for?",
        HomeAccordion1Text: `  NCC stands for Noleggio con Conducente, which means "Hire with Driver." It is a private transportation service that allows you to book a vehicle with a driver for personal or business trips.`,
        HomeAccordion2: "How can I book a vehicle",
        HomeAccordion2Text:
          " You can book a vehicle directly on our website by selecting the type of service, the date, and the time you need. During the booking process, you will find various payment options available to choose from.",
        HomeAccordion3: "What payment methods are accepted",
        HomeAccordion3Text:
          "We accept payments via credit card, PayPal, bank transfer, and cash.",
        HomeAccordion4: " What types of vehicles are available for rental",
        HomeAccordion4Text:
          " We offer a wide range of vehicles, including sedans, minivans, and limousines, suitable for different transportation needs.",
        HomeAccordion5: " Does the price include fuel costs and tolls",
        HomeAccordion5Text:
          " Yes, the price shown during the booking includes all fuel costs, tolls, and taxes.",
        HomeAccordion6: "Will the car arrive directly to my home/hotel?",
        HomeAccordion6Text:
          " Yes, of course! Even if you live in the city center or on traffic restriction days, the cars from Ncc Taxi Roma have all the required permits to access ZTL (Limited Traffic Zones) and preferential lanes in any Italian city.",
        HomeAccordion7: "Can I travel with children?",
        HomeAccordion7Text:
          "Of course! Just make sure to let us know the age of your children when booking, so we can ensure they travel safely in a car seat or booster as required by law. An additional charge of €8 applies.",
        HomeAccordion8: "Is my personal information secure?",
        HomeAccordion8Text:
          " Yes, the security of your personal data is a priority for us. We use advanced encryption systems to protect your information during the booking process.",
        ReservationBookTrip: "Book your trip",
        ReservationBookTripText:
          "Please enter your arrival time and airline name. Your driver will be waiting for you at the arrival terminal, holding a sign with your name.",
        ReservationPickUp: "Pick-Up ",
        ReservationPlaceholder: "Airport, Hotel, Address",
        ReservationErrorPickUp: "The departure point is required",
        ReservationDropOff: " Drop-Off",
        ReservationErrorDropOff: "The destination is required",
        ReservationPassengers: "Passengers",
        ReservationSuitcases: "Suitcases",
        ReservationBackpack: "Backpack",
        ReservationErrorDate: `The "Date" field is required`,
        ReservationDate: "Pick Up date",
        ReservationErrorTime: `The "Time" field is required`,
        ReservationTime: "Pick Up Time",
        ReservationLabelCruise: "name of the cruise ship",
        ReservationLabelTrain: "Train number",
        ReservationLabelPlane: "Flight number",
        ReservationPlaceholderHolds: "Insert your name",
        ReservationHolds: "Name on a board the driver holds",
        ReservationChilsSeatsOption: "No child seats ",
        ReservationChilsSeats: "Number of child seats",
        ReservationRequest: " Requests",
        ReservationRequestPlaceholder: "Special needs or any other request",
        ReservationSummary: "Summary",
        ReservationEstimatedDistace: "Estimated Distance:",
        ReservationEstimatedTime: "Estimated Trip Time:",
        ReservationListPrice: "List price:",
        ReservationDiscountPrice: "Discount price:",
        ReservationContinue: "Continue",
        TourRome: "Rome",
        TourFiumicino: "Fiumicino Airport",
        TourCiampino: "Ciampino Airport",
        TourCivitavecchia: "Civitavecchia Dock",
        saintPeterInChains: "Saint Peter in Chains (+ 30 min)",
        castelSantAngelo: "Castel Sant'Angelo (+ 30 min)",
        saintMaryMajor: "Basilica of Saint Mary Major (+ 30 min)",
        saintMaryOfTheAngels: "Basilica of Saint Mary of the Angels (+ 30 min)",
        santaMariaDelPopolo: "Basilica of Santa Maria del Popolo (+ 30 min)",
        saintMaryOfVictory: "Saint Mary of Victory (+ 30 min)",
        gianicoloTerrace:"Terrace of Gianicolo and Acqua Paola Fountain (+ 30 min)",
        piazzaNavona: "Piazza Navona (+ 30 min)",
        piazzaDelPopolo: "Piazza del Popolo (+ 30 min)",
        piazzaMinerva: "Piazza della Minerva (+ 30 min)",
        vittoriano: "Victor Emmanuel II Monument (+ 30 min)",
        spanishSteps: "Spanish Steps (+ 30 min)",
        circusMaximus: "Circus Maximus (+ 30 min)",
        romanForum: "Roman Forum (+ 30 min)",
        TourInsertAddress:"Insert address",
        TourInsertNumberFly:"Insert number fly",
        TourInsertcruiseName:"Insert cruise ship name ",
        TourClassicTour:"Classic tour",
        TourClassicTourText:" Select the monuments you do not want to miss.",
        TourStarting:"Tour starting from",
        TourStartingError:"The PickUp Address is required",
        TourDate:"Select date",
        TourDateError:"The date and time are required",
        TourPassengers:" Select number of passengers",
        TourInclude:"Included in 4 hours:",
        TourOptionalMonuments:" Optional monuments:",
        TourEndError:"The DropOff Address is required",
        tourTotalPassengers: "Total for {{count}} passengers",
        tourDuration: " Tour {{duration}} hour "









      },
    },

    it: {
      translation: {
        RomeChauffeuredCar: "Ncc Roma",
        HomeServiceDescription:
          "Un <1>servizio esclusivo a Roma</1> che offre trasferimenti privati, tour personalizzati e viaggi in qualsiasi località. Goditi comfort, affidabilità e professionalità ad ogni passo.",
        HomeBOOKNOW: "PRENOTA ORA",
      },
    },

    sp: {
      translation: {
        RomeChauffeuredCar: "Coche con chófer en Roma",
        HomeServiceDescription:
          "Un <1>servicio exclusivo en Roma</1> que ofrece traslados privados, tours personalizados y viajes a cualquier destino. Disfrute de comodidad, fiabilidad y profesionalidad en cada paso.",
      },
    },

    fr: {
      translation: {
        RomeChauffeuredCar: "Voiture avec chauffeur à Rome",
        HomeServiceDescription:
          "Un <1>service exclusif à Rome</1> proposant des transferts privés, des visites personnalisées et des voyages vers n'importe quelle destination. Profitez d'un confort, d'une fiabilité et d'un professionnalisme à chaque étape.",
      },
    },
  },
});

export default i18n;
