class RoomsController {
    constructor(pathPassed) {
        this.basePath = pathPassed;
        this.model = require(`${this.basePath}/main/rooms.model`);
    }

    getAllRooms = async (req, res, next) => {
        // get a specific room:
        if(req.query.room_id){

            try{

                const result = await this.model.getRoom(req.query.room_id);
                if (result instanceof Error)
                    throw new Error(`Error getting room: ${result.message}`);
                return res.status(200).json(result.rows[0]);
            } catch(error) {
                next(error);
            }

        }

        // get all rooms for a specific property:
        const property_id = req.query.property_id;
        try {

            const results = await this.model.getAllRooms(property_id);

            if (results instanceof Error)
                throw new Error(`Error getting rooms: ${results.message}`);

            res.status(200).json(results.rows);
            
        } catch(error){
            next(error);
        }

    } // end of getAllRooms

    addRoom = async (req, res, next) => {
        const property_id = req.query.property_id;
        try {
            const room = req.body;
            if(!room.room_number || !room.room_type || !room.capacity)
                throw new Error(`The room object is empty`);

            const result = await this.model.addRoom(property_id, room);

            if(result instanceof Error)
                throw new Error(`Error adding room: ${result.message}`);

            res.status(201).json({
                message: `Room for apartment id:${property_id}  added successfully`,
                result: result
            });
        } catch(error){
            next(error);
        }
    } // end of addRoom

    updateRoom = async (req, res, next) => {
        const room_id = req.query.room_id;
        const updates = req.body;
        try {
            const result = await this.model.updateRoom(room_id, updates);
            if(result instanceof Error)
                throw new Error(`Error updating room: ${result.message}`);
            res.status(200).json({
               message: "Room updated successfully",
               result: result
            });
        } catch(error){
            next(error);
        }
    }

    deleteRoom = async (req, res, next) => {
        const room_id = req.query.room_id;
        try {
            const result = await this.model.deleteRoom(room_id);
            if(result instanceof Error)
                throw new Error(`Error deleting room: ${result.message}`);
            res.status(200).json({
                message: "Room deleted successfully",
            });
        } catch(error){
            next(error);
        }
    }

}

module.exports = RoomsController;