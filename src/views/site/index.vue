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
            <div>{{ message.content1 }}</div>
            <div>{{ message.content2 }}</div>
            <div>{{ message.content3 }}</div>
            <div>{{ message.content4 }}</div>
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
      messages: [
        {
          content1: '您好，有什么我可以帮助您的吗？',
          content2: '咨询报道流程请按1',
          content3: '咨询宿舍园区请按2',
          content4: '咨询食堂类型请按3',
          isUser: false,
          isSystem: true
        }
      ] // 存储所有消息，初始化时加入系统消息
    }
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // 将新消息添加到消息列表中
        this.messages.push({
          content1: this.newMessage,
          content2: '',
          content3: '',
          content4: '',
          isUser: true,
          isSystem: false
        })

        // 模拟发送请求到后端并接收回复
        this.simulateBackendResponse(this.newMessage)

        // 清空输入框
        this.newMessage = ''
      }
    },
    simulateBackendResponse(userMessage) {
      // 模拟后端延迟
      setTimeout(() => {
        const reply = this.getReply(userMessage)
        this.messages.push({
          content1: reply,
          content2: '',
          content3: '',
          content4: '',
          isUser: false,
          isSystem: false
        })
      }, 1000)
    },
    getReply(userMessage) {
      // 根据用户输入的内容进行相应回复
      if (userMessage.trim() === '1') {
        return '您需要进行基本信息录入，宿舍确认以及现场缴费。'
      } else if (userMessage.trim() === '2') {
        return '校园分为竹园，梅园，兰园'
      } else if (userMessage.trim() === '3') {
        return '一食堂是大众食物，二食堂是经典小吃'
      } else {
        return '无法识别的输入，请输入1或2。'
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
  align-self: flex-start;
  background-color: #d3d3d3;
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
