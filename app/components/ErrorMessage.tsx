import React, { PropsWithChildren } from "react";

import { Text } from "@radix-ui/themes";

const ErrorMessage = ({ children }: PropsWithChildren): JSX.Element | null => {
  if (!children) return null;

  return (
    <Text as="p" color="red">
      {children}
    </Text>
  );
};

export default ErrorMessage;
