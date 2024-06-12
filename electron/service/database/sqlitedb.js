'use strict';

const { Service } = require('ee-core');
const Storage = require('ee-core/storage');
const _ = require('lodash');
const path = require('path');

/**
 * sqlite数据存储
 * @class
 */
class SqlitedbService extends Service {

  constructor (ctx) {
    super(ctx);

    this.demoSqliteFile = 'sqlite-demo.db';
    this.sqliteFile = 'sqlite.db'; // sqlite数据库的本地文件
    let sqliteOptions = {
      driver: 'sqlite',
      default: {
        timeout: 6000,
        verbose: console.log // 打印sql语法
      }
    }
    this.demoSqliteDB = Storage.connection(this.demoSqliteFile, sqliteOptions);
    this.sqliteDB = Storage.connection(this.sqliteFile, sqliteOptions);

     // 建表
    this.checkAndCreateImageTable();
  }


  /*
   * 检查并创建表 (sqlite)
   */
  async checkAndCreateImageTable() {
    console.log("checkAndCreateImageTable() start");
    const tableName = "image_table"

    // 检查表是否存在
    const imageTable = this.sqliteDB.db.prepare('SELECT * FROM sqlite_master WHERE type=? AND name = ?');
    const result = imageTable.get('table', tableName);
    
    // 如果存在则返回
    if (result) {
      return;
    }

    // 不存在则创建表
    const create_table_image =
    `CREATE TABLE ${tableName}
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT,
        image_url TEXT NOT NULL
      );`
    this.sqliteDB.db.exec(create_table_image);
    console.log("成功建表：", tableName);
  }


  /*
  * 添加图像url (sqlite)
  */
  async addImage(image_param) {
    //console.log("add data:", data);
    console.log("addImage() start!")
    await this.checkAndCreateImageTable();

    const table = "image_table";
    const image = {
      description: image_param.description,
      image_url: image_param.image_url
    };
    const sql = `INSERT INTO ${table} (description, image_url) VALUES (@description, @image_url)`;

    const insert = this.sqliteDB.db.prepare(sql);
    insert.run(image);

    return true;
  }


  /*
  * 删除图像url (sqlite)
  */
  async deleteImageById(id = -1) {
    console.log("delImageById() start!")
    await this.checkAndCreateImageTable();

    const table = "image_table";
    const sql = `DELETE FROM ${table} WHERE id = ?`;

    const del = this.sqliteDB.db.prepare(sql);
    del.run(id);

    return true;
  }


  /*
  * 查询图像url (sqlite)
  */
  async getImageById(id = -1) {
    //console.log("select :", {age});
    console.log("getImageById() start!")
    await this.checkAndCreateImageTable();
    const table = "image_table";
    const sql = `SELECT * FROM ${table} WHERE id = ?`;

    const select_image = this.sqliteDB.db.prepare(sql);
    const images = select_image.all(id);
    
    return images;
  }
  
  
  /*
  * 查询图像url (sqlite)
  */
  async getAllImages() {
    console.log("getAllImages() start!")
    await this.checkAndCreateImageTable();
    const table = "image_table";
    const sql = `SELECT * FROM ${table}`;

    const select_image = this.sqliteDB.db.prepare(sql);
    const images = select_image.all();
  
    return images;
  }  



  /*
   * 检查并创建表 (sqlite)
   */
  async checkAndCreateTableSqlite(tableName = '') {
    if (_.isEmpty(tableName)) {
      throw new Error(`table name is required`);
    }
    // 检查表是否存在
    const userTable = this.demoSqliteDB.db.prepare('SELECT * FROM sqlite_master WHERE type=? AND name = ?');
    const result = userTable.get('table', tableName);
    //console.log('result:', result);
    if (result) {
      return;
    }

    // 创建表
    const create_table_user =
    `CREATE TABLE ${tableName}
     (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name CHAR(50) NOT NULL,
        age INT
     );`
    this.demoSqliteDB.db.exec(create_table_user);

  }


  /*
   * 增 Test data (sqlite)
   */
  async addTestDataSqlite(data) {
    //console.log("add data:", data);

    let table = 'user';
    await this.checkAndCreateTableSqlite(table);

    const insert = this.demoSqliteDB.db.prepare(`INSERT INTO ${table} (name, age) VALUES (@name, @age)`);
    insert.run(data);

    return true;
  }

  /*
   * 删 Test data (sqlite)
   */
  async delTestDataSqlite(name = '') {
    //console.log("delete name:", name);

    let table = 'user';
    await this.checkAndCreateTableSqlite(table);

    const delUser = this.demoSqliteDB.db.prepare(`DELETE FROM ${table} WHERE name = ?`);
    delUser.run(name);

    return true;
  }

  /*
   * 改 Test data (sqlite)
   */
  async updateTestDataSqlite(name= '', age = 0) {
    //console.log("update :", {name, age});

    let table = 'user';
    await this.checkAndCreateTableSqlite(table);

    const updateUser = this.demoSqliteDB.db.prepare(`UPDATE ${table} SET age = ? WHERE name = ?`);
    updateUser.run(age, name);

    return true;
  }  

  /*
   * 查 Test data (sqlite)
   */
  async getTestDataSqlite(age = 0) {
    //console.log("select :", {age});

    let table = 'user';
    await this.checkAndCreateTableSqlite(table);

    const selectUser = this.demoSqliteDB.db.prepare(`SELECT * FROM ${table} WHERE age = @age`);
    const users = selectUser.all({age: age});
    //console.log("select users:", users);
    return users;
  }  
  
  /*
   * all Test data (sqlite)
   */
  async getAllTestDataSqlite() {
    //console.log("select all user");

    let table = 'user';
    await this.checkAndCreateTableSqlite(table);

    const selectAllUser = this.demoSqliteDB.db.prepare(`SELECT * FROM ${table} `);
    const allUser =  selectAllUser.all();
    //console.log("select allUser:", allUser);
    return allUser;
  }
  
  /*
   * get data dir (sqlite)
   */
  async getDataDir() {
    const dir = this.demoSqliteDB.getStorageDir();    

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
    const dbFile = path.join(dir, this.sqliteFile);
    const sqliteOptions = {
      driver: 'sqlite',
      default: {
        timeout: 6000,
        verbose: console.log
      }
    }
    this.demoSqliteDB = Storage.connection(dbFile, sqliteOptions);    

    return;
  }
}

SqlitedbService.toString = () => '[class SqlitedbService]';
module.exports = SqlitedbService;
