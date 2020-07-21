import models from '../models';

const errorReq = (res, error, next) => {
  res.status(500).send({
    message: `Ocurrió un error: ${error}`
  });
  next(error);
};

const add = async (req, res, next) => {
  try {
    const registro = await models.Persona.create(req.body);

    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const query = async (req, res, next) => {
  try {
    const consultaRegistro = await models.Persona.findOne({ _id: req.query._id });

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
    const valor = req.query.valor;

    const lista = await models.Persona.find(
      {
        $or: [
          { nombre: new RegExp(valor, 'i') },
          { email: new RegExp(valor, 'i') }
        ]
      },
      { createdAt: 0 })
      .sort({ createdAt: -1 });

    res.status(200).json(lista);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const listClientes = async (req, res, next) => {
  try {
    const valor = req.query.valor;

    const lista = await models.Persona.find(
      {
        $or: [
          { nombre: new RegExp(valor, 'i') },
          { email: new RegExp(valor, 'i') }
        ],
        tipo_persona: 'Cliente'
      },
      { createdAt: 0 })
      .sort({ createdAt: -1 });

    res.status(200).json(lista);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const listProveedores = async (req, res, next) => {
  try {
    const valor = req.query.valor;

    const lista = await models.Persona.find(
      {
        $or: [
          { nombre: new RegExp(valor, 'i') },
          { email: new RegExp(valor, 'i') }
        ],
        tipo_persona: 'Proveedor'
      },
      { createdAt: 0 })
      .sort({ createdAt: -1 });

    res.status(200).json(lista);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const update = async (req, res, next) => {
  try {
    const registro = await models.Persona.findByIdAndUpdate(
      { _id: req.body._id },
      {
        tipo_persona: req.body.tipo_persona,
        nombre: req.body.nombre,
        tipo_documento: req.body.tipo_documento,
        num_documento: req.body.num_documento,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        email: req.body.email
      }
    );

    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const remove = async (req, res, next) => {
  try {
    const registro = await models.Persona.findByIdAndDelete({ _id: req.body._id });

    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const activate = async (req, res, next) => {
  try {
    const activar = await models.Persona.findByIdAndUpdate(
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
    const desactivar = await models.Persona.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 0 }
    );

    res.status(200).json(desactivar);
  } catch (error) {
    errorReq(res, error, next);
  }
};

export default { add, query, list, listClientes, listProveedores, update, remove, activate, deactivate };