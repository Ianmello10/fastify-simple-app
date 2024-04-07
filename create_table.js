import { sql } from "./db.js";

/*
sql`DROP TABLE IF EXISTS note`.then(() => {
  console.log("Finished");
});
*/

sql`
CREATE TABLE note (
id            TEXT PRIMARY KEY,
title         TEXT,
description   TEXT,
done          BOOLEAN
);
`.then(() => {
  console.log("table criada ");
});
