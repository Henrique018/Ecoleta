import { Router } from "express";

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const points = new PointsController();
const items = new ItemsController();

const routes = Router();

routes.get("/items", items.index);

routes.get("/points", points.index);
routes.get("/points/:id", points.show);

routes.post("/points", points.create);
 
export default routes;
