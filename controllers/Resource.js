const database = require('../models');
const { ResponseService } = require('../tools/resposes');
const ResourceModel = database.resource;

class Resource {
    async create(req, res) {
        try {
            const resource = await ResourceModel.create({
                resource_name: req.body.resource_name,
                parent_resource_uuid: req.body.parent_resource_uuid,
                description: req.body.description,
                resource_id: req.body.resource_id,
                is_active: req.body.is_active,
                resource_type_id: req.body.resource_type_id
            });

            return ResponseService.success(
                {
                    res,
                    data: resource,
                    message: 'Resource created successfully'
                }
            );
        } catch (error) {
            return ResponseService.error(
                {
                    res,
                    message: error.message
                }
            );
        }
    }


    async update(req, res) {
        try {
            const { resource_uuid } = req.params;
            const resource = await ResourceModel.update(
                req.body,
                {
                    where: {
                        id: resource_uuid
                    }
                }
            );

            if (resource[0] === 0) {
                return ResponseService.notFound(
                    {
                        res,
                        message: 'Resource not found'
                    }
                );
            }

            return ResponseService.success(
                {
                    res,
                    data: resource,
                    message: 'Resource updated successfully'
                }
            );
        } catch (error) {
            return ResponseService.error(
                {
                    res,
                    message: error.message
                }
            );
        }
    }

    async delete(req, res) {
        try {
            const { resource_uuid } = req.params;
            const resource = await ResourceModel.destroy(
                {
                    where: {
                        id: resource_uuid
                    }
                }
            );

            if (resource === 0) {
                return ResponseService.notFound(
                    {
                        res,
                        message: 'Resource not found'
                    }
                );
            }

            return ResponseService.success(
                {
                    res,
                    data: resource,
                    message: 'Resource deleted successfully'
                }
            );
        } catch (error) {
            return ResponseService.error(
                {
                    res,
                    message: error.message
                }
            );
        }
    }

    async findAll(req, res) {
        try {
            const resources = await ResourceModel.findAll();
            return ResponseService.success(
                {
                    res,
                    data: resources,
                    message: 'Resources retrieved successfully'
                }
            );
        } catch (error) {
            return ResponseService.error(
                {
                    res,
                    message: error.message
                }
            );
        }
    }

    async findOne(req, res) {
        try {
            const { resource_uuid } = req.params;
            const resource = await ResourceModel.findByPk(resource_uuid);

            if (!resource) {
                return ResponseService.notFound(
                    {
                        res,
                        message: 'Resource not found'
                    }
                );
            }

            return ResponseService.success(
                {
                    res,
                    data: resource,
                    message: 'Resource retrieved successfully'
                }
            );
        } catch (error) {
            return ResponseService.error(
                {
                    res,
                    message: error.message
                }
            );
        }
    }
}


module.exports = {
    ResourceService: new Resource()
}