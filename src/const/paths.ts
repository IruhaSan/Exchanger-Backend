import { join } from 'path';

export const PATHS_CONFIG = {
  static: join(process.cwd(), 'static'),
  currency: join(process.cwd(), 'static', 'currency'),
};
