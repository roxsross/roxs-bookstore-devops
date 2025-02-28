import { MdDelete, MdEdit, MdInfo } from 'react-icons/md';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {
	Box,
	Button,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
	useColorModeValue,
	useDisclosure,
	useToast,
	VStack,
	Badge,
	Flex,
	Tooltip,
	Textarea,
	Select,
} from "@chakra-ui/react";
import { useBookStore } from "../../Store/book";
import { useState } from "react";
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
	const [updatedBook, setUpdatedBook] = useState(book);
	const [isFavorite, setIsFavorite] = useState(false);

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");
	const borderColor = useColorModeValue("gray.200", "gray.700");
	const hoverBg = useColorModeValue("gray.50", "gray.700");

	const { deleteBook, updateBook } = useBookStore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const detailsDisclosure = useDisclosure();

	const handleDeleteBook = async (id) => {
		const { success, message } = await deleteBook(id);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		} else {
			toast({
				title: "Éxito",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}
	};

	const handleUpdateBook = async (id, updatedBook) => {
		const { success, message } = await updateBook(id, updatedBook);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		} else {
			toast({
				title: "Éxito",
				description: "Libro actualizado correctamente",
				status: "success",
				duration: 3000,
				isClosable: true,
				position: "top",
			});
		}
	};

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
		toast({
			title: isFavorite ? "Removed from favorites" : "Added to favorites",
			status: isFavorite ? "info" : "success",
			duration: 2000,
			isClosable: true,
			position: "top",
		});
	};

	// Calculate discount if provided
	const hasDiscount = book.price && book.originalPrice && book.price < book.originalPrice;
	const discountPercentage = hasDiscount 
		? Math.round((1 - (book.price / book.originalPrice)) * 100) 
		: 0;

	return (
		<Box
			shadow='md'
			rounded='md'
			overflow='hidden'
			transition='all 0.3s ease'
			_hover={{ transform: "translateY(-5px)", shadow: "lg", borderColor: "blue.300" }}
			bg={bg}
			borderWidth="1px"
			borderColor={borderColor}
			position="relative"
			h="full"
			display="flex"
			flexDirection="column"
		>
			{/* Favorite button */}
			<IconButton
				icon={isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
				variant="ghost"
				position="absolute"
				top={2}
				right={2}
				zIndex={1}
				onClick={toggleFavorite}
				aria-label="Add to favorites"
				size="sm"
				borderRadius="full"
				bg={bg}
			/>

			{/* Discount badge */}
			{hasDiscount && (
				<Badge 
					colorScheme='red' 
					position="absolute" 
					top={2} 
					left={2} 
					zIndex={1} 
					fontSize="sm"
					px={2}
					py={1}
					borderRadius="md"
				>
					{discountPercentage}% OFF
				</Badge>
			)}

			<Box position="relative" overflow="hidden">
				<Image 
					src={book.image || "https://via.placeholder.com/300x200?text=No+Image"} 
					alt={book.title} 
					h={52} 
					w='full' 
					objectFit='cover' 
					transition="transform 0.3s ease"
					_hover={{ transform: "scale(1.05)" }}
				/>
			</Box>

			<Box p={4} flex="1" display="flex" flexDirection="column">
				<Heading as='h3' size='md' mb={2} noOfLines={1} title={book.title}>
					{book.title}
				</Heading>
                
				<Text fontWeight='semibold' fontSize='md' color={textColor} mb={1}>
					por {book.author}
				</Text>
                
				<Text fontSize='sm' color={textColor} mb={4}>
					Año: {book.publishYear}
				</Text>

				<Flex mt="auto" justifyContent="space-between" alignItems="center">
					<Box>
						{hasDiscount && (
							<Text as="span" fontSize="sm" textDecoration="line-through" color="gray.500" mr={2}>
								${book.originalPrice}
							</Text>
						)}
						<Text as="span" fontWeight='bold' fontSize='lg' color="blue.500">
							${book.price}
						</Text>
					</Box>
					
					<Tooltip label="Ver detalles" placement="top">
						<IconButton 
							icon={<MdInfo />} 
							size="sm" 
							colorScheme='blue' 
							variant="outline"
							onClick={detailsDisclosure.onOpen}
						/>
					</Tooltip>
				</Flex>

				<HStack spacing={2} mt={4} justifyContent="space-between">
					<Tooltip label="Editar libro" placement="top">
						<IconButton icon={<MdEdit />} onClick={onOpen} colorScheme='blue' size="sm" />
					</Tooltip>
					
					<Tooltip label="Eliminar libro" placement="top">
						<IconButton
							icon={<MdDelete />}
							onClick={() => handleDeleteBook(book._id)}
							colorScheme='red'
							size="sm"
						/>
					</Tooltip>
					
					<Button 
						size="sm" 
						colorScheme='blue' 
						variant="solid" 
						flex={1}
						as={Link}
						to={`/books/${book._id}`}
					>
						Ver más
					</Button>
				</HStack>
			</Box>

			{/* Edit Modal */}
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Actualizar Libro</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Título del libro'
								name='title'
								value={updatedBook.title}
								onChange={(e) => setUpdatedBook({ ...updatedBook, title: e.target.value })}
							/>
							<Input
								placeholder='Autor'
								name='author'
								value={updatedBook.author}
								onChange={(e) => setUpdatedBook({ ...updatedBook, author: e.target.value })}
							/>
							<HStack w="full">
								<Input
									placeholder='Año de publicación'
									name='publishYear'
									type='number'
									value={updatedBook.publishYear}
									onChange={(e) => setUpdatedBook({ ...updatedBook, publishYear: e.target.value })}
								/>
								<Input
									placeholder='Precio'
									name='price'
									type='number'
									value={updatedBook.price}
									onChange={(e) => setUpdatedBook({ ...updatedBook, price: e.target.value })}
								/>
							</HStack>
							<Select
								placeholder="Categoría"
								value={updatedBook.category || ""}
								onChange={(e) => setUpdatedBook({ ...updatedBook, category: e.target.value })}
							>
								<option value="fiction">Ficción</option>
								<option value="non-fiction">No ficción</option>
								<option value="science">Ciencia</option>
								<option value="biography">Biografía</option>
								<option value="history">Historia</option>
							</Select>
							<Textarea
								placeholder='Descripción'
								name='description'
								value={updatedBook.description || ""}
								onChange={(e) => setUpdatedBook({ ...updatedBook, description: e.target.value })}
								rows={3}
							/>
							<Input
								placeholder='URL de la imagen'
								name='image'
								value={updatedBook.image}
								onChange={(e) => setUpdatedBook({ ...updatedBook, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateBook(book._id, updatedBook)}
						>
							Actualizar
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancelar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>

			{/* Details Modal */}
			<Modal isOpen={detailsDisclosure.isOpen} onClose={detailsDisclosure.onClose} size="md">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>{book.title}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Image 
							src={book.image || "https://via.placeholder.com/300x200?text=No+Image"} 
							alt={book.title}
							borderRadius="md"
							mb={4}
							mx="auto"
							maxH="200px"
							objectFit="contain"
						/>
						
						<VStack align="start" spacing={3}>
							<Box>
								<Text fontWeight="bold">Autor:</Text>
								<Text>{book.author}</Text>
							</Box>
							
							<Box>
								<Text fontWeight="bold">Año de publicación:</Text>
								<Text>{book.publishYear}</Text>
							</Box>
							
							<Box>
								<Text fontWeight="bold">Precio:</Text>
								<Text>${book.price}</Text>
							</Box>
							
							{book.description && (
								<Box>
									<Text fontWeight="bold">Descripción:</Text>
									<Text>{book.description}</Text>
								</Box>
							)}
							
							{book.category && (
								<Box>
									<Text fontWeight="bold">Categoría:</Text>
									<Badge colorScheme="blue">{book.category}</Badge>
								</Box>
							)}
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={detailsDisclosure.onClose}>
							Cerrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default BookCard;