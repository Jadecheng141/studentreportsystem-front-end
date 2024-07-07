<template>
  <div class="teacher-console">
    <el-container>
      <el-main class="chat-window">
        <div class="sessions">
          <div
            v-for="(session, index) in sessions"
            :key="index"
            :class="{ session: true, active: session.isActive }"
          >
            <div class="session-header">
              <span>{{ session.studentId }}</span>
              <el-button size="mini" type="danger" @click="closeSession(index)">关闭</el-button>
            </div>
            <div class="messages">
              <div
                v-for="(message, msgIndex) in session.messages"
                :key="msgIndex"
                :class="{ message: true, 'user-message': message.isUser }"
              >
                {{ message.content }}
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
    connectWebSocket() {
      // 创建 WebSocket 连接
      this.ws = new WebSocket('ws://121.36.218.207:8080/chat') // 请替换为实际的 WebSocket URL

      // 连接打开事件
      this.ws.onopen = () => {
        console.log('WebSocket connection opened')
      }

      // 连接关闭事件
      this.ws.onclose = () => {
        console.log('WebSocket connection closed')
      }

      // 接收到消息事件
      this.ws.onmessage = (event) => {
        const message = event.data
        this.handleIncomingMessage(message)
      }
    },
    handleIncomingMessage(message) {
      // 解析消息，假设消息格式为 "studentId:message"
      const [studentId, msgContent] = message.split(':', 2)

      // 查找是否已有该 studentId 的会话
      let session = this.sessions.find((sess) => sess.studentId === studentId)

      if (!session) {
        // 如果没有该会话，则创建一个新会话
        session = {
          studentId,
          messages: [],
          newMessage: '',
          isActive: true
        }
        this.sessions.push(session)
      }

      // 添加新消息到会话
      session.messages.push({
        content: msgContent,
        isUser: false
      })
    },
    sendMessage(session) {
      if (session.newMessage.trim() !== '') {
        // 构建消息内容
        const message = `to:${session.studentId}:${session.newMessage}`
        // 将消息发送到服务器
        this.ws.send(message)

        // 添加到会话消息列表中
        session.messages.push({
          content: session.newMessage,
          isUser: true
        })

        // 清空输入框
        session.newMessage = ''
      }
    },
    closeSession(index) {
      this.sessions.splice(index, 1)
    }
  }
}
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
