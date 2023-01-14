/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/* eslint no-underscore-dangle: 0 */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Images
import unknown from "layouts/profile/data/foto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

export default function data() {
  const [pegawai, setPegawai] = useState([])
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("/api/users", { headers: { "x-auth-token": token } })
      .then((res) => {
        setPegawai(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/");
        }
      });
  }, [token]);

  const onDelete = (id) => {
    swal({
      title: "Apa anda yakin menghapus pengumuman ini ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`/api/users/${id}`, {
            headers: { "x-auth-token": token },
          })
          .then((res) => {
            const newData = pegawai.filter((user) => user._id !== id);
            setPegawai(newData);
            swal(res.data.msg, {
              icon: "success",
            });
          });
      } else {
        swal("Data gagal dihapus");
      }
    });
  }

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={`data:image/png;base64,${image}`} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Pegawai", accessor: "author", width: "45%", align: "left" },
      { Header: "NIP", accessor: "nip", align: "left" },
      { Header: "jabatan", accessor: "jabatan", align: "center" },
      { Header: "alamat", accessor: "alamat", align: "center" },
      { Header: "aksi", accessor: "aksi", align: "center" },
    ],

    rows: pegawai.map((item) => ({
      author: <Author image={item.foto || unknown} name={item.nama} email={item.email} />,
      nip: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.nip}
        </MDTypography>
      ),
      jabatan: <Job title={item.jabatan} />,
      alamat: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.alamat || "-"}
        </MDTypography>
      ),
      aksi: (
        <>
          <MDTypography component="a" href={`/editPegawai/${item._id}`} variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
          <MDTypography ml={2} component="a" variant="caption" color="text" fontWeight="medium">
            |
          </MDTypography>
          <MDTypography ml={2} component="a" href="#" variant="caption" color="text" fontWeight="medium" onClick={() => onDelete(item._id)}>
            Hapus
          </MDTypography>
        </>
      )
    })
    )

  };
}
