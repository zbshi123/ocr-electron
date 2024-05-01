'use strict';
const { Controller } = require('ee-core');
const Services = require('ee-core/services');


/**
 * electron-egg framework - 功能demo
 * @class
 */
class FrameworkController extends Controller {

  constructor(ctx) {
    super(ctx);
  }

  /**
   * json数据库操作
   * @param args 前端传的参数
   */   
  async jsondbOperation(args) {
    //const { action, info, delete_name, update_name, update_age, search_age, data_dir } = args;
    const { action, image, delete_tag, update_tag, update_image_url, search_image_url, data_dir } = args;

    const data = {
      action,
      result: null,
      all_list: []
    };
    
    switch (action) {
      case 'add' :
        //data.result = await Services.get('database.jsondb').addTestData(info);
        data.result = await Services.get('database.jsondb').addImageData(image);
        break;
      case 'delByTag' :
        //data.result = await Services.get('database.jsondb').delTestData(delete_name);
        data.result = await Services.get('database.jsondb').delImageDataByTag(delete_tag);
        break;
      case 'update' :
        //data.result = await Services.get('database.jsondb').updateTestData(update_name, update_age);
        break;
      case 'get' :
        //data.result = await Services.get('database.jsondb').getTestData(search_age);
        data.result = await Services.get('database.jsondb').getImageData(search_image_url);
        break;
      case 'getDataDir' :
        data.result = await Services.get('database.jsondb').getDataDir();
        break;
      case 'setDataDir' :
        data.result = await Services.get('database.jsondb').setCustomDataDir(data_dir);
        break;          
    }

    data.all_list = await Services.get('database.jsondb').getAllImageData();

    return data;
  }
}

FrameworkController.toString = () => '[class FrameworkController]';
module.exports = FrameworkController;  