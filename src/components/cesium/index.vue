<template>
  <div id="cesium">
    <el-card
      class="cardEditor"
      v-drag="{
        setXY: setXY,
        getFlag: getFlag,
        setFlag: setFlag,
        setActive: setActive,
        setRedBorder: setRedBorder
      }"
      :class="{ active: isActive, redBorder: redBorder }"
    >
      <div slot="header" class="clearfix" @click.stop="">
        <span>编辑程序</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="runCode"
          >执行</el-button
        >
      </div>
      <code-editor @input="codeInput"></code-editor>
    </el-card>
  </div>
</template>

<script>
import * as Cesium from 'cesium/Cesium'
import '../../../node_modules/cesium/Build/Cesium/Widgets/widgets.css'
// 引入codeEditor组件
import codeEditor from './codeEditor.vue'
export default {
  components: {
    codeEditor
  },
  data() {
    return {
      x: '0',
      y: '0',
      flag: 0,
      isActive: false,
      redBorder: true,
      code: '',
      // cesium场景器
      viewer: null,
      Cesium: Cesium
    }
  },
  mounted() {
    this.initView()
  },
  methods: {
    initView() {
      const viewer = new Cesium.Viewer('cesium', {
        animation: false, // 是否创建动画小器件，左下角仪表
        baseLayerPicker: false, // 是否显示图层选择器
        fullscreenButton: false, // 是否显示全屏按钮
        geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
        homeButton: false, // 是否显示Home按钮
        infoBox: false, // 是否显示信息框
        sceneModePicker: false, // 是否显示3D/2D选择器
        selectionIndicator: false, // 是否显示选取指示器组件
        timeline: false, // 是否显示时间轴
        navigationHelpButton: false, // 是否显示右上角的帮助按钮
        scene3DOnly: true // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
      })
      this.viewer = viewer
    },
    setXY: function(x, y) {
      this.x = x
      this.y = y
    },
    getFlag: function() {
      return this.flag
    },
    setFlag: function(num) {
      this.flag = num
    },
    setActive: function(b) {
      this.isActive = b
    },
    setRedBorder: function(b) {
      this.redBorder = b
    },
    // 代码输入发生改变
    codeInput(code) {
      this.code = code
    },
    // 执行代码
    runCode() {
      // eslint-disable-next-line
      var viewer = this.viewer
      // eslint-disable-next-line
      var Cesium = this.Cesium
      try {
        // eslint-disable-next-line
        eval(this.code)
      } catch (err) {
        console.warn(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
#cesium {
  height: 100%;
  width: 100%;
  position: relative;

  .cardEditor {
    position: absolute;
    top: 3vh;
    left: 3vh;
    width: 50vh;
    height: 60vh;
    z-index: 999;
    background: rgba(237, 255, 255, 0.8);
  }
}
/deep/ .cesium-widget-credits {
  display: none !important;
  visibility: hide !important;
}
.active {
  border: 1px solid blue;
}
.redBorder {
  border: 1px solid red;
}
</style>
