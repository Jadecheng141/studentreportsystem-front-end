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
      messages: [
        { content: '欢迎！请输入1、2或3以获取不同的回复。', isUser: false, isSystem: true },
      ], // 存储消息列表
      newMessage: '', // 存储新消息内容
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

        // 模拟接收客服回复
        setTimeout(() => {
          const reply = this.getReply(this.newMessage);
          this.messages.push({
            content: reply,
            isUser: false,
            isSystem: false,
          });
        }, 1000);

        // 清空输入框
        this.newMessage = '';
      }
    },
    getReply(message) {
      switch (message) {
        case "1":
          return '这是回复一。';
        case '2':
          return '这是回复二。';
        case '3':
          return '这是回复三。';
      }
    },
  },
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


<!-- <template>
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
          @keyup.enter.native="sendMessage"
        />
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from '../axios'; // 引入你创建的axios实例

export default {
  data() {
    return {
      messages: [
        { content: '欢迎！请输入您的问题。', isUser: false, isSystem: true },
      ], // 存储消息列表
      newMessage: '', // 存储新消息内容
    };
  },
  methods: {
    async sendMessage() {
      if (this.newMessage.trim() !== '') {
        // 将新消息添加到消息列表中
        this.messages.push({
          content: this.newMessage,
          isUser: true,
          isSystem: false,
        });

        // 发送消息到后端
        try {
          const response = await axios.post('/your-endpoint', {
            message: this.newMessage,
          });

          // 将后端回复添加到消息列表中
          this.messages.push({
            content: response.data.reply,
            isUser: false,
            isSystem: false,
          });
        } catch (error) {
          console.error('Error sending message:', error);
          this.messages.push({
            content: '发送消息时出错，请稍后再试。',
            isUser: false,
            isSystem: false,
          });
        }

        // 清空输入框
        this.newMessage = '';
      }
    },
  },
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
  background-color: #ffe58f;
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
 -->
