import express from 'express';
import userRouter from '../routes/userRouter';
import errorMiddleware from '../middlewares/error-middleware';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.get('/', (_req, res) => res.status(200).json({ message: 'ok' }));
    this.app.get('/internal-error', (_req, res) => { throw new Error });
    this.app.use(userRouter);
    this.app.use(errorMiddleware);
  }

  public listen(PORT: number): void {
    this.app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  }
}

export default App;
export const { app } = new App();
