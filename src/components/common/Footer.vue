<template>
  <center>
    <div >
      <div style="position: absolute;right: 7%;bottom: 10%;">

        <el-tooltip class="item" effect="dark" content="返回顶层" placement="left-start">

          <el-backtop target=".item"></el-backtop>
          <el-button size="medium" v-show="goTopShow" @click="goTop()" icon="el-icon-arrow-up" circle></el-button>
        </el-tooltip>
        <br><br>
        <el-tooltip class="item" effect="dark" content="刷新" placement="left-start">
          <el-button size="medium" @click="reloadPage()" icon="el-icon-refresh-right" circle></el-button>
        </el-tooltip>
        <br><br>
        <a href="https://qm.qq.com/cgi-bin/qm/qr?k=CTddbU_DMnCmWViKeNzQA6H-jDDERtvH&jump_from=webapi">
          <el-tooltip class="item" effect="dark" content="问题反馈QQ群" placement="left-start">
            <el-button size="medium"  @click="gokefu()" icon="el-icon-position" circle></el-button>
          </el-tooltip>
        </a>
      </div>
      <div class="footer" style="margin-top: 90px;margin-bottom: 0px">

        <hr />

        <div style="width: 100%">
          <!--静态html资源-->

          <div>
            <iframe src="../../../static/index.html" scrolling="no" frameborder="0" style="width: 100%;height: 600px;"></iframe>
          </div>
        </div>



      </div>
    </div>

  </center>
</template>

<script>
export default {
  data() {

    return {
      collapse: false,
      fullscreen: false,
      name: 'admin',
      message: 2,
      scrollTop: "",
      goTopShow: false,
    }
  },
  watch: {
    scrollTop(val) {
      this.goTopShow = this.scrollTop > 500;
    }
  },
  created() {

  },
  methods:{
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      }
    },
    //前往页面头部
    goTop() {
      let timer = null,_that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 250;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    },

    //刷新页面
    reloadPage() {
      location.reload();
    },

  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }

}
</script>
<style scoped>
.footer {
  width: 100%;
  height: 160px;
}
</style>
