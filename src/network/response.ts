import { Request, Response } from 'express';

export default {
  success(res: Response, { message = '', status = 200, body = {} }) {
    res.status(status).send({
      error: false,
      message,
      body,
    });
  },
  error(res: Response, { message = 'Internal Server Error', status = 500, body = {}, details = '' }) {
    console.error(details);
    res.status(status).send({
      error: true,
      message,
      body,
    });
  },
};
