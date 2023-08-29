import express from "express";
import { healthcheckController } from "../controllers";

const router = express.Router();

router.route("/").get(healthcheckController.getHealthcheck);

export { router as healthcheck };
