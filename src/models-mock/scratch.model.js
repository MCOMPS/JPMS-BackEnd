const db = require("./mock-db.json");

exports.selectApartments = () => {
    return { rows: db.apartments };
}

exports.selectTenants = () => {
    return { rows: db.tenants };
}

exports.createApartment = (apartment) => {
    db.apartments.push(apartment);
    return { rows: db.apartments };
}


