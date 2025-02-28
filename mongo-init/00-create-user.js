// mongo-init/00-create-user.js
db = db.getSiblingDB('bookstore');

db.createCollection('books');

db.books.insertMany([
  {
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    publishYear: 1943,
    price: 15.99,
    image: "https://m.media-amazon.com/images/I/71QKrhhMJIL._AC_UF1000,1000_QL80_.jpg"
  },
  {
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    publishYear: 1967,
    price: 19.99,
    image: "https://m.media-amazon.com/images/I/91TvVQS7loL._AC_UF1000,1000_QL80_.jpg"
  }
]);

console.log("MongoDB initialized with sample data!");