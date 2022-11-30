import express, { Request, Response } from "express";
import { IRegisterData } from "../../interfaces/auth";
import { IUser } from "../../interfaces/user";
import loggedIn from "../../middlewares/loggedIn";
import response from "../../network/response";
import controller from "./controller";

const router = express.Router();

const getProfile = async (req: Request, res: Response) => {
  response.success(res, {
    message: "Profile fetched successfully!",
    body: req.user,
  });
};

// const updateProfile = async (req: Request<any, any, IUser>, res: Response) => {
//   const userId = req.user?.id;

//   if (!userId)
//     return response.error(req, res, {
//       message: 'Invalid body.',
//     });

//   try {
//     const user = await controller.updateProfile({ ...req.body, _id: userId });
//     response.success(req, res, {
//       body: user,
//     });
//   } catch (error: any) {
//     response.error(req, res, {
//       details: error.message,
//     });
//   }
// };

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await controller.login(email, password);
    response.success(res, {
      message: "Sesion iniciado con exito",
      body: token,
    });
  } catch (error: any) {
    response.error(res, {
      details: error,
      message: "Usuario o contrasena invalida.",
    });
  }
};

const register = async (req: Request, res: Response) => {
  const user: IRegisterData = req.body;

  if (!user.email || !user.password || !user) {
    res.status(400).json({
      error:
        "No ha ingresado los datos correctamente, por favor intente de nuevo.",
    });
    return;
  }
  try {
    const exists = await controller
      .listRegistries({ email: user.email })
      .then((res) => res[0]);

    if (exists) {
      return response.error(res, {
        message: "Ya existe un usuario con el correo/identificacion ingresado.",
        status: 401,
        details: "register user function [registerUser]",
      });
    }
    const resData = await controller.register(user);
    response.success(res, {
      message: "User registered successfully!",
      status: 201,
      body: resData,
    });
  } catch (error: any) {
    return response.error(res, {
      message: error.message,
      status: 500,
      details: "[Register] Error when registering user",
    });
  }
};

router.route("/profile").get(loggedIn, getProfile); //.put(loggedIn, updateProfile);
router.post("/register", register);
router.post("/login", login);

export default router;
