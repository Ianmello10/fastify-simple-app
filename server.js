import { fastify } from "fastify";
//import { DataBaseMemory } from "./database_memory.js";
//import { db } from "./db.js";
import { DatabasePostgres } from "./databse_postgres.js";

const server = fastify();
//const db = new DataBaseMemory();

const database = new DatabasePostgres();

server.post("/notes", async (request, reply) => {
  const { title, description, done } = request.body;

  await database.create({
    title: title,
    description: description,
    done: done,
  });

  return reply.status(201).send();
});

server.get("/notes", async (request, reply) => {
  const search = request.query.search;

  const notes = await database.list(search);

  return notes;
});

server.put("/notes/:id", async (request, reply) => {
  const noteId = request.params.id;
  const { title, description, done } = request.body;

  await database.update(noteId, {
    title: title,
    description: description,
    done: done,
  });

  return reply.status(204).send();
});

server.delete("/notes/:id", async (request, reply) => {
  const noteId = request.params.id;

  await database.delete(noteId);

  return reply.status(204).send();
});

server.get("/", () => {
  return "Fastify";
});

server.listen({
  port: 5030,
});

//import { createServer } from "node:http";

//const server = createServer((request, response) => {
//response.write("oi");

//return response.end();
//});

//server.listen(5030);
