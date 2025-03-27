import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "react-i18next";

const AccordionFAQ =()=> {
   const { t,} = useTranslation();
  return (
    <Accordion defaultActiveKey="0" className="custom-accordion mb-5 mt-3 mt-md-0">
      <Accordion.Item eventKey="0" className="mb-3">
        <Accordion.Header className="quicksand">   {t("HomeAccordion1")}</Accordion.Header>
        <Accordion.Body className="text-black quicksand">
        {t("HomeAccordion1Text")}
        
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" className="mb-3">
        <Accordion.Header className="quicksand"> {t("HomeAccordion2")}</Accordion.Header>
        <Accordion.Body className="text-black">
        {t("HomeAccordion2Text")}
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2" className="mb-3">
        <Accordion.Header className="quicksand"> {t("HomeAccordion3")}</Accordion.Header>
        <Accordion.Body className="text-black">
        {t("HomeAccordion3Text")}
          
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="3" className="mb-3">
        <Accordion.Header className="quicksand">
        {t("HomeAccordion4")}
         
        </Accordion.Header>
        <Accordion.Body className="text-black">
        {t("HomeAccordion4Text")}
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="4" className="mb-3">
        <Accordion.Header className="quicksand">
        {t("HomeAccordion5")}
          
        </Accordion.Header>
        <Accordion.Body className="text-black">
        {t("HomeAccordion5Text")}
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="5" className="mb-3">
        <Accordion.Header className="quicksand">
        {t("HomeAccordion6")}
          
        </Accordion.Header>
        <Accordion.Body className="text-black">
        {t("HomeAccordion6Text")}
         
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="6" className="mb-3">
        <Accordion.Header className="quicksand"> {t("HomeAccordion7")}</Accordion.Header>
        <Accordion.Body className="text-black">
        {t("HomeAccordion7Text")}
  
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="7" className="mb-3">
        <Accordion.Header className="quicksand"> {t("HomeAccordion8")}</Accordion.Header>
        <Accordion.Body className="text-black">
        {t("HomeAccordion8Text")}
       
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccordionFAQ;
