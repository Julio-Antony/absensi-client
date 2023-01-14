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
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment/moment";

moment.locale('id');

function Dashboard() {
  const [pegawai, setPegawai] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [absen, setAbsen] = useState([])
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get("/api/statistic", { headers: { "x-auth-token": token } })
      .then((res) => {
        setPegawai(res.data.pegawai)
        setAdmin(res.data.admin)
        setAbsen(res.data.absen)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          navigate("/");
        }
      });
  }, [token]);

  const labels = new Set(absen.map((item) => moment(item.createdAt).format('MMMM YYYY')))
  const array = absen.map((item) => moment(item.createdAt).format('MMMM YYYY'))
  const result = {}

  for (let i = 0; i < array.length; i += 1) {
    result[array[i]] = (result[array[i]] || 0) + 1
  }

  const chartValue = Object.values(result).map(key => (key))
  const chartDiff = chartValue.at(-1) - chartValue.at(-2)

  const chart = {
    labels: new Array(...labels),
    datasets: { label: "Desktop apps", data: chartValue },
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Kehadiran Pegawai"
                count={absen.length}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="group"
                title="Pegawai"
                count={pegawai}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="admin_panel_settings"
                title="Admin"
                count={admin}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Persentasi Kehadiran Pegawai"
                  description={
                    <>
                      (<strong>{chartDiff > 0 ? "+" : "-"}{(Math.abs(chartDiff) * +1) / chartValue.at(-2) * 100} %</strong>) dari bulan sebelumnya.
                    </>
                  }
                  date="baru saja diperbarui"
                  chart={chart}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
