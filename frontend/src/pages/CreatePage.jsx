import { 
    Box, 
    Button, 
    Container, 
    Heading, 
    Input, 
    useColorModeValue, 
    useToast, 
    VStack,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    InputGroup,
    InputLeftElement,
    InputRightAddon,
    Textarea,
    Select,
    HStack,
    Text,
    Flex,
    Image,
    IconButton,
    Divider,
    Badge,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    ModalFooter,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Stack
} from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";
import { useBookStore } from "../../Store/book";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { FiDollarSign, FiUser, FiCalendar, FiLink, FiBook, FiTag, FiX, FiCheck, FiChevronRight } from "react-icons/fi";

const CreatePage = () => {
    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        publishYear: new Date().getFullYear(),
        price: "",
        image: "",
        category: "",
        description: "",
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const toast = useToast();
    const navigate = useNavigate();
    const formRef = useRef();
    const { createBook, fetchBooks } = useBookStore();
    const previewDisclosure = useDisclosure();
    
    // Asegurar que los libros estén cargados antes de redirigir
    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.700");

    const validateForm = () => {
        const newErrors = {};
        if (!newBook.title) newErrors.title = "El título es obligatorio";
        if (!newBook.author) newErrors.author = "El autor es obligatorio";
        if (!newBook.publishYear) newErrors.publishYear = "El año de publicación es obligatorio";
        if (!newBook.price) newErrors.price = "El precio es obligatorio";
        if (newBook.price && isNaN(parseFloat(newBook.price))) newErrors.price = "El precio debe ser un número";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook({ ...newBook, [name]: value });
        
        // Clear error when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: undefined });
        }
        
        // Set preview for image URL
        if (name === 'image' && value) {
            setPreviewImage(value);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            toast({
                title: "Formulario incompleto",
                description: "Por favor completa todos los campos obligatorios.",
                status: "warning",
                isClosable: true,
                position: "top",
                duration: 3000,
            });
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const { success, message } = await createBook(newBook);
            
            if (!success) {
                toast({
                    title: "Error",
                    description: message,
                    status: "error",
                    isClosable: true,
                    position: "top",
                    duration: 5000,
                });
            } else {
                toast({
                    title: "¡Libro añadido con éxito!",
                    description: `"${newBook.title}" ha sido agregado a la biblioteca.`,
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                    position: "top",
                });
                
                // Reset form
                setNewBook({ 
                    title: "", 
                    author: "", 
                    publishYear: new Date().getFullYear(), 
                    price: "", 
                    image: "",
                    category: "",
                    description: ""
                });
                setPreviewImage("");
                
                // Redirect to home page after successful creation
                setTimeout(() => {
                    // Forzar una recarga completa para asegurar que todos los estados se reinicien
                    window.location.href = '/';
                    // Alternativa si la navegación programática da problemas:
                    // navigate('/', { replace: true });
                }, 1500);
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ha ocurrido un error al procesar tu solicitud.",
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePreview = () => {
        previewDisclosure.onOpen();
    };

    return (
        <Container maxW={"container.md"} py={8}>
            <VStack spacing={8} align="stretch">
                {/* Breadcrumb navigation */}
                <Breadcrumb separator={<FiChevronRight color="gray.500" />}>
                    <BreadcrumbItem>
                        <BreadcrumbLink as={RouterLink} to="/">Inicio</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbItem isCurrentPage>
                        <BreadcrumbLink>Nuevo Libro</BreadcrumbLink>
                    </BreadcrumbItem>
                </Breadcrumb>

                <Heading 
                    as={"h1"} 
                    size={"xl"} 
                    textAlign={"center"} 
                    mb={2}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                >
                    Añadir Nuevo Libro
                </Heading>
                
                <Text textAlign="center" color="gray.500" mb={6}>
                    Completa el formulario para agregar un nuevo libro a la biblioteca
                </Text>

                <Flex 
                    direction={{ base: "column", md: "row" }} 
                    spacing={8} 
                    gap={8}
                >
                    {/* Left column: Form */}
                    <Box 
                        flex="3"
                        bg={bgColor} 
                        p={6} 
                        rounded={"lg"} 
                        shadow={"md"}
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <form ref={formRef} onSubmit={handleAddBook}>
                            <VStack spacing={5} align="stretch">
                                <FormControl isRequired isInvalid={errors.title}>
                                    <FormLabel>Título del libro</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <FiBook color="gray.300" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder='Título'
                                            name='title'
                                            value={newBook.title}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                    {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
                                </FormControl>
                                
                                <FormControl isRequired isInvalid={errors.author}>
                                    <FormLabel>Autor</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <FiUser color="gray.300" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder='Nombre del autor'
                                            name='author'
                                            value={newBook.author}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                    {errors.author && <FormErrorMessage>{errors.author}</FormErrorMessage>}
                                </FormControl>
                                
                                <HStack spacing={4}>
                                    <FormControl isRequired isInvalid={errors.publishYear}>
                                        <FormLabel>Año de publicación</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <FiCalendar color="gray.300" />
                                            </InputLeftElement>
                                            <Input
                                                placeholder='Año'
                                                name='publishYear'
                                                type='number'
                                                value={newBook.publishYear}
                                                onChange={handleInputChange}
                                                min="1000"
                                                max={new Date().getFullYear()}
                                            />
                                        </InputGroup>
                                        {errors.publishYear && <FormErrorMessage>{errors.publishYear}</FormErrorMessage>}
                                    </FormControl>
                                    
                                    <FormControl isRequired isInvalid={errors.price}>
                                        <FormLabel>Precio</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement pointerEvents="none">
                                                <FiDollarSign color="gray.300" />
                                            </InputLeftElement>
                                            <Input
                                                placeholder='Precio'
                                                name='price'
                                                type='number'
                                                step="0.01"
                                                min="0"
                                                value={newBook.price}
                                                onChange={handleInputChange}
                                            />
                                            <InputRightAddon>USD</InputRightAddon>
                                        </InputGroup>
                                        {errors.price && <FormErrorMessage>{errors.price}</FormErrorMessage>}
                                    </FormControl>
                                </HStack>
                                
                                <FormControl>
                                    <FormLabel>Categoría</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <FiTag color="gray.300" />
                                        </InputLeftElement>
                                        <Select
                                            placeholder='Selecciona una categoría'
                                            name='category'
                                            value={newBook.category}
                                            onChange={handleInputChange}
                                        >
                                            <option value='fiction'>Ficción</option>
                                            <option value='non-fiction'>No Ficción</option>
                                            <option value='science'>Ciencia</option>
                                            <option value='biography'>Biografía</option>
                                            <option value='history'>Historia</option>
                                            <option value='self-help'>Autoayuda</option>
                                            <option value='technology'>Tecnología</option>
                                        </Select>
                                    </InputGroup>
                                    <FormHelperText>Selecciona la categoría que mejor describe el libro</FormHelperText>
                                </FormControl>
                                
                                <FormControl>
                                    <FormLabel>Descripción</FormLabel>
                                    <Textarea
                                        placeholder='Breve descripción del libro...'
                                        name='description'
                                        value={newBook.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                    />
                                </FormControl>
                                
                                <FormControl>
                                    <FormLabel>URL de la imagen</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement pointerEvents="none">
                                            <FiLink color="gray.300" />
                                        </InputLeftElement>
                                        <Input
                                            placeholder='URL de la imagen de portada'
                                            name='image'
                                            value={newBook.image}
                                            onChange={handleInputChange}
                                        />
                                    </InputGroup>
                                    <FormHelperText>Introduce la URL de la imagen de portada del libro</FormHelperText>
                                </FormControl>
                                
                                <Stack direction={{base: "column", sm: "row"}} spacing={4} pt={4}>
                                    <Button 
                                        colorScheme='blue' 
                                        type="submit" 
                                        flex={1}
                                        isLoading={isSubmitting}
                                        loadingText="Guardando..."
                                        leftIcon={<FiCheck />}
                                    >
                                        Guardar Libro
                                    </Button>
                                    
                                    <Button 
                                        colorScheme='gray' 
                                        onClick={handlePreview} 
                                        isDisabled={!newBook.title}
                                        flex={1}
                                    >
                                        Vista previa
                                    </Button>
                                </Stack>
                            </VStack>
                        </form>
                    </Box>
                    
                    {/* Right column: Preview */}
                    <Box 
                        flex="2" 
                        display={{base: "none", md: "block"}}
                        bg={bgColor}
                        p={6}
                        rounded={"lg"}
                        shadow={"md"}
                        borderWidth="1px"
                        borderColor={borderColor}
                    >
                        <VStack spacing={4} align="stretch">
                            <Heading size="md" mb={2}>Vista Previa</Heading>
                            <Divider />
                            
                            <Box 
                                bg={bgColor} 
                                borderRadius="md" 
                                overflow="hidden" 
                                borderWidth="1px" 
                                borderColor={borderColor}
                                shadow="sm"
                            >
                                <Box h="200px" bg="gray.100" position="relative">
                                    {previewImage ? (
                                        <Image 
                                            src={previewImage} 
                                            alt={newBook.title || "Vista previa"} 
                                            fallbackSrc="https://via.placeholder.com/300x200?text=Vista+Previa"
                                            objectFit="cover"
                                            w="full"
                                            h="full"
                                        />
                                    ) : (
                                        <Flex 
                                            h="full" 
                                            justify="center" 
                                            align="center" 
                                            color="gray.400"
                                            direction="column"
                                        >
                                            <Text>Vista previa de la imagen</Text>
                                            <Text fontSize="sm">Añade una URL de imagen</Text>
                                        </Flex>
                                    )}
                                    
                                    {newBook.category && (
                                        <Badge 
                                            position="absolute" 
                                            top={2} 
                                            left={2}
                                            colorScheme="blue"
                                            px={2}
                                            py={1}
                                        >
                                            {newBook.category}
                                        </Badge>
                                    )}
                                </Box>
                                
                                <Box p={4}>
                                    <Heading size="md" noOfLines={1}>
                                        {newBook.title || "Título del libro"}
                                    </Heading>
                                    
                                    <Text fontWeight="medium" mt={2} color="gray.600">
                                        {newBook.author || "Autor"}
                                    </Text>
                                    
                                    <Text fontSize="sm" color="gray.500" mt={1}>
                                        {newBook.publishYear || "Año"}
                                    </Text>
                                    
                                    <Text fontWeight="bold" fontSize="xl" color="blue.500" mt={3}>
                                        {newBook.price ? `$${newBook.price}` : "$0.00"}
                                    </Text>
                                    
                                    {newBook.description && (
                                        <Text fontSize="sm" mt={3} noOfLines={3}>
                                            {newBook.description}
                                        </Text>
                                    )}
                                </Box>
                            </Box>
                        </VStack>
                    </Box>
                </Flex>
            </VStack>
            
            {/* Preview Modal (for mobile) */}
            <Modal isOpen={previewDisclosure.isOpen} onClose={previewDisclosure.onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Vista Previa del Libro</ModalHeader>
                    <ModalCloseButton />
                    
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Box position="relative">
                                <Image 
                                    src={previewImage || "https://via.placeholder.com/600x400?text=No+Image"} 
                                    alt={newBook.title || "Vista previa"}
                                    borderRadius="md"
                                    mb={2}
                                    mx="auto"
                                    h="200px"
                                    objectFit="cover"
                                />
                                
                                {newBook.category && (
                                    <Badge 
                                        position="absolute" 
                                        top={2} 
                                        left={2}
                                        colorScheme="blue"
                                        px={2}
                                        py={1}
                                    >
                                        {newBook.category}
                                    </Badge>
                                )}
                            </Box>
                            
                            <Heading size="lg">{newBook.title || "Título del libro"}</Heading>
                            
                            <Text fontWeight="bold">Autor: {newBook.author || "No especificado"}</Text>
                            
                            <Flex justify="space-between">
                                <Text>Año: {newBook.publishYear || "No especificado"}</Text>
                                <Text fontWeight="bold" color="blue.500">Precio: ${newBook.price || "0.00"}</Text>
                            </Flex>
                            
                            <Divider />
                            
                            <Box>
                                <Text fontWeight="bold" mb={2}>Descripción:</Text>
                                <Text>{newBook.description || "No hay descripción disponible para este libro."}</Text>
                            </Box>
                        </VStack>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={previewDisclosure.onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};

export default CreatePage;