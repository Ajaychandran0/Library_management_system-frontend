import { GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

const handleDelete = id => {
  console.log(id, "delete called");
};

const handleEdit = id => {
  console.log(id, "edit called");
};

export const categoryTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  boxShadow: 2,
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export const columns = [
  { field: "sNo", headerName: "No.", flex: 1 },
  { field: "name", headerName: "Category name", flex: 3 },
  { field: "status", headerName: "Status" },
  { field: "description", headerName: "Description", flex: 5 },
  { field: "createdAt", headerName: "Creation Date", width: 120, flex: 3 },
  { field: "updatedAt", headerName: "Updation Date", width: 120, flex: 3 },
  {
    field: "imageUrl",
    headerName: "Image",
    width: 200,
    flex: 4,
    editable: true,
    renderCell: params => {
      return (
        <img
          src={params.value}
          alt="category image"
          style={{ width: "100%" }}
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
        onClick={() => handleEdit(params.row._id)}
      />,
      <GridActionsCellItem
        key="delete"
        icon={<Delete color="danger" />}
        label="Delete"
        onClick={() => handleDelete(params.row._id)}
      />,
    ],
  },
];
