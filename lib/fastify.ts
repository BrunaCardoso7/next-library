import Fastify from 'fastify'

const fastify = Fastify()

fastify.register(import('@fastify/postgres'), {
  connectionString:
    'postgres://admin:admin@localhost:5432/juridiq',
})

await fastify.ready()

export { fastify }