import fastifyStatic from "@fastify/static";
import Fastify from "fastify";
import path from "node:path";

const fastify = Fastify({
  disableRequestLogging: true,
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(import.meta.dirname, "./public"),
  prefix: "/",
});

try {
  await fastify.listen({ port: 4000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
