import { Button } from "@mui/material";

const TableColumns = openConfirmDialog => {
  return [
    {
      field: "bookTitle",
      headerName: "Book Title",
      flex: 7,
      valueGetter: params => params.row.book.bookTitle,
    },
    {
      field: "ISBN",
      headerName: "ISBN",
      flex: 4,
      valueGetter: params => params.row.book.ISBN,
    },
    {
      field: "name",
      headerName: "Member",
      flex: 3,
      valueGetter: params => params.row.member.name,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 5,
      valueGetter: params => params.row.member.email,
    },
    {
      field: "collegeId",
      headerName: "Student ID",
      flex: 4,
      valueGetter: params => params.row.member.collegeId,
    },
    {
      field: "issueDate",
      headerName: "Issue Date",
      flex: 5,
      valueGetter: params => new Date(params.value).toDateString(),
    },
    {
      field: "returnDate",
      headerName: "Return Date",
      flex: 5,
      valueGetter: params => new Date(params.value).toDateString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 6,
      renderCell: params => {
        return (
          <Button
            key={params.row._id}
            variant="contained"
            onClick={() => {
              openConfirmDialog(params.row.book._id, params.row.member._id);
            }}
          >
            Return Book
          </Button>
        );
      },
    },
  ];
};

export default TableColumns;
