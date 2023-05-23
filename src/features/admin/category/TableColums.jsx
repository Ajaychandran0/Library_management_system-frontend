import { GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

const TableColumns = (handleEdit, openConfirmDialog) => {
  return [
    { field: "sNo", headerName: "No.", flex: 1 },
    { field: "name", headerName: "Category name", flex: 3 },
    { field: "status", headerName: "Status", flex: 2 },
    { field: "description", headerName: "Description", flex: 9 },
    { field: "createdAt", headerName: "Creation Date", flex: 3 },
    { field: "updatedAt", headerName: "Updation Date", flex: 3 },
    {
      field: "imageUrl",
      headerName: "Image",
      flex: 4,
      editable: true,
      renderCell: params => {
        return (
          <img
            src={params.value}
            loading="lazy"
            alt="category image"
            style={{ display: "block", width: "100%", maxWidth: "9rem" }}
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      flex: 2,
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

export const categoryTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  boxShadow: 2,
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default TableColumns;
