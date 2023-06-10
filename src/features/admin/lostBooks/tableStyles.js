import { gridClasses } from "@mui/x-data-grid";

const lostBooksTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default lostBooksTableStyles;
