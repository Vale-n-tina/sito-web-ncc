import { Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import LoginData from "../types/LoginData";
import { useNavigate } from "react-router-dom";

const MyLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");



  //Richiesta per il login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const loginData: LoginData = {
      username: username,
      password: password,
    };

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        if (response.ok) {
          //faccio cose
          return response.json();
        } else {
          console.error("Error in login");
        }
      })
      .then((token) => {
        localStorage.setItem("authToken",JSON.stringify (token.token));
        
        navigate("/MyAdministration")
      })
      .catch((error) => {
        console.error("Error in fetch", error);
      });
  };

  return (
    <>
      <section className="text-center">
        <div className="p-5 bg-imageLogin "></div>

        <div className="card mx-4 mx-md-5  shadow p-3 mb-5 bg-body-tertiary rounded card-custom ">
          <div className="card-body py-5 px-md-5">
            <Row className="row d-flex justify-content-center">
              <Col className=" col-12 col-md-10 col-lg-8">
                <h2 className="fw-bold mb-5">Log in</h2>
                <form>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2" md="4" lg="3">
                      Username
                    </Form.Label>
                    <Col sm="10" md="8" lg="6">
                      <Form.Control
                        type="email"
                        placeholder="username"
                        className="custom-form-control"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formPlaintextPassword"
                  >
                    <Form.Label column sm="2" md="4" lg="3">
                      Password
                    </Form.Label>
                    <Col sm="10" md="8" lg="6">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        className="custom-form-control"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </Col>
                  </Form.Group>
                  <Row className=" justify-content-center">
                    <Col className=" col-12 col-md-5">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="custom-black-btn mb-3 mt-4"
                        onClick={handleLogin}
                      >
                        Sign up
                      </button>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Row>
          </div>
        </div>
      </section>
      
    </>
  );
};
export default MyLogin;
