import pool from '../config/db.js';

export class Appointment {
  static async getAppointmentsByPatient(patientId, date) {
    const query = `
      SELECT * FROM appointment 
      WHERE patient_id = $1 ${date ? 'AND dates = $2' : ''}
    `;
    const values = date ? [patientId, date] : [patientId];
    const result = await pool.query(query, values);
    return result.rows;
  }

  static async createAppointment(patientId, doctorId, date, hour) {
    const result = await pool.query(
      `INSERT INTO appointment (dates, hora, patient_id, doctor_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [date, hour, patientId, doctorId]
    );
    return result.rows[0];
  }

  static async updateAppointment(appointmentId, doctorId, date, hour) {
    const result = await pool.query(
      `UPDATE appointment 
       SET dates = $1, hora = $2, doctor_id = $3 
       WHERE id = $4 
       RETURNING *`,
      [date, hour, doctorId, appointmentId]
    );
    return result.rows[0];
  }

  static async deleteAppointment(appointmentId) {
    const result = await pool.query('DELETE FROM appointment WHERE id = $1 RETURNING *', [appointmentId]);
    return result.rowCount > 0;
  }
}
