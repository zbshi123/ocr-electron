
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  test: 'controller.example.test',
  hello: 'controller.example.hello',
  imgResolve: 'controller.imgResolve.imgResolve',
  jsondbOperation: 'controller.framework.jsondbOperation',
  generateXLSX: 'controller.xlsxController.generateXLSX'
}

export {
  ipcApiRoute
}

