import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const thick = defineStyle({
  borderWidth: "5px", // change the width of the border
  borderStyle: "solid", // change the style of the border
  borderRadius: 10, // set border radius to 10
  borderColor: "orange.500",
});

export const dividerTheme = defineStyleConfig({
    variants: { thick },
})