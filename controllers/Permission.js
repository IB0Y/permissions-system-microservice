const database = require("../models");
const { ResponseService } = require("../tools/resposes.js");

const PermissionModel = database.user_permission;
const RoleModel = database.user_role;

class Permission {
    async create(req, res) {
        try {
            const { user_uuid, role_uuid } = req.body;
            const permission = await PermissionModel.create(
                {
                    user_uuid,
                    role_uuid
                }
            );
            return ResponseService.success(
                {
                    res,
                    data: permission,
                    message: "Permission created successfully"
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


    async create_custom_permission(req, res) {
        try {
            const { user_uuid, resource_permissions, role_name } = req.body;
            const { is_custom } = req.query;

            if (!is_custom) {
                return ResponseService.badRequest(
                    {
                        res,
                        message: "is_custom query parameter is required"
                    }
                );

            }
            //create custom role
            const custom_role = await RoleModel.create(
                {
                    is_custom,
                    resource_permissions,
                    name: role_name
                }
            );

            if (!custom_role) {
                return ResponseService.error(
                    {
                        res,
                        message: "Error creating custom role"
                    }
                );
            }

            //assign custom role to user

            const permission = await PermissionModel.create(
                {
                    user_uuid,
                    role_uuid: custom_role.id
                }
            );

            return ResponseService.success(
                {
                    res,
                    data: permission,
                    message: "Custom Permission created successfully"
                }
            );


        } catch (error) {

        }
    };

    async user_permissions(req, res) {
        try {
            const { user_uuid } = req.params;
            const permissions = await PermissionModel.find(
                {
                    where: {
                        user_uuid
                    },
                    include: [
                        {
                            model: database.user_role,
                            as: "role",
                        }
                    ]
                }
            );
            return ResponseService.success(
                {
                    res,
                    data: permissions,
                    message: "User permissions retrieved successfully"
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
            const { user_uuid } = req.params;
            const permission = await PermissionModel.update(
                { role_uuid: req.body.role_uuid },
                {
                    where: {
                        user_uuid
                    }
                }
            );

            if (permission[0] === 0) {
                return ResponseService.notFound(
                    {
                        res,
                        message: "Permission not found"
                    }
                );
            }

            return ResponseService.success(
                {
                    res,
                    data: permission,
                    message: "Permission updated successfully"
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
            const { user_uuid } = req.params;
            const permission = await PermissionModel.destroy(
                {
                    where: {
                        user_uuid
                    }
                }
            );

            if (permission === 0) {
                return ResponseService.notFound(
                    {
                        res,
                        message: "Permission not found"
                    }
                );
            }

            return ResponseService.success(
                {
                    res,
                    message: "Permission deleted successfully"
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
            const permissions = await PermissionModel.findAll();
            return ResponseService.success(
                {
                    res,
                    data: permissions,
                    message: "Permissions retrieved successfully"
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
    PermissionService: new Permission()
};