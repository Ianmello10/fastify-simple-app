import { sql } from "./db.js";
import { randomUUID } from "node:crypto";

export class DatabasePostgres {
  async list(search) {
    let note;

    if (search) {
      // ilike se refere ao titulo buscado e "${search}$"
      // é o parâmetro buscado que independe do termo esta em maiúsculo ou minúsculo
      note =
        await sql`select * from note where title ilike ${"%" + search + "%"}`;
    } else {
      note = await sql`select * from note`;
    }

    return note;
  }

  async create(note) {
    const noteId = randomUUID();

    const { title, description, done } = note;

    await sql`insert into note (id,title,description,done) VALUES (${noteId}, ${title}, ${description},${done})`;
  }

  async update(id, note) {
    const { title, description, done } = note;

    await sql`update note set title = ${title}, description = ${description}, done = ${done} where id = ${id}`;
  }

  async delete(id) {
    await sql`delete from note where id = ${id}`;
  }
}
