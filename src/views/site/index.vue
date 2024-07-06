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
          type="textarea"
          v-model="newMessage"
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
      messages: [] // 存储所有消息
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        // 将新消息添加到消息列表中
        this.messages.push({
          content: this.newMessage,
          isUser: true,
          isSystem: false,
        });

        // 模拟发送请求到后端并接收回复
        this.simulateBackendResponse(this.newMessage);

        // 清空输入框
        this.newMessage = '';
      }
    },
    simulateBackendResponse(userMessage) {
      // 模拟后端延迟
      setTimeout(() => {
        const reply = this.getReply(userMessage);
        this.messages.push({
          content: reply,
          isUser: false,
          isSystem: false,
        });
      }, 1000);
    },
    getReply(userMessage) {
      // 模拟简单的回复逻辑，可以根据实际需求调整
      const replies = [
        '您好，有什么我可以帮助您的吗？',
        '请您详细描述一下您的问题。',
        '感谢您的咨询，我们会尽快处理您的问题。',
        '请稍等，我正在为您查询相关信息。',
        '您的问题已经记录，我们会尽快回复您。'
      ];
      return replies[Math.floor(Math.random() * replies.length)];
    }
  }
};
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
