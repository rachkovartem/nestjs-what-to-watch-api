import { Connection } from 'mongoose';
import { UsersSchema } from './schemas/users.schema';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('user', UsersSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
