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
        <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">{{tag.name}}</el-tag>
      </div>
    </section>
  </div>
</template>

<script>
export default {
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
      tags: [
        {
          name: 'HTML5',
          type: 'success'
        },
        {
          name: 'CSS3',
          type: 'success'
        },
        {
          name: 'LESS&SCSS',
          type: 'info'
        },
        {
          name: 'ECMAScript6',
          type: 'success'
        },
        {
          name: 'Vue全家桶',
          type: 'success'
        },
        {
          name: 'NodeJs',
          type: 'warning'
        },
        {
          name: 'Express',
          type: 'warning'
        },
        {
          name: 'Egg',
          type: 'danger'
        },
        {
          name: 'Electron',
          type: 'danger'
        },
        {
          name: 'MongoDB',
          type: 'success'
        },
        {
          name: 'PostGreSQL&PostGIS',
          type: 'danger'
        },
        {
          name: 'HTTP',
          type: 'success'
        },
        {
          name: 'Geoserver',
          type: 'success'
        },
        {
          name: 'ESLint',
          type: 'warning'
        }
      ]
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
