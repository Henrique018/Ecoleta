import { Request, Response } from "express";

import knex from "../database/connection";

class PointsController {
  async index(req: Request, res: Response) {
    const { city, uf, items } = req.query;

    const parsedItems = String(items)
      .split(",")
      .map((item) => Number(item.trim()));

    const points = await knex("points")
      .join("point_items", "points.id", "=", "point_items.point_id")
      .whereIn("point_items.items_id", parsedItems)
      .where("city", String(city))
      .where("uf", String(uf))
      .distinct()
      .select("points.*");

    return res.status(200).json(points);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const point = await knex("points").where({ id }).first();

    if (!point) {
      return res.status(400).json({ error: "point was not found" });
    }

    const relatedItems = await knex("items")
      .join("point_items", "items.id", "=", "point_items.items_id")
      .where("point_items.point_id", id)
      .select("items.title");

    return res.status(200).json({ point, relatedItems });
  }

  async create(req: Request, res: Response) {
    const {
      name,
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
      items,
    } = req.body;

    const trx = await knex.transaction();

    const point = {
      name,
      image:
        "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
      email,
      whatsapp,
      latitude,
      longitude,
      city,
      uf,
    };

    const insertedIds = await trx("points").insert(point);

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
      return {
        items_id: item_id,
        point_id,
      };
    });

    await trx("point_items").insert(pointItems);

    await trx.commit();

    return res.status(200).json({
      id: point_id,
      ...point,
    });
  }
}
export default PointsController;
