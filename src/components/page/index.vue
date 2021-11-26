<template>
  <div>


    <el-carousel :interval="4000" type="card" height="200px" style="background: #F2F8FE">
      <el-carousel-item v-for="item in imageList" :key="item.address">
        <img :src="item.address" @click="goGoodsDesc(item.id)">
      </el-carousel-item>
    </el-carousel>
    <br>
    <el-container>
      <div style="float: left;width: 25%;">
        <!--左边栏空白占位  -->
      </div>
<!--      <el-cascader-panel :options="options" style="width: 19%;background: #F2F8FE;"></el-cascader-panel>-->
      <div style="float: left;width: 50%;">
        <el-input placeholder="查询商品" v-model="selectd" class="input-with-select" size="1000px">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <p style="color: #BFBFBF;">
          <span>热门搜索：</span>
          <a href="">华为P40</a>
          <a href="">海尔空调</a>
          <a href="">海尔空调</a>
          <a href="">海尔空调</a>
          <a href="">海尔空调</a>
          <a href="">惠普打印机</a>
        </p>

      </div>
    </el-container>

    <br>
    <el-row v-for="cla in index_show_list">
      <h1>{{ cla.name }}</h1><br>
      <div style="float: left;width: 80%;">
        <div class="card"  v-for="(item, index) in cla.list" :key="item.goods_sn" v-on:mouseenter="showDialog(item.goods_sn)" v-on:mouseleave="hideDialog()">
          <div class="ribbon">
            <!--鼠标移入移出事件-->
            <div class="handleDialog" v-if="item.goods_sn === show_id">
              <el-button type="success" style="margin-left:25%;margin-top: 70%;" size="medium" @click="goGoodsDesc(item.goods_sn)">查看详情</el-button>
              <el-button type="warning" icon="el-icon-star-off" circle size="medium"></el-button>
            </div>
            <img :src="item.goods_front_image" style="height: 100%;width: 100%">
            <div class="wrap"><span class="ribbon6" style="color:#000;"><span style="color: #F2F8FE">双十一狂欢{{item.goods_sn}}号</span></span>
            </div>
          </div>
          <div style="text-align:center">
            <span>{{item.name}}</span>
            <span>&yen;{{item.price}}</span>
            <span>{{item.goods_brief}}</span>
          </div>
        </div>
      </div>
    </el-row>

    <div>
      <el-container >
        <div style="float: left;width: 10%;background-color: #DCDFE6;">
          <!--左边栏空白占位  -->
        </div>


        <div style="float: left;width: 10%;background-color: #DCDFE6;">
          <!--右边栏空白占位  -->
        </div>

      </el-container>
      <br>
