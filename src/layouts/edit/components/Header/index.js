// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// import { Person } from "@mui/icons-material";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import backgroundImage from "assets/images/bg-profile.jpeg";
import Form from "layouts/edit/components/Form";

function Header({ id, defFoto, defNama, defJabatan, defNip, defTempat, defTanggal, defEmail, defTelp, defAlamat }) {

  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <MDAvatar
              src={`data:image/png;base64,${defFoto}`}
              alt="profile-image"
              size="xl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                {defNama}
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular" textTransform="capitalize">
                {defJabatan}
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>
        <Form
          id={id}
          defNama={defNama}
          defNip={defNip}
          defTempat={defTempat}
          defTanggal={defTanggal}
          defEmail={defEmail}
          defTelp={defTelp}
          defAlamat={defAlamat}
          defFoto={defFoto}
          defJabatan={defJabatan}
        />
      </Card>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  id: "",
  defFoto: "",
  defJabatan: "",
  defNama: "",
  defNip: "",
  defTempat: "",
  defTanggal: "",
  defEmail: "",
  defTelp: "",
  defAlamat: "",
};

// Typechecking props for the Header
Header.propTypes = {
  id: PropTypes.string,
  defFoto: PropTypes.string,
  defJabatan: PropTypes.string,
  defNama: PropTypes.string,
  defNip: PropTypes.string,
  defTempat: PropTypes.string,
  defTanggal: PropTypes.string,
  defEmail: PropTypes.string,
  defTelp: PropTypes.string,
  defAlamat: PropTypes.string,
};

export default Header;
