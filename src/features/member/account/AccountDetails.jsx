import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { Edit } from "@mui/icons-material";
import { getMemberDetails, reset } from "./memberAccountSlice";
import { styles } from "./styles";

const AccountDetails = ({ onEditClick }) => {
  const member = useAccountDetails();
  return (
    <Card sx={styles.accountCard}>
      <CardHeader
        title="Account Information"
        titleTypographyProps={{ variant: "h6", fontSize: "28px" }}
        action={
          <IconButton onClick={onEditClick}>
            <Edit />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <CardMedia
              component="img"
              height="250"
              sx={{ p: 2, width: "17rem" }}
              image={member.profilePic}
              alt={member.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} mt={2}>
            <Typography variant="body1" lineHeight={2}>
              Name: {member.name}
            </Typography>
            <Typography variant="body1" lineHeight={2}>
              Email: {member.email}
            </Typography>
            <Typography variant="body1" lineHeight={2}>
              Phone: {member.phone}
            </Typography>
            <Typography variant="body1" lineHeight={2}>
              Department: {member.department}
            </Typography>
            <Typography variant="body1" lineHeight={2}>
              Address: {member.address}
            </Typography>
            <Typography variant="body1" lineHeight={2}>
              Account Created:{" "}
              {new Date(parseInt(member.createdAt)).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useAccountDetails = () => {
  const dispatch = useDispatch();
  const { memberDetails } = useSelector(state => state.memberAccount);

  useEffect(() => {
    dispatch(getMemberDetails());
    return () => dispatch(reset());
  }, []);

  return memberDetails;
};

AccountDetails.propTypes = {
  onEditClick: PropTypes.func,
};

export default AccountDetails;
