<template>
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="吴芳吉 1896—1932 重庆大学创始人之一，重庆大学筹备会成立宣言主要起草人之一" name="1">
    <div class="together">
      <div class="image1">
        <img :src="wu" alt="Static Image" class="static-image">
      </div>
    <div class="text1">
      <p>
      吴芳吉（1896年—1932年），男，重庆市江津人，字碧柳，自号白屋吴生，世称白屋诗人（见《江津县志》），其才华灿烂夺目，与苏曼珠的俊逸才华前后辉映，为二十世纪二十年代中国著名诗人。重庆大学创始人之一，重庆大学筹备会成立宣言主要起草人之一。
      </p>
    </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="沈懋德 1893—1932 重庆大学创始人之一，重庆大学筹备会成立宣言主要起草人之一" name="2">
    <div class="together">
      <div class="image1">
        <img :src="shen" alt="Static Image" class="static-image">
      </div>
    <div class="text1">
      <p>
      沈懋德（1893年—1932年）重庆巴县人，重庆大学创始人之一，重庆大学筹备会成立宣言主要起草人之一。为创办重庆大学，沈懋德谢绝日本东京帝国大学的聘请，曾任成都大学理科学兼物理系主任。
      </p>
    </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="吕子方 1895—1964 校董事会委员、教务长、训导长、理科主任" name="3">
    <div class="together">
      <div class="image1">
        <img :src="lv" alt="Static Image" class="static-image">
      </div>
    <div class="text1">
      <p>
      吕子方（1895-1964），重庆市沙坪坝人，教育家，著名教授学者，中国科技史专家，重庆大学创始人之一。先后留学日本，英国等国著名大学，1929年参与筹建重庆大学，任该校董事会委员、教务长、训导长、理科主任等职，并曾兼任上海自然科学研究室主任。
      </p>
    </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="彭用仪 1899—1994 重庆大学化学系教授，系主任，代理校长" name="4">
    <div class="together">
      <div class="image1">
        <img :src="peng" alt="Static Image" class="static-image">
      </div>
    <div class="text1">
      <p>
      彭用仪，名鸿章，1899年生于重庆巴县，1921年受吴玉章指引，自费出国留学，先到法国，后到德国，在慕尼黑大学攻读化工。1927年抗战爆发，彭用仪回国，应张澜校长之请，到成都大学任化学教授，与其他几位成大任教的老友一起积极筹办重庆大学。重庆大学成立后，历任重庆大学化学系教授，系主任，代理校长等职，又兼任图书馆馆长。
      </p>
    </div>
    </div>
  </el-collapse-item>
  <el-collapse-item title="汪云松 1873—1958 重庆大学筹备委员会成员" name="5">
    <div class="together">
      <div class="image1">
        <img :src="wang" alt="Static Image" class="static-image">
      </div>
    <div class="text1">
      <p>
      汪云松（1873—1958），字德薰，笔名五四难民，祖籍湖北，随父定居巴县。出生于重庆世家，为晚清的秀才。清末曾在外地做官，任过知县、知府及吉林省官银号总办、电灯总局总办等职。辛亥革命后返渝，随父经商，曾任浚川银行经理、大中银行总经理、重庆总商会副会长、会长，重庆参事会主席等职，先后帮助邓小平、聂荣臻、陈毅等赴法勤工俭学。重庆大学筹备委员会成员之一。
      </p>
    </div>
    </div>
  </el-collapse-item>
</el-collapse>
</template>
<script>
  export default {
    data() {
      return {
        wu: require('@/images/吴芳吉.jpg'),
        shen: require('@/images/沈.jpg'),
        lv: require('@/images/lv.jpg'),
        peng: require('@/images/peng.jpg'),
        wang:require('@/images/汪.jpg'),
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style>
.static-image{
  width:100px;
  height: 120px;
}
.text1{
  text-indent: 2em;
  width:50%;
  margin-left:20px;
}
.together{
  display: flex;
}
</style>
