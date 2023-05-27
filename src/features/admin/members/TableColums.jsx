import { GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

const TableColumns = (handleEdit, openConfirmDialog) => {
  return [
    { field: "sNo", headerName: "No.", flex: 1 },
    { field: "name", headerName: "Name", flex: 3 },
    { field: "collegeId", headerName: "College ID", flex: 3 },
    { field: "email", headerName: "E-mail", flex: 4 },
    { field: "phone", headerName: "Phone No.", flex: 3 },
    { field: "department", headerName: "Department", flex: 3 },
    {
      field: "profilePic",
      headerName: "User Pic",
      flex: 2,
      editable: true,
      renderCell: params => {
        return (
          <img
            src={params.value}
            loading="lazy"
            alt="profile picture"
            style={{
              display: "block",
              width: "4rem",
              maxWidth: "9rem",
            }}
          />
        );
      },
    },
    {
      field: "collegeIdCard",
      headerName: "ID Card",
      flex: 3,
      editable: true,
      renderCell: params => {
        return (
          <img
            src={params.value}
            loading="lazy"
            alt="College id card"
            style={{ display: "block", width: "100%", maxWidth: "9rem" }}
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

export const membersTableStyles = {
  backgroundColor: theme => theme.palette.grey[200],
  [`& .${gridClasses.cell}`]: {
    py: 2,
  },
};

export default TableColumns;
