import { Delete, Edit } from "@mui/icons-material";
import { GridActionsCellItem, gridClasses } from "@mui/x-data-grid";

const TableColumns = (handleEdit, openConfirmDialog) => {
  return [
    { field: "bookTitle", headerName: "Book Title", flex: 5 },
    { field: "ISBN", headerName: "ISBN", flex: 4 },
    { field: "author", headerName: "Author", flex: 4 },
    { field: "category", headerName: "Category", flex: 3 },
    { field: "language", headerName: "Language", flex: 3 },
    { field: "quantity", headerName: "Qty", flex: 2 },
    { field: "availableQty", headerName: "Net Qty", flex: 2 },
    { field: "lostPrice", headerName: "Lost fine", flex: 3 },
    {
      field: "imageUrl",
      headerName: "Cover Page",
      flex: 3,
      editable: true,
      renderCell: params => {
        return (
          <img
            src={params.value}
            alt="Book image"
            loading="lazy"
            style={{
              display: "block",
              alignItems: "center",
              width: "100%",
              maxWidth: "4.5rem",
            }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 3,
      getActions: params => [
        <GridActionsCellItem
          key="edit"
          icon={<Edit color="primary" />}
          label="Edit"
          onClick={() => handleEdit(params.row)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Delete color="danger" />}
          label="Delete"
          onClick={() => openConfirmDialog(params.row._id)}
        />,
      ],
    },
  ];
};

export const booksTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default TableColumns;
