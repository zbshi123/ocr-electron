'use strict';

class IdGenerator {
    constructor(prefix = '') {
        this.prefix = prefix;
        this.lastTimestamp = 0;
        this.sequence = 0;
      }
    
    generateId() {
        let timestamp = new Date().getTime();
        if (timestamp === this.lastTimestamp) {
            this.sequence++;
        } else {
            this.sequence = 0;
        }
        this.lastTimestamp = timestamp;

        const uniqueID = `${this.prefix}${timestamp}${this.sequence}${Math.floor(Math.random() * 1000)}`;
        return uniqueID;
    }
}
  
// 示例用法
const idGenerator = new IdGenerator('ID_');

module.exports = IdGenerator;

