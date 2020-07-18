import models from '../models';

const errorReq = (res, error, next) => {
  res.status(500).send({
    message: 'Ocurrió un error'
  });
  next(error);
};

const add = async (req, res, next) => {
  try {
    const registro = await models.Categoria.create(req.body);
    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const query = async (req, res, next) => {
  try {
    const consultaRegistro = await models.Categoria.findOne({ _id: req.query._id });
    if (!consultaRegistro) {
      res.status(404).send({
        message: 'No existe el registro'
      });
    } else {
      res.status(200).json(consultaRegistro);
    }
  } catch (error) {
    errorReq(res, error, next);
  }
};

const list = async (req, res, next) => {
  try {
    const lista = await models.Categoria.find({});
    res.status(200).json(lista);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const update = async (req, res, next) => {
  try {
    const registro = await models.Categoria.findByIdAndUpdate(
      { _id: req.body._id },
      {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
      }
    );
    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const remove = async (req, res, next) => {
  try {
    const registro = await models.Categoria.findByIdAndDelete({ _id: req.body._id });
    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const activate = async (req, res, next) => {
  try {
    const activar = await models.Categoria.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 1 }
    );
    res.status(200).json(activar);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const deactivate = async (req, res, next) => {
  try {
    const desactivar = await models.Categoria.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 0 }
    );
    res.status(200).json(desactivar);
  } catch (error) {
    errorReq(res, error, next);
  }
};

export default { add, query, list, update, remove, activate, deactivate };