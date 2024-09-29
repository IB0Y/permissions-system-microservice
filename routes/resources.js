const { ResourceService } = require("../controllers/Resource");

const routes = (app) => {
    const api = '/api/v1/resources';
    app.post(`${api}/`, ResourceService.create);
    app.put(`${api}/:resource_uuid`, ResourceService.update);
    app.delete(`${api}/:resource_uuid`, ResourceService.delete);
    app.get(`${api}/:resource_uuid`, ResourceService.findOne);
    app.get(`${api}/all`, ResourceService.findAll);
}

module.exports = {
    ResourcesRoute: routes
};