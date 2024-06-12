'use strict';

const { Service } = require('ee-core');
const Storage = require('ee-core/storage');
const _ = require('lodash');
const path = require('path');

const IdGenerator = require("../../utils/IdGenerator.js");

const idGenerator = new IdGenerator("ID_");

/**
 * sqlite数据存储
 * @class
 */
class FormSqliteDbService extends Service {

  constructor (ctx) {
    super(ctx);

    this.sqliteFile = 'sqlite.db'; // sqlite数据库的本地文件
    let sqliteOptions = {
      driver: 'sqlite',
      default: {
        timeout: 6000,
        verbose: console.log // 打印sql语法
      }
    }

    this.sqliteDB = Storage.connection(this.sqliteFile, sqliteOptions);

     // 建表
    this.checkAndCreateTable1();
    this.checkAndCreateTable2();
  }

  async checkAndCreateTable1() {
    console.log("checkAndCreateTable1() start");
    const table_name = "form_info_table";

    // 检查表是否存在
    const select_table = this.sqliteDB.db.prepare('SELECT * FROM sqlite_master WHERE type=? AND name = ?');
    const result = select_table.get('table', table_name);

    
    // 如果存在则返回
    if (result) {
      return;
    }

    // 不存在则创建表
    const create_table =
    `CREATE TABLE ${table_name}
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        form_id TEXT UNIQUE,
        name TEXT,
        description TEXT,
        date_time TEXT
      );`
    this.sqliteDB.db.exec(create_table);
    console.log("成功建表：", table_name);
  }

  async checkAndCreateTable2() {
    console.log("checkAndCreateTable2() start");
    const table_name = "cell_table";

    // 检查表是否存在
    const select_table = this.sqliteDB.db.prepare('SELECT * FROM sqlite_master WHERE type=? AND name = ?');
    const result = select_table.get('table', table_name);

    
    // 如果存在则返回
    if (result) {
      return;
    }

    // 不存在则创建表
    const create_table =
    `CREATE TABLE ${table_name}
      (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        form_id TEXT,
        content TEXT,
        left INTEGER,
        right INTEGER,
        top INTEGER,
        bottom INTEGER
      );`
    this.sqliteDB.db.exec(create_table);
    console.log("成功建表：", table_name);
  }

    async addForm(tableData) {
        tableData = JSON.parse(tableData)
        console.log("addForm()");
        // console.log(tableData);
        await this.checkAndCreateTable1();

        const form_info = {
            form_id: idGenerator.generateId("ID-"),
            name: tableData.name,
            description: tableData.description,
            date_time: tableData.date_time,
        };
        const table = "form_info_table";
        const sql = `INSERT INTO ${table} (form_id, name, description, date_time) VALUES (?, ?, ?, ?)`;

        const stmt = this.sqliteDB.db.prepare(sql);
        stmt.run([
            form_info.form_id,
            form_info.name,
            form_info.description,
            form_info.date_time
          ]);

        const cells_list = [];
        for (let cell of tableData.cells) {
            // 如果对象没有 form_id 属性，则添加它
            if (!cell.hasOwnProperty('form_id')) {
                cell.form_id = form_info.form_id;
            }
            cells_list.push(cell);
        }

        await this.addCells(cells_list);

        return true;
    }

    async delFormByFormId(form_id) {
        console.log(`delFormByFormId(${form_id})`);
        const table = "form_info_table";
        const sql = `DELETE FROM ${table} WHERE form_id = ?`;
      
        const stmt = this.sqliteDB.db.prepare(sql);
        stmt.run([form_id]);
      
        await this.deleteCellsByFormId(form_id);

        return true;
    }

    async updateFormByFormId(form_id, tableData) {
        // TODO 待实现一个正常的更新
        await this.delFormByFormId(form_id);
        await this.addForm(tableData)

        return true;
    }

    async getAllForms() {
        console.log("getAllForms()");
        const formTable = "form_info_table";
        const cellTable = "cell_table";
      
        // 查询 form_info_table 以获取所有表单信息
        const formSql = `SELECT * FROM ${formTable}`;
        const formStmt = this.sqliteDB.db.prepare(formSql);
        const forms = formStmt.all();
      
        // 准备查询 cell_table 的语句
        const cellSql = `SELECT * FROM ${cellTable} WHERE form_id = ?`;
        const cellStmt = this.sqliteDB.db.prepare(cellSql);
      
        // 用于存储最终结果的数组
        const allFormsData = [];
      
        // 对于每个表单，获取对应的单元格信息
        for (let form of forms) {
            form = this.joinCellsToForm(form);
            allFormsData.push(form);
        }
        // console.log(allFormsData);
        return JSON.stringify(allFormsData);
    }

    joinCellsToForm(form) {
        // 准备查询 cell_table 的语句
        const cellTable = "cell_table";
        const cellSql = `SELECT * FROM ${cellTable} WHERE form_id = ?`;
        const cellStmt = this.sqliteDB.db.prepare(cellSql);
        // console.log(form);
        const cells = cellStmt.all(form.form_id)
        for (const cell of cells) {
            this.safeDelete(cell, "id");
            this.safeDelete(cell, "form_id");
        }  
        // 将单元格信息添加到表单信息中
        form.cells = cells;
        // console.log(form.cells);
        this.safeDelete(form, "id");
        return form;
    }

