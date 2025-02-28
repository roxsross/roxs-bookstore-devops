const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

module.exports.setupDB = async () => {
  try {
    mongoServer = await MongoMemoryServer.create({
      instance: {
        timeout: 20000,
        ip: '127.0.0.1',
      }
    });
    
    const uri = mongoServer.getUri();

    const mongooseOpts = {
    };

    await mongoose.connect(uri, mongooseOpts);
    console.log('Conectado a MongoDB Memory Server');
  } catch (error) {
    console.error('Error al configurar MongoDB Memory Server:', error);
    throw error;
  }
};

module.exports.teardownDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (error) {
    console.error('Error al cerrar MongoDB Memory Server:', error);
  }
};

module.exports.clearDB = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      const collections = mongoose.connection.collections;
      for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
      }
    }
  } catch (error) {
    console.error('Error al limpiar la base de datos:', error);
  }
};