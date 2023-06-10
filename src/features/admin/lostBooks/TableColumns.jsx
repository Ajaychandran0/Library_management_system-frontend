import { Typography } from "@mui/material";

const TableColumns = () => {
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
      field: "lostDate",
      headerName: "Lost Date",
      flex: 5,
      valueGetter: params => new Date(params.value).toDateString(),
    },
    {
      field: "lostPrice",
      headerName: "Lost Fine",
      flex: 3,
      valueGetter: params => `${params.row.book.lostPrice} ₹`,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 3,
      renderCell: params => {
        return params.row.isFinePaid ? (
          <Typography
            key={params.row._id}
            sx={{ width: "7.2rem", color: "green" }}
          >
            Paid
          </Typography>
        ) : (
          <Typography key={params.row._id} sx={{ color: "red" }}>
            Not Paid
          </Typography>
        );
      },
    },
  ];
};

export default TableColumns;
