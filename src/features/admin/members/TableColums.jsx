import { GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { deleteMember } from "./memberSlice";
import { useDispatch } from "react-redux";

const TableColumns = () => {
  const dispatch = useDispatch();

  const handleDelete = id => {
    dispatch(deleteMember(id));
  };

  const handleEdit = id => {
    dispatch(deleteMember(id));
  };

  return [
    { field: "sNo", headerName: "No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 3 },
    { field: "collegeId", headerName: "College ID", flex: 3 },
    { field: "email", headerName: "E-mail", flex: 4 },
    { field: "phone", headerName: "Phone No.", flex: 3 },
    { field: "department", headerName: "Department", flex: 3 },
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
};

export const membersTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default TableColumns;
