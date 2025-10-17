import { Request, Response } from "express";
import ImportContactsService from "../services/WbotServices/ImportContactsService";
import { log } from 'console';

export const store = async (req: Request, res: Response): Promise<Response> => {
  const { companyId } = req.user;

  await ImportContactsService(companyId);

  return res.status(200).json({ message: "contacts imported" });
};
