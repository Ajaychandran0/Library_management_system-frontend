import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

const DataTable = ({
  rows,
  columns,
  loading,
  sx,
  getRowId,
  paginationModel,
  handlePagination,
  rowCount,
}) => {
  const [rowCountState, setRowCountState] = useState(rowCount);

  useEffect(() => {
    setRowCountState(prevRowCountState =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      getRowId={getRowId}
      getRowHeight={() => "auto"}
      rowCount={rowCountState}
      paginationMode="server"
      pageSizeOptions={[5, 10, 25, 100]}
      paginationModel={paginationModel}
      onPaginationModelChange={newModel => {
        handlePagination(newModel);
      }}
      sx={{ ...sx, overflow: "hidden" }}
    />
  );
};

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  sx: PropTypes.object,
  getRowId: PropTypes.func,
  rowCount: PropTypes.number,
  handlePagination: PropTypes.func,
  paginationModel: PropTypes.object,
};

export default DataTable;
