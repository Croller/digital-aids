const routes = {
  'POST /api/user/signin': 'UserController.signin',
  'GET /api/user/auth': 'UserController.auth',

  'GET /api/table': 'CommonController.getTableByNames',
  'GET /api/table/:name/record': 'CommonController.getTableRecord',
  'GET /api/table/:name/records': 'CommonController.getTableRecords',
  'POST /api/table/:name/record/update': 'CommonController.updateTableRecord',

  'DELETE /api/file/delete': 'CommonController.deleteFile',
};

module.exports = routes;
