import { gridClasses } from "@mui/x-data-grid";

export const categoryTableStyles = {
  height: "auto",
  backgroundColor: theme => theme.palette.grey[200],
  width: "63.6rem",
  boxShadow: 2,
  [`& .${gridClasses.cell}`]: {
    py: 1,
  },
};

export const columns = [
  { field: "id", headerName: "No.", width: 70, flex: 1 },
  { field: "name", headerName: "Category name", width: 120, flex: 3 },
  { field: "status", headerName: "Status", width: 80 },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    flex: 5,
    resizable: true,
  },
  { field: "createdAt", headerName: "Creation Date", width: 120, flex: 3 },
  { field: "updatedAt", headerName: "Updation Date", width: 120, flex: 3 },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 200,
    flex: 4,
    editable: true,
    renderCell: params => {
      console.log(params);
      return (
        <img
          src={params.value}
          alt="category image"
          style={{ width: "100%" }}
        />
      );
    },
  },
  { field: "action", headerName: "Action", width: 100, flex: 4 },
];
