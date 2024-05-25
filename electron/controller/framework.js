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


    /**
   * json数据库操作
   * @param args 前端传的参数
   */   
    async formDbOperation(args) {
      const { function_name, id, tableData } = args;
  
      const data = {
        function_name: function_name,
        result: null,
        all_list: []
      };
      
      switch (function_name) {
        case 'addForm' :
          data.result = await Services.get('database.formdb').addForm(tableData);
          break;
        case 'delFormById' :
          data.result = await Services.get('database.formdb').delFormById(id);
          break;
        case 'updateFormById' :
          data.result = await Services.get('database.formdb').updateFormById(id, tableData);
          break;
        case 'getAllForms' :
          data.result = await Services.get('database.formdb').getAllForms();
          break;     
      }
  
      data.all_list = await Services.get('database.formdb').getAllForms();
  
      return data;
    }


  /**
   * sqlite数据库操作
   */   
  async sqlitedbOperation(args) {
    const { function_name, image, id } = args;

    const data = {
      action: function_name,
      result: null,
      all_list: [],
      code: 0
    };

    try {
      // test
      Services.get('database.sqlitedb').getDataDir();
    } catch (err) {
      console.log(err);
      data.code = -1;
      return data;
    }

    switch (function_name) {
      case 'addImage' :
        data.result = await Services.get('database.sqlitedb').addImage(image);;
        break;
      case 'deleteImageById' :
        data.result = await Services.get('database.sqlitedb').deleteImageById(id);;
        break;
      case 'getImageById' :
        data.result = await Services.get('database.sqlitedb').getImageById(id);
        break;
      case 'getAllImages' :
        data.result = await Services.get('database.sqlitedb').getAllImages();
        break;
      case 'getDataDir' :
        data.result = await Services.get('database.sqlitedb').getDataDir();
        break;
      case 'setDataDir' :
        data.result = await Services.get('database.sqlitedb').setCustomDataDir(data_dir);
        break;            
    }

    data.all_list = await Services.get('database.sqlitedb').getAllImages();

    return data;
  }  

   /**
   * sqlite数据库操作，用于测试
   */   
  async sqlitedbOperationTest(args) {
    const { action, info, delete_name, update_name, update_age, search_age, data_dir } = args;

    const data = {
      action,
      result: null,
      all_list: [],
      code: 0
    };

    try {
      // test
      Services.get('database.sqlitedb').getDataDir();
    } catch (err) {
      console.log(err);
      data.code = -1;
      return data;
    }

    switch (action) {
      case 'add' :
        data.result = await Services.get('database.sqlitedb').addTestDataSqlite(info);;
        break;
      case 'del' :
        data.result = await Services.get('database.sqlitedb').delTestDataSqlite(delete_name);;
        break;
      case 'update' :
        data.result = await Services.get('database.sqlitedb').updateTestDataSqlite(update_name, update_age);
        break;
      case 'get' :
        data.result = await Services.get('database.sqlitedb').getTestDataSqlite(search_age);
        break;
      case 'getDataDir' :
        data.result = await Services.get('database.sqlitedb').getDataDir();
        break;
      case 'setDataDir' :
        data.result = await Services.get('database.sqlitedb').setCustomDataDir(data_dir);
        break;            
    }

    data.all_list = await Services.get('database.sqlitedb').getAllTestDataSqlite();

    return data;
  }  
}

FrameworkController.toString = () => '[class FrameworkController]';
module.exports = FrameworkController;  