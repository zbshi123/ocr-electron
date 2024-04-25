<template>
  <div>
    <table>
      <!--
      <caption>档案</caption>        
      -->
      <tbody>
        <tr v-for="(row, rowIndex) in tableData" :key="rowIndex">
          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :colspan="cell.colspan"
            :rowspan="cell.rowspan"
          >
            {{ cell.content }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!--
tableData的格式要求
tableData: {
            "name": "demo",
            "cells": [
                {
                  "content": "全宗号",
                  "left": 0,
                  "right": 1,
                  "top":0,
                  "bottom":1
                },
                ...其他cell
              ]
            }
-->

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tableData() {
      const tableData = [];
      const rows = Math.max(...this.data.cells.map(cell => cell.bottom));
      const cols = Math.max(...this.data.cells.map(cell => cell.right));
      const set = new Set(); // set用于检查每个单元格是否已经加入tableData

      for (let i = 0; i < rows; i++) {
        const rowData = [];
        for (let j = 0; j < cols; j++) {
          const cell = this.data.cells.find(cell => cell.left <= j && cell.right > j && cell.top <= i && cell.bottom > i);
          if (cell) {
            const colspan = cell.right - cell.left;
            const rowspan = cell.bottom - cell.top;
            const cell_str = JSON.stringify(cell)
            if (!set.has(cell_str)) {
              rowData.push({ content: cell.content, colspan, rowspan });
              set.add(cell_str);
            }
            j += colspan - 1;
          } else {
            rowData.push({ content: '', colspan: 1, rowspan: 1 });
          }
        }
        tableData.push(rowData);
      }
      console.log(tableData);
      return tableData;
    }
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
  margin-bottom: 10px;
  width: 100%;
}

th, td {
  padding: 10px;
  border: 1px solid #000000;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

caption {
  font-size: 1.5em;
  margin-bottom: 1px;
  text-align: center;
  caption-side: top;
}
</style>

  