db = db.getSiblingDB('bookstore');

db.createCollection('books');

db.books.insertMany([
  {
    title: "Effective DevOps",
    author: "Jennifer Davis",
    publishYear: 2015,
    price: 15.99,
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1441679000i/25602743.jpg"
  },
  {
    title: "Accelerate",
    author: "Gene Kim",
    publishYear: 2018,
    price: 19.99,
    image: "https://static.fnac-static.com/multimedia/Images/PT/NR/0e/40/29/2703374/1540-1.jpg"
  }
]);

console.log("MongoDB initialized with sample data!");