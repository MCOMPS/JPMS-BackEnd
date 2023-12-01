const db = require("../index");

exports.getAllRooms = async (property_id) => {
    const query = "SELECT * FROM  rooms WHERE property_id=$1;";
    const values = [property_id];
    return await db.query(query, values);
}

exports.addRoom = async (property_id, room) => {
    const query = "INSERT INTO public.rooms(\n" +
        "\tproperty_id, room_number, room_type, capacity, vacant)\n" +
        "\tVALUES ($1, $2, $3, $4, $5);"
    const values = [property_id, room.room_number, room.room_type, room.capacity, true];
    return await db.query(query, values);
}

exports.getRoom = async (room_id) => {
    const query = "SELECT * FROM rooms WHERE room_id=$1;";
    const values = [room_id];
    return await db.query(query, values);
}

exports.updateRoom = async (room_id, updates) => {
    const getRoomQuery = "SELECT * FROM rooms WHERE room_id = $1;";
    const getRoomValues = [room_id];
    const room = await db.query(getRoomQuery, getRoomValues);
    let roomObj = room.rows[0];

    function updateRoom(room, updates) {
        for (let key in updates) {
            if (room.hasOwnProperty(key)) {
                room[key] = updates[key];
            }
        }
    }

    updateRoom(roomObj, updates);

    const updateRoomQuery = "update rooms set room_number=$1, room_type=$2, capacity=$3, vacant=$4 where room_id=$5;";
    const updateRoomValues = [roomObj.room_number, roomObj.room_type, roomObj.capacity, roomObj.vacant, room_id];
    return await db.query(updateRoomQuery, updateRoomValues);
}

exports.deleteRoom = async (room_id) => {
    const query = "DELETE FROM rooms WHERE room_id=$1;";
    const values = [room_id];
    return await db.query(query, values);
}