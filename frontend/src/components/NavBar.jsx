import React from "react";
import { 
  Button, 
  Container, 
  Flex, 
  HStack, 
  Link, 
  Text, 
  useColorMode, 
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tooltip,
  Badge
} from "@chakra-ui/react";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FiMenu, FiHome, FiPlus, FiSearch } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";


const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("white", "gray.900");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Container 
      maxW={"full"} 
      px={4} 
      bg={bgColor} 
      position="sticky"
      top="0"
      zIndex="sticky"
      boxShadow="sm"
      borderBottom="1px"
      borderColor={borderColor}
    >
      <Flex
        maxW={"1140px"}
        mx="auto"
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <HStack spacing={2}>         
          <Text
            fontSize={{ base: "22", sm: "28" }}
            fontWeight={"extrabold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip={"text"}      
          >       
            <Link as={RouterLink} to={"/"}>
              Book Store 📚
            </Link>
          </Text>
        </HStack>

        {/* Navigation links - visible on medium screens and up */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          <Link as={RouterLink} to="/" fontWeight="medium" _hover={{ color: "blue.500" }}>
            Home
          </Link>
          <Link as={RouterLink} to="/categories" fontWeight="medium" _hover={{ color: "blue.500" }}>
            Categories
          </Link>
          <Link as={RouterLink} to="/bestsellers" fontWeight="medium" _hover={{ color: "blue.500" }}>
            Best Sellers
            <Badge ml={1} colorScheme="green">New</Badge>
          </Link>
        </HStack>

        <HStack spacing={2} alignItems={"center"}>
          <Tooltip label="Search books" placement="bottom">
            <IconButton 
              icon={<FiSearch />} 
              variant="ghost" 
              aria-label="Search books"
              _hover={{ bg: "blue.50" }}
            />
          </Tooltip>
          
          <Tooltip label="Add new book" placement="bottom">
            <Link as={RouterLink} to={"/create"}>
              <Button colorScheme="blue" leftIcon={<AiOutlinePlusSquare fontSize={20} />} display={{ base: "none", sm: "flex" }}>
                Add Book
              </Button>
              <IconButton 
                icon={<AiOutlinePlusSquare fontSize={20} />} 
                colorScheme="blue"
                display={{ base: "flex", sm: "none" }}
                aria-label="Add book"
              />
            </Link>
          </Tooltip>
          
          <Tooltip label={colorMode === "light" ? "Dark mode" : "Light mode"} placement="bottom">
            <IconButton 
              onClick={toggleColorMode}
              icon={colorMode === "light" ? <IoMoon /> : <LuSun />}
              variant="ghost"
              aria-label="Toggle color mode"
            />
          </Tooltip>
          
          {/* Mobile menu */}
          <Menu>
            <MenuButton 
              as={IconButton}
              icon={<FiMenu />}
              variant="outline"
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
            />
            <MenuList>
              <MenuItem as={RouterLink} to="/" icon={<FiHome />}>
                Home
              </MenuItem>
              <MenuItem as={RouterLink} to="/categories">
                Categories
              </MenuItem>
              <MenuItem as={RouterLink} to="/bestsellers">
                Best Sellers
                <Badge ml={2} colorScheme="green">New</Badge>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Container>
  );
};

export default NavBar;