<!-- <template>
  <div class="container">
    <div>
      <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(image, index) in images" :key="index">
            <img :src="image.src" :alt="image.alt" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
      <div class="buttons-container">
        <button
          v-for="(rectangle, index) in singlerec1"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          学校概况
        </button>
        <button
          v-for="(rectangle, index) in singlerec2"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          校风校训
        </button>
        <button
          v-for="(rectangle, index) in singlerec3"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          校历日程
        </button>
        <button
          v-for="(rectangle, index) in singlerec4"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          学校章程
        </button>
      </div>
      <div v-if="currentRectangle" class="rectangle-content">
        <div v-for="rectangle in singlerec1" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <p class="rectangle_text1">{{ rectangle.content1 }}</p>
          <p class="rectangle_text2">{{ rectangle.content2 }}</p>
          <div class="additional-content">
            <div class="together">
              <h3 class="rectangle_title">{{ rectangle.title1 }}</h3>
              <p class="rectangle_text3">{{ rectangle.content3 }}</p>
              <p class="rectangle_text4">{{ rectangle.content4 }}</p>
              <p class="rectangle_text5">{{ rectangle.content5 }}</p>
            </div>
            <div v-if="rectangle.image1" class="additional-image-container">
              <img :src="rectangle.image1" alt="Additional Image 1" class="additional-image">
            </div>
          </div>
          <div class="image-container">
            <img :src="backfround" alt="back" class="back">
            <p class="over-title1">学科建设</p>
            <p class="overlay-text1">{{ rectangle.content6 }}</p>
            <p class="over-title2">人才队伍</p>
            <p class="overlay-text2">{{ rectangle.content7 }}</p>
          </div>
          <div class="additional-content2">
            <div class="together2">
              <p class="rectangle_title">{{ rectangle.title2 }}</p>
              <p class="rectangle_text8">{{ rectangle.content8 }}</p>
              <p class="rectangle_text9">{{ rectangle.content9 }}</p>
              <p class="rectangle_text10">{{ rectangle.content10 }}</p>
            </div>
            <div class="blue-rectangle">
              <p class="rectangle_title">社会服务</p>
              <p class="rectangle_text12">{{ rectangle.content11 }}</p>
              <p class="rectangle_text12">{{ rectangle.content12 }}</p>
              <img :src="since" alt="sin" class="sin">
            </div>
          </div>
          <p class="rectangle_text13">{{ rectangle.content13 }}</p>
          <div class="darkblue" />
        </div>
        <div v-for="rectangle in singlerec2" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <div class="additional-content">
            <div class="school-wind">
              <h3 class="windtitle">{{ rectangle.title1 }}</h3>
              <img :src="schoolwind" alt="Additional Image 1" class="wandtw">
            </div>
            <div class="school-train">
              <h3 class="traintitle">{{ rectangle.title2 }}</h3>
              <img :src="schooltrain" alt="Additional Image 1" class="wandtt">
            </div>
          </div>
        </div>
        <div v-for="rectangle in singlerec3" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <img :src="schoolyearone" alt="school" class="static-image">
          <img :src="schoolyeartwo" alt="school" class="static-image">
        </div>
        <div v-for="rectangle in singlerec4" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <h3>{{ rectangle.title }}</h3>
          <p>{{ rectangle.content }}</p>
          <div v-if="rectangle.image1" class="additional-image-container">
            <img :src="rectangle.image1" alt="Additional Image 1" class="additional-image">
          </div>
          <button @click="downloadOrder">下载 PDF</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  let params={
    "pageNo":this.form.pageNo,
    "pageSize":this.form.pageSize,
    "data":this.form
  }
  data() {
    return {
      form: {
              pageNo: 1,
              pageSize: 10,
              // 其他表单数据
            },
      images: [
              { src: require('@/images/school.jpg'), alt: 'Image 1' },
              { src: require('@/images/学校信息-top.jpg'), alt: 'Image 2' },
              { src: require('@/images/虎溪体育中心.jpg'), alt: 'Image 3' },
              { src: require('@/images/图书馆2.jpg'), alt: 'Image 4' }
            ],
      schoolin: require('@/images/学校信息-top.jpg'),
      backfround: require('@/images/背景.png'),
      since: require('@/images/科研图片.jpeg'),
      schoolwind: require('@/images/校风.png'),
      schooltrain: require('@/images/校训.jpg'),
      schoolyearone: require('@/images/校历1.png'),
      schoolyeartwo: require('@/images/校历2.png'),
      singlerec1: [
        {
          id: 'rectangle1',
          content1: '重庆大学是中央直管、教育部直属的全国重点大学。学校创办于1929年，提出建设“完备弘深之大学”的愿景，到20世纪40年代发展成为文理工商法医各学科齐全的综合性大学。经过1952年全国院系调整，成为以工科为主的多科性大学。1960年被确定为全国重点大学。改革开放后，学校进行了全面的恢复调整和改革建设，成为一所以工为主、多学科协调发展的高校，1998年获批国家“211工程”重点建设高校。2000年原重庆建筑大学、重庆建筑高等专科学校与重庆大学合并组建为新的重庆大学，2001年成为“985工程”重点建设高校。2017年入选国家“世界一流大学建设高校（A类）”，2022年入选第二轮“双一流”建设高校。学校发展进入新的历史阶段，朝着中国特色、世界一流大学办学目标不懈奋进。',
          content2: '学校学科门类齐全，涵盖理、工、经、管、法、文、史、哲、医、教育、艺术、交叉学科12个学科门类。设7个学部35个学院，以及8所附属医院。教职工5300余人，在校学生50000余人，其中研究生24000余人，本科生26000余人。校园占地面积5300余亩，有A校区、B校区、C校区、虎溪校区和两江校区。',
          title1: '人才培养',
          title2: '校园文化',
          content3: '入选全国首批10所“三全育人”综合改革试点高校、首批20所“高校思想政治工作创新发展中心”承建高校、首批10所国家卓越工程师学院建设高校、10所“储能技术国家急需高层次人才培养专项”实施高校、国家储能技术产教融合创新平台。大力实施“本科教育2029行动计划”，打造一流本科教育。成立本科生院，全面实施大类招生、大类培养，加强通识教育。61个专业入选国家级一流本科专业，68门课程入选国家级一流本科课程；数学与应用数学、物理学专业进入“强基计划”，曙光计算机科学拔尖学生培养基地获批教育部基础学科拔尖学生培养计划2.0基地，大数据与软件学院入选首批特色化示范性软件学院。与两江新区共建明月湖新工科教育创新平台、重庆卓越工程师学院。',
          content4: '持续深化培养体制机制改革，开展科研经费博士、工程硕博士培养改革专项试点，大力实施“研究生教育高质量发展行动计划”，打造卓越研究生教育。获批学位授权自主审核高校，有一级学科博士学位授权点37个、博士专业学位授权点9个，一级学科硕士学位授权点48个，专业学位授权点27个；博士生年招生规模1150余人。',
          content5: '深化“产教融合、跨界培养”，先后获评“全国首批深化创新创业教育改革示范高校”“全国创新创业典型经验高校”“国家大众创业万众创新示范基地”等，承办第八届中国国际“互联网＋”大学生创新创业大赛。',
          content6: '按照“强化工科、夯实理科、振兴文科、繁荣社科、拓展医科、提升信科、推动交叉”的思路，坚持学科内涵发展、高质量发展、特色发展，健全适应科技高速变革的学科优化布局机制以及适宜产生未来引领学科的体制机制，建立一流的学科公共服务平台支撑体系，着力构建一流学科生态。实施六类学科重点建设项目，持续加大推进一流学科、I类优势学科以及“先进制造”“智慧能源”“新型城镇化”三大学科群建设。高起点推进医学学科加快发展。实施“基础文科振兴行动计划”“基础理科卓越行动计划”，加快提升基础学科整体发展水平。',
          content7: '大力实施人才强校战略，系统构建起“3+7”人事人才制度体系和人才引育“金字塔”，积极营造“近悦远来”的人才发展氛围，以先进体制机制激发高层次人才持续汇聚的内生动力。现有专任教师3200余人，其中包括9位院士在内的国家级人才300余人次，博士生导师1900余人，副高级以上专业技术人员2200余人。',
          content8: '弘扬伟大建党精神，坚持用社会主义核心价值观铸魂育人，大力推进“文化强校”战略，凝练弘扬“复兴民族，誓作前锋”的重大精神，以一流的大学文化推进一流大学建设，获评第二届“全国文明校园”。大力选树先进典型，近百名教师荣获“全国优秀共产党员”“全国抗击新冠肺炎疫情先进个人”“最美奋斗者”“最美高校辅导员”等荣誉称号。',
          content9: '潜心打造校史馆及“立德树人”专题展览馆，深入挖掘爱国奉献精神内涵，弘扬科学精神和崇高品德。创作《重庆家书》《重庆往事·红色恋人》《光华》《初心·1929》《寅初亭》《何鲁》《渝创·渝新》等原创文化作品，讲好“重大故事”，展示人文素养和家国情怀。传承和打造以川剧为代表的特色中华优秀传统文化成果，获批全国普通高校中华优秀传统文化传承基地(川剧)。',
          content10: '弘扬革命文化，持续开展“红岩革命故事展演”等活动。建立师生、校友人物特色档案资源库，打造“重大文库”，传播重大精神。实施建筑文化景观完善工程，学校近现代建筑群和早期建筑群分别入选第二批中国20世纪建筑遗产和第八批全国重点文物保护单位。',
          content11: '始终坚持“研究学术、造就人才、佑启乡邦、振导社会”的办学宗旨，积极发挥社会服务职能。深化拓展校地合作，南京研究院等一批科技创新平台和新型高端研发机构落地生根。牵头研制的月面微型生态圈在月球上种植出第一片绿叶，完成人类首次月面生物生长培育实验。成立了原国家教委批准的全国第一家高校董事会，大学科技园获认定为全国首批22个国家大学科技园之一。积极推进对口支援高校和县中托管帮扶工作，创造性地开展定点扶贫和服务乡村振兴工作，助力云南省绿春县和重庆巫山竹贤乡全面推进乡村振兴。发挥附属医院优势，在疫情防控、医疗救治等领域向社会提供优质服务。',
          content12: '学校以“扎根巴渝大地、服务重庆发展”为己任，抢抓成渝地区双城经济圈建设、西部陆海新通道建设等国家战略机遇，主动发挥智力优势、人才优势，深度融入区域经济社会创新发展，为新时代新征程全面建设社会主义现代化新重庆而奋斗。与重庆市政府共同启动筹建重庆实验室、共建长江生态环境联合研究生院。与重庆30多个区县持续深化合作，共建环重庆大学创新生态圈、国际联合研究院、璧山先进技术研究院、气球平台微波垂直传能试验验证平台、重庆新型储能材料与装备研究院等。牵头成立“成渝地区双城经济圈高校联盟”，着力打造成渝科教创新共同体。',
          content13: '面向未来，重庆大学将高举中国特色社会主义伟大旗帜，全面贯彻习近平新时代中国特色社会主义思想和党的二十大精神，秉承“研究学术、造就人才、佑启乡邦、振导社会”的办学宗旨，立足新发展阶段、贯彻新发展理念、服务构建新发展格局，与时俱进建设世界一流大学，全面提升服务区域发展和国家战略能力，以“时时放心不下”的责任感，奋力谱写学校新发展阶段高质量发展新篇章，为全面建设社会主义现代化国家、全面推进中华民族伟大复兴贡献“重大”力量。',
          image1: require('@/images/人才.jpg'),
          top: 120,
          right: 105
        }
      ],
      singlerec2: [
        {
          id: 'rectangle2',
          title1: '校风：团结、勤奋、求实、创新',
          title2: '校训：耐劳苦、尚俭朴、勤学业、爱国家',
          content: '这里填写第三个矩形的内容。',
          top: 120,
          right: 105
        }
      ],
      singlerec3: [
        {
          id: 'rectangle3',
          title: '校历日程',
          content: '这里填写校历日程的内容。',
          top: 120,
          right: 105
        }
      ],
      singlerec4: [
        {
          id: 'rectangle4',
          title: '关于我们',
          content: '更多关于我们的信息',
          pdfUrl: 'https://example.com/path/to/pdf' // 替换为实际的PDF文件URL
        }
      ],
      currentRectangle: 'rectangle1'
    }
  },
  methods: {
    setCurrentRectangle(rectangleId) {
      this.currentRectangle = rectangleId
    },
      downloadOrder() {
        let params = {
          pageNo: this.form.pageNo,
          pageSize: this.form.pageSize,
          data: this.form
        };
        axios({
          url: `/api/download/downloadPdf`,
          method: 'post',
          data: params,
          headers: {
            Authorization: localStorage.getItem('Guarantee_Token'),
          },
          responseType: 'blob'
        }).then((response) => {
          let blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
          let downloadElement = document.createElement('a');
          let href = window.URL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = '订单管理.xlsx';
          document.body.appendChild(downloadElement);
          downloadElement.click();
          document.body.removeChild(downloadElement);
          window.URL.revokeObjectURL(href);
        }).catch((error) => {
          console.error('下载订单出错：', error);
        });
      }
  }
}
</script>

