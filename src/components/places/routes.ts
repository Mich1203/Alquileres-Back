import express, { Request, Response } from "express";
import { IPlace } from "../../interfaces/places";
import { multer } from "../../middlewares/multer";
import response from "../../network/response";
import { uploadMultipleFiles } from "../../utils/uploadFile";
import controller from "./controller";

const router = express.Router();

const getAll = async (_: Request, res: Response) => {
  try {
    const places = await controller.listRegistries();
    return response.success(res, {
      message: "Places fetched successfully!",
      body: places,
    });
  } catch (error: any) {
    response.error(res, {
      details: error,
      message: "Error inesperado",
    });
  }
};

const getOne = async (req: Request<{ id: number }>, res: Response) => {
  const id = req.params.id;

  try {
    const place = await controller.getRegistry(id);
    return response.success(res, {
      message: "Place fetched successfully!",
      body: place,
    });
  } catch (error: any) {
    response.error(res, {
      details: error,
      message: "Error inesperado",
    });
  }
};

const create = async (req: Request<any, any, IPlace>, res: Response) => {
  const data = req.body;
  try {
    const created = await controller.upsertRegistry(data);
    const urls = await uploadMultipleFiles(
      req.files as Express.Multer.File[],
      created.id,
    );
    created.images = urls;
    const updated = await controller.upsertRegistry(created);
    return response.success(res, {
      message: "Place created successfully!",
      body: updated,
    });
  } catch (error: any) {
    response.error(res, {
      details: error,
      message: "Error inesperado",
    });
  }
};

router.route("/").get(getAll).post(multer.array("files", 10), create).put(create);
router.get("/:id", getOne);

export default router;
