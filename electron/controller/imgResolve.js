'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

/**
 * controller 的.js文件名需要使用驼峰命名法，首字母小写，不然会有奇怪的问题。
 * @class
 */
class ImgResolveController extends Controller {

  constructor(ctx) {
    super(ctx);
  }

  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */
  async imgResolve (args, event) {
    const result = await Services.get('example').test('electron');
    Log.info('service result:', result);
    Log.info('service args:', args);
    //Log.info('service event:', event);

    this.binarizeImage(args[0]).then(result => {
      Log.info('processedImgUrl' , result);
    }).catch (error => {
      Log.info('processedImgUrl failed.', error);
    });

    return 'imgResolve';
  }
}

ImgResolveController.toString = () => '[class ImgResolveController]';
module.exports = ImgResolveController;