const { PermissionService } = require("../controllers/Permission");

const routes = (app) => {
    const api = '/api/v1/permissions';
    app.post(`${api}/`, PermissionService.create);
    app.post(`${api}/create-custom-permission`, PermissionService.create_custom_permission);
    app.get(`${api}/:user_uuid`, PermissionService.user_permissions);
    app.put(`${api}/:user_uuid`, PermissionService.update);
    app.delete(`${api}/:user_uuid`, PermissionService.delete);

    app.get(`${api}/all`, PermissionService.findAll);
};

module.exports = {
    PermissionsRoute: routes
};