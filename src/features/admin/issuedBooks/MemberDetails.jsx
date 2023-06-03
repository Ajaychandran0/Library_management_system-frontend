import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

const MemberDetails = ({ memberDetails }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Member Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Department</TableCell>
          <TableCell>Phone No.</TableCell>
          <TableCell>Profile Pic</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{memberDetails[0].name}</TableCell>
          <TableCell>{memberDetails[0].email}</TableCell>
          <TableCell>{memberDetails[0].department}</TableCell>
          <TableCell>{memberDetails[0].phone}</TableCell>
          <TableCell>
            <img
              src={memberDetails[0].profilePic}
              alt="Member pic"
              style={{ width: "50px", height: "auto" }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

MemberDetails.propTypes = {
  memberDetails: PropTypes.object,
};

export default MemberDetails;
