// import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

const DataTable = ({ rows, columns, loading, sx, getRowId }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
      getRowId={getRowId}
      getRowHeight={() => "auto"}
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
