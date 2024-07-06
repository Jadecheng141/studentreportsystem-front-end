<template>
  <div class="app-container">
    <div class="main">
      <!-- 学生提问列表 -->
      <div class="student-list" v-show="showStudentList">
        <el-card class="student-card" :body-style="{ padding: '20px' }">
          <h3>学生提问列表</h3>
          <el-table :data="students" @row-click="openChat" class="student-table">
            <el-table-column prop="name" label="学生姓名" />
            <el-table-column prop="question" label="提问" />
          </el-table>
        </el-card>
      </div>

      <!-- 人工客服对话框 -->
      <el-dialog
        title="人工客服"
        :visible.sync="showChat"
        width="80%"
        :close-on-click-modal="false"
        custom-class="chat-dialog"
        :append-to-body="true"
        @close="closeChat"
      >
        <div class="chat-content">
          <div id="content" class="content">
            <div v-for="(item, index) in currentChat" :key="index">
              <div class="info_r info_default" v-if="item.type == 'leftinfo'">
                <span class="circle circle_r"></span>
                <div class="con_r con_text">
                  <div>{{ item.content }}</div>
                </div>
                <div class="time_r">{{ item.time }}</div>
              </div>

              <div class="info_l" v-if="item.type == 'rightinfo'">
                <div>
                  <span class="con_l">{{ item.content }}</span>
                  <span class="circle circle_l">
                    <img src class="pic_l" />
                  </span>
                </div>
                <div class="time_l">{{ item.time }}</div>
              </div>
            </div>
          </div>
          <div class="setproblem">
            <textarea
              placeholder="请输入您的问题..."
              id="text"
              v-model="customerText"
              @keyup.enter="sentMsg"
            ></textarea>
            <button @click="sentMsg" class="setproblems">
              <span>发 送</span>
            </button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "onlineCustomer",
  data() {
    return {
      showStudentList: true,
      showChat: false,
      customerText: "",
      students: [
        { name: '张三', question: '如何办理退学手续？' },
        { name: '李四', question: '学费缴纳时间？' },
        { name: '王五', question: '如何选课？' },
        { name: '赵六', question: '如何办理转专业？' },
        { name: '孙七', question: '如何获得奖学金？' },
        { name: '周八', question: '如何申请助学贷款？' },
        { name: '吴九', question: '课程成绩如何查询？' },
        { name: '郑十', question: '毕业要求是什么？' }
      ],
      currentChat: [
        {
          type: "leftinfo",
          time: this.getTodayTime(),
          name: "robot",
          content: "您好，欢迎使用网上营业厅，为保证账户安全，在会话过程中请勿透露您的账号。",
        },
      ],
      timer: null,
    };
  },
  created() {
    this.showTimer();
  },
  methods: {
    openChat(row) {
      this.showStudentList = false;
      this.currentChat = [
        {
          type: "leftinfo",
          time: this.getTodayTime(),
          name: "student",
          content: row.question,
        },
      ];
      this.showChat = true;
    },
    closeChat() {
      this.showChat = false;
      this.showStudentList = true;
    },
    sentMsg() {
      clearTimeout(this.timer);
      this.showTimer();
      let text = this.customerText.trim();
      if (text !== "") {
        var obj = {
          type: "rightinfo",
          time: this.getTodayTime(),
          content: text,
        };
        this.currentChat.push(obj);
        this.customerText = "";
        this.$nextTick(() => {
          var contentHeight = document.getElementById("content");
          contentHeight.scrollTop = contentHeight.scrollHeight;
        });

        // 模拟发送到后端并返回
        setTimeout(() => {
          this.receiveFromBackend({ content: "后端回复内容", time: this.getTodayTime() });
        }, 1000);
      }
    },
    receiveFromBackend(data) {
      let obj = {
        type: "leftinfo",
        time: data.time,
        name: "robot",
        content: data.content,
      };
      this.currentChat.push(obj);
      this.$nextTick(() => {
        var contentHeight = document.getElementById("content");
        contentHeight.scrollTop = contentHeight.scrollHeight;
      });
    },
    showTimer() {
      this.timer = setTimeout(this.endMsg, 1000 * 60);
    },
    endMsg() {
      let happyEnding = {
        type: "leftinfo",
        time: this.getTodayTime(),
        content: "会话已结束",
      };
      this.currentChat.push(happyEnding);
      this.$nextTick(() => {
        var contentHeight = document.getElementById("content");
        contentHeight.scrollTop = contentHeight.scrollHeight;
      });
    },
    getTodayTime() {
      var day = new Date();
      let seconds = day.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      let minutes = day.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      let time = `${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()} ${day.getHours()}:${minutes}:${seconds}`;
      return time;
    },
  },
};
</script>

<style lang="scss">
html, body, #app, .container, .main, .box {
  height: 100%;
  margin: 0;
  padding: 0;
}

.main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: linear-gradient(180deg, rgba(149, 179, 212, 1) 0%, rgba(74, 131, 194, 1) 100%);
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  position: relative;
}

.student-list {
  position: absolute;
  top: 60px; /* 根据导航栏的高度调整 */
  left: 20px;
  right: 20px;
  z-index: 1;
}

.student-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.chat-dialog .el-dialog__body {
  height: 70vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  position: relative;
  z-index: 2;
}

.chat-content {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.content {
  flex: 1;
  overflow-y: auto;
  font-size: 14px;
}

.circle {
  display: inline-block;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: #eff1f3;
}

.con_text {
  color: #333;
  margin-bottom: 5px;
}

.con_que {
  color: #1c88ff;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}

.info_r {
  position: relative;
  margin-bottom: 1rem;
}

.circle_r {
  position: absolute;
  left: 0;
}

.pic_r {
  width: 17px;
  height: 17px;
  margin: 8px;
}

.con_r {
  display: inline-block;
  width: 55%;
  min-height: 55px;
  background-color: #e2e2e2;
  border-radius: 6px;
  padding: 10px;
  margin-left: 40px;
}

.time_r {
  margin-left: 45px;
  color: #999999;
  font-size: 12px;
}

.info_l {
  text-align: right;
  margin-top: 10px;
  color: #1c88ff;
}

.pic_l {
  width: 13px;
  height: 17px;
  margin: 8px 10px;
}

.time_l {
  margin-right: 45px;
  color: #409EFF;
  font-size: 12px;
  margin-top: 5px;
}

.con_l {
  display: inline-block;
  width: 55%;
  min-height: 51px;
  background-color: #409EFF;
  border-radius: 6px;
  padding: 10px;
  text-align: left;
  color: #fff;
  margin-right: 5px;
}

.setproblem {
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
}

.setproblem textarea {
  flex: 1;
  height: 68px;
  resize: none;
  padding: 10px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  color: #999999;
  box-sizing: border-box;
}

.setproblem button {
  width: 100px;
  height: 68px;
  background: #3163c5;
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  border: none;
}

.student-table {
  height: calc(100vh - 45vh);
  width: 100%;
  overflow-y: auto;
  font-size: 1.2rem;
}
</style>
