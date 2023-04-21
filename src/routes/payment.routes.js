import { Router } from "express";
import * as paymentControllador  from "../controllers/payment.controller.js";

const paymentRouter= Router();

paymentRouter.post("/crearOrden",paymentControllador.createOrden);
paymentRouter.get("/capturarOrden",paymentControllador.captureOrden);
paymentRouter.get("/cancelarOrden",paymentControllador.cancelOrden);

export default paymentRouter;