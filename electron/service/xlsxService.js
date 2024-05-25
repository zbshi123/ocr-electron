'use strict';

const { Service } = require('ee-core');
const Log = require('ee-core/log');
const XLSX = require('xlsx');

/**
 * 
 * @class
 */
class XlsxService extends Service {

    constructor(ctx) {
    super(ctx);
    }


    async test(args) {
    let obj = {
        status:'ok',
        params: args
    }

    return obj;
    }

    /**
     * 通过前端传递的tableData生成xlsx格式的表格
     * @param {*} args 
     * @returns 
     */
    async generateXLSX(args) {
        let ret = {
            status:'ok',
            result: "generateXLSX"
        }

        const tableData1 = {
            "name": "demo",
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
                }
            ]
        };

        const id = args.id;
        const tableData = JSON.parse(args.tableData);
        console.log("args", args);
        console.log("tableData", tableData);

        // 创建工作簿和表格
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet([]);
        
        // 添加数据到表格
        tableData.cells.forEach(cell => {
            const { content, left, right, top, bottom } = cell;
            // 将单元格的数据类型指定为字符串
            console.log(content);
            XLSX.utils.sheet_add_aoa(worksheet, [[{ v: content, t: 's' }]], {
                origin: { r: top, c: left },
                skipHeader: true
            });
        });

        // 合并单元格
        tableData.cells.forEach(cell => {
            const { left, right, top, bottom } = cell;
            // 确保是需要合并的单元格
            if (right - left > 1 || bottom - top > 1) {
                // 合并范围，从左上角开始到右下角
                const mergeRange = { s: { r: top, c: left }, e: { r: bottom - 1, c: right - 1} };
                worksheet['!merges'] = worksheet['!merges'] || [];
                worksheet['!merges'].push(mergeRange);
            }
        });

        // 添加表格到工作簿
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // 将工作簿保存为 Excel 文件
        const excelFilePath = `${id}.xlsx`;
        XLSX.writeFile(workbook, excelFilePath, { bookType: 'xlsx', bookSST: false, type: 'binary', encoding: 'utf-8' });

        return ret;
    }
}

XlsxService.toString = () => '[class XlsxService]';
module.exports = XlsxService;
