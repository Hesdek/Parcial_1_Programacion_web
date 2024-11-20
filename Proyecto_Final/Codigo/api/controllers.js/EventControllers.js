import EventService from '../services/EventServices.js';

export const createEvent = async (req, res) => {
  const { event_name, locations, date_start, date_finish } = req.body;
  const event = await EventService.create(req.user.id_user, event_name, locations, date_start, date_finish);
  res.status(201).json(event);
};

export const deleteEvent = async (req, res) => {
  await EventService.delete(req.params.id);
  res.status(204).end();
};

export const getEventDetails = async (req, res) => {
  const event = await EventService.getDetails(req.params.id);
  res.json(event);
};
