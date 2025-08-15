"use client";
import { Box, Text } from "@chakra-ui/react";

export const FooterVersion = () => {
  return (
    <Box as="footer" p={4} textAlign="center">
      <Text fontSize="sm" color="gray.500">
        Challenge v3.5
      </Text>
    </Box>
  );
};
