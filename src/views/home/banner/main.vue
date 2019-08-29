
<template>
    <div class="banner">
        banner 组件
        <span>{{bannerData.data}}</span>
    </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'banner',
  created: async function () {
    // mapAction将this.getBanner(params)映射为this.$store.dispatch('getBanner', params)
    await this.getBanner({ param: 'test' })
  },
  computed: {
    ...mapGetters({ bannerData: 'getBanner' })
  },
  methods: {
    ...mapActions(['getBanner'])
  }
}
</script>
<style lang="scss" scoped>
    .banner {

    }
</style>