<!--      <center>-->
<!--        <el-pagination-->
<!--          background-->
<!--          layout="prev, pager, next"-->
<!--          :total="1000">-->
<!--        </el-pagination>-->
<!--      </center>-->
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import url_path from "../../../config/url_path";

  export default {
      name: "index",
      data() {
        return {

          show_id:-1,
          ishow: false,
          current: 0,
          selectd: '',
          currentDate: new Date(),
          imageList:[
            {id:1,title:"test1", address:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2013319254,3446577563&fm=26&gp=0.jpg"},
            {id:2,title:"test2", address:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2013319254,3446577563&fm=26&gp=0.jpg"},
            {id:3,title:"test3", address:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2013319254,3446577563&fm=26&gp=0.jpg"},
            {id:4,title:"test4", address:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2013319254,3446577563&fm=26&gp=0.jpg"},
            {id:5,title:"test5", address:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2013319254,3446577563&fm=26&gp=0.jpg"},
            {id:6,title:"test6", address:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2013319254,3446577563&fm=26&gp=0.jpg"},
          ],

          goodsList:[
            {id:1,name:"华为 HUAWEI Mate 40 Pro", img:"https://img13.360buyimg.com/n1/jfs/t1/127138/40/16031/89209/5f918b53E19746496/f0f235be5150056f.jpg",prize:"5999.00",desc:"华为官方旗舰店"},
            {id:2,name:"荣耀Play4 Pro", img:"https://img13.360buyimg.com/n1/s450x450_jfs/t1/136135/36/11503/129859/5f769f36E0a120157/a7bddadf2b8ae6d8.jpg",prize:"2799.00 ",desc:"华为官方旗舰店"},
            {id:3,name:"联想（Lenovo）YOGA 14s", img:"https://img10.360buyimg.com/n1/jfs/t1/122621/1/15816/121959/5f8ee259E2d2178c6/017ac237a18d2346.jpg",prize:"5766.00",desc:"联想官方旗舰店"},
            {id:4,name:"Apple iPhone 11   128GB", img:"https://img12.360buyimg.com/n1/s450x450_jfs/t1/79668/22/9987/159271/5d780915Ebf9bf3f4/6a1b2703a9ed8737.jpg",prize:"5899.00",desc:"苹果官方旗舰店"},
            {id:5,name:"小米Redmi红米k30 至尊纪念版", img:"https://img10.360buyimg.com/n1/s450x450_jfs/t1/138769/33/11422/181706/5f8fabbfE9d52ee11/47b690dbf2d4b147.jpg",prize:"2118.00",desc:"小米旗舰店"},
            {id:6,name:"小米电视4A 70英寸", img:"https://img11.360buyimg.com/n1/jfs/t1/130034/39/4685/156952/5f119f0fEd0d7d957/1eabe76b0f15b0d8.jpg",prize:"3499.00",desc:"小米旗舰店"},
            {id:7,name:"小米手环5 NFC版", img:"https://img11.360buyimg.com/n1/s450x450_jfs/t1/142719/12/444/104550/5ee1988cEd952bf51/74860b136a001168.jpg",prize:"229.00",desc:"小米旗舰店"},
            {id:8,name:"赛睿 西伯利亚 200", img:"https://img11.360buyimg.com/n1/s450x450_jfs/t1/111775/32/11694/132419/5f029811Ed7c79c8b/77d6e3870531b71b.jpg",prize:"319.00",desc:"赛睿旗舰店"},
          ],

          // index_show_list:[
          //   {name:'hahaha', list:[
          //       {id:1,name:"华为 HUAWEI Mate 40 Pro", img:"https://img13.360buyimg.com/n1/jfs/t1/127138/40/16031/89209/5f918b53E19746496/f0f235be5150056f.jpg",prize:"5999.00",desc:"华为官方旗舰店"},
          //       {id:2,name:"荣耀Play4 Pro", img:"https://img13.360buyimg.com/n1/s450x450_jfs/t1/136135/36/11503/129859/5f769f36E0a120157/a7bddadf2b8ae6d8.jpg",prize:"2799.00 ",desc:"华为官方旗舰店"},
          //       {id:3,name:"联想（Lenovo）YOGA 14s", img:"https://img10.360buyimg.com/n1/jfs/t1/122621/1/15816/121959/5f8ee259E2d2178c6/017ac237a18d2346.jpg",prize:"5766.00",desc:"联想官方旗舰店"},
          //
          //     ]},
          //   {name:'xixixixiixix', list:[
          //
          //       {id:4,name:"Apple iPhone 11   128GB", img:"https://img12.360buyimg.com/n1/s450x450_jfs/t1/79668/22/9987/159271/5d780915Ebf9bf3f4/6a1b2703a9ed8737.jpg",prize:"5899.00",desc:"苹果官方旗舰店"},
          //
          //     ]},
          //   {name:'caocaocaocaocao', list:[
          //
          //       {id:5,name:"小米Redmi红米k30 至尊纪念版", img:"https://img10.360buyimg.com/n1/s450x450_jfs/t1/138769/33/11422/181706/5f8fabbfE9d52ee11/47b690dbf2d4b147.jpg",prize:"2118.00",desc:"小米旗舰店"},
          //       {id:6,name:"小米电视4A 70英寸", img:"https://img11.360buyimg.com/n1/jfs/t1/130034/39/4685/156952/5f119f0fEd0d7d957/1eabe76b0f15b0d8.jpg",prize:"3499.00",desc:"小米旗舰店"},
          //       {id:7,name:"小米手环5 NFC版", img:"https://img11.360buyimg.com/n1/s450x450_jfs/t1/142719/12/444/104550/5ee1988cEd952bf51/74860b136a001168.jpg",prize:"229.00",desc:"小米旗舰店"},
          //       {id:8,name:"赛睿 西伯利亚 200", img:"https://img11.360buyimg.com/n1/s450x450_jfs/t1/111775/32/11694/132419/5f029811Ed7c79c8b/77d6e3870531b71b.jpg",prize:"319.00",desc:"赛睿旗舰店"},
          //     ]},
          // ],
          index_show_list:[],

        };
      },

    created() {
      this.getdate();
    },

      methods:{
        getdate() {
          //获取轮播图片
          const carousel_list = [];
          axios.get(url_path + 'banner/').then(res => {
            for (let i = 0; i < res.data.results.length; i++) {
              carousel_list.push({"id":res.data.results[i].goods.goods_sn, "title":res.data.results[i].goods.name, "address":res.data.results[i].image})
            }
            this.imageList = carousel_list;
          }).catch(err => {
            this.$alert('获取失败，请检查网络！', '', {
              confirmButtonText: '确定',
            });
            console.log(err);
          })

          //获取分类
          const categories_list = [];
          axios.get(url_path + 'categories/').then(res => {
            for (let i = 0; i < res.data.results.length; i++) {
              categories_list.push({"name":res.data.results[i].name})
            }
            console.log(res)
          }).catch(err => {
            this.$alert('获取失败，请检查网络！', '', {
              confirmButtonText: '确定',
            });
            console.log(err);
          })

          //获取各个分类下的信息
          const index_show_list = [];
          for (let i = 0; i < categories_list.length; i++) {
            axios.get(url_path + 'goodsOfcatrgory/' + categories_list[i].name + '/').then(res => {
              let temp_list = [];
              for (let j = 0; j < res.data.results.length && j < 5; j++) {
                temp_list.push(res.data.results[j])
              }
              index_show_list.push({"name":categories_list[i].name, "list":temp_list});
            }).catch(err => {
              this.$alert('获取失败，请检查网络！', '', {
                confirmButtonText: '确定',
              });
              console.log(err);
            })
          }
          this.index_show_list = index_show_list;
          console.log(this.index_show_list);

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
