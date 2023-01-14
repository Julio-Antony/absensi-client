/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint no-underscore-dangle: 0 */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";

moment.locale('id');

export default function data() {
  const [pegawai, setPegawai] = useState([])
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("/api/absensi", { headers: { "x-auth-token": token } })
      .then((res) => {
        setPegawai(res.data);
        console.log(`${res.data[0].jam_klr.substr(0, 10)}T00:00:00.000Z`)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/");
        }
      });
  }, [token]);

  const lateness = (masuk) => {
    const onTime = moment(masuk).set("hour", 7).set("minute", 0)
    const diffent = moment(masuk).diff(moment(onTime), 'minutes')
    return diffent;
  };

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  return {
    columns: [
      { Header: "nama", accessor: "nama", width: "25%", align: "left" },
      { Header: "tanggal", accessor: "tanggal", align: "center" },
      { Header: "keterangan", accessor: "keterangan", align: "center" },
      { Header: "jam masuk", accessor: "jamMasuk", align: "center" },
      { Header: "jam keluar", accessor: "jamKeluar", align: "center" },
    ],

    rows: pegawai.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((item) => ({
      nama: <Author image={`data:image/png;base64,${item.user.foto}`} name={item.user.nama} email={item.user.email} />,
      tanggal: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(item.createdAt).format('L')}
        </MDTypography>
      ),
      keterangan: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={lateness(item.jam_msk) > 10 ? "terlambat" : "hadir"} color={lateness(item.jam_msk) > 10 ? "error" : "success"} variant="gradient" size="sm" />
        </MDBox>
      ),
      jamMasuk: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {moment(item.jam_msk).format('HH:mm')}
        </MDTypography>
      ),
      jamKeluar: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.jam_klr ? moment(item.jam_klr).format('HH:mm') : "-"}
        </MDTypography>
      ),
    })
    )
  };
}
