import { User } from "#db/models/index.js";

declare global {
  namespace Express {
    interface Request {
      user?: User; // Add user to the request object
    }
  }
}
