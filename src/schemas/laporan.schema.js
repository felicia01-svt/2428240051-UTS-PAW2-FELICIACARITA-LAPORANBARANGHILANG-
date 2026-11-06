import z from "zod";

export const storeLaporanSchema = z.object({
    item_name: z.string().trim().min(10, "Nama Item minimal 10 karakter"),
    last_location: z.string().trim().min(10, "Lokasi Terakhir minimal 10 karakter"),
    lost_date: z.number().int().min(1000, "Tanggal Kehilangan tidak valid"),
    is_found : z.boolean()
});

export const updateLaporanSchema = z.object({
    item_name: z.string().trim().min(10, "Nama Item minimal 10 karakter").optional(),
    last_location: z.string().trim().min(10, "Lokasi Terakhir minimal 10 karakter").optional(),
    lost_date: z.number().int().min(1000, "Tanggal Kehilangan tidak valid").optional(),
    is_found : z.boolean()
});

//item_name, last_location, lost_date, is_found
