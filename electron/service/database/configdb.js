'use strict';

const { Service } = require('ee-core');
const Storage = require('ee-core/storage');
const _ = require('lodash');
const path = require('path');

/**
 * json数据库存储配置信息
 * @class
 */
class ConfigDbService extends Service {

    constructor (ctx) {
        super(ctx);

        // jsondb数据库
        this.jsonFile = "config-jsondb";
        this.configDb = Storage.connection(this.jsonFile);  
        this.dbKey = {
            configData: 'config_data',
        };
    }

   async setConfigItem(itemName, itemContent) {
        const key = this.dbKey.configData;
        if (!this.configDb.db.has(key).value()) {
            this.configDb.db.set(key, []).write();
        }

        // 检查数据中是否已经有这个配置项
        let data = this.configDb.db
        .get(key)
        .value();

        const itemIndex = data.findIndex(item => item.itemName === itemName);

        if (itemIndex === -1) {
            // 如果没有该条配置项，则添加
            data.push({ itemName, itemContent });
        } else {
            // 如果有该条配置项，则修改
            data[itemIndex].itemContent = itemContent;
        }

        // 将更新后的数据写回数据库
        this.configDb.db.set(key, data).write();

        return data;
    }

    async getConfigItemContent(itemName) {
        const key = this.dbKey.configData;
        if (!this.configDb.db.has(key).value()) {
            this.configDb.db.set(key, []).write();
        }

        let data = this.configDb.db
        .get(key)
        .value();

        const item = data.find(configItem => configItem.itemName === itemName);

        // 如果存在配置项，则返回配置项内容，否则返回空字符串
        return item ? item.itemContent : "empty";
    }
  
    async test() {
        this.setConfigItem("dir", "dir-content");
        const result = await this.getConfigItemContent("dir");
        console.log(result);
    }
}

ConfigDbService.toString = () => '[class ConfigDbService]';
module.exports = ConfigDbService;