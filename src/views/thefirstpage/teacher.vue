<template>
  <div class="main_acontainer">
    <div class="container_left">
      <div class="m1">
        <div id="mychart1" :style="myChartStyle_column" />
      </div>
      <div class="container_23">
        <div class="m2">
          <div id="mychart3" :style="myChartStyle_column" />
        </div>
        <div class="m3">
          <div id="mychart4" :style="myChartStyle_column" />
        </div>
      </div>
    </div>
    <div class="container_mid">
      <div class="title_text_out">
        <div class="titletext">
          数据信息面板<br>{{ now_time }}
        </div>
      </div>
      <div class="map_container">
        <div class="china">
          <div v-if="pyName === 'china'" id="chinaMap" />
        </div>
      </div>
      <div class="container_pie">
        <div id="mychart5" class="pie1" :style="myChartStyle_row" />
        <div id="mychart6" class="pie2" :style="myChartStyle_row" />
      </div>
    </div>
    <div class="container_right">
      <div class="container_text_out">
        <div class="text_container">
          {{ low_inst[0] }}，{{ low_inst[1] }}，{{ low_inst[2] }}
          辅导员请注意!<br>
          学院的报到率为{{ low_rate[0] }}%，{{ low_rate[1] }}%，{{ low_rate[2] }}%<br>
          请多加关注学生报道情况！
        </div>
      </div>
      <div class="text_3">
        <div class="text_left">今日已经报道人数<br><br>{{ todayCount }}人</div>
        <div class="text_mid">预计今日报道人数<br><br>{{ todayCount }}人</div>
        <div class="text_right">距离报道结束剩余<br><br>{{ left_day }}天</div>
      </div>
      <div class="m7">
        <div id="mychart7" :style="myChartStyle_column" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'
import { color } from 'echarts/lib/export'
import 'echarts/map/js/china' // 确保你有安装 echarts 及相关插件

