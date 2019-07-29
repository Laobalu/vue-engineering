<template>
    <transition name="fade">
        <div class="toast-wrap" v-if="visible">
            <span>{{ content }}</span>
            <span class="close-btn" v-if="showCloseBtn" @click="close">X</span>
        </div>
    </transition>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'info' }, // 类型
    content: { type: String, required: true }, // 内容
    duration: { type: Number, default: 2000 }, // 过渡时间
    autoClose: { type: Boolean, default: true }, // 自动关闭
    showCloseBtn: { type: Boolean, default: true } // 显示关闭按钮
  },
  data: function () {
    return {
      visible: true,
      timer: null
    }
  },
  mounted: function () {
    // 挂载到某一节点上时，插入页面。
    document.body.appendChild(this.$el)
    this.autoClose && this.startTimer()
  },
  methods: {
    close: function () {
      this.visible = false
      this.$emit('toastClose')
    },
    startTimer: function () {
      this.timer = setTimeout(() => {
        if (this.visible) {
          this.close()
        }
      }, this.duration)
    }
  }
}
</script>

<style lang="scss" scoped>
.toast-wrap{
    background: #999;
    border-radius: 5px;
}
.close-btn{
    float: right;
}
</style>
