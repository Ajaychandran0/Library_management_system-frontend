import { gridClasses } from "@mui/x-data-grid";

const booksTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default booksTableStyles;
