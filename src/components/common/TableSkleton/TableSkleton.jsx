import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

const TableSkleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" height={60} />
      {[...Array(8)].map((_, index) => (
        <Box
          key={index}
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={255}
            height={40}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={255}
            height={40}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={255}
            height={40}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width={255}
            height={40}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default TableSkleton;
