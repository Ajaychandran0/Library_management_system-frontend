import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

const DataTable = ({ rows, columns, loading, sx, getRowId }) => {
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      sx={{
        ...sx,
        overflow: "hidden",
      }}
      getRowId={getRowId}
      getRowHeight={() => "auto"}
      pageSizeOptions={[5, 10, 25, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
    />
  );
};

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  sx: PropTypes.object,
  getRowId: PropTypes.func,
};

export default DataTable;
