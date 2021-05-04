const routes = {
  'POST /api/user/signin': 'UserController.signin',
  'GET /api/user/auth': 'UserController.auth',

  'GET /api/table': 'CommonController.getTableByNames',
  'GET /api/table/:name/record': 'CommonController.getTableRecordById',
  'POST /api/table/:name/record': 'CommonController.getTableRecordByParam',
  'POST /api/table/:name/record/update': 'CommonController.updateTableRecord',
  'POST /api/table/:name/record/delete': 'CommonController.deleteTableRecord',
  
  'POST /api/mailer/send': 'MailerController.send',

  'DELETE /api/file/delete': 'CommonController.deleteFile',
};

module.exports = routes;
