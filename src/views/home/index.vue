<template>
  <div class="home">
    <h1>home page</h1>
    <loading></loading>
    <Banner></Banner>
    <VideoComp></VideoComp>
  </div>
</template>

<script>
import Banner from './banner'
import VideoComp from './video'
export default {
  components: {
    Banner,
    VideoComp
  },

  mounted: function () {
    console.log(this)
    this.$toast({
      content: 'toast plugin'
    })
  }
}
</script>
