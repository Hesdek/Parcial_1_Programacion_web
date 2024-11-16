import { Doctor } from '../models/Doctor.js';

export const getDoctorById = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const doctor = await Doctor.findById(doctorId);

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor no encontrado' });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAppointmentsByDoctor = async (req, res) => {
  const { doctorId } = req.params;
  const { date } = req.query; // Filtrar por fecha, si se proporciona

  try {
    const appointments = await Doctor.getAppointments(doctorId, date);

    if (!appointments.length) {
      return res.status(404).json({ message: 'No se encontraron citas para este doctor' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
