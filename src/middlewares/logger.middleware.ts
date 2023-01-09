import { Plugin } from '@nestjs/apollo';

import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import * as fs from 'fs';

@Plugin()
export class LoggerMiddleware implements ApolloServerPlugin {
  async requestDidStart(ctx): Promise<GraphQLRequestListener> {
    const { request } = ctx;
    const reqTime = new Date().toISOString();
    const ip =
      request?.context?.req?.clientIp ||
      request?.context?.req?.ip ||
      request?.context?.req?.socket?.remoteAddress ||
      'Not defined';
    const query = request?.query || 'Not defined';
    const start = performance.now();
    const dir = process.cwd() + '/logs/';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    return {
      async willSendResponse(resCtx) {
        const end = performance.now();
        const elapsedTime = `${Math.round(end - start)}ms`;
        const queryString = JSON.stringify(query).replace(/\\n/g, '');

        if (resCtx.errors) {
          const errorsStacks = resCtx.errors.map((error) => error.stack);
          const log = `${reqTime}| error | elapsed time:{elapsedTime} | ip: ${ip} | ${queryString} | ${JSON.stringify(
            errorsStacks,
          )}\n`;

          fs.appendFile(dir + 'errors.log', JSON.stringify(log), (error) => {
            if (error) {
              console.error(error);
            }
          });
          return ctx;
        }
        const log = `${reqTime} | info | elapsed time: ${elapsedTime} | ${ip} | ${queryString} | No errors\n`;
        fs.appendFile(dir + 'requests.log', log, (error) => {
          if (error) {
            console.error(error);
          }
        });
        return ctx;
      },
    };
  }
}
