
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  // test: 'controller.example.test',
  hello: 'controller.example.hello',
  imgResolve: 'controller.imgResolve.imgResolve',
  generateXLSX: 'controller.xlsxController.generateXLSX',

  test: 'controller.test.test',

  // database
  jsondbOperation: 'controller.framework.jsondbOperation',
  sqlitedbOperationTest: 'controller.framework.sqlitedbOperationTest',
  sqlitedbOperation: 'controller.framework.sqlitedbOperation',
  formDbOperation: 'controller.framework.formDbOperation',
  formSqliteDbOperation: 'controller.framework.formSqliteDbOperation',

  // config
  configDbOperation: 'controller.configController.configDbOperation',

  // os
  messageShow: 'controller.os.messageShow',
  messageShowConfirm: 'controller.os.messageShowConfirm',
  selectFolder: 'controller.os.selectFolder',
  selectPic: 'controller.os.selectPic',
  openDirectory: 'controller.os.openDirectory',
  loadViewContent: 'controller.os.loadViewContent',
  removeViewContent: 'controller.os.removeViewContent',
  createWindow: 'controller.os.createWindow',
  getWCid: 'controller.os.getWCid',
  sendNotification: 'controller.os.sendNotification',
  initPowerMonitor: 'controller.os.initPowerMonitor',
  getScreen: 'controller.os.getScreen',
  autoLaunch: 'controller.os.autoLaunch',
  setTheme: 'controller.os.setTheme',
  getTheme: 'controller.os.getTheme',
}

export {
  ipcApiRoute
}

