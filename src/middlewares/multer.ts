import { initializeApp } from 'firebase/app';
import Multer from 'multer';
import config from '../config';

initializeApp(config.firebase);

export const multer = Multer({
  storage: Multer.memoryStorage(),
});
