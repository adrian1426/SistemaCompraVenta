import models from '../models';

const errorReq = (res, error, next) => {
  res.status(500).send({
    message: `Ocurrió un error: ${error}`
  });
  next(error);
};

const add = async (req, res, next) => {
  try {
    const registro = await models.Articulo.create(req.body);

    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const query = async (req, res, next) => {
  try {
    const consultaRegistro = await models.Articulo.findOne({ _id: req.query._id })
      .populate('categoria', { nombre: 1 });

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

const queryCodigo = async (req, res, next) => {
  try {
    const consultaRegistro = await models.Articulo.findOne({ codigo: req.query.codigo })
      .populate('categoria', { nombre: 1 });

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

    const lista = await models.Articulo.find(
      {
        $or: [
          { nombre: new RegExp(valor, 'i') },
          { descripcion: new RegExp(valor, 'i') }
        ]
      },
      { createdAt: 0 })
      .populate('categoria', { nombre: 1 })
      .sort({ createdAt: -1 });

    res.status(200).json(lista);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const update = async (req, res, next) => {
  try {
    const registro = await models.Articulo.findByIdAndUpdate(
      { _id: req.body._id },
      {
        categoria: req.body.categoria,
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio_venta: req.body.precio_venta,
        stock: req.body.stock
      }
    );

    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const remove = async (req, res, next) => {
  try {
    const registro = await models.Articulo.findByIdAndDelete({ _id: req.body._id });

    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const activate = async (req, res, next) => {
  try {
    const activar = await models.Articulo.findByIdAndUpdate(
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
    const desactivar = await models.Articulo.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 0 }
    );

    res.status(200).json(desactivar);
  } catch (error) {
    errorReq(res, error, next);
  }
};

export default { add, query, queryCodigo, list, update, remove, activate, deactivate };