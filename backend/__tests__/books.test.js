const request = require('supertest');
const mongoose = require('mongoose');
const { setupDB, teardownDB, clearDB } = require('./setupTestDB');
const Books = require('../models/Books');

let app;

beforeAll(async () => {
  jest.setTimeout(30000); 
  await setupDB();
  const serverModule = require('../server');
  app = serverModule.app; 
}, 30000); 

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await teardownDB();
});

describe('Book API', () => {
  const sampleBook = {
    title: 'Test Book',
    author: 'Test Author',
    publishYear: 2023,
    price: 29.99,
    image: 'https://example.com/image.jpg'
  };

  test('GET /books - Debería retornar un arreglo vacío cuando no hay libros', async () => {
    const response = await request(app).get('/books');
    
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual([]);
  });

  test('POST /books - Debería crear un nuevo libro', async () => {
    const response = await request(app)
      .post('/books')
      .send(sampleBook)
      .set('Content-Type', 'application/json');
    
    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe(sampleBook.title);
    expect(response.body.author).toBe(sampleBook.author);
    expect(response.body.image).toBe(sampleBook.image); // Verifica que la imagen se guarda correctamente
  });

  test('GET /books/:id - Debería obtener un libro por ID', async () => {
    const book = await Books.create(sampleBook);
    const response = await request(app).get(`/books/${book._id}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe(sampleBook.title);
  });

  test('PUT /books/:id - Debería actualizar un libro', async () => {
    const book = await Books.create(sampleBook);

    const updatedData = { ...sampleBook, title: 'Updated Title' };
    const response = await request(app)
      .put(`/books/${book._id}`)
      .send({ id: book._id, ...updatedData });
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
  });

  test('DELETE /books/:id - Debería eliminar un libro', async () => {
    const book = await Books.create(sampleBook);
    
    const response = await request(app).delete(`/books/${book._id}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBeTruthy();
    
    const bookExists = await Books.findById(book._id);
    expect(bookExists).toBeNull();
  });
});