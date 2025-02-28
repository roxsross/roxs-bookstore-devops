import { 
	Box, 
	Container, 
	SimpleGrid, 
	Text, 
	VStack, 
	Heading, 
	Flex, 
	Input,
	InputGroup,
	InputLeftElement,
	Select,
	HStack,
	Button,
	Skeleton,
	Alert,
	AlertIcon,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	useColorModeValue,
	Image,
	Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useBookStore } from "../../Store/book";
import BookCard from "../components/BookCard";
import { FiSearch, FiFilter, FiPlus } from "react-icons/fi";

const HomePage = () => {
	const { fetchBooks, books } = useBookStore();
	const [isLoading, setIsLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filterCategory, setFilterCategory] = useState("");
	const [sortBy, setSortBy] = useState("newest");
	const bgColor = useColorModeValue("gray.50", "gray.900");
	const cardBg = useColorModeValue("white", "gray.800");
	
	useEffect(() => {
		const loadBooks = async () => {
			setIsLoading(true);
			await fetchBooks();
			setIsLoading(false);
		};
		
		loadBooks();
	}, [fetchBooks]);

	// Filter and sort books
	const filteredBooks = books.filter(book => {
		const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
							  book.author?.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = filterCategory === "" || book.category === filterCategory;
		return matchesSearch && matchesCategory;
	});

	const sortedBooks = [...filteredBooks].sort((a, b) => {
		switch(sortBy) {
			case "title":
				return a.title.localeCompare(b.title);
			case "author":
				return a.author.localeCompare(b.author);
			case "price-asc":
				return a.price - b.price;
			case "price-desc":
				return b.price - a.price;
			case "newest":
				return b.publishYear - a.publishYear;
			default:
				return 0;
		}
	});

	// Get unique categories for filter dropdown
	const categories = [...new Set(books
		.filter(book => book.category)
		.map(book => book.category))];

	// Featured books (for example, 3 newest books)
	const featuredBooks = [...books]
		.sort((a, b) => b.publishYear - a.publishYear)
		.slice(0, 3);
		
	return (
		<Box bg={bgColor} minH="100vh" py={6}>
			<Container maxW='container.xl' py={6}>
				<VStack spacing={8} align="stretch">
					{/* Hero Section */}
					<Box 
						borderRadius="lg" 
						overflow="hidden" 
						position="relative" 
						height={{base: "200px", md: "300px"}}
						mb={6}
					>
						<Box 
							position="absolute" 
							top="0" 
							left="0" 
							right="0" 
							bottom="0" 
							bg="blue.600" 
							backgroundImage="linear-gradient(to right, #3182CE, #63B3ED)"
						/>
						
						<Flex 
							position="relative" 
							h="full" 
							align="center" 
							direction={{base: "column", md: "row"}}
							px={8}
							color="white"
						>
							<VStack align={{base: "center", md: "flex-start"}} spacing={4} flex="1" textAlign={{base: "center", md: "left"}}>
								<Heading size="2xl">
									Descubre tu próxima lectura favorita
								</Heading>
								<Text fontSize="xl">
									Explora nuestro catálogo de libros y encuentra historias que te inspirarán
								</Text>
								<Button 
									as={RouterLink} 
									to="/create" 
									colorScheme="white" 
									variant="outline" 
									size="lg" 
									leftIcon={<FiPlus />}
									_hover={{bg: "white", color: "blue.600"}}
								>
									Añadir nuevo libro
								</Button>
							</VStack>
							
							<Box display={{base: "none", md: "block"}} flex="1">
								<Image 
									src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
									alt="Books"
									h="200px"
									objectFit="contain"
									float="right"
									borderRadius="lg"
									boxShadow="lg"
									transform="rotate(10deg)"
								/>
							</Box>
						</Flex>
					</Box>

					{/* Title with gradient */}
					<Text
						fontSize={"3xl"}
						fontWeight={"bold"}
						bgGradient={"linear(to-r, cyan.400, blue.500)"}
						bgClip={"text"}
						textAlign={"center"}
						mb={2}
					>
						La Librería DevOps 📚
					</Text>

					{/* Filter and Search Section */}
					<Flex 
						direction={{base: "column", md: "row"}} 
						justify="space-between" 
						align={{base: "stretch", md: "center"}}
						gap={4}
						p={4}
						bg={cardBg}
						borderRadius="md"
						shadow="sm"
					>
						<InputGroup maxW={{base: "full", md: "400px"}}>
							<InputLeftElement pointerEvents="none">
								<FiSearch color="gray.300" />
							</InputLeftElement>
							<Input 
								placeholder="Buscar por título o autor..." 
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</InputGroup>
						
						<HStack spacing={4}>
							<Select 
								placeholder="Categoría" 
								value={filterCategory}
								onChange={(e) => setFilterCategory(e.target.value)}
								icon={<FiFilter />}
								maxW="200px"
							>
								<option value="">Todas las categorías</option>
								{categories.map(category => (
									<option key={category} value={category}>
										{category.charAt(0).toUpperCase() + category.slice(1)}
									</option>
								))}
							</Select>
							
							<Select 
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								maxW="200px"
							>
								<option value="newest">Más recientes</option>
								<option value="title">Título A-Z</option>
								<option value="author">Autor A-Z</option>
								<option value="price-asc">Precio: menor a mayor</option>
								<option value="price-desc">Precio: mayor a menor</option>
							</Select>
						</HStack>
					</Flex>

					{/* Tabs for different views */}
					<Tabs variant="soft-rounded" colorScheme="blue">
						<TabList>
							<Tab>Todos los libros</Tab>
							<Tab>Destacados</Tab>
							<Tab>Categorías</Tab>
						</TabList>
						
						<TabPanels>
							{/* All Books Tab */}
							<TabPanel px={0}>
								{isLoading ? (
									<SimpleGrid
										columns={{
											base: 1,
											sm: 2,
											md: 3,
											lg: 4,
										}}
										spacing={6}
									>
										{[...Array(8)].map((_, index) => (
											<Box key={index} height="400px">
												<Skeleton height="200px" mb={4} />
												<Skeleton height="20px" mb={2} />
												<Skeleton height="20px" mb={2} />
												<Skeleton height="20px" mb={2} />
												<Skeleton height="40px" />
											</Box>
										))}
									</SimpleGrid>
								) : sortedBooks.length > 0 ? (
									<>
										<Text mb={4} fontSize="lg" fontWeight="medium">
											Mostrando {sortedBooks.length} de {books.length} libros
										</Text>
										<SimpleGrid
											columns={{
												base: 1,
												sm: 2,
												md: 3,
												lg: 4,
											}}
											spacing={6}
										>
											{sortedBooks.map((book) => (
												<BookCard key={book._id} book={book} />
											))}
										</SimpleGrid>
									</>
								) : (
									<Alert status="info" borderRadius="md">
										<AlertIcon />
										{searchTerm || filterCategory ? 
											"No se encontraron libros con los filtros seleccionados." : 
											"No hay libros disponibles."}
										{books.length === 0 && (
											<Link as={RouterLink} to="/create" ml={2} color="blue.500">
												¿Quieres añadir uno?
											</Link>
										)}
									</Alert>
								)}
							</TabPanel>
							
							{/* Featured Books Tab */}
							<TabPanel px={0}>
								{isLoading ? (
									<SimpleGrid columns={{base: 1, md: 3}} spacing={6}>
										{[...Array(3)].map((_, index) => (
											<Box key={index} height="400px">
												<Skeleton height="200px" mb={4} />
												<Skeleton height="20px" mb={2} />
												<Skeleton height="20px" mb={2} />
												<Skeleton height="20px" />
											</Box>
										))}
									</SimpleGrid>
								) : featuredBooks.length > 0 ? (
									<SimpleGrid columns={{base: 1, md: 3}} spacing={6}>
										{featuredBooks.map((book) => (
											<BookCard key={book._id} book={book} />
										))}
									</SimpleGrid>
								) : (
									<Alert status="info" borderRadius="md">
										<AlertIcon />
										No hay libros destacados disponibles.
									</Alert>
								)}
							</TabPanel>
							
							{/* Categories Tab */}
							<TabPanel px={0}>
								{categories.length > 0 ? (
									<VStack spacing={8} align="stretch">
										{categories.map(category => {
											const categoryBooks = books.filter(book => book.category === category);
											return (
												<Box key={category}>
													<Heading size="md" mb={4} textTransform="capitalize">
														{category}
													</Heading>
													<SimpleGrid columns={{base: 1, sm: 2, md: 3, lg: 4}} spacing={6}>
														{categoryBooks.slice(0, 4).map(book => (
															<BookCard key={book._id} book={book} />
														))}
													</SimpleGrid>
													{categoryBooks.length > 4 && (
														<Text textAlign="right" mt={2}>
															<Link color="blue.500" as="button" onClick={() => {
																setFilterCategory(category);
																document.querySelector('[role="tablist"]').children[0].click();
															}}>
																Ver todos los {categoryBooks.length} libros →
															</Link>
														</Text>
													)}
												</Box>
											);
										})}
									</VStack>
								) : (
									<Alert status="info" borderRadius="md">
										<AlertIcon />
										No hay categorías disponibles. Agrega categorías a tus libros.
									</Alert>
								)}
							</TabPanel>
						</TabPanels>
					</Tabs>
				</VStack>
			</Container>
		</Box>
	);
};

export default HomePage;