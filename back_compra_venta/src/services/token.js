import jwt from 'jsonwebtoken';
import models from '../models';

const KEY = 'KEY_MERN';

const checkToken = async token => {
  let __id = null;

  try {
    const { _id } = jwt.decode(token);
    __id = _id;
  } catch (error) {
    return false;
  }

  const usuario = await models.Usuario.findOne({ _id: __id, estado: 1 });

  if (usuario) {
    const token = jwt.sign({ _id: __id }, KEY, { expiresIn: '1d' });
    return { token, rol: usuario.rol };
  } else {
    return false;
  }
};

const generarToken = async _id => {
  return jwt.sign({ _id }, KEY, { expiresIn: '1d' });
};

const validarToken = async token => {
  try {
    const { _id } = jwt.verify(token, KEY);
    const usuario = await models.Usuario.findOne({ _id, estado: 1 });

    if (usuario) {
      return usuario;
    } else {
      return false
    }
  } catch (error) {
    return await checkToken(token);
  }
};

export default { generarToken, validarToken };