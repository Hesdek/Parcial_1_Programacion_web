import pool from '../models/db.js';

class EventServices {
  static async create(id_user, event_name, locations, date_start, date_finish) {
    const query = 'INSERT INTO Events (id_user, event_name, locations, date_start, date_finish) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const { rows } = await pool.query(query, [id_user, event_name, locations, date_start, date_finish]);
    return rows[0];
  }

  static async delete(id_event) {
    const query = 'DELETE FROM Events WHERE id_event = $1';
    await pool.query(query, [id_event]);
  }

  static async getDetails(id_event) {
    const query = 'SELECT * FROM Events WHERE id_event = $1';
    const { rows } = await pool.query(query, [id_event]);
    return rows[0];
  }
}

export default EventServices;
