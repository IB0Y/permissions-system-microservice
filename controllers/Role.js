const database = require("../models");
const { ResponseService } = require("../tools/resposes.js");

const RoleModel = database.user_role;

class Role {
    async create(req, res) {
        try {
            const { role_name, is_custom, resource_permissions } = req.body;
            const role = await RoleModel.create(
                {
                    name: role_name,
                    is_custom,
                    resource_permissions
                }
            );
            return ResponseService.success(
                {
                    res,
                    data: role,
                    message: "Role created successfully"
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
            const { role_uuid } = req.params;
            const role = await RoleModel.update(
                {
                    ...req.body
                },
                {
                    where: {
                        id: role_uuid
                    }
                }
            );
            return ResponseService.success(
                {
                    res,
                    data: role,
                    message: "Role updated successfully"
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
            const { role_uuid } = req.params;
            const role = await RoleModel.destroy(
                {
                    where: {
                        id: role_uuid
                    }
                }
            );
            return ResponseService.success(
                {
                    res,
                    data: role,
                    message: "Role deleted successfully"
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


    async fetch(req, res) {
        try {
            const roles = await RoleModel.findAll();
            return ResponseService.success(
                {
                    res,
                    data: roles
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
            const { role_uuid } = req.params;
            const role = await RoleModel.findOne(
                {
                    where: {
                        id: role_uuid
                    }
                }
            );
            if (!role) {
                return ResponseService.notFound(
                    {
                        res,
                        message: "Role not found"
                    }
                );
            }
            return ResponseService.success(
                {
                    res,
                    data: role
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
    RoleService: new Role()
};