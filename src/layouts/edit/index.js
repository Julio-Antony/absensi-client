// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Overview page components
import Header from "layouts/edit/components/Header";

// import Form from "layouts/profile/components/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// Images
import unknown from "layouts/profile/data/foto";

function Overview() {
  const [profil, setProfil] = useState({});
  const navigate = useNavigate();
  const { id } = useParams()

  const token = localStorage.getItem("access_token");
  useEffect(() => {
    axios
      .get(`/api/users/single/${id}`, { headers: { "x-auth-token": token } })
      .then((res) => {
        setProfil(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/");
        }
      });
  }, [token]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header
        id={id}
        defFoto={profil.foto || unknown}
        defNama={profil.nama}
        defJabatan={profil.jabatan}
        defNip={profil.nip}
        defTempat={profil.tmpt_lhr}
        defTanggal={profil.tgl_lhr}
        defEmail={profil.email}
        defTelp={profil.telp}
        defAlamat={profil.alamat}
      />
    </DashboardLayout>
  );
}

export default Overview;