    safeDelete(obj, prop) {
        if (obj && prop in obj) {
          return delete obj[prop];
        }
        return false;
    }

    async getSomeForms(index, size) {
        console.log(`getSomeForms(${index}, ${size})`);
        const table = "form_info_table";
        const sql = `SELECT * FROM ${table} LIMIT ? OFFSET ?`;
      
        const stmt = this.sqliteDB.db.prepare(sql);
        const forms = stmt.all(size, index);

        // 用于存储最终结果的数组
        const allFormsData = [];

        // 对于每个表单，获取对应的单元格信息
        for (let form of forms) {
            form = this.joinCellsToForm(form);
            allFormsData.push(form);
        }
      
        return JSON.stringify(allFormsData);
    }

    async getFormsNum() {
        console.log("getFormsNum()");
        const table = "form_info_table";
        const sql = `SELECT COUNT(*) AS count FROM ${table}`;
      
        const stmt = this.sqliteDB.db.prepare(sql);
        const result = stmt.get();
      
        return result.count;
    }


    async addCell(form_id, content, left, right, top, bottom) {
        //console.log("add data:", data);
        console.log("addCell()")
        await this.checkAndCreateTable2();

        const table = "cell_table";
        const cell = {
            form_id: form_id,
            content: content,
            left: left,
            right: right,
            top: top,
            bottom: bottom
        };
        const sql = `INSERT INTO ${table} (form_id, content, left, right, top, bottom) VALUES (@form_id, @content, @left, @right, @top, @bottom)`;

        const insert = this.sqliteDB.db.prepare(sql);
        insert.run(cell);

        return true;
    }

    async addCells(cellsList) {
        console.log("addCells()");
        await this.checkAndCreateTable2();
      
        const table = "cell_table";
        const sql = `INSERT INTO ${table} (form_id, content, left, right, top, bottom) VALUES (?, ?, ?, ?, ?, ?)`;
      
        // 准备SQL语句
        const stmt = this.sqliteDB.db.prepare(sql);
      
        // 批量执行插入操作
        cellsList.forEach(cell => {
          // 绑定参数到SQL语句
          stmt.run([
            cell.form_id,
            cell.content,
            cell.left,
            cell.right,
            cell.top,
            cell.bottom
          ]);
        });
        
        return true;
    }


    async deleteCellsByFormId(form_id) {
        console.log(`deleteCellsByFormId(${form_id})`);
        const table = "cell_table";
        const sql = `DELETE FROM ${table} WHERE form_id = ?`;
      
        // 准备SQL语句
        const stmt = this.sqliteDB.db.prepare(sql);
      
        // 执行删除操作
        stmt.run([form_id]);
         
        return true;
    }

    async test() {
        const tableData = {
            "name": "示例表格",
            "description": "关于表格的描述",
            "date_time": "2024-05-01 23:59:59",
            "cells": [
                {
                    "content": "全宗号",
                    "left": 0,
                    "right": 1,
                    "top":0,
                    "bottom":1
                },
                {
                    "content": "年度",
                    "left": 1,
                    "right": 2,
                    "top":0,
                    "bottom":1
                },
                {
                    "content": "室编件号",
                    "left": 2,
                    "right": 4,
                    "top":0,
                    "bottom":1
                },
                {
                    "content": "馆编件号",
                    "left": 4,
                    "right": 6,
                    "top":0,
                    "bottom":1
                },        
                {
                    "content": "盒号",
                    "left": 6,
                    "right": 7,
                    "top":0,
                    "bottom":1
                },
                {
                    "content": "220",
                    "left": 0,
                    "right": 1,
                    "top":1,
                    "bottom":2
                },
                {
                    "content": "2003",
                    "left": 1,
                    "right": 2,
                    "top":1,
                    "bottom":2
                },
                {
                    "content": "无",
                    "left": 2,
                    "right": 4,
                    "top":1,
                    "bottom":2
                },
                {
                    "content": "92",
                    "left": 4,
                    "right": 6,
                    "top":1,
                    "bottom":2
                },        
                {
                    "content": "无",
                    "left": 6,
                    "right": 7,
                    "top":1,
                    "bottom":2
                },
                {
                    "content": "机构(问题)",
                    "left": 0,
                    "right": 3,
                    "top":2,
                    "bottom":3
                },
                {
                    "content": "保管期限",
                    "left": 3,
                    "right": 5,
                    "top":2,
                    "bottom":3
                },
                {
                    "content": "文书号",
                    "left": 5,
                    "right": 6,
                    "top":2,
                    "bottom":3
                },
                {
                    "content": "页数",
                    "left": 6,
                    "right": 7,
                    "top":2,
                    "bottom":3
                },
                {
                    "content": "防控组",
                    "left": 0,
                    "right": 3,
                    "top":3,
                    "bottom":4
                },
                {
                    "content": "长期",
                    "left": 3,
                    "right": 5,
                    "top":3,
                    "bottom":4
                },
                {
                    "content": "90",
                    "left": 5,
                    "right": 6,
                    "top":3,
                    "bottom":4
                },
                {
                    "content": "5",
                    "left": 6,
                    "right": 7,
                    "top":3,
                    "bottom":4
                }
                
            ]
        }
        // await this.addForm(tableData);
        await this.getAllForms();
    }
}

FormSqliteDbService.toString = () => '[class FormSqliteDbService]';
module.exports = FormSqliteDbService;
