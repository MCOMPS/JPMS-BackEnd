const IDgenerator = require("../../utils/IDgenerator");
const db = require("../index");


exports.getAllTenants = async (property_id) => {
    const query = "Select * from tenants where property_id=$1";
    const values = [property_id];
    return await db.query(query, values);
}

exports.getTenant = async (tenant_id) => {
    const query = "Select * from tenants where tenant_id=$1";
    const values = [tenant_id];
    return await db.query(query, values);
}

exports.addTenant = async (property_id, room_id, tenant) => {
    const query= "INSERT INTO tenants \n" +
        "(tenant_id, room_id, name, emirates_id, phone_number, email, date_settle_in, property_id) \n" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
    const tenant_id = IDgenerator.generateTenantId();
    const values = [tenant_id, room_id, tenant.name, tenant.emirates_id, tenant.phone_number, tenant.email, tenant.date_settle_in, property_id];
    return await db.query(query, values);
}

exports.updateTenant = async (tenant_id, updates) => {
    const getTenantQuery = "SELECT * FROM tenants WHERE tenant_id = $1;";
    const getTenantValues = [tenant_id];
    const tenant = await db.query(getTenantQuery, getTenantValues);
    let tenantObj = tenant.rows[0];

    function updateTenant(tenant, updates) {
        for (let key in updates) {
            if (tenant.hasOwnProperty(key)) {
                tenant[key] = updates[key];
            }
        }
    }

    updateTenant(tenantObj, updates);

    const updateTenantQuery = "update tenants set name=$1, emirates_id=$2, phone_number=$3, email=$4, date_settle_in=$5 where tenant_id=$6;";
    const updateTenantValues = [tenantObj.name, tenantObj.emirates_id, tenantObj.phone_number, tenantObj.email, tenantObj.date_settle_in, tenant_id];
    return await db.query(updateTenantQuery, updateTenantValues);
}

exports.moveToApartment = async (property_id, tenant_id) => {
    const query = "update tenants set property_id=$1 where tenant_id=$2;";
    const values = [property_id, tenant_id];
    return await db.query(query, values);
}

async function verifyRoomInApartment(newRoom_id, tenant_id) {
    const currentAptQuery = "select property_id from tenants where tenant_id=$1;";
    const currentAptQueryValues = [tenant_id];
    const {rows: currentApt_id} = await db.query(currentAptQuery, currentAptQueryValues);
    
    const checkAptQuery = "select property_id from rooms where room_id=$1;";
    const checkAptQueryValues = [newRoom_id];
    const {rows: checkApt_id} = await db.query(checkAptQuery, checkAptQueryValues);

    const failMsg = `room ${newRoom_id} is not in the same apartment as tenant ${tenant_id}, tenant is in apt ${currentApt_id[0].property_id} while room is in apt ${checkApt_id[0].property_id}`;
    const successMsg = `room ${newRoom_id} is in the same apartment as tenant ${tenant_id}, tenant is in apt ${currentApt_id[0].property_id} while room is in apt ${checkApt_id[0].property_id}`;
    if(checkApt_id[0].property_id !== currentApt_id[0].property_id){
        return {
            response: false,
            message: failMsg
        }
    }

    return {
        response: true,
        message: successMsg
    }
} // end of verifyRoomInApartment

async function verifyRoomIsVacant(newRoom_id){
    const query = "select vacant from rooms where room_id=$1;";
    const values = [newRoom_id];
    const {rows: vacant} = await db.query(query, values);
    return vacant[0].vacant; // return is boolean
} // end of verifyRoomIsVacant

async function checkCapacity(newRoom_id){
    const query = "select count(*) from tenants where room_id=$1;";
    const result = await db.query(query, [newRoom_id]);
    return result.rows[0].count;
}

exports.moveToRoom = async (newRoom_id, tenant_id) => {
    //  1. verify if the matched room is in the same apartment (this is in the case where tenant is moving within the same apartment)
    const verifyRoomInApt = await verifyRoomInApartment(newRoom_id, tenant_id);

    //   1.1: if not in the same apartment, return suitable message with a 500 status code (status in controller)
    if (verifyRoomInApt.response === false) {
        return {
            result: false,
            message: verifyRoomInApt.message
        }
    }
    //   1.2: if in the same apartment, proceed to step 2
    //  2. verify if the room is vacant
    const verifyRoomVacant = await verifyRoomIsVacant(newRoom_id);

    //   2.1: if vacant, update the room_id in the tenants table
    if (verifyRoomVacant) {
        const updateRoomIdQuery = "update tenants set room_id=$1 where tenant_id=$2;";
        const updateRoomIdQueryValues = [newRoom_id, tenant_id];
        const result = await db.query(updateRoomIdQuery, updateRoomIdQueryValues);
    }
    //   2.2: if not vacant, return suitable message
    if (!verifyRoomVacant) {
        return {
            result: false,
            msg: "room is not vacant"
        };
    }

    //  3. update (vacant) in the rooms table if room capacity is full after moving to the room
    //   3.1 first you need to check how many tenants are in the room, after moving the tenant (step 2) to the room
    const currentCapacity = await checkCapacity(newRoom_id);
    const checkAssignedCapacityQuery = "select capacity from rooms where room_id=$1";
    const assignedCapacity = await db.query(checkAssignedCapacityQuery, [newRoom_id]);
    //   3.2 if the room is full (currentCapacity === assignedCapacity), update the vacant column to false
    
    if (currentCapacity === assignedCapacity){
        const updateVacantQuery = "update rooms set vacant=false where room_id=$1";
        await db.query(updateVacantQuery, newRoom_id);
    }

    //   3.3 if the room is not full (count < rooms.capacity), do nothing
    // .........

    //  4. Return suitable message with a 200 status code (status in controller)
    return {
        result: true,
        msg:`room updated to ${newRoom_id}`,
    };

    // console.log(`room_id: ${newRoom_id}, tenant_id: ${tenant_id}`);
    // const query = "update tenants set room_id=$1 where tenant_id=$2;";
    // const values = [newRoom_id, tenant_id];
    // return await db.query(query, values);
}

// exports.archiveTenant = async (tenant_id) => {
//
// }
