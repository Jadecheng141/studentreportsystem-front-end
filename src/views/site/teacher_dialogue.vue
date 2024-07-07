<!-- <template>
  <div class="app-container">
    <div class="main">
      <div class="student-list" v-show="showStudentList">
        <el-card class="student-card" :body-style="{ padding: '20px' }">
          <h3>学生提问列表</h3>
          <el-table :data="students" @row-click="openChat" class="student-table">
            <el-table-column prop="name" label="学生姓名" />
            <el-table-column prop="question" label="提问" />
          </el-table>
        </el-card>
      </div>

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
            <el-footer class="input-area">
              <el-input
                v-model="session.newMessage"
                type="textarea"
                placeholder="请输入消息..."
                class="input"
                @keyup.enter.native="sendMessage(session)"
              />
              <el-button type="primary" @click="sendMessage(session)">发送</el-button>
            </el-footer>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ws: null, // WebSocket 对象
      sessions: [] // 会话列表
    }
  },
  created() {
    this.connectWebSocket()
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

<style>
.teacher-console {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.sessions {
  display: flex;
  flex-direction: column;
}

.session {
  max-width: 70%;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ebeef5;
}

.messages {
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #e6f7ff;
}

.user-message {
  align-self: flex-end;
  background-color: #409eff;
  color: #fff;
}

.input-area {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ebeef5;
}

.input-area .el-input {
  flex: 1;
  margin-right: 10px;
}
</style>
