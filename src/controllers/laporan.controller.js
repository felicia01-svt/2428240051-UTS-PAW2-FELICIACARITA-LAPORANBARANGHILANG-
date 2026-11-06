import LaporanModel from "../models/laporan.model.js";
import { storeLaporanSchema, updateLaporanSchema } from "../schemas/laporan.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";

class LaporanController {
  static async index(req, res) {
    const {
      search,
      sort,
      sortBy = "createdAt",
      page = 1,
      limit = 10,
    } = req.query;

    const currentPage = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (currentPage - 1) * perPage;

    // item_name, last_location, lost_date, is_found

    const allowedSortFields = [
      "item_name",
      "last_location",
      "lost_date",
      "is_found",
      "createdAt",
      "updatedAt",
    ];

    const sortField = allowedSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const filter = {};

    const sortOption = {
      [sortField]: sort === "desc" ? -1 : 1,
    };

    if (search) {
      filter.item_name = {
        $regex: search,
        $options: "i",
      };
    }

    try {
      const [listLaporan, totalData] = await Promise.all([
        LaporanModel.find(filter)
          .sort(sortOption)
          .skip(skip)
          .limit(perPage),

        LaporanModel.countDocuments(filter),
      ]);

      const totalPages = Math.ceil(totalData / perPage);

      return apiResponse({
        res,
        status: 200,
        message: "List Laporan",
        data: {
          items: listLaporan,
          pagination: {
            totalData,
            totalPages,
            currentPage,
            perPage,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
          },
        },
      });
    } catch (error) {
      return apiResponse({
        res,
        status: 500,
        message: error.message,
      });
    }
  }

  static async show(req, res) {
    const Laporan = await LaporanModel.findById(req.params.id);

    if (!Laporan) {
      return apiResponse({
        res,
        status: 404,
        message: "Laporan tidak ada",
        data: null,
      });
    }

    return apiResponse({
      res,
      status: 200,
      message: "Detail Laporan",
      data: Laporan,
    });
  }

  static async store(req, res) {
    const result = storeLaporanSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      });
    }

    const newLaporan = await LaporanModel.create(result.data);

    return apiResponse({
      res,
      status: 201,
      message: "Laporan berhasil dibuat",
      data: newLaporan,
    });
  }

  static async update(req, res) {
    const LaporanIdId = req.params.id
    const result = updateLaporanSchema.safeParse(req.body);

    if (!result.success) {
      return apiResponseValidation({
        res,
        errors: result.error,
      });
    }

    const { name } = req.body

    const Laporan = await LaporanModel.findById(req.params.id);

    const exists = await LaporanModel.exists({ _id: LaporanId })
        if (!exists) {
            return apiResponse({ res, status: 404, message: 'Laporan tidak ditemukan' })
        }

        const updatedLaporan = await LaporanIdIdModel.findOneAndUpdate(
            { _id: LaporanId },
            { name },
            { new: true }
        )

    return apiResponse({
      res,
      status: 200,
      message: "Data berhasil diupdate",
      data: updatedLaporan,
    });
  }

  static async delete(req, res) {
    const LaporanId = req.params.id
    const exists = await LaporanModel.exists({ _id: LaporanId })
    if (!exists) {
      return apiResponse({ res, status: 404, message: 'Laporan tidak ditemukan' })}

        await LaporanModel.findOneAndDelete({ _id: LaporanId })
        return apiResponse({ res, status: 200, message: 'Laporan berhasil dihapus', data: null })
    }

}

export default LaporanController;