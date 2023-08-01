import { gridClasses } from "@mui/x-data-grid";

const issuedBooksTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default issuedBooksTableStyles;
