import mongoose from "mongoose";
import { boolean } from "zod";

const schema = new mongoose.Schema(
    {
        item_name: {
            type: String,
            required: true,
        },
        last_location: {
            type: String,
            required: true,
        },
        lost_date: {
            type: Number,
            required: true,
        },
        is_found: {
            type: boolean,
            required: true,
        },

    },
    {
        timestamps: true,
    },
);

const LaporanModel = mongoose.model("Laporan", schema);

export default LaporanModel;

//item_name, last_location, lost_date, is_found
