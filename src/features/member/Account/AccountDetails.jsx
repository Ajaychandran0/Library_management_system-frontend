import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import PropTypes from "prop-types";
import { styles } from "./styles";

const AccountDetails = ({ onEditClick }) => {
  return (
    <Card sx={styles.accountCard}>
      <CardHeader
        title="Account Information"
        titleTypographyProps={{ variant: "h6", style: { fontSize: "28px" } }}
        action={
          <IconButton onClick={onEditClick}>
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body1">Name: John Doe</Typography>
        <Typography variant="body1">Email: johndoe@example.com</Typography>
        <Typography variant="body1">Membership Status: Active</Typography>
        <Typography variant="body1">
          Account Created: January 1, 2023
        </Typography>
      </CardContent>
    </Card>
  );
};

AccountDetails.propTypes = {
  onEditClick: PropTypes.func,
};

export default AccountDetails;
