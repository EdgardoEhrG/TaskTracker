import { Box } from "@radix-ui/themes";

import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

const SkeletonForm = (): JSX.Element => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="3rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default SkeletonForm;
