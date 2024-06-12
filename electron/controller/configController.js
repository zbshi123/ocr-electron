'use strict';
const { Controller } = require('ee-core');
const Services = require('ee-core/services');


/**
 * electron-egg framework - 功能demo
 * @class
 */
class ConfigController extends Controller {

    constructor(ctx) {
        super(ctx);
    }

    /**
   * json数据库操作
   * @param args 前端传的参数
   */   
    async configDbOperation(args) {
      const { function_name, itemName, itemContent} = args;
  
      const data = {
        function_name: function_name,
        result: null,
        result_list: [],
        all_list: []
      };
      
      switch (function_name) {
        case 'setConfigItem':
          data.result = await Services.get('database.configdb').setConfigItem(itemName, itemContent);
          break;
        case 'getConfigItemContent':
          data.result = await Services.get('database.configdb').getConfigItemContent(itemName);
          break;
        case 'test':
          data.result = await Services.get('database.configdb').test();
      }

      return data;
    }
}

ConfigController.toString = () => '[class ConfigController]';
module.exports = ConfigController;  