import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Encabezado de autorización no encontrado' });
  }

  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido o sesión caducada' });
  }
};

export const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ error: 'Permiso denegado' });
  }
  next();
};
