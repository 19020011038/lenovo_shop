<template>

  <el-container>
    <h1>搜索内容:{{this.search}}</h1>
    <div style="float: left;width: 80%;">
      <div class="card" v-for="(item, index) in tableData" :key="item.id" v-on:mouseenter="showDialog(item.goods_sn)"
           v-on:mouseleave="hideDialog()">
        <div class="ribbon">
          <!--鼠标移入移出事件-->
          <div class="handleDialog" v-if="item.goods_sn === show_id">
            <el-button type="success" style="margin-left:32%;margin-top: 70%;" size="medium"
                       @click="goGoodsDesc(item.goods_sn)">查看详情
            </el-button>
<!--            <el-button type="warning" icon="el-icon-star-off" circle size="medium"></el-button>-->
          </div>
          <img :src="item.goods_front_image" style="height: 100%;width: 100%">
          <div class="wrap"><span class="ribbon6" style="color:#000;"><span
            style="color: #F2F8FE">双十一狂欢{{ item.goods_sn }}号</span></span>
          </div>
        </div>
        <div style="text-align:center">
          <span>{{ item.name }}</span>
          <span>&yen;{{ item.price }}</span>
        </div>
      </div>
    </div>
  </el-container>
</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";

export default {
  name: "search",
  data() {
    return {
      show_id:-1,
      search:"",
      tableData:[],
    }
  },

  created() {
    if (this.$route.query.search == null) {
      this.$router.push('/helloHome');
    }
    this.search = this.$route.query.search;

    this.getdate();
  },

  methods: {
    getdate() {
      //获取分类下的信息
      let temp_list = [];

      axios.get(url_path + 'goods/' + "?search=" + this.search).then(res => {
        if(res.data.results.length == 0)
        {
          this.$alert('无搜索结果！', '', {
            confirmButtonText: '确定',
          });
        }
        else
        {
          for (let j = 0; j < res.data.results.length; j++) {
            // this.tableData.push(res.data.results[j])
            temp_list.push(res.data.results[j])
          }
          this.tableData=temp_list;
        }
      }).catch(err => {
        this.$alert('搜索商品失败，请检查网络！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
    },

    //前往商品详情页
    goGoodsDesc(goods) {
      this.$router.push({
        path:'/goodsDesc',
        query:{
          goods:goods
        }
      });
    },
    //显示操作项
    showDialog(show_id) {
      this.show_id = show_id;
    },
    //隐藏蒙层
    hideDialog() {
      this.show_id = -1;
    }

  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}
/**
隐藏页
*/
.handleDialog {
  position: absolute;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
}


/**
卡片
 */

.card{
  height: 350px;
  width: 266px;
  margin-left: 30px;
  margin-top: 30px;
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 4px;
  float: left;
}
.card img {
  width: 100%;
  height: 70%;
}
.card span {
  font-size: 15px;
  color: #BFBFBF;
  display: block;
  letter-spacing: 2px;
  /*padding: 0px 20px;*/
}
/**
丝带
 */

.ribbon {
  display: inline-block;
  width: 100%;
  height: 70%;
  position: relative;
  float: left;
  margin-bottom: 30px;
  background-size: cover;
  text-transform: uppercase;
  color: white;
}

.wrap {
  width: 100%;
  height: 188px;
  position: absolute;
  top: -8px;
  left: 8px;
  overflow: hidden;
}
.wrap:before {
  content: "";
  display: block;
  border-radius: 8px 8px 0px 0px;
  width: 40px;
  height: 8px;
  position: absolute;
  right: 100px;
  background: #4D6530;
}
.wrap:after {
  content: "";
  display: block;
  border-radius: 0px 8px 8px 0px;
  width: 8px;
  height: 40px;
  position: absolute;
  right: 0px;
  top: 100px;
  background: #4D6530;
}
.ribbon6 {
  display: inline-block;
  text-align: center;
  width: 200px;
  height: 40px;

  line-height: 40px;
  position: absolute;
  top: 30px;
  right: -50px;
  z-index: 2;
  overflow: hidden;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  border: 1px dashed;
  box-shadow: 0 0 0 3px #57DD43, 0px 21px 5px -18px rgba(0, 0, 0, 0.6);
  background: #57DD43;
}

</style>
