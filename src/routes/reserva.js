
import express from 'express'
import {db} from '../db/db.js'
import {setReserve,updateReserveState,getReserve}from'../db/mongoConection.js'
import {isNullOrUndefined} from '../functions/isNullOrUndefined.js'
import {validateState} from '../functions/validateState.js'
import {sendReserve} from '../functions/mailer.js'
import variables from '../config/variables.config.js'
var router = express.Router();

router.post('/crearReserva', async (req, res) => {
   
  if (req.body.montoPagado===''||isNullOrUndefined(req.body.montoPagado)) {res.status(400).json({ msg: 'montoPagado cant be empty' });};
  if (req.body.metodoDePago===''||isNullOrUndefined(req.body.metodoDePago)) {res.status(400).json({ msg: 'metodoDePago cant be empty' });};
  if (req.body.detalleCuarto===''||isNullOrUndefined(req.body.detalleCuarto)) {res.status(400).json({ msg: 'detalleCuarto cant be empty' }); };
  if (req.body.diasDeEstadia===''||isNullOrUndefined(req.body.diasDeEstadia)) {res.status(400).json({ msg: 'diasDeEstadia cant be empty' }); };
  if (req.body.detalleFactura===''||isNullOrUndefined(req.body.detalleFactura)) {res.status(400).json({ msg: 'detalleFactura cant be empty' }); };
  if (req.body.usuarioId===''||isNullOrUndefined(req.body.usuarioId)) {res.status(400).json({ msg: 'usuarioId cant be empty' }); };
  if (req.body.estado===''||isNullOrUndefined(req.body.estado)) {res.status(400).json({ msg: 'estado cant be empty' }); };
  if (validateState(req.body.estado)) {
    try {
      let id= "reserva"+`-${req.body.usuarioId}-`+Math.floor(Math.random() * 1000);
      let reserva={
        id,
        montoPagado:req.body.montoPagado,
        metodoDePago:req.body.metodoDePago,
        detalleCuarto:req.body.detalleCuarto,
        diasDeEstadia:req.body.diasDeEstadia,
        detalleFactura:req.body.detalleFactura,
        estado:req.body.estado,
        usuarioId:req.body.usuarioId
      }
    
      const clientMongo = await db.connectToDatabase();
      let  db2 = clientMongo.db(variables.DB_NAME);
      await setReserve(db2,reserva);
      //sendReserve(id)
      res.status(200).json({ msg:"Su reserva se ah cargado exitosamente con los siguientes Datos", reserva });
      } catch (err) {
          res.status(500).json({ msg: 'error al generar la reserva',err });
      }
    
    }else{
      res.status(400).json({ msg: 'estado solo puede tomar los siguientes valores: PENDIENTE' }); 
    } 
})

router.put('/actualizarEstadoDeReserva', async (req, res) => {
  
  if (req.body.id===''||isNullOrUndefined(req.body.id)) { res.status(400).json({ msg: 'id cant be empty' }); };
  if (req.body.estado===''||isNullOrUndefined(req.body.estado)) { res.status(400).json({ msg: 'estado cant be empty' }); };
  if (validateState(req.body.estado)) {
      try {
        const clientMongo = await db.connectToDatabase();
        let  db2 = clientMongo.db(variables.DB_NAME);
       await updateReserveState(db2,req.body.estado,req.body.id);
        res.status(200).json({ msg:`La reserva con id: ${req.body.id} se ah pasado a ${req.body.estado} exitosamente` });
        } catch (err) {
            res.status(500).json({ msg: 'error al actualizar la reserva',err });
        }
    }else{
      res.status(400).json({ msg: 'estado solo puede tomar los siguientes valores: PENDIENTE, PAGADO, ELIMINADO' }); 
    }
 
})

router.post('/obtenerReserva', async (req, res) => {
  
  let flag=true;
  if (req.body.id===''||isNullOrUndefined(req.body.id)) {flag=false; res.status(400).json({ msg: 'id cant be empty' }); };
 
  try {
  const clientMongo = await db.connectToDatabase();
  let  db2 = clientMongo.db(variables.DB_NAME);
  let result=await getReserve(db2,req.body.id);
  res.status(200).json({ result });
  } catch (err) {
      res.status(500).json({ msg: 'error al obtner la reserva',err });
  }
})

export default router;
