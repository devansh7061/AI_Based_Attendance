import { Box, Center, Image } from "@chakra-ui/react";

function Card({ property }) {
  return (
    <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Center>
        <Image src={property.imageUrl} alt={property.imageAlt} />
      </Center>
      <Box p="6">
        <Center>
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            noOfLines={1}
          >
            {property.title}
          </Box>
        </Center>
      </Box>
    </Box>
  );
}

export default Card;
