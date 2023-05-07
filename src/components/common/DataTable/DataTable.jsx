// import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";

const DataTable = ({ rows, columns, loading, sx }) => {
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      sx={sx}
      getRowHeight={() => "auto"}
    />
  );
};

DataTable.propTypes = {
  rows: PropTypes.array,
  columns: PropTypes.array,
  loading: PropTypes.bool,
  sx: PropTypes.object,
};

export default DataTable;
