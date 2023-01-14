import React, { useState } from "react";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { Badge, Card, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup } from "@mui/material";
import { useForm } from "react-hook-form";
import MDButton from "components/MDButton";
import { PhotoCamera } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import MDAvatar from "components/MDAvatar";

function Form({ id, defNama, defNip, defTempat, defTanggal, defEmail, defTelp, defAlamat, defFoto, defJabatan }) {
    const [nip, setNip] = useState(defNip);
    const [nama, setNama] = useState(defNama);
    const [tempat, setTempat] = useState(defTempat);
    const [tanggal, setTanggal] = useState(defTanggal || "1970-01-01");
    const [email, setEmail] = useState(defEmail);
    const [telp, setTelp] = useState(defTelp);
    const [alamat, setAlamat] = useState(defAlamat);
    const [foto, setFoto] = useState(defFoto);
    const [jabatan, setJabatan] = useState(defJabatan);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const bodyFormData = {
        nip, nama, tmpt_lhr: tempat, tgl_lhr: tanggal, email, telp, alamat, foto, jabatan
    }

    const onSubmit = () => {
        const token = localStorage.getItem("access_token");
        axios
            .put(`/api/users/${id}`, bodyFormData, { headers: { "x-auth-token": token } })
            .then((res) => {
                swal({
                    title: "Success",
                    text: res.data.msg,
                    icon: "success",
                    buttons: false,
                    dangerMode: false,
                })
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    navigate("/");
                }
            });
    }

    function Upload(event) {
        event.preventDefault();
        const fileReader1 = new FileReader();
        const file1 = event.target.files[0];
        fileReader1.onload = () => {
            setFoto(
                fileReader1.result.substr(fileReader1.result.indexOf(",") + 1)
            );
        };

        if (file1) {
            fileReader1.readAsDataURL(file1);
        }
    }

    return (
        <Card sx={{ height: "100%", boxShadow: "none" }}>
            <MDBox justifyContent="space-between" alignItems="center" pt={2} px={2}>
                <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
                    Sunting Profil
                </MDTypography>
            </MDBox>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} xl={6} >
                    <MDBox p={2}>
                        <MDBox component="form" role="form">
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="NIP"
                                    id="nip"
                                    name="nip"
                                    value={nip}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register("nip")}
                                    onChange={(e) => setNip(e.target.value)}
                                    fullWidth
                                />
                                {errors.nip && (
                                    <MDTypography variant="inherit" color="error">
                                        {errors.nip.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Nama Lengkap"
                                    id="nama"
                                    name="nama"
                                    value={nama}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register("nama")}
                                    onChange={(e) => setNama(e.target.value)}
                                    fullWidth
                                />
                                {errors.nama && (
                                    <MDTypography variant="inherit" color="error">
                                        {errors.nama.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                            <MDBox mb={2}>
                                <FormControl>
                                    <FormLabel id="demo-row-radio-buttons-group-label">Jabatan</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        value={jabatan}
                                        onChange={(e) => setJabatan(e.target.value)}
                                    >
                                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                                        <FormControlLabel value="pegawai" control={<Radio />} label="Pegawai" />
                                    </RadioGroup>
                                </FormControl>
                                {errors.jabatan && (
                                    <MDTypography variant="inherit" color="error">
                                        {errors.jabatan.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Tempat Lahir"
                                    id="tempat"
                                    name="tempat"
                                    value={tempat}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register("tempat")}
                                    onChange={(e) => setTempat(e.target.value)}
                                    fullWidth
                                />
                                {errors.tempat && (
                                    <MDTypography variant="inherit" color="error">
                                        {errors.tempat.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="date"
                                    label="Tanggal Lahir"
                                    id="tanggal"
                                    name="tanggal"
                                    value={tanggal}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register("tanggal")}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    fullWidth
                                />
                                {errors.tanggal && (
                                    <MDTypography variant="inherit" color="error">
                                        {errors.tanggal.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="email"
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
                                    type="text"
                                    label="Telepon"
                                    id="telp"
                                    name="telp"
                                    value={telp}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register("telp")}
                                    onChange={(e) => setTelp(e.target.value)}
                                    fullWidth
                                />
                                {errors.telp && (
                                    <MDTypography variant="inherit" color="error">
                                        {errors.telp.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                            <MDBox mb={2}>
                                <MDInput
                                    type="text"
                                    label="Alamat"
                                    id="alamat"
                                    name="alamat"
                                    value={alamat}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register("alamat")}
                                    onChange={(e) => setAlamat(e.target.value)}
                                    fullWidth
                                    multiline rows={5}
                                />
                                {errors.alamat && (
                                    <MDTypography variant="inherit" color="error">
                                        {errors.alamat.message}
                                    </MDTypography>
                                )}
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                    <MDBox p={2}>
                        <MDBox mb={2} justifyContent="center" display="flex">
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <MDAvatar sx={{ bgcolor: indigo[500] }}>
                                        <IconButton color="primary" aria-label="upload picture" component="label">
                                            <input hidden accept="image/*" type="file" onChange={Upload} />
                                            <PhotoCamera color="light" />
                                        </IconButton>
                                    </MDAvatar>
                                }
                            >
                                <MDAvatar alt="Profil" src={`data:image/png;base64,${foto}`} sx={{ width: 200, height: 200 }} />
                            </Badge>
                        </MDBox>
                        <MDButton
                            variant="gradient"
                            color="info"
                            // disabled={loading}
                            onClick={handleSubmit(onSubmit)}
                            fullWidth
                        >
                            Perbarui
                        </MDButton>
                    </MDBox>
                </Grid>
            </Grid>
        </Card>
    );
}

// Setting default props for the Header
Form.defaultProps = {
    id: "",
    foto: "",
    defNama: "",
    defNip: "",
    defTempat: "",
    defTanggal: "",
    defEmail: "",
    defTelp: "",
    defAlamat: "",
    defFoto: "",
    defJabatan: "",
};

// Typechecking props for the Header
Form.propTypes = {
    id: PropTypes.string,
    foto: PropTypes.string,
    defNama: PropTypes.string,
    defNip: PropTypes.string,
    defTempat: PropTypes.string,
    defTanggal: PropTypes.string,
    defEmail: PropTypes.string,
    defTelp: PropTypes.string,
    defAlamat: PropTypes.string,
    defFoto: PropTypes.string,
    defJabatan: PropTypes.string,
};

export default Form;
