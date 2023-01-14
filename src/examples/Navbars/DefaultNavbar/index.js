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

// react-router components
// import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function DefaultNavbar({ light }) {
  return (
    <Container>
      <MDBox
        py={1}
        my={3}
        mx={0}
        width="calc(100% - 48px)"
        borderRadius="lg"
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        position="absolute"
        zIndex={3}
      >
        <MDBox display={{ xs: "flex", lg: "flex" }} m={5} p={0}>
          <MDTypography fontWeight="bold" color="white" align="center">
            Selamat Datang di Sistem Absensi Pegawai Balai Desa Gandasari
          </MDTypography>
        </MDBox>
      </MDBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  light: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  light: PropTypes.bool,
};

export default DefaultNavbar;
