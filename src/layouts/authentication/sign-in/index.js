/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useCallback } from "react";

// react-router-dom components
import { useNavigate } from "react-router-dom";

// import axios components
import axios from "axios";

// import react-hook-form components
import { useForm } from "react-hook-form";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Basic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const bodyFormData = {
    email,
    password,
  };

  const data = useCallback(() => {
    const loginUrl = "/api/auth/";
    const login = axios.post(loginUrl, bodyFormData, {
      headers: { "Content-Type": "application/json" },
    });

    axios
      .all([login])
      .then(
        axios.spread((...allData) => {
          setLoading(false);
          localStorage.setItem("access_token", allData[0].data.token);
          navigate("/dashboard");
        })
      )
      .catch((err) => {
        if (err.response.status === 400) {
          setError("Email / Password salah !");
        }
        setLoading(false);
      });
  }, [bodyFormData, navigate]);

  const OnSubmit = () => {
    setError(null);
    setLoading(true);
    data();
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Admin Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {error && (
              <MDTypography mb={3} variant="subtitle2" color="error">
                {error}
              </MDTypography>
            )}
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Email"
                id="email"
                name="email"
                value={email}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("email")}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
              {errors.email && (
                <MDTypography variant="inherit" color="error">
                  {errors.email.message}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                id="password"
                name="password"
                value={password}
                aria-invalid={errors.name ? "true" : "false"}
                {...register("password")}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />
              {errors.password && (
                <MDTypography variant="inherit" color="error">
                  {errors.password.message}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                disabled={loading}
                onClick={handleSubmit(OnSubmit)}
                fullWidth
              >
                sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
