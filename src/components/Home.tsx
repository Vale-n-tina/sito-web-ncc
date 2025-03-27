import { Button, Col, Container, Row } from "react-bootstrap";
import AccordionFAQ from "./AccordionFAQ";
import { Link } from "react-router-dom";
import { Trans, useTranslation } from "react-i18next";

const Home = () => {
  const { t} = useTranslation();
  return (
    <Container fluid className="p-0">
      <div className="bg-imageSfondo pb-5">
        <Row
          className="justify-content-center align-items-center"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Col className="text-center col-12 col-md-6 text-white mt-5">
            <h1 className="title-shadow mb-4 mt-5">
              {t("HomeRomeChauffeuredCar")}
            </h1>
          </Col>
          <Col className="col-10 col-md-7">
            <p className="text-white text-center p-fade-in code mt-3 mb-5 ">
              <Trans i18nKey="HomeServiceDescription">
                An exclusive <span className="fw-bold">service in Rome</span>
                offering private transfers, personalized tours, and trips to any
                location. Enjoy comfort, reliability, and professionalism at
                every step.
              </Trans>
            </p>
          </Col>
          <Col className="col-12">
            <Row className=" justify-content-center">
              <Col className="col-8 col-md-3 col-lg-2 mb-3">
                <Link to="/reservation">
                  <Button
                    variant="gold"
                    className="custom-gold-btn fw-bold sans p-md-2"
                  >
                    {t("HomeBOOKNOW")}
                  </Button>
                </Link>
              </Col>
              <Col className="col-8 col-md-3  col-lg-2 mb-5">
                <Link to="/tour">
                  <Button
                    variant="dark"
                    className="custom-black-btn fw-bold sans p-md-2"
                  >
                      {t("HomeVIEWTOUR")}
                    
                  </Button>
                </Link>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Row className="no-margin-padding justify-content-center overflow-hidden">
        <Col className="text-center col-8 col-md-9 p-0 no-margin-padding mt-2 mb-md-3 ">
          <h1 className="h1-presentation mb-4 mb-md-5 ">{t("HomeWhyChooseUs")}</h1>
          <hr className=" " />
        </Col>

        <Col className="col-8 col-md-4 text-center mt-3 animate-slide-in-right delay-1 ">
          <i className="bi bi-clock "></i>
          <h2 className="mt-2 mb-3  sans fw-bold">{t("HomePunctuality")}</h2>
          <p className="quicksand">
            {t("HomePuntualityX")}
          </p>
          <p className="quicksand fst-italic text-decoration-underline">
          {t("HomePuntualityY")}
          </p>
        </Col>
        <Col className="col-8 col-md-4 text-center mt-4 animate-slide-in-right delay-2">
          <i className="bi bi-gem"></i>
          <h2 className="mt-2 mb-3  sans fw-bold">{t("HomeConfort")}</h2>
          <p className="quicksand">
          {t("HomeConfortX")}
          
          </p>
          <p className="quicksand fst-italic text-decoration-underline">
          
            {t("HomeConfortY")}
          </p>
        </Col>

        <Col className="col-8 col-md-4 text-center mt-4  mb-3 animate-slide-in-right delay-3">
          <i className="bi bi-award-fill"></i>
          <h2 className="mt-2 mb-3  sans fw-bold">{t("HomePersonalization")}</h2>
          <p className="quicksand">
          {t("HomePersonalizationX")}
            
          </p>
          <p className="quicksand fst-italic text-decoration-underline">
          {t("HomePersonalizationY")}
           
          </p>
        </Col>
      </Row>
      <Row className="no-margin-padding justify-content-md-around mt-md-5 ">
        <Col className="col-12 no-margin-padding col-md-5 order-md-2 ">
          <div className="bg-imageSfondo2 pb-5">
            <Row
              style={{ position: "relative", zIndex: 2 }}
              className=" justify-content-center"
            >
              <Col className="text-center mt-5 col-9">
                <h1 className="text-white merriweather mb-4 ">
                {t("HomeContactUs")}
                 
                </h1>
                <p className="text-white mb-4">
                {t("HomeContactUsText")}
                
                </p>
                <Row className=" justify-content-center">
                  <Col className="col-5">
                    <Button
                      variant="gold"
                      className="custom-gold-btn fw-bold sans p-md-2 mt-3"
                    >
                        {t("HomeContactUsButton")}
                     
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className="bg-imageSfondo3 pb-5 mt-5">
            <Row
              style={{ position: "relative", zIndex: 2 }}
              className=" justify-content-center"
            >
              <Col className="text-center mt-3 col-9">
                <h1 className="text-white merriweather mb-4 ">
                {t("HomeOurPriority")}
                 
                </h1>
                <p className="text-white mb-4">
                {t("HomeOurPriorityText")}
                 
                </p>
              </Col>
            </Row>
          </div>
        </Col>
        <Col className="col-12 col-md-10 order-md-1">
          <h2 className="d-flex justify-content-center text-center mt-5 mb-4 mt-md-0 justify-content-md-end ">
          {t("HomeFAQ")}
          
          </h2>
        </Col>
        <Col className="col-12 col-md-6 order-md-3">
          <AccordionFAQ />
        </Col>
      </Row>
    </Container>
  );
};
export default Home;
