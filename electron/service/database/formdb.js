'use strict';

const { Service } = require('ee-core');
const Storage = require('ee-core/storage');
const _ = require('lodash');
const path = require('path');
const IdGenerator = require("../../utils/IdGenerator.js");

const idGenerator = new IdGenerator("ID_");


/**
 * json数据存储tableData结构的表单信息
 * @class
 */
class FormDbService extends Service {

  constructor (ctx) {
    super(ctx);

    // jsondb数据库
    this.jsonFile = "form-jsondb";
    this.formDb = Storage.connection(this.jsonFile);  
    this.dbKey = {
      form_data: 'form_data',
    };
  }

  /*
   * 增 form
   * form = {id: "id", tableData: tableData};
   */
  async addForm(tableData) {
    const key = this.dbKey.form_data;
    if (!this.formDb.db.has(key).value()) {
      this.formDb.db.set(key, []).write();
    }
    
    const id = idGenerator.generateId();
    const form = {
      id: id,
      tableData: tableData,
    }

    const data = this.formDb.db
    .get(key)
    .push(form)
    .write();

    return data;
  }

 /*
  * 删 form
  */
  async delFormById(id = -1) {
    const key = this.dbKey.form_data;
    const data = this.formDb.db
    .get(key)
    .remove({id: id})
    .write();

    return data;
  }

 /*
  * 改 form
  */
  async updateFormById(id = -1, tableData = {}) {
    const key = this.dbKey.form_data;
    const data = this.formDb.db
    .get(key)
    .find({ id: id })
    .assign({tableData: tableData})
    .write();

    return data;
  }


 /*
  * all Image data
  */
  async getAllForms() {
    const key = this.dbKey.form_data;
    if (!this.formDb.db.has(key).value()) {
      this.formDb.db.set(key, []).write();
    }
    const data = this.formDb.db
    .get(key)
    .value();

    if (_.isEmpty(data)) {
      data = []
    }

    return data;
  }



  /*
   * 增 Test data
   */
  async addTestData(user) {
    const key = this.demoDBKey.test_data;
    if (!this.demoDB.db.has(key).value()) {
      this.demoDB.db.set(key, []).write();
    }
    
    const data = this.demoDB.db
    .get(key)
    .push(user)
    .write();

    return data;
  }

  /*
   * 删 Test data
   */
  async delTestData(name = '') {
    const key = this.demoDBKey.test_data;
    const data = this.demoDB.db
    .get(key)
    .remove({name: name})
    .write();

    return data;
  }

  /*
   * 改 Test data
   */
  async updateTestData(name= '', age = 0) {
    const key = this.demoDBKey.test_data;
    const data = this.demoDB.db
    .get(key)
    .find({name: name}) // 修改找到的第一个数据，貌似无法批量修改 todo
    .assign({age: age})
    .write();

    return data;
  }

  /*
   * 查 Test data
   */
  async getTestData(age = 0) {
    const key = this.demoDBKey.test_data;
    let data = this.demoDB.db
    .get(key)
    //.find({age: age}) 查找单个
    .filter(function(o) {
      let isHas = true;
      isHas = age === o.age ? true : false;
      return isHas;
    })
    //.orderBy(['age'], ['name']) 排序
    //.slice(0, 10) 分页
    .value();

    if (_.isEmpty(data)) {
      data = []
    }

    return data;
  }

  /*
   * all Test data
   */
  async getAllTestData() {
    const key = this.demoDBKey.test_data;
    if (!this.demoDB.db.has(key).value()) {
      this.demoDB.db.set(key, []).write();
    }
    let data = this.demoDB.db
    .get(key)
    .value();

    if (_.isEmpty(data)) {
      data = []
    }

    return data;
  }

  /*
   * get data dir (sqlite)
   */
  async getDataDir() {
    const dir = this.demoDB.getStorageDir();    

    return dir;
  } 

  /*
   * set custom data dir (sqlite)
   */
  async setCustomDataDir(dir) {
    if (_.isEmpty(dir)) {
      return;
    }

    // the absolute path of the db file
    const dbFile = path.join(dir, this.jsonFile);
    this.demoDB = Storage.connection(dbFile);    

    return;
  }  
}

FormDbService.toString = () => '[class FormDbService]';
module.exports = FormDbService;