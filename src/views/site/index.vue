<template>
  <div class="online-consultation">
    <el-container>
      <el-main class="chat-window">
        <div class="messages">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="{
              message: true,
              'user-message': message.isUser,
              'system-message': message.isSystem,
            }"
          >
            {{ message.content }}
          </div>
        </div>
      </el-main>
      <el-footer class="input-area">
        <el-input
          v-model="newMessage"
          type="textarea"
          placeholder="请输入您的问题..."
          class="input"
          @keyup.enter.native="sendMessage"
        />
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMessage: '', // 存储新消息内容
      messages: [], // 存储所有消息
      ws: null, // WebSocket 对象
      userId: 'user123' // 当前用户的 ID，应根据实际情况设置
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
        // 发送用户 ID 给服务器
        this.ws.send(`connect:${this.userId}`)
      }

      // 连接关闭事件
      this.ws.onclose = () => {
        console.log('WebSocket connection closed')
      }

      // 接收到消息事件
      this.ws.onmessage = (event) => {
        const message = event.data
        this.messages.push({
          content: message,
          isUser: false,
          isSystem: false
        })
      }
    },
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // 构建消息内容，假设接收者是 "user456"
        const toUser = '10000000' // 目标用户 ID，应根据实际情况设置
        const message = `to:${toUser}:${this.newMessage}`

        // 将消息发送到服务器
        this.ws.send(message)

        // 添加到消息列表中
        this.messages.push({
          content: this.newMessage,
          isUser: true,
          isSystem: false
        })

        // 清空输入框
        this.newMessage = ''
      }
    }
  }
}
</script>

<style>
.online-consultation {
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

.messages {
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 70%;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.user-message {
  align-self: flex-end;
  background-color: #409eff;
  color: #fff;
}

.system-message {
  align-self: center;
  background-color: #409eff;
}

.input-area {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #ebeef5;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.input-area .el-input {
  flex: 1;
  margin-right: 10px;
}

.el-main {
  margin-bottom: 60px; /* Ensure there's space for the input area */
}
</style>
