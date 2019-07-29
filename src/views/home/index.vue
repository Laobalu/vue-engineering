<template>
  <div class="home">
    <h1>This is an home page</h1>
    <loading></loading>
    <Banner></Banner>
    <Video></Video>
  </div>
</template>

<script>
import Banner from './banner'
import Video from './video'
export default {
  components: {
    Banner,
    Video
  },

  mounted: function () {
    console.log(this)
    this.$toast({
      content: 'toast plugin'
    })
  }
}
</script>
