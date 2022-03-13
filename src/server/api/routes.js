const routes = {
  'GET /api/user/auth': 'UserController.auth',
  'POST /api/user/signin': 'UserController.signin',
  'POST /api/user/signup': 'UserController.signup',
  'PUT /api/user/update': 'UserController.update',
  'POST /api/user/reset': 'UserController.reset',

  'GET /api/table': 'CommonController.getTables',
  'GET /api/table/:name/stats': 'CommonController.getTableStats',
  'GET /api/table/:name/record': 'CommonController.getRecordById',
  'POST /api/table/:name/record': 'CommonController.getRecordByParam',
  'POST /api/table/:name/record/search': 'CommonController.searchRecord',
  'PUT /api/table/:name/record/update': 'CommonController.updateRecord',
  'DELETE /api/table/:name/record/delete': 'CommonController.deleteRecord',
  
  'POST /api/mailer/send': 'MailerController.send',

  'GET /api/external/address-to-coords': 'ExternalController.getCoordsByAddress_Google',
  'GET /api/external/coords-to-address': 'ExternalController.getAddressByCoords_Google',
  'GET /api/external/text-language-change': 'ExternalController.getTextTranslate_Google',
  'GET /api/external/geolocation': 'ExternalController.getGeolocation_Google',

  'DELETE /api/file/delete': 'CommonController.deleteFile',
};

module.exports = routes;
