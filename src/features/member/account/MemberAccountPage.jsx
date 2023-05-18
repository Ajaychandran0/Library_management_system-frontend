import { Grid, Typography, Box } from "@mui/material";
import AccountDetails from "./AccountDetails";
import { styles } from "./styles";
import { navItems } from "./navItems";
import { Link } from "react-router-dom";

const UserAccountPage = () => {
  const handleEditClick = () => {};

  return (
    <Box sx={styles.box}>
      <Typography variant="h5">MY ACCOUNT</Typography>
      <Grid container spacing={4} sx={styles.grid}>
        {navItems.map(item => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Link to={item.route}>
              <Box borderRadius={2} sx={styles.bookBox}>
                {item.label}
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
      <AccountDetails onEditClick={handleEditClick} />
    </Box>
  );
};

export default UserAccountPage;
