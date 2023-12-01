const db = require("../models/index");

exports.selectApartments = async () => {
    const query = "SELECT * FROM main_apartments";
    return await db.query(query);
}

exports.selectTenants = async () => {
    const query = "SELECT * FROM tenants";
    return await db.query(query);
}

exports.createApartment = async (apartment) => {
    const values = [apartment.building_name, apartment.apt_number, apartment.total_rooms];
    const query = "INSERT INTO public.main_apartments(\n" +
        "\t building_name, apt_number, total_rooms)\n" +
        "\tVALUES ($1, $2, $3);"
    return await db.query(query, values);
}
