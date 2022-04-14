const ServiceModel = require('../models/Service')

const getServices = async(req, res, next) => {
    try {
        const services = await ServiceModel.find();
        return res.json({ "status": "ok", "data": services })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Get service by id
const getServiceById = async(req, res, next) => {
    try {
        const _id = req.params.serviceId
        const service = await ServiceModel.findById(_id)
        return res.json({ "status": "ok", "data": service })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Get services by category
const getServiceByCategory = async(req, res, next) => {
    try {
        const { type } = req.body;
        const services = await ServiceModel.find({
            type: type
        });
        return res.json({ "status": "ok", "data": services });
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Add service
const addService = async(req, res, next) => {
    try {
        const service = req.body
        await ServiceModel.create(service);
        return res.json({ "status": "ok", "info": "Add service successfully" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Update service
const updateService = async(req, res, next) => {
    try {
        const service = req.body;
        await ServiceModel.updateOne({ _id: service._id }, service);
        return res.json({ "status": "ok", "info": "Update service successfully" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}

//Delete service
const deleteService = async(req, res, next) => {
    try {
        const id = req.params.id;
        await ServiceModel.deleteOne({ _id: id });
        return res.json({ "status": "ok", "info": "Delete service successfully" })
    } catch (error) {
        return res.json({ "status": "error", "error": error.message })
    }
}
module.exports = {
    getServices,
    getServiceById,
    getServiceByCategory,
    addService,
    updateService,
    deleteService
}