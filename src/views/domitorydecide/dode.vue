<template>
  <div class="app-container">
    <div class="container">
      <h1>宿舍确认</h1>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>园区</th>
              <th>楼栋</th>
              <th>宿舍号</th>
              <th>学院</th>
              <th>入住情况</th>
              <th>查看信息</th>
              <th>选择入住</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dorm in dorms" :key="dorm.id">
              <td>{{ dorm.zone }}</td>
              <td>{{ dorm.building }}</td>
              <td>{{ dorm.roomNumber }}</td>
              <td>{{ dorm.college }}</td>
              <td>
                {{ dorm.occupancy }}
                <span :class="{'status-dot': true, 'available': dorm.available, 'full': !dorm.available}"></span>
              </td>
              <td><a href="#" @click.prevent="viewInfo(dorm)" class="view-link">查看</a></td>
              <td>
                <input
                  type="checkbox"
                  :disabled="!dorm.available || selectedDormId === dorm.id"
                  @change="selectDorm(dorm)"
                  :checked="selectedDormId === dorm.id"
                />
                <span v-if="!dorm.available && selectedDormId !== dorm.id">已住满</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <button @click="submitSelection" class="submit-button">提交</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dorms: [],
      selectedDormId: null,
    };
  },
  created() {
    this.fetchDormData();
  },
  methods: {
    async fetchDormData() {
      try {
        const response = await fetch('https://your-backend-endpoint.com/api/dorms'); // 替换为实际的后端API端点
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.dorms = data;
      } catch (error) {
        console.error('Error fetching dorm data:', error);
      }
    },
    viewInfo(dorm) {
      // 查看宿舍信息的逻辑
      alert(`查看宿舍 ${dorm.roomNumber} 的信息`);
    },
    selectDorm(dorm) {
      this.selectedDormId = dorm.id;
    },
    submitSelection() {
      if (this.selectedDormId === null) {
        alert('请选择一个宿舍');
        return;
      }
      alert(`提交选择的宿舍ID: ${this.selectedDormId}`);
      // 提交逻辑
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.container {
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 900px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.table-container {
  height: 300px; /* 固定表格容器的高度 */
  overflow-y: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th, td {
  padding: 15px;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f9fafb;
  font-weight: bold;
  color: #555;
  position: sticky;
  top: 0;
  z-index: 1;
}

td {
  background-color: #fff;
}

.status-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 5px;
}

.available {
  background-color: green;
}

.full {
  background-color: red;
}

.view-link {
  color: #1e90ff;
  text-decoration: none;
}

.view-link:hover {
  text-decoration: underline;
}

.submit-button {
  padding: 10px 30px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  display: block;
  margin: 20px auto 0 auto;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
