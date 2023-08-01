import { gridClasses } from "@mui/x-data-grid";

const reqBooksTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default reqBooksTableStyles;
