const IDgenerator = require('../utils/IDgenerator');
class ScratchController {
    constructor(pathPassed) {
        this.basePath = pathPassed;
        this.model = require(`${this.basePath}/scratch.model`);
        // this.model = require(`${this.basePath}/main/tenants.model`);

    }

    printHello = async (req, res, next) => {
        const newRoom_id = req.query.room_id;
        const tenant_id = req.query.tenant_id;
        const test = await this.model.verifyRoomInApartment(newRoom_id, tenant_id);
        res.status(200).json({
            data: test,
        });
    }

    getApartments = async (req, res, next) => {
        try {
            // 1. query the database
            const apartments = await this.model.selectApartments();

            // 2. if the database returned an error, throw an error
            if (apartments instanceof Error)
                throw new Error(`Error getting apartments: ${apartments.message}`);

            // 3. else, return the apartments
            res.status(200).json({
                apartments: apartments.rows
            });
        } catch (error) {
            next(error);
        }

    }

    generateId = (req, res) => {
        const id = IDgenerator.generateApartmentId();
        res.status(200).json({
            id
        })
    }

    getAllTenants = async (req, res, next) => {
        try {
            // 1. query the database
            const tenants = await this.model.selectTenants();

            // 2. if the database returned an error, throw an error
            if (tenants instanceof Error)
                throw new Error(`Error getting tenants: ${tenants.message}`);

            // 3. else return the tenants
            res.status(200).json({
                tenants: tenants.rows
            })
        } catch (error) {
            next(error);
        }

    }

    createApartment = async (req, res, next) => {
        try {
            // 1. get the apartment from the request body
            const apartment = req.body;

            // 2. add the apartment to the database
            const apartments = await this.model.createApartment(apartment);

            // 3. if the database returned an error, throw an error
            if (apartments instanceof Error)
                throw new Error(`Error creating apartment: ${apartments.message}`);

            // 4. else return the apartments

            res.status(201).json({
                msg: `${apartment.building_name} was created successfully with id ${apartment.apt_number}`
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ScratchController;
