'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

/**
 * example
 * @class
 */
class XlsxController extends Controller {
    constructor(ctx) {
        super(ctx);
    }


  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */
    async generateXLSX (args, event) {
        const ret = await Services.get('xlsxService').generateXLSX(args);
        Log.info('service result:', ret);
        Log.info('service args:', args);
        // Log.info('service event:', event);

        return ret;
    }


}

XlsxController.toString = () => '[class XlsxController]';
module.exports = XlsxController;  