<style>
/*块大小*/
.el-carousel{
  height:500px;
}
/*图片大小*/
.carousel-image {
  width: 100%;
  height: 500px;
  display: block;
}
/*显示滚动图片大小*/
.el-carousel__item{
  height:500px;
}
.container{
    height: 90vh;
  overflow-y:auto;
}
.static-image {
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.single-button {
  padding: 10px;
  border: none;
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
}

.rectangle-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rectangle_title {
  color: black;
  font-size: 30px;
  margin-bottom: 20px;
  align-items: flex-start; /* Align items to the start (left) */
  text-align: left; /* Align text to the left */
  margin-left: 120px;
}

.rectangle_text1,
.rectangle_text2 {
  color: black;
  font-size: 17px;
  width: 90%;
  text-indent: 2em;
  margin: 0 auto; /* 居中对齐 */
  text-align: justify; /* 两端对齐 */

}

.rectangle_text3,
.rectangle_text4,
.rectangle_text5 {
  color: black;
  font-size: 15px;
  width: 70%; /* Full width inside the flex container */
  text-indent: 2em;
  margin: 0 5px; /* Adjust as needed */
  display: inline-block; /* Display inline */
  vertical-align: top; /* Align to the top */
  text-align: justify; /* Justify text */
  margin-left: 200px;
  margin-bottom: 10px;
}

.together{
  display: flex;
  width: 60%;
  flex-direction: column;
}
.together2{
  display: flex;
  width: 60%;
  height: 800px;
  flex-direction: column;
}
.additional-image-container {
  width: 50%;
  display: inline-block; /* Display inline */
  vertical-align: top; /* Align to the top */
  margin-right: 450px; /* Adjust as needed */
}
.additional-content{
  display: flex;
  margin-top: 20px;
  }
  .additional-content2{
    display: flex;
    margin-top: 20px;
    height:80%;
    }
.additional-image {
  border-radius: 20px;
  width: 65%;
  margin-top: 60px;
}
.image-container {
   position: relative;
 }
.back{
  width: 100%;
  display: block;
}
.over-title1{
  position: absolute;
  top: 20px; /* 根据需要调整文本位置 */
  right: 600px; /* 根据需要调整文本位置 */
  color: black;/* 根据图片背景色选择文本颜色 */
  padding: 10px;
  border-radius: 5px; /* 可选，添加圆角 */
  font-size: 30px; /* 根据需要调整字体大小 */
}
.overlay-text1 {
   position: absolute;
   text-indent: 2em;
   vertical-align: top; /* Align to the top */
   text-align: justify; /* Justify text */
   top: 100px; /* 根据需要调整文本位置 */
   right: 40px; /* 根据需要调整文本位置 */
   color: white; /* 根据图片背景色选择文本颜色 */
   background-color: rgba(0, 0, 0, 0.5); /* 半透明背景以提高文本可读性 */
   padding: 10px;
   border-radius: 5px; /* 可选，添加圆角 */
   font-size: 18px; /* 根据需要调整字体大小 */
   width:40%;
 }
 .over-title2{
   position: absolute;
   top: 320px; /* 根据需要调整文本位置 */
   right: 600px; /* 根据需要调整文本位置 */
   color: black;/* 根据图片背景色选择文本颜色 */
   padding: 10px;
   border-radius: 5px; /* 可选，添加圆角 */
   font-size: 30px; /* 根据需要调整字体大小 */
 }
 .overlay-text2 {
    position: absolute;
    text-indent: 2em;
    vertical-align: top; /* Align to the top */
    text-align: justify; /* Justify text */
    top: 400px; /* 根据需要调整文本位置 */
    right: 40px; /* 根据需要调整文本位置 */
    color: white; /* 根据图片背景色选择文本颜色 */
    background-color: rgba(0, 0, 0, 0.5); /* 半透明背景以提高文本可读性 */
    padding: 10px;
    border-radius: 5px; /* 可选，添加圆角 */
    font-size: 18px; /* 根据需要调整字体大小 */
    width:40%;
  }
.rectangle_text8,
.rectangle_text9,
.rectangle_text10 {
  color: black;
  font-size: 15px;
  width: 50%; /* Full width inside the flex container */
  text-indent: 2em;
  margin: 0 5px; /* Adjust as needed */
  display: inline-block; /* Display inline */
  vertical-align: top; /* Align to the top */
  text-align: justify; /* Justify text */
  margin-left: 200px;
  margin-bottom: 10px;
}
.blue-rectangle{
  border-radius: 20px;
  width:50%;
  margin-top: 20px;
  margin-right: 40px;
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
}
.rectangle_text11,
.rectangle_text12 {
  color: black;
  font-size: 15px;
  width: 50%; /* Full width inside the flex container */
  text-indent: 2em;
  margin: 0 5px; /* Adjust as needed */
  vertical-align: top; /* Align to the top */
  text-align: justify; /* Justify text */
  margin-left: 120px;
  margin-bottom: 10px;
}
.sin{
  border-radius: 10px;
  width:80%;
}
.rectangle_text13{
  color: black;
  font-size: 17px;
  width: 90%;
  text-indent: 2em;
  margin: 0 auto; /* 居中对齐 */
  text-align: justify; /* 两端对齐 */
  margin-top: 20px;
  margin-bottom: 30px;
}
.darkblue{
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
  width: 100%;
  height: 90px;
}

.wandtt{
  border-radius: 10px;
  margin-top: 10px;
  width:600px;
  margin-right: 40px;
}
.wandtw{
  margin-top: 10px;
  width:600px;
  height: 400px;
  margin-left: 40px;
  margin-right: 300px;
}
.windtitle{
  margin-left: 2px;
  margin-right: 300px;
}
.traintitle{
  margin-right: 2px;
}
</style>

 -->
<template>
  <div class="container">
    <div>
      <!--滚动图片-->
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="(image, index) in images" :key="index">
          <img :src="image.src" :alt="image.alt" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
      <div class="buttons-container">
        <button
          v-for="(rectangle, index) in singlerec1"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          学校概况
        </button>
        <button
          v-for="(rectangle, index) in singlerec2"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          校风校训
        </button>
        <button
          v-for="(rectangle, index) in singlerec3"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          校历日程
        </button>
        <button
          v-for="(rectangle, index) in singlerec4"
          :key="index"
          class="single-button"
          @click="setCurrentRectangle(rectangle.id)"
        >
          学校章程
        </button>
      </div>
      <div v-if="currentRectangle" class="rectangle-content">
        <div v-for="rectangle in singlerec1" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <p class="rectangle_text1">{{ rectangle.content1 }}</p>
          <p class="rectangle_text2">{{ rectangle.content2 }}</p>
          <div class="additional-content">
            <div class="together">
              <h3 class="rectangle_title">{{ rectangle.title1 }}</h3>
              <p class="rectangle_text3">{{ rectangle.content3 }}</p>
              <p class="rectangle_text4">{{ rectangle.content4 }}</p>
              <p class="rectangle_text5">{{ rectangle.content5 }}</p>
            </div>
            <div v-if="rectangle.image1" class="additional-image-container">
              <img :src="rectangle.image1" alt="Additional Image 1" class="additional-image">
            </div>
          </div>
          <div class="image-container">
            <img :src="backfround" alt="back" class="back">
            <p class="over-title1">学科建设</p>
            <p class="overlay-text1">{{ rectangle.content6 }}</p>
            <p class="over-title2">人才队伍</p>
            <p class="overlay-text2">{{ rectangle.content7 }}</p>
          </div>
          <div class="additional-content2">
            <div class="together2">
              <p class="rectangle_title">{{ rectangle.title2 }}</p>
              <p class="rectangle_text8">{{ rectangle.content8 }}</p>
              <p class="rectangle_text9">{{ rectangle.content9 }}</p>
              <p class="rectangle_text10">{{ rectangle.content10 }}</p>
            </div>
            <div class="blue-rectangle">
              <p class="rectangle_title">社会服务</p>
              <p class="rectangle_text12">{{ rectangle.content11 }}</p>
              <p class="rectangle_text12">{{ rectangle.content12 }}</p>
              <img :src="since" alt="sin" class="sin">
            </div>
          </div>
          <p class="rectangle_text13">{{ rectangle.content13 }}</p>
          <div class="darkblue" />
        </div>
        <div v-for="rectangle in singlerec2" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <div class="additional-content">
            <div class="school-wind">
              <h3 class="windtitle">{{ rectangle.title1 }}</h3>
              <img :src="schoolwind" alt="Additional Image 1" class="wandtw">
            </div>
            <div class="school-train">
              <h3 class="traintitle">{{ rectangle.title2 }}</h3>
              <img :src="schooltrain" alt="Additional Image 1" class="wandtt">
            </div>
          </div>
        </div>
        <div v-for="rectangle in singlerec3" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <img :src="schoolyearone" alt="school" class="static-image">
          <img :src="schoolyeartwo" alt="school" class="static-image">
        </div>
        <div v-for="rectangle in singlerec4" v-if="currentRectangle === rectangle.id" :key="rectangle.id">
          <h3>{{ rectangle.title }}</h3>
          <p>{{ rectangle.content }}</p>
          <div v-if="rectangle.image1" class="additional-image-container">
            <img :src="rectangle.image1" alt="Additional Image 1" class="additional-image">
          </div>
          <button @click="downloadOrder">下载 PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        pageNo: 1,
        pageSize: 10,
        // 其他表单数据
      },
      images: [
        { src: require('@/images/学校信息-top.jpg'), alt: 'Image 1' },
        { src: require('@/images/school.jpg'), alt: 'Image 2' },
        { src: require('@/images/虎溪体育中心.jpg'), alt: 'Image 3' },
        { src: require('@/images/图书馆2.jpg'), alt: 'Image 4' }
      ],
      schoolin: require('@/images/学校信息-top.jpg'),
      backfround: require('@/images/背景.png'),
      since: require('@/images/科研图片.jpeg'),
      schoolwind: require('@/images/校风.png'),
      schooltrain: require('@/images/校训.jpg'),
      schoolyearone: require('@/images/校历1.png'),
      schoolyeartwo: require('@/images/校历2.png'),
      singlerec1: [
        {
          id: 'rectangle1',
          content1: '重庆大学是中央直管、教育部直属的全国重点大学。学校创办于1929年，提出建设“完备弘深之大学”的愿景，到20世纪40年代发展成为文理工商法医各学科齐全的综合性大学。经过1952年全国院系调整，成为以工科为主的多科性大学。1960年被确定为全国重点大学。改革开放后，学校进行了全面的恢复调整和改革建设，成为一所以工为主、多学科协调发展的高校，1998年获批国家“211工程”重点建设高校。2000年原重庆建筑大学、重庆建筑高等专科学校与重庆大学合并组建为新的重庆大学，2001年成为“985工程”重点建设高校。2017年入选国家“世界一流大学建设高校（A类）”，2022年入选第二轮“双一流”建设高校。学校发展进入新的历史阶段，朝着中国特色、世界一流大学办学目标不懈奋进。',
          content2: '学校学科门类齐全，涵盖理、工、经、管、法、文、史、哲、医、教育、艺术、交叉学科12个学科门类。设7个学部35个学院，以及8所附属医院。教职工5300余人，在校学生50000余人，其中研究生24000余人，本科生26000余人。校园占地面积5300余亩，有A校区、B校区、C校区、虎溪校区和两江校区。',
          title1: '人才培养',
          title2: '校园文化',
          content3: '入选全国首批10所“三全育人”综合改革试点高校、首批20所“高校思想政治工作创新发展中心”承建高校、首批10所国家卓越工程师学院建设高校、10所“储能技术国家急需高层次人才培养专项”实施高校、国家储能技术产教融合创新平台。大力实施“本科教育2029行动计划”，打造一流本科教育。成立本科生院，全面实施大类招生、大类培养，加强通识教育。61个专业入选国家级一流本科专业，68门课程入选国家级一流本科课程；数学与应用数学、物理学专业进入“强基计划”，曙光计算机科学拔尖学生培养基地获批教育部基础学科拔尖学生培养计划2.0基地，大数据与软件学院入选首批特色化示范性软件学院。与两江新区共建明月湖新工科教育创新平台、重庆卓越工程师学院。',
          content4: '持续深化培养体制机制改革，开展科研经费博士、工程硕博士培养改革专项试点，大力实施“研究生教育高质量发展行动计划”，打造卓越研究生教育。获批学位授权自主审核高校，有一级学科博士学位授权点37个、博士专业学位授权点9个，一级学科硕士学位授权点48个，专业学位授权点27个；博士生年招生规模1150余人。',
          content5: '深化“产教融合、跨界培养”，先后获评“全国首批深化创新创业教育改革示范高校”“全国创新创业典型经验高校”“国家大众创业万众创新示范基地”等，承办第八届中国国际“互联网＋”大学生创新创业大赛。',
          content6: '按照“强化工科、夯实理科、振兴文科、繁荣社科、拓展医科、提升信科、推动交叉”的思路，坚持学科内涵发展、高质量发展、特色发展，健全适应科技高速变革的学科优化布局机制以及适宜产生未来引领学科的体制机制，建立一流的学科公共服务平台支撑体系，着力构建一流学科生态。实施六类学科重点建设项目，持续加大推进一流学科、I类优势学科以及“先进制造”“智慧能源”“新型城镇化”三大学科群建设。高起点推进医学学科加快发展。实施“基础文科振兴行动计划”“基础理科卓越行动计划”，加快提升基础学科整体发展水平。',
          content7: '大力实施人才强校战略，系统构建起“3+7”人事人才制度体系和人才引育“金字塔”，积极营造“近悦远来”的人才发展氛围，以先进体制机制激发高层次人才持续汇聚的内生动力。现有专任教师3200余人，其中包括9位院士在内的国家级人才300余人次，博士生导师1900余人，副高级以上专业技术人员2200余人。',
          content8: '弘扬伟大建党精神，坚持用社会主义核心价值观铸魂育人，大力推进“文化强校”战略，凝练弘扬“复兴民族，誓作前锋”的重大精神，以一流的大学文化推进一流大学建设，获评第二届“全国文明校园”。大力选树先进典型，近百名教师荣获“全国优秀共产党员”“全国抗击新冠肺炎疫情先进个人”“最美奋斗者”“最美高校辅导员”等荣誉称号。',
          content9: '潜心打造校史馆及“立德树人”专题展览馆，深入挖掘爱国奉献精神内涵，弘扬科学精神和崇高品德。创作《重庆家书》《重庆往事·红色恋人》《光华》《初心·1929》《寅初亭》《何鲁》《渝创·渝新》等原创文化作品，讲好“重大故事”，展示人文素养和家国情怀。传承和打造以川剧为代表的特色中华优秀传统文化成果，获批全国普通高校中华优秀传统文化传承基地(川剧)。',
          content10: '弘扬革命文化，持续开展“红岩革命故事展演”等活动。建立师生、校友人物特色档案资源库，打造“重大文库”，传播重大精神。实施建筑文化景观完善工程，学校近现代建筑群和早期建筑群分别入选第二批中国20世纪建筑遗产和第八批全国重点文物保护单位。',
          content11: '始终坚持“研究学术、造就人才、佑启乡邦、振导社会”的办学宗旨，积极发挥社会服务职能。深化拓展校地合作，南京研究院等一批科技创新平台和新型高端研发机构落地生根。牵头研制的月面微型生态圈在月球上种植出第一片绿叶，完成人类首次月面生物生长培育实验。成立了原国家教委批准的全国第一家高校董事会，大学科技园获认定为全国首批22个国家大学科技园之一。积极推进对口支援高校和县中托管帮扶工作，创造性地开展定点扶贫和服务乡村振兴工作，助力云南省绿春县和重庆巫山竹贤乡全面推进乡村振兴。发挥附属医院优势，在疫情防控、医疗救治等领域向社会提供优质服务。',
          content12: '学校以“扎根巴渝大地、服务重庆发展”为己任，抢抓成渝地区双城经济圈建设、西部陆海新通道建设等国家战略机遇，主动发挥智力优势、人才优势，深度融入区域经济社会创新发展，为新时代新征程全面建设社会主义现代化新重庆而奋斗。与重庆市政府共同启动筹建重庆实验室、共建长江生态环境联合研究生院。与重庆30多个区县持续深化合作，共建环重庆大学创新生态圈、国际联合研究院、璧山先进技术研究院、气球平台微波垂直传能试验验证平台、重庆新型储能材料与装备研究院等。牵头成立“成渝地区双城经济圈高校联盟”，着力打造成渝科教创新共同体。',
          content13: '面向未来，重庆大学将高举中国特色社会主义伟大旗帜，全面贯彻习近平新时代中国特色社会主义思想和党的二十大精神，秉承“研究学术、造就人才、佑启乡邦、振导社会”的办学宗旨，立足新发展阶段、贯彻新发展理念、服务构建新发展格局，与时俱进建设世界一流大学，全面提升服务区域发展和国家战略能力，以“时时放心不下”的责任感，奋力谱写学校新发展阶段高质量发展新篇章，为全面建设社会主义现代化国家、全面推进中华民族伟大复兴贡献“重大”力量。',
          image1: require('@/images/人才.jpg'),
          top: 120,
          right: 105
        }
      ],
      singlerec2: [
        {
          id: 'rectangle2',
          title1: '校风：团结、勤奋、求实、创新',
          title2: '校训：耐劳苦、尚俭朴、勤学业、爱国家',
          content: '这里填写第三个矩形的内容。',
          top: 120,
          right: 105
        }
      ],
      singlerec3: [
        {
          id: 'rectangle3',
          title: '校历日程',
          content: '这里填写校历日程的内容。',
          top: 120,
          right: 105
        }
      ],
      singlerec4: [
        {
          id: 'rectangle4',
          title: '关于我们',
          content: '更多关于我们的信息',
          pdfUrl: 'https://example.com/path/to/pdf' // 替换为实际的PDF文件URL
        }
      ],
      currentRectangle: 'rectangle1'
    }
  },
  methods: {
    setCurrentRectangle(rectangleId) {
      this.currentRectangle = rectangleId;
    },
    downloadOrder() {
      let params = {
        pageNo: this.form.pageNo,
        pageSize: this.form.pageSize,
        data: this.form
      };
      axios({
        url: '/api/download/downloadPdf', // 替换为你的实际API端点
        method: 'post',
        data: params,
        headers: {
          Authorization: localStorage.getItem('Guarantee_Token'),
        },
        responseType: 'blob'
      }).then((response) => {
        let blob = new Blob([response.data], { type: 'application/pdf' });
        let downloadElement = document.createElement('a');
        let href = window.URL.createObjectURL(blob);
        downloadElement.href = href;
        downloadElement.download = '订单管理.pdf'; // 设置下载文件的文件名
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);
        window.URL.revokeObjectURL(href);
      }).catch((error) => {
        console.error('下载订单出错：', error);
      });
    }
  }
}
</script>

