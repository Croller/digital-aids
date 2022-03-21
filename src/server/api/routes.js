module.exports = {
  'GET /api/user/auth': 'UserController.auth',
  'POST /api/user/signin': 'UserController.signin',
  'PUT /api/user/signup': 'UserController.signup',
  'POST /api/user/update': 'UserController.update',
  'POST /api/user/reset': 'UserController.reset',

  'GET /api/table': 'CommonController.getTables',
  'GET /api/table/:name/stats': 'CommonController.getTableStats',
  'GET /api/table/:name/record': 'CommonController.getRecordById',
  'POST /api/table/:name/record/find': 'CommonController.getRecordByParam',
  'POST /api/table/:name/record/search': 'CommonController.searchRecord',
  'POST /api/table/:name/record/update': 'CommonController.updateRecord',
  'GET /api/table/:name/record/history': 'CommonController.getRecordHistory',
  'DELETE /api/table/:name/record/delete': 'CommonController.deleteRecord',

  'GET /api/external/address-to-coords': 'ExternalController.getCoordsByAddress_Google',
  'GET /api/external/coords-to-address': 'ExternalController.getAddressByCoords_Google',
  'POST /api/external/text-language-change': 'ExternalController.getTextTranslate_Google',
  'GET /api/external/geo-location': 'ExternalController.getGeolocation_Google',

  'POST /api/mailer/send': 'MailerController.send',

  'DELETE /api/file/delete': 'CommonController.deleteFile',
};
