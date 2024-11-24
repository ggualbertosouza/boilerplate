import { injectable } from 'inversify';
import mongoose from 'mongoose';
import { DB_CONNECT } from '.';

@injectable()
class DatabaseConnection {
  private connection: mongoose.Connection | null = null;
  private URI: string;

  constructor() {
    this.URI = DB_CONNECT || '';
  }

  public async connect() {
    try {
      await mongoose.connect(this.URI);

      this.connection = mongoose.connection;
      console.info('Connection established');

      this.setupEvents();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  private async setupEvents() {
    if (!this.connection) {
      console.error('Database is down');
    }

    this.connection?.on('connected', () => {
      console.info('Mongoose connected to database');
    });

    this.connection?.on('error', (err) => {
      console.error('Mongoose error:', err);
    });

    this.connection?.on('disconnected', () => {
      console.info('Mongoose disconnected to database');
    });

    process.on('SIGINT', async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  }

  public async disconnect() {
    if (!this.connection) console.info('Mongoose already disconnected');

    await mongoose.disconnect();
    console.info('Mongoose disconnected to database');
  }
}

export default DatabaseConnection;