<style>
.el-carousel__indicators--outside .el-carousel__button {
  width: 20px;
  height: 20px;
  top: 500px; /* 调整位置 */
  margin: 0 50px; /* 增加间距 */
}
/*块大小*/
.el-carousel{
  height:600px;
}
/*图片大小*/
.carousel-image {
  width: 100%;
  height: 600px;
  display: block;
}
/*显示滚动图片大小*/
.el-carousel__item{
  height:600px;
}
.container{
    height: 90vh;
  overflow-y:auto;
}
.static-image {
  width: 100%;
  display: block;
  margin-bottom: 20px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 20px;
}

.single-button {
  padding: 10px;
  border: none;
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
}

.rectangle-content {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rectangle_title {
  color: black;
  font-size: 30px;
  margin-bottom: 20px;
  align-items: flex-start; /* Align items to the start (left) */
  text-align: left; /* Align text to the left */
  margin-left: 120px;
}

.rectangle_text1,
.rectangle_text2 {
  color: black;
  font-size: 17px;
  width: 90%;
  text-indent: 2em;
  margin: 0 auto; /* 居中对齐 */
  text-align: justify; /* 两端对齐 */

}

.rectangle_text3,
.rectangle_text4,
.rectangle_text5 {
  color: black;
  font-size: 15px;
  width: 70%; /* Full width inside the flex container */
  text-indent: 2em;
  margin: 0 5px; /* Adjust as needed */
  display: inline-block; /* Display inline */
  vertical-align: top; /* Align to the top */
  text-align: justify; /* Justify text */
  margin-left: 200px;
  margin-bottom: 10px;
}

.together{
  display: flex;
  width: 60%;
  flex-direction: column;
}
.together2{
  display: flex;
  width: 60%;
  height: 800px;
  flex-direction: column;
}
.additional-image-container {
  width: 50%;
  display: inline-block; /* Display inline */
  vertical-align: top; /* Align to the top */
  margin-right: 450px; /* Adjust as needed */
}
.additional-content{
  display: flex;
  margin-top: 20px;
  left: 20px;
    }
  .additional-content2{
    display: flex;
    margin-top: 20px;
    height:80%;
    }
.additional-image {
  border-radius: 20px;
  width: 65%;
  margin-top: 50px;
}
.image-container {
   position: relative;
 }
.back{
  width: 100%;
  display: block;
}
.over-title1{
  position: absolute;
  top: 20px; /* 根据需要调整文本位置 */
  right: 600px; /* 根据需要调整文本位置 */
  color: black;/* 根据图片背景色选择文本颜色 */
  padding: 10px;
  border-radius: 5px; /* 可选，添加圆角 */
  font-size: 30px; /* 根据需要调整字体大小 */
}
.overlay-text1 {
   position: absolute;
   text-indent: 2em;
   vertical-align: top; /* Align to the top */
   text-align: justify; /* Justify text */
   top: 100px; /* 根据需要调整文本位置 */
   right: 40px; /* 根据需要调整文本位置 */
   color: white; /* 根据图片背景色选择文本颜色 */
   background-color: rgba(0, 0, 0, 0.5); /* 半透明背景以提高文本可读性 */
   padding: 10px;
   border-radius: 5px; /* 可选，添加圆角 */
   font-size: 18px; /* 根据需要调整字体大小 */
   width:40%;
 }
 .over-title2{
   position: absolute;
   top: 320px; /* 根据需要调整文本位置 */
   right: 600px; /* 根据需要调整文本位置 */
   color: black;/* 根据图片背景色选择文本颜色 */
   padding: 10px;
   border-radius: 5px; /* 可选，添加圆角 */
   font-size: 30px; /* 根据需要调整字体大小 */
 }
 .overlay-text2 {
    position: absolute;
    text-indent: 2em;
    vertical-align: top; /* Align to the top */
    text-align: justify; /* Justify text */
    top: 400px; /* 根据需要调整文本位置 */
    right: 40px; /* 根据需要调整文本位置 */
    color: white; /* 根据图片背景色选择文本颜色 */
    background-color: rgba(0, 0, 0, 0.5); /* 半透明背景以提高文本可读性 */
    padding: 10px;
    border-radius: 5px; /* 可选，添加圆角 */
    font-size: 18px; /* 根据需要调整字体大小 */
    width:40%;
  }
.rectangle_text8,
.rectangle_text9,
.rectangle_text10 {
  color: black;
  font-size: 15px;
  width: 50%; /* Full width inside the flex container */
  text-indent: 2em;
  margin: 0 5px; /* Adjust as needed */
  display: inline-block; /* Display inline */
  vertical-align: top; /* Align to the top */
  text-align: justify; /* Justify text */
  margin-left: 200px;
  margin-bottom: 10px;
}
.blue-rectangle{
  border-radius: 20px;
  width:50%;
  margin-top: 20px;
  margin-right: 40px;
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
}
.rectangle_text11,
.rectangle_text12 {
  color: black;
  font-size: 15px;
  width: 50%; /* Full width inside the flex container */
  text-indent: 2em;
  margin: 0 5px; /* Adjust as needed */
  vertical-align: top; /* Align to the top */
  text-align: justify; /* Justify text */
  margin-left: 120px;
  margin-bottom: 10px;
}
.sin{
  border-radius: 10px;
  width:80%;
}
.rectangle_text13{
  color: black;
  font-size: 17px;
  width: 90%;
  text-indent: 2em;
  margin: 0 auto; /* 居中对齐 */
  text-align: justify; /* 两端对齐 */
  margin-top: 20px;
  margin-bottom: 30px;
}
.darkblue{
  background-image: linear-gradient(to bottom right, DodgerBlue, LightBlue);
  width: 100%;
  height: 90px;
}

.wandtt{
  border-radius: 10px;
  margin-top: 10px;
  width:600px;
  margin-right: 40px;
}
.wandtw{
  margin-top: 10px;
  width:600px;
  height: 400px;
  margin-left: 40px;
  margin-right: 300px;
}
.windtitle{
  margin-left: 2px;
  margin-right: 300px;
}
.traintitle{
  margin-right: 2px;
}
</style>
