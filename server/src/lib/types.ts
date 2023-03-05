import {
  FastifyBaseLogger,
  FastifyInstance,
  FastifyPluginOptions,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

type ZodFastify = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export type ZodFastifyPluginAsync<
  Options extends FastifyPluginOptions = Record<never, never>,
> = (fastify: ZodFastify, opts: Options) => Promise<void>;