export default {
  data() {
    return {
      totalMap: null,
      cityArr: null,
      myEchartsOfChina: null,
      pyName: 'china',
      pyNameOfChinese: '',
      // 宿舍区域，人数柱状图。
      dormitoryXdata: [],
      dormitoryYdata: [],
      // 报道时间，人数折线图
      timeXdata: [],
      timeYdata: [],
      // 剩余床位数字
      bedLeft: [],
      bedTotal: [],
      // 已报道人数,总人数字
      arrivedStu: null,
      totalStu: null,
      // 状态人数柱状图
      stateXdata: [],
      stateYdata: [],
      // 学院人数柱状图
      instituteXdata: [],
      instituteYdata: [],
      // 选课人数最少
      lowestEnrollmentRateCourses: [],
      // 报道人数最少
      lowestArrivalRateInstitutes: [],
      low_inst: [],
      low_rate: [],
      // 今日已经报道人数
      todayCount: 0,
      left_day: '',
      now_time: '',
      predict_data: 0,
      myChartStyle_row: {
        float: 'left',
        width: '100%',
        height: '100%',
        border: '2px solid #000' // 使用引号包裹边框值
      },
      myChartStyle_column: {
        float: 'left',
        width: '100%',
        height: '100%',
        border: '2px solid #000' // 使用引号包裹边框值
      }
    }
  },

  created() {
    this.fetchMapData()
  },

  mounted() {
    this.chinaMapFun()
    // this.initEcharts_dormitory();
    this.initEcharts_institute()
    this.initEcharts_state()
    this.initEcharts_time()
    this.initEcharts_pie1()
    this.initEcharts_pie2()
    this.initChart_lowest()
    // this.initChart_lowest_inst();
    this.low_inst_data()
    this.get_time()
  },

  methods: {
    get_time() {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() + 1 // 月份从0开始，所以要加1
      const day = now.getDate()
      const hours = now.getHours()
      const minutes = now.getMinutes()
      const seconds = now.getSeconds()
      const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      console.log(formattedTime) // 输出格式化的日期和时间
      this.now_time = formattedTime
      const date2 = new Date('2024-07-20')
      const time1 = now.getTime()
      const time2 = date2.getTime()
      const timeDifference = time2 - time1
      const millisecondsInADay = 24 * 60 * 60 * 1000
      const dayDifference = timeDifference / millisecondsInADay
      this.left_day = Math.round(dayDifference)
    },

    async fetchMapData() {
      try {
        const response = await axios.get('api/administrator/data')
        console.info('Full response:', response) // 打印完整的响应
        console.info('Data:', response.data) // 打印响应中的数据
        this.get_time
        this.totalMap = this.processNativeSpaceData(response.data.NativeSpace)
        console.info('totalMap:', this.totalMap)
        this.cityArr = this.getCityArr() // 使用之前定义的cityArr
        this.bedLeft = response.data.leftNumOfbed
        this.bedTotal = response.data.maxNumOfbed
        this.arrivedStu = response.data.totalNumOfArrivedStu[0]['SUM(num_of_arrived_stu)']
        this.totalStu = response.data.totalNumOfArrivedStu[0]['SUM(num_of_student)']
        console.info('人数', this.totalStu)
        this.getdata_dormitory(response.data.studentCountByArea)// 解析柱状图数据
        const instData = response.data.studentByInstitute
        instData.sort((a, b) => a.num_of_arrived_stu - b.num_of_arrived_stu)
        this.getdata_institute(instData)
        this.getdata_state(response.data.processState)
        this.getdata_time(response.data.timeNode)
        this.lowestEnrollmentRateCourses = response.data.lowestEnrollmentRateCourses
        this.lowestArrivalRateInstitutes = response.data.lowestArrivalRateInstitutes
        const temp = response.data.TodayCount
        const firstKey = Object.keys(temp)[0] // 获取第一个键
        this.todayCount = temp[firstKey]
        this.predict_data = response.data.PredictCount[0]
        this.chinaMapFun() // 获取数据后初始化地图
        // this.initEcharts_dormitory(); // 初始化柱状图
        this.initEcharts_institute()
        this.initEcharts_state()
        this.initEcharts_time()
        this.initEcharts_pie1()
        this.initEcharts_pie2()
        this.initChart_lowest()
        // this.initChart_lowest_inst();
        this.low_inst_data()
        // 柱状图
      } catch (error) {
        console.error('Error fetching map data:', error)
      }
    },
    initEcharts_institute() {
    // 基本柱状图
      const option = {
        title: {
          text: '学院已报道人数',
          left: 'center'
        },
        yAxis: {
          type: 'category', // x轴类型为类目型
          data: this.instituteXdata, // 横坐标数据
          axisLabel: {
            interval: 0, // 强制显示所有标签
            rotate: 30, // 旋转标签，避免重叠
            textStyle: {
              fontSize: 8 // 设置字体大小
            }
          }
        },
        xAxis: {
          type: 'value', // y轴类型为数值型
          name: '', // y轴名称
          splitLine: {
            show: false // 取消横向的网格线
          }
        },
        grid: {
          top: '20%', // 调整上边距
          bottom: '15%', // 调整下边距
          left: '15%', // 调整左边距
          right: '10%' // 调整右边距
        },
        series: [
          {
            type: 'bar', // 形状为柱状图
            data: this.instituteYdata, // 数据
            itemStyle: {
              color: '#33BEFF' // 设置柱子的颜色
            },
            label: {
              show: true, // 显示数据标签
              position: 'right',
              textStyle: {
                fontSize: 7 // 设置字体大小
              }
            }
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychart1'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    initEcharts_dormitory() {
    // 基本柱状图
      const option = {
        title: {
          text: '宿舍园区已入住人数',
          left: 'center'
        },
        xAxis: {
          type: 'category', // x轴类型为类目型
          data: this.dormitoryXdata, // 横坐标数据
          axisLabel: {
            interval: 0, // 强制显示所有标签
            rotate: 45 // 旋转标签，避免重叠
          }
        },
        yAxis: {
          type: 'value', // y轴类型为数值型
          name: '人数', // y轴名称
          splitLine: {
            show: false // 取消横向的网格线
          }
        },
        series: [
          {
            type: 'bar', // 形状为柱状图
            data: this.dormitoryYdata, // 数据
            itemStyle: {
              color: '#33BEFF' // 设置柱子的颜色
            },
            label: {
              show: true, // 显示数据标签
              position: 'top' // 标签显示在顶部
            }
          }
        ]
      }

      const myChart = echarts.init(document.getElementById('mychart2'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    initEcharts_time() {
    // 基本柱状图
      const option = {
        title: {
          text: '每日报道人数',
          left: 'center'
        },
        xAxis: {
          type: 'category', // x轴类型为类目型
          data: this.timeXdata, // 横坐标数据
          axisLabel: {
            interval: 0, // 强制显示所有标签
            rotate: 45, // 旋转标签，避免重叠
            textStyle: {
              fontSize: 8 // 设置字体大小
            }
          }
        },
        yAxis: {
          type: 'value', // y轴类型为数值型
          name: '', // y轴名称
          splitLine: {
            show: false // 取消横向的网格线
          }
        },
        grid: {
          top: '25%', // 调整上边距
          bottom: '20%', // 调整下边距
          left: '20%', // 调整左边距
          right: '10%' // 调整右边距
        },
        series: [
          {
            type: 'line',
            data: this.timeYdata, // 数据
            itemStyle: {
              color: '#33BEFF' // 设置柱子的颜色
            },
            label: {
              show: true, // 显示数据标签
              position: 'top' // 标签显示在顶部
            }
          }
        ]
      }

      const myChart = echarts.init(document.getElementById('mychart3'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    initEcharts_state() {
    // 基本柱状图
      const option = {
        title: {
          text: '报道阶段完成度',
          left: 'center'
        },
        grid: {
          top: '30%', // 调整上边距
          bottom: '20%', // 调整下边距
          left: '80%', // 调整左边距
          right: '20%' // 调整右边距
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle', // 默认是多边形，设置为 'circle' 是圆形雷达图
          indicator: [
            { name: '阶段1', max: this.stateYdata[3] },
            { name: '阶段2', max: this.stateYdata[3] },
            { name: '阶段3', max: this.stateYdata[3] }
          ],
          radius: '50%', // 设置雷达图的大小
          center: ['50%', '70%'] // 设置雷达图的位置
        },
        axisName: {
          color: '#000',
          fontSize: 14,
          fontWeight: 'bold'
        },
        series: [
          {
            name: '报道完成度',
            type: 'radar',
            data: [
              {
                value: [this.stateYdata[0], this.stateYdata[1], this.stateYdata[2]],
                name: '已完成人数'
              }
            ],
            areaStyle: {
              opacity: 0.1 // 设置区域填充透明度
            },
            itemStyle: {
              color: '#F9713C' // 设置雷达图数据点颜色
            },
            lineStyle: {
              color: '#F9713C' // 设置雷达图连线颜色
            }
          }
        ]
      }
      const myChart = echarts.init(document.getElementById('mychart4'))
      myChart.setOption(option)
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    initEcharts_pie1() {
      const data = {
        '已到人数': this.arrivedStu,
        '未到人数': this.totalStu - this.arrivedStu
      }

      const pieData = Object.keys(data).map(key => ({
        value: data[key],
        name: key
      }))

      const option = {
        title: {
          text: '已报到/未报到',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '报到情况',
            type: 'pie',
            center: ['50%', '60%'],
            radius: ['30%', '60%'], // 设置内外半径，形成环状
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
              color: '#000'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: pieData
          }
        ]
      }

      const myChart = echarts.init(document.getElementById('mychart5'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    initEcharts_pie2() {
      const data = {
        '已入住人数': this.bedTotal - this.bedLeft,
        '未入住人数': this.bedLeft
      }

      const pieData = Object.keys(data).map(key => ({
        value: data[key],
        name: key
      }))

      const option = {
        title: {
          text: '已入住/未入住',
          left: 'center'

        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '入住情况',
            type: 'pie',
            center: ['50%', '60%'], // 设置图表中心位置
            radius: ['30%', '60%'], // 设置内外半径，形成环状
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: false,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: pieData
          }
        ]
      }

      const myChart = echarts.init(document.getElementById('mychart6'))
      myChart.setOption(option)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    low_inst_data() {
      this.lowestArrivalRateInstitutes.sort((a, b) => a.arrival_rate - b.arrival_rate)
      console.info('最小', this.lowestArrivalRateInstitutes)
      this.low_inst = this.lowestArrivalRateInstitutes.map(item => item.Ins_name)
      this.low_rate = this.lowestArrivalRateInstitutes.map(item => item.arrival_rate.toFixed(3) * 100)
      console.info('最小', this.low_inst)
      console.info('最小', this.lowe_rate)
    },
    initChart_lowest() {
      const courses = this.lowestEnrollmentRateCourses

      // 对数据按选课率排序
      courses.sort((a, b) => b.enrollmentRate - a.enrollmentRate)

      // 准备图表数据
      const chartData = courses.map(course => ({
        value: course.enrollmentRate * 100, // 转换为百分比
        name: course.courseName
      }))

      const chart = echarts.init(document.getElementById('mychart7'))
      const option = {
        title: {
          text: '课程选课率',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}%' // 显示百分比
        },
        yAxis: {
          type: 'value',
          name: '选课率 (%)'
        },
        xAxis: {
          type: 'category',
          data: chartData.map(item => item.name),
          axisLabel: {
            interval: 0, // 强制显示所有标签
            rotate: 30, // 旋转标签，避免重叠
            textStyle: {
              fontSize: 8 // 设置字体大小
            }}
        },

        series: [
          {
            name: '选课率',
            type: 'bar',
            data: chartData,
            label: {
              show: true,
              position: 'insideRight',
              formatter: '{c}%' // 显示百分比
            },
            itemStyle: {
              color: '#33BEFF'
            }
          }
        ]
      }
      chart.setOption(option)

      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        chart.resize()
      })
    },
    getdata_dormitory(temp) {
      this.dormitoryXdata = temp.map(item => item.area_no)
      this.dormitoryYdata = temp.map(item => item['SUM(current_num_of_stu)'])
      console.info('xData:', this.dormitoryXdata)
      console.info('yData:', this.dormitoryYdata)
    },
    getdata_institute(temp) {
      this.instituteXdata = temp.map(item => item.Ins_name)
      this.instituteYdata = temp.map(item => item['num_of_arrived_stu'])
      console.info('xData:', this.instituteXdata)
      console.info('yData:', this.instituteYdata)
    },
    getdata_state(temp) {
      const processData = temp[0]
      console.info('temp:', processData)
      const keysOrder = ['sum(state1)', 'sum(state2)', 'sum(state3)', 'count(*)']
      this.stateXdata = ['阶段一人数', '阶段二人数', '阶段三人数', '总人数']
      this.stateYdata = keysOrder.map(key => processData[key])
      console.info('阶段xData:', this.stateXdata)
      console.info('阶段yData:', this.stateYdata)
    },
    getdata_time(temp) {
      console.info('日期', temp)
      this.timeXdata = temp.map(item => item.date_only)
      this.timeYdata = temp.map(item => item['COUNT(*)'])
      console.info('xData:', this.timeXdata)
      console.info('yData:', this.timeYdata)
    },
    getCityArr() {
      // 定义全国省份的数组
      return [
        [
          '上海',
          '河北',
          '山西',
          '内蒙古',
          '辽宁',
          '吉林',
          '黑龙江',
          '江苏',
          '浙江',
          '安徽',
          '福建',
          '江西',
          '山东',
          '河南',
          '湖北',
          '湖南',
          '广东',
          '广西',
          '海南',
          '四川',
          '贵州',
          '云南',
          '西藏',
          '陕西',
          '甘肃',
          '青海',
          '宁夏',
          '新疆',
          '北京',
          '天津',
          '重庆',
          '香港',
          '澳门',
          '台湾'
        ],
        [
          'shanghai',
          'hebei',
          'shanxi',
          'neimenggu',
          'liaoning',
          'jilin',
          'heilongjiang',
          'jiangsu',
          'zhejiang',
          'anhui',
          'fujian',
          'jiangxi',
          'shandong',
          'henan',
          'hubei',
          'hunan',
          'guangdong',
          'guangxi',
          'hainan',
          'sichuan',
          'guizhou',
          'yunnan',
          'xizang',
          'shanxi1',
          'gansu',
          'qinghai',
          'ningxia',
          'xinjiang',
          'beijing',
          'tianjin',
          'chongqing',
          'xianggang',
          'aomen',
          'taiwan'
        ]
      ]
    },

    processNativeSpaceData(nativeSpaceData) {
      return nativeSpaceData
        .filter(item => item.native_space) // 过滤掉没有 native_space 的项
        .map(item => ({
          comname2: item.native_space,
          num: item['count(*)']
        }))
    },

    chinaMapFun(cityName) {
      // 先处理数据 很重要
      let mapData = []
      if (this.totalMap != null) {
        for (let i = 0; i < this.totalMap.length; i++) {
          const obj = { name: '', value: 0 } // 数组里面是多个对象
          obj.name = this.totalMap[i].comname2 // names属性时数据所对应的地图区域的名称，例如 '广东'，'浙江';参考文章： https://echarts.apache.org/zh/option.html#series-map.data
          obj.value = this.totalMap[i].num // 该区域的数据值 number类型
          console.info('信息', obj.name)
          console.info('信息1', obj.value)
          mapData.push(obj)
        }
      }

      // 这里进行筛选传进来的省份数据 模拟黑龙江省份下面的和黑河市
      if (this.pyNameOfChinese) {
        mapData = mapData.map((item) => {
          if (item.children) {
            return { name: item.children.comname2, value: item.children.achieveRate, datas: [item.children.preium, item.children.target] }
          }
        })
      }
      console.log('当前渲染的地图:', this.pyName)
      console.log('当前渲染的数据2：', mapData)

      // 1，初始化节点
      // 检测是否已经存在echarts实例，如果不存在，则不再去初始化
      if (this.pyName === 'china') {
        this.myEchartsOfChina = echarts.init(document.getElementById('chinaMap'))
      } else {
        this.myEchartsOfChina = echarts.init(document.getElementById('provinceMap'))
      }

      // 显示加载动画
      this.myEchartsOfChina.showLoading()
      if (this.pyName === 'china') {
        const province = require('echarts/map/json/china.json')
        // 注册地图数据
        echarts.registerMap(this.pyName, province)
      } else {
        // 单独引入其他省份的地图  注意：registerMap方法的第一参数要和引入的省名相同
        const province = require('echarts/map/json/province/' + this.pyName + '.json')
        echarts.registerMap(this.pyName, province)
      }

      this.myEchartsOfChina.hideLoading()
      /* 参考文档： https://echarts.apache.org/zh/option.html#series-map */
      // 设置整个中国地图的参数
      const options = {

        tooltip: {
          enterable: true, // 允许点击触发tooltip中的事件
          show: true, // 是否显示提示框组件，包括提示框浮层和 axisPointer。 [ default: true ]
          trigger: 'item', // 触发类型。 [ default: 'item' ]
          triggerOn: 'mousemove', // 只有点击时才触发 不设置默认随鼠标移动并显示
          formatter: (array, returnData, callback) => {
            if (isNaN(array.value)) {
              if (this.cityArr.includes(array.name)) {
                return '人数: 暂无'
              } else {
                return '人数: 暂无' + '<br/>'
              }
            } else {
              const result =
                '<div style="display: flex"><div style="float:left;">人数: ' +
                array.value
              return result
            }
          },
          backgroundColor: 'rgba(50,50,50,0.7)', // tooltip 背景颜色 rgba
          // 文本设置
          textStyle: {
            color: 'rgb(255,255,255)', // 值域文字颜色
            fontSize: 12
          }
        },

        backgroundColor: '#f0f2f5', // 图表背景色

        series: [
          {
            name: '省份',
            type: 'map', // 指定是地图类型
            map: this.pyName, // 和上面registerMap中的第一个参数值一致才可以正常加载地图
            zoom: 1.2,
            roam: false, // 是否开启平游或缩放
            selectedMode: 'single', // 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
            itemStyle: {
              areaColor: '#33BEFF',
              borderColor: '#0f0f0f',
              normal: { label: { show: true }, areaColor: '#33BEFF' },
              emphasis: { label: { show: true }, areaColor: '#0458EC' }
            },
            emphasis: {
              // 强调的样式，也就是鼠标移入后的样式==高亮状态下的多边形和标签样式。
              itemStyle: {
                areaColor: '#0458EC'
              }
            },
            label: {
              normal: {
                show: true, // 是否显示标签，这里显示的就是省份的名字。默认就是false
                textStyle: {
                  fontWeight: 300,
                  color: '#000000', // 值域文字颜色
                  fontSize: 10 // 文字的字体大 小
                }
              },
              emphasis: {
                show: false // 在鼠标移入时，是否显示，如果不写，默认是显示的
              }
            },
            data: mapData // 各省地图数据导入
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表
      const myChart = echarts.init(document.getElementById('chinaMap'))
      myChart.setOption(options)
      // 随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })

      if (this.pyName === 'china') {
        this.myEchartsOfChina.setOption(options)
      } else {
        this.myEchartsOfChina.setOption(options1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main_container {
  background-size: cover;
  display: flex;
  height: 100%; /* 视口高度，减去头部和hr的高度 */
  width: 100%;
  justify-content: space-between;
}
.container_left, .container_mid, .container_right {
  display: flex;
  flex-direction: column;
  flex: 1; /* 使三个容器平均分配宽度 */
  justify-content: center;
}
.text_left, .text_right {
  width: 100%;
  display: flex;
  flex: 1; /* 使三个容器平均分配宽度 */
  justify-content: center;
  border: 2px solid #000;
  padding: 5px;
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-align: center; /* 文字居中 */
  align-items: center; /* 垂直居中 */
  font-size: medium;

}
.text_mid {
  width: 100%;
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  flex: 1; /* 使三个容器平均分配宽度 */
  justify-content: center;
  border: 2px solid #000;
  padding: 5px;
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-align: center; /* 文字居中 */
  align-items: center; /* 垂直居中 */
  font-size: medium;
}
.pie1{
  padding:5px;
  display: flex;
  flex: 1;
  margin-right:5px;
}
.pie2{
  padding:5px;
  display: flex;
  flex: 1;
  margin-left:5px;
}
.m1{
  display: flex;
  padding:5px;
  width: 100%;
  height: 33%;
  flex:1;
}
.m2{
  display: flex;
  padding:5px;
  width: 50%;
  height: 100%;
  flex: 1;
}
.m3{
  display: flex;
  padding:5px;
  width: 50%;
  height: 100%;
  flex:1;
}
.map_container{
  padding: 5px;
  display: flex;
  height: 60%;
  width: 100%;
  flex:5;
  justify-content: center;
}
.china {
  border:2px solid #000;
  display: flex;
  flex-direction: column;
  flex:1;
  align-items: center;
  width: 100%;
  height: 100%;
  #chinaMap, #provinceMap {
    flex:1;
    display:  flex;
    width: 100%;
    height: 100%;
  }
}
.container_pie{
  padding: 5px;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 20%;
  flex:3;
}

.text_container {
  margin: 5px;
  padding:10px ;
  display: flex;
  flex:1;
  width: 100%;
  width: 100%;
  border: 2px solid #000;
  justify-content: flex-start;
  flex-direction: column;
  white-space: nowrap; /* 防止换行 */
  align-items: center; /* 垂直居中 */
}
.text_3{
  padding: 5px;
  display: flex;
  flex:1;
  flex-direction: row;
  width: 100%;
  height: 33%;
}

.m7{
  display: flex;
  flex:1;
  width: 100%;
  padding:5px;
  height: 33%
}
.container_text_out{
  display: flex;
  flex:1;
  width: 100%;
  height: 20%;
}
.title_text_out{
  justify-content: center;
  display: flex;
  flex:2;
  width: 100%;
  height: 20%;
}
.titletext{
  justify-content: center;
  display: flex;
  margin: 5px;
  width: 100%;
  padding: 5px;
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-align: center; /* 文字居中 */
  align-items: center; /* 垂直居中 */
  font-size: 5vh;
  font-Weight: 2px;
}
.responsive-text {
  font-size: calc(1.5vw + 1.5vh); /* 根据视口宽度和高度计算字体大小 */
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏溢出的内容 */
  text-align: center; /* 文字居中 */
}

.app-main {
  background: #f0f2f5;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .w-200 {
    width: 200px;
  }

  .main_acontainer {
    padding: 5px;
    margin: 5px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    height: calc(100vh - 50px - 35px - 40px);
    display: flex;
    flex-direction: row;

    .filter-container {
      padding-bottom: 10px;

      .filter-item {
        display: inline-flex;
        vertical-align: middle;
        margin-bottom: 10px;

        +.filter-item {
          margin-left: 10px;
        }
      }
    }

    .table-container {
      width: 100%;
    }

    .el-input-number--small {
      width: 180px;
    }

    .form-container {
      width: 100%;
      height: calc(100vh - 50px - 35px - 80px);
      display: flex;
      flex-direction: column;

      .form-container-header {
        height: 40px;
        line-height: 40px;
        background: #ffffff;
      }

      .form-container-body {
        flex: 1;
        overflow: auto;
      }
      .form-container-footer {
        height: 40px;
        line-height: 40px;
        background: #ffffff;
      }
    }
  }}
  .container_23{
   display: flex;
   flex-direction: row;
   flex:1;
  }
</style>

