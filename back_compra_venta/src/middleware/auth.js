import tokenService from '../services/token';

const verificarUsuario = async (req, res, next) => {

  if (!req.headers.token) {
    return res.status(401).send({
      message: 'token no encontrado'
    });
  }

  const response = await tokenService.validarToken(req.headers.token);

  if (response.rol === 'administrador' || response.rol === 'vendedor' || response.rol === 'almacenero') {
    next();
  } else {
    res.status(403).send({
      message: 'No autorizado'
    });
  }

};

const verificarAdministrador = async (req, res, next) => {

  if (!req.headers.token) {
    return res.status(401).send({
      message: 'token no encontrado'
    });
  }

  const response = await tokenService.validarToken(req.headers.token);

  if (response.rol === 'administrador') {
    next();
  } else {
    res.status(403).send({
      message: 'No autorizado'
    });
  }

};

const verificarVendedor = async (req, res, next) => {

  if (!req.headers.token) {
    return res.status(401).send({
      message: 'token no encontrado'
    });
  }

  const response = await tokenService.validarToken(req.headers.token);

  if (response.rol === 'administrador' || response.rol === 'vendedor') {
    next();
  } else {
    res.status(403).send({
      message: 'No autorizado'
    });
  }

};

const verificarAlmacenero = async (req, res, next) => {

  if (!req.headers.token) {
    return res.status(401).send({
      message: 'token no encontrado'
    });
  }

  const response = await tokenService.validarToken(req.headers.token);

  if (response.rol === 'administrador' || response.rol === 'almacenero') {
    next();
  } else {
    res.status(403).send({
      message: 'No autorizado'
    });
  }

};

export default { verificarUsuario, verificarAdministrador, verificarVendedor, verificarAlmacenero };