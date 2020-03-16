<template>
  <div id="scene">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>个人技能</el-breadcrumb-item>
    </el-breadcrumb>
    <section>
      <h3>技能 | Skill</h3>
      <el-divider></el-divider>
      <div id="skillContainer">
        <p v-for="(item, index) in skillInfos" :key="index" v-html="item"></p>
      </div>
      <div id="tagContainer">
        <el-tag
          v-for="tag in tags"
          :key="tag.name"
          :closable="isEdit"
          :type="tag.tagType"
          @close="deleteTag(tag)"
          >{{ tag.name }}</el-tag
        >
        <div v-show="isEdit" style="display:flex; aligin-items: center">
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="addTag"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >+ New Tag</el-button
          >
        </div>
      </div>
      <edit-component>
        <template v-slot:before>
          <span class="el-icon-s-fold">工具</span>
        </template>
        <template v-slot:after>
          <a href="#" @click="edit"><i class="el-icon-edit"></i></a>
          <a href="#"><i class="el-icon-finished"></i></a>
          <a href="#"><i class="el-icon-refresh-left"></i></a>
        </template>
      </edit-component>
    </section>
  </div>
</template>

<script>
// 导入编辑按钮组件
import editComponent from '../tools/edit.vue'

export default {
  components: {
    editComponent
  },
  data() {
    return {
      // 技能对象
      skillInfos: [
        '<div class="marker"></div>熟悉<em class="test">HTML5 与 CSS3</em>，可以完成网页的建构，具有<strong>像素级</strong>还原设计稿的能力，<strong>了解盒子模型、transition与弹性布局等重要概念</strong>',
        '<div class="marker" ></div>熟悉<em>ES</em>, 可以完成视图数据层的书写维护，<strong>了解原型链，回调函数，作用域闭包等重要概念以及ES6的新特性</strong>',
        '<div class="marker" ></div>熟悉<em>Cesium三维框架</em>，并完成多个项目，<strong>熟悉3DTiles规范，geometry绘制等</strong>',
        '<div class="marker" ></div>熟悉<em>Vue框架</em>，并有使用Vue全家桶在相关项目踩坑(发现问题)以及脱坑(解决问题)的经验,<strong></strong>理解重要概念如生命钩子函数，响应式原理，props等</strong>',
        '<div class="marker" ></div>了解<em>nodeJS</em>，并有分别使用node，Express，Electron，Egg完成项目的经验',
        '<div class="marker" ></div>了解<em>Mongodb与PostgreSQL</em>数据库,理解数据库原理，能够熟练使用nodeJS与mongodb数据库进行增删查改等操作，有相关项目经验',
        '<div class="marker" ></div>了解<em>HTTP</em>基本原理，理解DNS,cookie,session等重要概念，熟悉<Strong>http报文</Strong>的结构与重要字段的含义',
        '<div class="marker" ></div>严格遵守<em>ESLint</em>代码书写规范'
      ],
      // 标签对象
      tags: [],
      // 是否处于编辑状态
      isEdit: false,
      // 是否要添加新标签
      inputVisible: false,
      // 添加的新标签的值
      inputValue: ''
    }
  },
  created() {
    // 获取技能信息
    this.getSkillInfo()
  },
  methods: {
    // 删除指定标签
    deleteTag(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1)
    },
    // 获取技能信息，暂时只支持标签
    async getSkillInfo() {
      const { data: res } = await this.$http.get('/users/getTags')
      if (res.status !== 200) {
        this.$message({
          type: 'warning',
          message: '获取技能信息失败'
        })
      } else {
        this.tags = res.docs[0].tags
      }
    },
    // 编辑事件
    edit() {
      this.isEdit = true
    },
    // 显示添加标签的输入窗口
    showInput() {
      this.inputVisible = true
    },
    // 添加标签
    addTag() {
      this.tags.push({
        name: this.inputValue,
        tagType: 'success'
      })
      this.inputVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
#scene {
  section {
    width: 75%;
    height: 500px;
    margin: 0 auto;

    h3 {
      text-align: center;
    }

    #skillContainer {
      column-count: 2;
    }

    #tagContainer {
      display: flex;
      justify-content: space-around;
      flex-flow: wrap;
      width: 50%;
      margin: 30px auto;

      span {
        margin: 4px;
      }
    }
  }
}
</style>

<style>
/** FIXME:因为v-html中标签无法识别，所以需要另外开一个style，不能放于scoped */
/** FIXME: 另外v-html中无法识别模板标签 */
em {
  color: #e6a23c;
}
strong {
  color: #f56c6c;
}
.marker {
  width: 10px;
  height: 10px;
  border: 1px solid #088;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: 0.5;
  display: inline-block;
  margin-right: 5px;
}
</style>
