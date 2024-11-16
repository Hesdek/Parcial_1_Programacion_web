import { Appointment } from '../models/Appointment.js';

export const getAppointmentsByPatient = async (req, res) => {
  const { patientId } = req.user; // Id del paciente autenticado
  const { date } = req.query; // Filtrar por fecha si se proporciona

  try {
    const appointments = await Appointment.getAppointmentsByPatient(patientId, date);

    if (!appointments.length) {
      return res.status(404).json({ message: 'No se encontraron citas para este paciente' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAppointment = async (req, res) => {
  const { patientId } = req.user;
  const { doctorId, date, hour } = req.body;

  try {
    const newAppointment = await Appointment.createAppointment(patientId, doctorId, date, hour);
    res.status(201).json(newAppointment);
  } catch (error) {
    if (error.code === '23505') {
      // Error de duplicidad en citas
      return res.status(400).json({ message: 'Ya existe una cita para esa fecha y hora con el mismo doctor o paciente' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { doctorId, date, hour } = req.body;

  try {
    const updatedAppointment = await Appointment.updateAppointment(appointmentId, doctorId, date, hour);
    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json(updatedAppointment);
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Ya existe una cita para esa fecha y hora con el mismo doctor o paciente' });
    }
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  const { appointmentId } = req.params;

  try {
    const deleted = await Appointment.deleteAppointment(appointmentId);
    if (!deleted) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }
    res.status(200).json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
