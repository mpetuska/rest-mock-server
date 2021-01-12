import { Handler, Request, Response, Router } from "express";

const router = Router({ mergeParams: true });

const controller: Handler = async (req: Request, res: Response) => {
  const { path, query } = req;
  res.json({ path, query }).send();
};
router.get("/*", controller);

export default router;
