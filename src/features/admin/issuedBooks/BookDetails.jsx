import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { PropTypes } from "prop-types";

const BookDetails = ({ bookDetails }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Book Title</TableCell>
          <TableCell>Available Qty</TableCell>
          <TableCell>Author</TableCell>
          <TableCell>Language</TableCell>
          <TableCell>Image</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>{bookDetails[0].bookTitle}</TableCell>
          <TableCell>{bookDetails[0].availableQty}</TableCell>
          <TableCell>{bookDetails[0].author}</TableCell>
          <TableCell>{bookDetails[0].language}</TableCell>
          <TableCell>
            <img
              src={bookDetails[0].imageUrl}
              alt="Book Cover"
              style={{ width: "50px", height: "auto" }}
            />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

BookDetails.propTypes = {
  bookDetails: PropTypes.object,
};

export default BookDetails;
