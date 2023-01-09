import { Connection } from 'mongoose';
import { PostSchema } from './schemas/post.schema';

export const postsProviders = [
  {
    provide: 'POST_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('post', PostSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
