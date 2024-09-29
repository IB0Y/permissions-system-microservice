const { RoleService } = require("../controllers/Role");

const routes = (app) => {
    const api = '/api/v1/roles';
    app.post(`${api}/`, RoleService.create);
    app.get(`${api}/:role_uuid`, RoleService.findOne);
    app.put(`${api}/:role_uuid`, RoleService.update);
    app.delete(`${api}/:role_uuid`, RoleService.delete);

    app.get(`${api}/all`, RoleService.fetch);

};

module.exports = {
    RolesRoute: routes
};