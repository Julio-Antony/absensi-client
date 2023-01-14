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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// import Form from "layouts/profile/components/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Images
import unknown from "layouts/profile/data/foto";

function Overview() {
  const [profil, setProfil] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    axios
      .get("/api/users/single", { headers: { "x-auth-token": token } })
      .then((res) => {
        setProfil(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/");
        }
      });
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        defFoto={profil.foto || unknown}
        defNama={profil.nama}
        defJabatan={profil.jabatan}
        defNip={profil.nip}
        defTempat={profil.tmpt_lhr}
        defTanggal={profil.tgl_lhr}
        defEmail={profil.email}
        defTelp={profil.telp}
        defAlamat={profil.alamat}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6} xl={6} sx={{ display: "flex" }}>
              <ProfileInfoCard
                title="Profil Saya"
                info={{
                  NIP: profil.nip,
                  namaLengkap: profil.nama,
                  TTL: `${profil.tmpt_lhr}, ${profil.tgl_lhr}`,
                  email: profil.email,
                  noTelepon: profil.telp,
                  alamat: profil.alamat,
                }}
                action={{ route: "", tooltip: "Edit Profile" }}
                shadow={false}
              />
            </Grid>
          </Grid>
        </MDBox>
      </Header>
    </DashboardLayout>
  );
}

export default Overview;
