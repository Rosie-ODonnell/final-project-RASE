import db from "./connection";

export function getAllItineraryIds() {
    const SELECT_ITINERARIES = `
      SELECT * FROM itineraries_table
    `;
    return db.query(SELECT_ITINERARIES).then((result) => result.rows);
}

export function getItineraryData(id) {
    const SELECT_ITINERARIES = `
  SELECT * FROM itineraries_table WHERE id=$1`;
    return db.query(SELECT_ITINERARIES, [id]).then((result) => result.rows[0]);
}

// User
export function selectUser(email) {
    const SELECT_USER = `
    SELECT id, username, email, password FROM user_table WHERE email=$1
  `;
    return db.query(SELECT_USER, [email]).then((result) => result.rows[0]);
}

export function insertUser(name, email, hash) {
    const INSERT_USER = `
INSERT INTO user_table (username, email, password) VALUES ($1, $2, $3)
RETURNING id, email, username;
`;
    return db
        .query(INSERT_USER, [name, email, hash])
        .then((result) => result.rows[0]);
}

// Session
export function createSession(sid, data) {
    const INSERT_SESSION = `
    INSERT INTO sessions_table (sid, data) VALUES ($1, $2)
    RETURNING sid
  `;
    return db
        .query(INSERT_SESSION, [sid, data])
        .then((result) => result.rows[0].sid);
}

export function selectSession(sid) {
    const SELECT_SESSION = `
    SELECT data FROM sessions_table WHERE sid=$1
  `;
    return db.query(SELECT_SESSION, [sid]).then((result) => result.rows[0]);
}

export function deleteSession(sid) {
    const DELETE_SESSION = "DELETE FROM sessions_table WHERE sid=$1";
    return db.query(DELETE_SESSION, [sid]);
}