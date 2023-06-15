import { MenuItem, Select } from "@mui/material";

const TableColumns = () => {
  const handleStatusChange = event => {
    console.log(event.target.value);
  };

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
      flex: 5,
      renderCell: params => {
        return (
          <Select
            value={params.row.isFinePaid ? "paid" : "notPaid"}
            onChange={handleStatusChange}
            sx={{ color: () => (params.row.isFinePaid ? "green" : "red") }}
          >
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="notPaid">Not Paid</MenuItem>
          </Select>
        );
      },
    },
  ];
};

export default TableColumns;
