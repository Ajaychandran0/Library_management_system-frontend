import { gridClasses } from "@mui/x-data-grid";

export const columns = [
  { field: "id", headerName: "No.", width: 60 },
  { field: "name", headerName: "Name", width: 180 },
  { field: "collegeId", headerName: "College ID", width: 185 },
  { field: "email", headerName: "E-mail", width: 210 },
  { field: "phone", headerName: "Phone No.", width: 190 },
  { field: "department", headerName: "Department", width: 190 },
];

export const membersTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};
