import express, { Request, Response } from "express";
import { IPlace } from "../../interfaces/places";
import response from "../../network/response";
import controller from "./controller";

const router = express.Router();

const getAll = async (_: Request, res: Response) => {};

const getOne = async (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;

  try {
    const account = await controller.getRecordByUser(id);
    return response.success(res, {
      message: "Account fetched successfully!",
      body: account,
    });
  } catch (error: any) {
    response.error(res, {
      details: error,
      message: "Error inesperado",
    });
  }
};

const modifyBalance = async (
  req: Request<{ id: string }, any, { amount: number }>,
  res: Response,
) => {
  const id = req.params.id;
  const { amount } = req.body;

  try {
    const account = await controller.getRecordByUser(id);

    if (!account?.account.id)
      return response.error(res, {
        details: "accounts.routes.ts [38]",
        message: "An account for this user was not found",
      });
    const result = await controller.modifyBalance(account.account.id, amount);

    return response.success(res, {
      body: result ?? undefined,
      message: "Balance modified successfully",
    });
  } catch (error: any) {
    response.error(res, {
      details: error,
      message: "Error inesperado",
    });
  }
};

const create = async (req: Request<any, any, IPlace>, res: Response) => {};

router.route("/").get(getAll).put(create);
router.put("/:id/balance", modifyBalance);
router.get("/:id", getOne);
export default router;
