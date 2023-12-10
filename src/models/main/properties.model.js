const db = require("../index");

exports.getAllProperties = async () => {
    const query = "SELECT * FROM properties";
    return await db.query(query);
} // end of getAllProperties

exports.getPropertyInstance = async (property_id) => {
    const query = "SELECT * FROM properties WHERE property_id = $1";
    return await db.query(query, [property_id]);
} // end of getPropertyInstance

exports.createPropertyInstance = async (property) => {
    const values = [property.building_name, property.property_number, property.total_rooms, property.property_type, property.coordinate_x, property.coordinate_y];
    const query = "INSERT INTO public.properties(\n" +
        "\t building_name, property_number, total_rooms, property_type, coordinate_x, coordinate_y)\n" +
        "\tVALUES ($1, $2, $3, $4, $5, $6);"
    return await db.query(query, values);
} // end of createPropertyInstance

exports.updatePropertyInstance = async (property_id, updates) => {
    // 1. query the database to get the property object with the given id
    const getProptQuery = "SELECT * FROM properties WHERE property_id = $1";
    const property = await db.query(getProptQuery, [property_id]);
    let propertyObj = property.rows[0];

    // 2. check which fields need to be updated from "updates" object
    function updateProperty(property, updates) {
        for (let key in updates) {
            if (property.hasOwnProperty(key)) {
                property[key] = updates[key];
            }
        }
    } // end of service function: updateProperty 

    // 3. update the aptObj with the updates
    updateProperty(propertyObj, updates);

    // 4. perform the update on the database
    const updateQuery = "UPDATE properties SET building_name = $1, property_number = $2, total_rooms = $3, property_type = $4,coordinate_x = $5,coordinate_y = $6 WHERE property_id = $7";
    const values = [propertyObj.building_name, propertyObj.property_number, propertyObj.total_rooms, propertyObj.property_type,propertyObj.coordinate_x,propertyObj.coordinate_y ,property_id];
    return await db.query(updateQuery, values);
} // end of updatePropertyInstance

exports.deleteProperty = async (property_id) => {
    const getProptQuery = "SELECT * FROM properties WHERE property_id = $1";
    const query = "DELETE FROM properties WHERE property_id = $1";
    const propt = await db.query(getProptQuery, [property_id]);
    await db.query(query, [property_id]);
    return propt;
} // end of deleteProperty