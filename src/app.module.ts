import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      csrfPrevention: true,
      context: (ctx) => ctx,
      cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
      },
      plugins: [new LoggerMiddleware()],
      formatError: (err) => {
        // Don't give the specific errors to the client.
        if (err.message.includes('tKey:')) {
          const key = err.message.split('tKey:')[1];
          return new Error(`tKey:${key}`);
        }

        // Otherwise return the original error. The error can also
        // be manipulated in other ways, as long as it's returned.
        return err;
      },
    }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
})
export class AppModule {}
