<template>
    <div>
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <!-- 使用 v-for 循环渲染表格数据 -->
          <tr v-for="employee in employees" :key="employee.id">
            <td>{{ employee.name }}</td>
            <td>{{ employee.position }}</td>
            <td>{{ employee.salary }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</template>
  
  <script>
  export default {
    name: 'TableComponent',
    data() {
      return {
        employees: [
          { id: 1, name: 'John Doe', position: 'Software Engineer', salary: 60000 },
          { id: 2, name: 'Jane Smith', position: 'UI/UX Designer', salary: 55000 },
          { id: 3, name: 'Mike Johnson', position: 'Product Manager', salary: 75000 }
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  /* 可选：添加一些样式来美化表格 */
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>
  