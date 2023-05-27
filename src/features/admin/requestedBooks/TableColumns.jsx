import { Button } from "@mui/material";

const TableColumns = openConfirmDialog => {
  return [
    { field: "bookTitle", headerName: "Book Title", flex: 6 },
    { field: "ISBN", headerName: "ISBN", flex: 4 },
    { field: "name", headerName: "Member", flex: 3 },
    { field: "email", headerName: "Email", flex: 5 },
    { field: "collegeId", headerName: "Student ID", flex: 4 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 4,
      editable: true,
      renderCell: params => {
        return (
          <Button
            key={params.row._id}
            variant="contained"
            onClick={() => {
              openConfirmDialog(params.row._id);
            }}
          >
            Issue Book
          </Button>
        );
      },
    },
  ];
};

export default TableColumns;
