import models from '../models';

const errorReq = (res, error, next) => {
  res.status(500).send({
    message: `Ocurrió un error: ${error}`
  });
  next(error);
};

const aumentarStock = async (idArticulo, cantidad) => {
  const { stock } = await models.Articulo.findOne({ _id: idArticulo });
  const newStock = parseInt(stock) + parseInt(cantidad);
  const update = await models.Articulo.findByIdAndUpdate({ _id: idArticulo }, { stock: newStock });
};

const disminuirStock = async (idArticulo, cantidad) => {
  const { stock } = await models.Articulo.findOne({ _id: idArticulo });
  const newStock = parseInt(stock) - parseInt(cantidad);
  const update = await models.Articulo.findByIdAndUpdate({ _id: idArticulo }, { stock: newStock });
};

const add = async (req, res, next) => {
  try {
    const registro = await models.Ingreso.create(req.body);

    const detalles = req.body.detalles;
    detalles.map((detalle) => {
      aumentarStock(detalle._id, detalle.cantidad);
    });

    res.status(200).json(registro);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const query = async (req, res, next) => {
  try {
    const consultaRegistro = await models.Ingreso.findOne({ _id: req.query._id })
      .populate('usuario', { nombre: 1 })
      .populate('persona', { nombre: 1 });

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

    const lista = await models.Ingreso.find(
      {
        $or: [
          { num_comprobante: new RegExp(valor, 'i') },
          { serie_comprobante: new RegExp(valor, 'i') }
        ]
      },
      { createdAt: 0 })
      .populate('usuario', { nombre: 1 })
      .populate('persona', { nombre: 1 })
      .sort({ createdAt: -1 });

    res.status(200).json(lista);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const activate = async (req, res, next) => {
  try {
    const activar = await models.Ingreso.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 1 }
    );

    const detalles = activar.detalles;
    detalles.map((detalle) => {
      aumentarStock(detalle._id, detalle.cantidad);
    });

    res.status(200).json(activar);
  } catch (error) {
    errorReq(res, error, next);
  }
};

const deactivate = async (req, res, next) => {
  try {
    const desactivar = await models.Ingreso.findByIdAndUpdate(
      { _id: req.body._id },
      { estado: 0 }
    );

    const detalles = desactivar.detalles;
    detalles.map((detalle) => {
      disminuirStock(detalle._id, detalle.cantidad);
    });

    res.status(200).json(desactivar);
  } catch (error) {
    errorReq(res, error, next);
  }
};

export default { add, query, list, activate, deactivate };