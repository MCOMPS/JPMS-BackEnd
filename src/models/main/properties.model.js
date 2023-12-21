const db = require("../index");

exports.getAllProperties = async () => {
    const query = "SELECT * FROM properties";
    return await db.query(query);
} // end of getAllProperties

exports.getPropertyInstance = async (id) => {
    const query = "SELECT * FROM properties WHERE id = $1";
    return await db.query(query, [id]);
} // end of getPropertyInstance

exports.createPropertyInstance = async (property) => {
    const values = [
        property.name,
        property.total_rooms,
        property.property_type,
        property.coordinate_x,
        property.coordinate_y,
        property.img,
        property.description,
        property.rent,
        property.location,
        property.amenities
    ];

    const query =
        "INSERT INTO properties(" +
        "name, total_rooms, property_type, coordinate_x, coordinate_y, img, description, rent, location, amenities)" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);";

    return await db.query(query, values);
}; // end of createPropertyInstance

exports.updatePropertyInstance = async (id, updates) => {
    const getProptQuery = "SELECT * FROM properties WHERE id = $1";
    const propertyResult = await db.query(getProptQuery, [id]);

    if (propertyResult.rows.length === 0) {
        throw new Error("Property not found");
    }

    const propertyObj = propertyResult.rows[0];
    // 2. check which fields need to be updated from "updates" object
    function updateProperty(property, updates) {
        for (let key in updates) {
            if (property.hasOwnProperty(key)) {
                property[key] = updates[key];
            }
        }
    } // end of service function: updateProperty 

    // 3. update the propertyObj with the updates
    updateProperty(propertyObj, updates);

    const updateQuery =
        "UPDATE properties SET " +
        "name = $1, total_rooms = $2, property_type = $3, coordinate_x = $4, coordinate_y = $5, " +
        "img = $6, description = $7, rent = $8, location = $9, amenities = $10 " +
        "WHERE id = $11";

    const values = [
        propertyObj.name,
        propertyObj.total_rooms,
        propertyObj.property_type,
        propertyObj.coordinate_x,
        propertyObj.coordinate_y,
        propertyObj.img,
        propertyObj.description,
        propertyObj.rent,
        propertyObj.location,
        propertyObj.amenities,
        id
    ];

    return await db.query(updateQuery, values);
};

exports.deleteProperty = async (id) => {
    const getProptQuery = "SELECT * FROM properties WHERE id = $1";
    const query = "DELETE FROM properties WHERE id = $1";
    const propt = await db.query(getProptQuery, [id]);
    await db.query(query, [id]);
    return propt;
} // end of deleteProperty