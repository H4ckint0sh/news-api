import { NextFunction, Request, Response } from "express";

export function checkRole(requiredRoleId: number) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }
    if (req.user.role_id !== requiredRoleId) {
      console.log("req.user.role_id", req.user);
      console.log("requiredRoleId", requiredRoleId);
      res.status(403).json({
        message: "Access denied. Insufficient role.",
      });
      return;
    }
    next();
  };
}
