<template>
  <div class="header" style="background-color: #00d1b2">
    <!-- 前往主页按钮 -->
    <router-link to="/" style="color: #F2F8FE">

      <div class="logo" style="position: absolute;">
        <div class="collapse-btn">
          <i class="el-icon-s-home"></i>
        </div>
        <img style="width: 100px;height: 34px;margin-top: 15px;" src="../../assets/img/lenovo.jpg">
      </div>
<!--      <div class="logo"><img src="../../assets/img/logo.png"></div>-->

    </router-link>

    <div class="header-right">
      <div class="header-user-con">
<!--        &lt;!&ndash; 全屏显示 &ndash;&gt;-->
<!--        <div class="btn-fullscreen" @click="handleFullScreen">-->
<!--          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">-->
<!--            <i class="el-icon-rank"></i>-->
<!--          </el-tooltip>-->
<!--        </div>-->
        <!-- 贴吧 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" content="贴吧" placement="bottom">
            <router-link to="/notes">
              <i class="el-icon-s-comment"  style="color: #F2F8FE;"></i>
            </router-link>
          </el-tooltip>
        </div>
        <!-- 我的购物车 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" content="我的购物车" placement="bottom">
            <router-link to="/carts">
              <i class="el-icon-shopping-cart-2"  style="color: #F2F8FE;"></i>
            </router-link>
          </el-tooltip>
        </div>
        <!-- 我的收藏 -->
        <div class="btn-bell">
          <el-tooltip effect="dark" content="我的收藏" placement="bottom">
            <router-link to="/collection">
              <i class="el-icon-star-on" style="color: #F2F8FE;"></i>
            </router-link>
          </el-tooltip>
        </div>
<!--        &lt;!&ndash; 消息中心 &ndash;&gt;-->
<!--        <div class="btn-bell">-->
<!--          <el-tooltip-->
<!--            effect="dark"-->
<!--            :content="message?`有${message}条未读消息`:`消息中心`"-->
<!--            placement="bottom">-->
<!--            <i class="el-icon-bell" @click="drawer = true"></i>-->

<!--          </el-tooltip>-->
<!--          <span class="btn-bell-badge" v-if="message"></span>-->
<!--        </div>-->
        <!-- 用户头像 -->
        <el-row class="demo-avatar demo-basic">
          <el-col :span="12">
            <div class="demo-basic--circle">
              <div class="block"><el-avatar :size="25" :src="circleUrl"></el-avatar></div>
            </div>
          </el-col>
        </el-row>

        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">

            <router-link to="/myOrders" v-if="this.islogin=='True'"><el-dropdown-item>我的订单</el-dropdown-item> </router-link>
            <router-link to="/userInfo" v-if="this.islogin=='True'"><el-dropdown-item>我的信息</el-dropdown-item> </router-link>
            <router-link to="/addressMag" v-if="this.islogin=='True'"><el-dropdown-item>地址管理</el-dropdown-item> </router-link>
<!--            <a href="https://github.com/zengxiaochao/hello-mall"><el-dropdown-item>Git仓库</el-dropdown-item> </a>-->
            <el-dropdown-item divided command="loginout">{{this.islogin=='True'?"退出登录":"登录/注册"}}</el-dropdown-item>
<!--            <el-dropdown-item>退出登录</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-drawer
      title="我是标题"
      style="color:#000;"
      :visible.sync="drawer"
      :with-header="false">
      <el-card class="box-card" style="margin-top: 20px;text-align: center;">
        <div slot="header" class="clearfix">
          <span style="font-size: 22px;">订单已发货</span>
          <el-button style="float: right; padding: 3px 0" type="text">已读</el-button>
        </div>
        <span style="font-size: 18px;">您购买的【华为P30 Pro】卖家已在【2020-10-23 13:22】于【广东】发货</span>
      </el-card>

      <el-card class="box-card" style="margin-top: 20px;text-align: center;">
        <div slot="header" class="clearfix">
          <span style="font-size: 22px;">收藏已到货</span>
          <el-button style="float: right; padding: 3px 0" type="text">已读</el-button>
        </div>
        <span style="font-size: 18px;">您收藏的【iphone XS Max 256G】库存更新</span>
      </el-card>

    </el-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
        squareUrl: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
        sizeList: ["small"],
        collapse: false,
        fullscreen: false,
        name: '游客',
        islogin:'False',
        message: 2,
        drawer: false,
      };
    },

    computed: {
      username() {
        let username = localStorage.getItem('username');
        if(username)this.islogin='True';
        return username ? username : this.name;
      }
    },
    methods: {
      // 用户名下拉菜单选择事件
      handleCommand(command) {

        if (command == 'loginout') {
          localStorage.removeItem('username');
          localStorage.removeItem("token" );
          this.islogin = 'False';
          this.$router.push('/login');
        }
      },
      // 侧边栏折叠
      collapseChage() {
        this.collapse = !this.collapse;
        bus.$emit('collapse', this.collapse);
      },
      // 全屏事件
      handleFullScreen() {
        let element = document.documentElement;
        if (this.fullscreen) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (element.requestFullscreen) {
            element.requestFullscreen();
          } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.msRequestFullscreen) {
            // IE11
            element.msRequestFullscreen();
          }
        }
        this.fullscreen = !this.fullscreen;
      }
    },
    mounted() {
      if (document.body.clientWidth < 1500) {
        this.collapseChage();
      }
    }
  };
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #0000ff;
  }
  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
  }
  .header-right {
    float: right;
    padding-right: 50px;
  }
  .header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
  }
  .btn-bell,
  .btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
  .btn-bell .el-icon-bell {
    color: #fff;
  }
  .user-name {
    margin-left: 10px;
  }
  .user-avator {
    margin-left: 20px;
  }
  .user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .el-dropdown-link {
    color: #fff;
    cursor: pointer;
  }

</style>
