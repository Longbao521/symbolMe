<template>
  <div id="scene">
    <mavon-editor
      v-model="content"
      ref="md"
      @change="change"
      style="min-height: 600px"
    />
    <el-button type="primary" @click="submit" id="submit">提交</el-button>
    <el-dialog title="提示" :visible.sync="uploadBlogVisible" width="50%">
      <header>
        标题：
        <el-input placeholder="请输入标题" v-model="title"> </el-input>
      </header>
      <section>
        <div id="tagDiv">
          标签:
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
        <el-input
          class="input-new-tag"
          v-if="tagInputVisible"
          v-model="tagInputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput"
          >+ New Tag</el-button
        >
      </section>
      <el-input
        type="textarea"
        placeholder="请输入博客简要描述"
        v-model="textarea"
        maxlength="30"
        show-word-limit
        id="simpleInfo"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadBlogVisible = false">取 消</el-button>
        <el-button type="primary" v-btn-control="uploadBlog" :loading="isLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入markdown工具样式
import 'mavon-editor/dist/css/index.css'
import { mavonEditor } from 'mavon-editor'

export default {
  // 注册
  components: {
    mavonEditor
  },
  data() {
    return {
      content: '', // 输入的markdown
      html: '', // 及时转的html
      uploadBlogVisible: false,
      // 动态创建的博客标签
      dynamicTags: ['html5', 'css3', 'ECMAScript6'],
      // 标签输入框的现实与否
      tagInputVisible: false,
      // 标签输入框的值
      tagInputValue: '',
      // 博客的标题
      title: '',
      // 博客的简要描述
      textarea: '',
      // 是否在等待请求
      isLoading: false
    }
  },
  methods: {
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render
    },
    // 提交
    submit() {
      this.uploadBlogVisible = true
    },
    // 显示输入框
    showInput() {
      this.tagInputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 删除某标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    // 添加某标签
    handleInputConfirm() {
      const tagInputValue = this.tagInputValue
      if (tagInputValue) {
        this.dynamicTags.push(tagInputValue)
      }
      this.tagInputVisible = false
      this.tagInputValue = ''
    },
    // 将博客保存到数据库中
    async uploadBlog() {
      this.isLoading = true
      const { data: res } = await this.$http.post('/users/blog', {
        title: this.title, // FIXME:后期优化为一个对象
        tags: this.dynamicTags,
        html: this.html,
        description: this.textarea
      })
      if (res.status !== 200) {
        this.$message({
          type: 'warning',
          message: '入库失败'
        })
      } else {
        this.uploadBlogVisible = false
        this.$message({
          type: 'success',
          message: '入库成功'
        })
      }
      this.isLoading = false
      return new Promise((resolve, reject) => {
        resolve('请求结束')
      })
    }
  },
  mounted() {}
}
</script>

<style lang="less" scoped>
#scene {
  overflow: hidden;
  margin: 0px auto;
  display: flex;
  flex-flow: column;
  height: 100%;

  .markdown-body {
    flex: 13;
    height: 200px;
    padding-bottom: 30px;
    box-sizing: border-box;
    margin: 10px;
  }
  #submit {
    flex: 1;
    width: 100px;
    box-sizing: border-box;
    padding-top: 10px;
    margin: 0px 86% 5px;
  }
  .el-dialog__wrapper {
    overflow: hidden;
  }
}
.el-dialog__wrapper /deep/ .el-dialog__body {
  /** 需要在父节点后加/deep/ 才能修改子节点的样式，或者不在scoped中更改，选择在全局更改*/
  display: flex;
  flex-flow: column;
}
header {
  margin: 5px 10px;
}
section {
  margin: 5px 10px;
  display: flex;
}
.el-dialog__wrapper /deep/ .el-input {
  width: 160px;
}

</style>

<style>
#simpleInfo {
  width:82%;
  margin: 5px auto;
}
</style>
