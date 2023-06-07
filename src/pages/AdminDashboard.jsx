import { Container, Grid, Paper, Typography } from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const styles = {
  container: {
    paddingTop: theme => theme.spacing(4),
    paddingBottom: theme => theme.spacing(4),
  },
  paper: {
    padding: theme => theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
};

const AdminDashboard = () => {
  const bookData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Books Count",
        fill: false,
        backgroundColor: "#8884d8",
        borderColor: "#8884d8",
        borderWidth: 1,
        pointBackgroundColor: "#8884d8",
        pointBorderColor: "#8884d8",
        pointRadius: 4,
        data: [150, 200, 300, 250, 180, 220],
      },
    ],
  };

  const memberData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Members Count",
        fill: false,
        backgroundColor: "#82ca9d",
        borderColor: "#82ca9d",
        borderWidth: 1,
        pointBackgroundColor: "#82ca9d",
        pointBorderColor: "#82ca9d",
        pointRadius: 4,
        data: [50, 70, 90, 80, 60, 100],
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const bookTableData = [
    { id: 1, title: "Book 1", author: "Author 1", available: 10, borrowed: 5 },
    { id: 2, title: "Book 2", author: "Author 2", available: 8, borrowed: 2 },
    { id: 3, title: "Book 3", author: "Author 3", available: 15, borrowed: 10 },
    { id: 4, title: "Book 4", author: "Author 4", available: 20, borrowed: 15 },
    { id: 5, title: "Book 5", author: "Author 5", available: 12, borrowed: 8 },
  ];

  return (
    <Container maxWidth="lg" sx={styles.container}>
      <Grid container spacing={3}>
        {/* Books Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={styles.paper}>
            <Typography variant="h6" gutterBottom>
              Books Chart
            </Typography>
            <Bar data={bookData} options={chartOptions} />
          </Paper>
        </Grid>

        {/* Members Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={styles.paper}>
            <Typography variant="h6" gutterBottom>
              Members Chart
            </Typography>
            <Line data={memberData} options={chartOptions} />
          </Paper>
        </Grid>

        {/* Books Table */}
        <Grid item xs={12}>
          <Paper sx={styles.paper}>
            <Typography variant="h6" gutterBottom>
              Books Table
            </Typography>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Available</th>
                  <th>Borrowed</th>
                </tr>
              </thead>
              <tbody>
                {bookTableData.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.title}</td>
                    <td>{row.author}</td>
                    <td>{row.available}</td>
                    <td>{row.borrowed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
