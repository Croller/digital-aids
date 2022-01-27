const routes = {
  'GET /api/user/auth': 'UserController.auth',
  'POST /api/user/signin': 'UserController.signin',
  'POST /api/user/signup': 'UserController.signup',
  'POST /api/user/update': 'UserController.update',
  'POST /api/user/reset': 'UserController.reset',

  'GET /api/table': 'CommonController.getTableByNames',
  'GET /api/table/:name/record': 'CommonController.getTableRecordById',
  'POST /api/table/:name/record': 'CommonController.getTableRecordByParam',
  'POST /api/table/:name/record/update': 'CommonController.updateTableRecord',
  'POST /api/table/:name/record/delete': 'CommonController.deleteTableRecord',
  
  'POST /api/mailer/send': 'MailerController.send',

  'GET /api/external/address-to-coords': 'ExternalController.getCoordsByAddress_Google',
  'GET /api/external/coords-to-address': 'ExternalController.getAddressByCoords_Google',
  'GET /api/external/text-language-change': 'ExternalController.getTextTranslate_Google',
  'GET /api/external/geolocation': 'ExternalController.getGeolocation_Google',

  'DELETE /api/file/delete': 'CommonController.deleteFile',
};

module.exports = routes;
