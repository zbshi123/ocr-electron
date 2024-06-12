'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

/**
 * example
 * @class
 */
class TestController extends Controller {

  constructor(ctx) {
    super(ctx);
  }


  /**
   * 所有方法接收两个参数
   * @param args 前端传的参数
   * @param event - ipc通信时才有值。详情见：控制器文档
   */

  /**
   * test
   */
  async test () {
    const result = await Services.get('database.formSqliteDb').test();
    Log.info('service result:', result);

    return 'test';
  }

}

TestController.toString = () => '[class TestController]';
module.exports = TestController;  