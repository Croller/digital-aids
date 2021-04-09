const routes = {
  'POST /api/user/signin': 'UserController.signin',
  'GET /api/user/auth': 'UserController.auth',

  'GET /api/tables': 'CommonController.getTableByNames',
  'GET /api/table/record': 'CommonController.getTableRecord',
  'GET /api/table/records': 'CommonController.getTableRecords',

  'POST /api/table/:name/record': 'CommonController.createTableRecord',

  // '/api/table/:name/record': {
  //   get: 'CommonController.getTableByNames',
  // },
};

module.exports = routes;
