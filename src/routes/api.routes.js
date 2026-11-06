import express from "express";

import LaporanController from "../controllers/laporan.controller.js";

const router = express.Router();

router.get("/Laporan", LaporanController.index);
router.get("/Laporan/:id", LaporanController.show);
router.post("/Laporan", LaporanController.store);
router.put("/Laporan/:id", LaporanController.update);
router.delete("/Laporan/:id", LaporanController.delete);

export default router;


