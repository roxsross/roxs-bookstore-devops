import React from "react";
import {
  Box,
  Container,
  Text,
  Flex,
  HStack,
  Icon,
  Link,
  Divider,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa";

const Footer = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const accentColor = useColorModeValue("blue.500", "blue.300");

  return (
    <Box 
      as="footer" 
      bg={bgColor} 
      borderTop="1px" 
      borderColor={borderColor}
      py={6}
      mt="auto"
    >
      <Container maxW="container.xl">
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align="center"
          textAlign={{ base: "center", md: "left" }}
        >
          <VStack align={{ base: "center", md: "flex-start" }} mb={{ base: 4, md: 0 }}>
            <Text 
              fontSize="xl" 
              fontWeight="bold" 
              bgGradient="linear(to-r, cyan.400, blue.500)" 
              bgClip="text"
            >
              Book Store 📚
            </Text>
            <Text fontSize="sm" color={textColor}>
              Tu librería digital de confianza
            </Text>
          </VStack>

          <HStack spacing={4}>
            <Link href="https://github.com/roxsross" isExternal>
              <Icon as={FaGithub} boxSize={5} color={textColor} _hover={{ color: accentColor }} />
            </Link>
            <Link href="https://x.com/roxsross" isExternal>
              <Icon as={FaTwitter} boxSize={5} color={textColor} _hover={{ color: accentColor }} />
            </Link>
            <Link href="https://linkedin.com/in/roxsross" isExternal>
              <Icon as={FaLinkedin} boxSize={5} color={textColor} _hover={{ color: accentColor }} />
            </Link>
          </HStack>
        </Flex>

        <Divider my={4} borderColor={borderColor} />

        <Flex 
          direction={{ base: "column", sm: "row" }}
          justify="center"
          align="center"
          fontSize="sm"
          color={textColor}
        >
          <Text textAlign="center">
            Desarrollado con <Icon as={FaHeart} color="red.500" mx={1} /> Bootcamp DevOps by roxsross @{new Date().getFullYear()}
          </Text>
          <HStack 
            spacing={4} 
            justify="center" 
            mt={{ base: 2, sm: 0 }} 
            ml={{ base: 0, sm: 4 }}
            divider={
              <Box 
                as="span" 
                mx={2} 
                height="4px" 
                width="4px" 
                borderRadius="full" 
                bg={textColor} 
                display={{ base: "none", sm: "inline-block" }}
              />
            }
          >
            <Link href="#" _hover={{ color: accentColor }}>Términos</Link>
            <Link href="#" _hover={{ color: accentColor }}>Privacidad</Link>
            <Link href="#" _hover={{ color: accentColor }}>Contacto</Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;