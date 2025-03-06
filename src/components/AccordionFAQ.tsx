import Accordion from "react-bootstrap/Accordion";

const AccordionFAQ =()=> {
  return (
    <Accordion defaultActiveKey="0" className="custom-accordion mb-5 mt-3 mt-md-0">
      <Accordion.Item eventKey="0" className="mb-3">
        <Accordion.Header className="quicksand">What does NCC stand for?</Accordion.Header>
        <Accordion.Body className="text-black quicksand">
          NCC stands for Noleggio con Conducente, which means "Hire with
          Driver." It is a private transportation service that allows you to
          book a vehicle with a driver for personal or business trips.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="mb-3">
        <Accordion.Header className="quicksand">How can I book a vehicle</Accordion.Header>
        <Accordion.Body className="text-black">
          You can book a vehicle directly on our website by selecting the type
          of service, the date, and the time you need. During the booking
          process, you will find various payment options available to choose
          from.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className="mb-3">
        <Accordion.Header className="quicksand">What payment methods are accepted</Accordion.Header>
        <Accordion.Body className="text-black">
          We accept payments via credit card, PayPal, bank transfer, and cash.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className="mb-3">
        <Accordion.Header className="quicksand">
          What types of vehicles are available for rental
        </Accordion.Header>
        <Accordion.Body className="text-black">
          We offer a wide range of vehicles, including sedans, minivans, and
          limousines, suitable for different transportation needs.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className="mb-3">
        <Accordion.Header className="quicksand">
          Does the price include fuel costs and tolls
        </Accordion.Header>
        <Accordion.Body className="text-black">
          Yes, the price shown during the booking includes all fuel costs,
          tolls, and taxes.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" className="mb-3">
        <Accordion.Header className="quicksand">
          Will the car arrive directly to my home/hotel?
        </Accordion.Header>
        <Accordion.Body className="text-black">
          Yes, of course! Even if you live in the city center or on traffic
          restriction days, the cars from Ncc Taxi Roma have all the required
          permits to access ZTL (Limited Traffic Zones) and preferential lanes
          in any Italian city.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6" className="mb-3">
        <Accordion.Header className="quicksand">Can I travel with children?</Accordion.Header>
        <Accordion.Body className="text-black">
          Of course! Just make sure to let us know the age of your children when
          booking, so we can ensure they travel safely in a car seat or booster
          as required by law. An additional charge of €8 applies.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7" className="mb-3">
        <Accordion.Header className="quicksand">Is my personal information secure?</Accordion.Header>
        <Accordion.Body className="text-black">
        Yes, the security of your personal data is a priority for us. We use advanced encryption systems to protect your information during the booking process.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionFAQ;
