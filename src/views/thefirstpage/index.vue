<template>
  <div class="app-container">
    <!-- 按钮容器 -->
    <div class="buttons-container">
      <!-- 单独按钮 -->
      <button
        v-for="(rectangle, index) in singlerec"
        :key="index"
        @click="setCurrentRectangle(rectangle.id)"
        class="single-button"
      >
        学校简介
      </button>
      <!-- 动态按钮 -->
      <button
        v-for="(rectangle, index) in rectangles"
        :key="index"
        @click="setCurrentRectangle(rectangle.id)"
        class="rectangle-button"
      >
        {{ rectangle.title }}
      </button>
    </div>

    <!-- 静态图片 -->
    <div>
      <img :src="staticImageUrl" alt="静态图片" class="static-image">

      <!-- 单独矩形内容 -->
      <div>
        <div
          v-for="(rectangle, index) in singlerec"
          v-if="currentRectangle === rectangle.id"
          :key="index"
          class="blue-rectangle"
        >
          <div class="white-rectangle">
            <h3 class="rectangle-title">{{ rectangle.title }}</h3>
            <img :src="rectangle.image1" alt="学校图片" class="school-image1">
            <p class="rectangle-text1">{{ rectangle.content1 }}</p>
            <p class="rectangle-text2">{{ rectangle.content2 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 动态矩形内容 -->
    <div
      v-for="(rectangle, index) in rectangles"
      v-if="currentRectangle === rectangle.id"
      :key="index"
      class="blue-rectangle transition-all"
    >
      <div class="white-rectangle">
        <h3 class="rectangle-title">{{ rectangle.title }}</h3>
        <img :src="rectangle.image1" alt="学校图片" class="school-image1">
        <img :src="rectangle.image2" alt="学校图片" class="school-image2">
        <p class="rectangle-text1">{{ rectangle.content1 }}</p>
        <p class="rectangle-text2">{{ rectangle.content2 }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      staticImageUrl: require('@/images/schoolmap.jpg'), // 静态图片URL
      rectangles: [ // 动态矩形数组
        {
          id: 'rectangle2',
          title: '教学楼',
          image1: require('@/images/虎溪综合楼.jpg'),
          image2: require('@/images/虎溪信息大楼.jpg'),
          content: '这里填写教学楼的简介。',
          top: 120,
          right: 105
        },
        {
          id: 'rectangle3',
          title: '图书馆',
          image1: require('@/images/图书馆1.jpg'),
          image2: require('@/images/图书馆2.jpg'),
          content: '这里填写第三个矩形的内容。',
          top: 120,
          right: 105
        },
        {
          id: 'rectangle4',
          title: '宿舍',
          image1: require('@/images/宿舍1.jpg'),
          image2: require('@/images/宿舍2.jpg'),
          top: 120,
          right: 105
        },
        {
          id: 'rectangle5',
          title: '风雨操场',
          image1: require('@/images/操场1.jpg'),
          image2: require('@/images/操场2.jpg'),
          top: 120,
          right: 105
        },
        {
          id: 'rectangle6',
          title: '体育馆',
          image1: require('@/images/体育馆1.jpg'),
          image2: require('@/images/体育馆2.jpg'),
          top: 120,
          right: 105
        }
      ],
      singlerec: [ // 单独矩形数组
        {
          id: 'rectangle1',
          title: '学校简介',
          image1: require('@/images/school.jpg'),
          content1: '重庆大学是中央直管、教育部直属的全国重点大学。学校创办于1929年，提出建设“完备弘深之大学”的愿景，到20世纪40年代发展成为文理工商法医各学科齐全的综合性大学。',
          content2: '经过1952年全国院系调整，成为以工科为主的多科性大学。1960年被确定为全国重点大学。改革开放后，学校进行了全面的恢复调整和改革建设，成为一所以工为主、多学科协调发展的高校。',
          top: 120,
          right: 105
        }
      ],
      currentRectangle: 'rectangle1' // 当前显示的矩形ID
    };
  },
  methods: {
    // 设置当前显示的矩形ID
    setCurrentRectangle(rectangleId) {
      this.currentRectangle = rectangleId;
    }
  }
};
</script>
<style scoped>
/* 静态图片样式 */
.static-image {
  position: absolute;
  padding: 5px;
  width: 60%;
  height: 80%;
  top: 120px;
}

/* 学校图片样式 */
.school-image1 {
  padding: 5px;
  border-radius: 20px;
  width: 300px;
  height: 200px;
  position: absolute;
  top: 70px;
  right: 70px;
}
.school-image2 {
  padding: 5px;
  border-radius: 20px;
  width: 300px;
  height: 200px;
  position: absolute;
  top: 300px;
  right: 70px;
}

/* 蓝色矩形样式 */
.blue-rectangle {
  position: absolute;
  border-radius: 70px;
  width: 490px;
  height: 80%;
  right: 50px;
  top: 120px;
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
}

/* 白色矩形样式 */
.white-rectangle {
  position: absolute;
  border-radius: 60px;
  width: 450px;
  height: 92%;
  top: 25px;
  left: 20px;
  background-color: aliceblue;
}

/* 矩形标题样式 */
.rectangle-title {
  color: black;
  font-size: 25px;
  position: absolute;
  top: 10px;
  left: 20px;
}

/* 矩形文本样式 */
.rectangle-text1 {
  color: black;
  position: absolute;
  font-size: 17px;
  width: 80%;
  text-indent: 2em;
  left: 40px;
  top: 280px;
}
.rectangle-text2 {
  color: black;
  position: absolute;
  font-size: 17px;
  width: 80%;
  text-indent: 2em;
  left: 40px;
  top: 380px;
}

/* 按钮容器样式 */
.buttons-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

/* 按钮样式 */
.rectangle-button, .single-button {
  padding: 10px;
  border: none;
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
}
</style>
