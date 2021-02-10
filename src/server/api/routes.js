const routes = {
  'POST /api/user/signin': 'UserController.signin',
  'GET /api/user/auth': 'UserController.auth',
  'POST /api/user/create': 'UserController.create',
  'POST /api/user/update': 'UserController.update',
  'POST /api/user/remove': 'UserController.remove',
};

module.exports = routes;
