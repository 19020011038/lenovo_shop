<template >
  <div style="">
    <div class="goodsBox">
      <div class="goodsBox-img">
        <el-image
          style="position: absolute;width: 500px; height: 600px;left: 0px;border-radius: 14px;"
          :src="goods_front_image"
          :preview-src-list="srcList">
        </el-image>
        <div class="wrap"><span class="ribbon6" style="color:#000;"><span style="color: #F2F8FE">{{tag_text}}</span></span></div>
<!--        <div class="goodsBox-store">-->
<!--          <p>{{ shop_name }}</p>-->
<!--          <el-rate-->
<!--            v-model="value"-->
<!--            disabled-->
<!--            show-score-->
<!--            text-color="#ff9900"-->
<!--            score-template="{value}">-->
<!--          </el-rate>-->
<!--        </div>-->
        <div class="goodsBox-btn">
         <br><br>
          <h1>{{name}}</h1><br>
          <p>{{goods_brief}}</p><br><br><br><br><br>
          <h2><span style="color: #777777">售价&ensp;</span><span style="color: #e4393c;font-family: simsun">&yen;<span></span>{{price}}</span></h2>
          <br><br>
          <h4 style="position: relative;left: -35%;"><span style="color: #777777">库存&ensp;</span><span style="color: #4D6530;font-family: simsun"><span></span>{{goods_num}}</span></h4>
          <el-input-number size="large" v-model="num" :min="1" :max="goods_num" @change="handleChange" label="商品数量"></el-input-number>
          <el-button size="medium" type="danger" @click="add1">加入购物车</el-button>
          <el-button size="medium" type="warning" @click="add2">收藏</el-button>
          <p style="color: #777777">{{ ship_free_text }}</p>
          <p style="color: #777777">产品上线时间： {{ add_time }}</p>
        </div>
      </div>
    </div>
    <div style="padding-top: 20px;position: center;padding-left: 100px;padding-right: 100px">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card shadow="hover">
            点击量： {{click_num}}
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            销售量：{{sold_num}}
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card shadow="hover">
            收藏量：{{fav_num}}
          </el-card>
        </el-col>
      </el-row>
    </div>

<!--    猜你喜欢-->
<!--    <div class="goodsLikes" id="goodsLikes" style="text-align: center;">-->
<!--      <hr />-->
<!--      <h1 style="color: #777777">猜你喜欢</h1>-->
<!--      <div style="margin-left: 23%">-->
<!--        <div class="card" v-for="(item, index) in goodsLikesList" :key="item.id" v-on:mouseenter="showDialog(index)" v-on:mouseleave="hideDialog(index)">-->
<!--          <div class="ribbon">-->
<!--            &lt;!&ndash;鼠标移入移出事件&ndash;&gt;-->
<!--            <div class="handleDialog" v-if="ishow && index==current">-->
<!--              <p style="margin-left:5%;margin-top: 60%;">华为P30</p>-->
<!--              <el-button type="success" style="margin-left:5%;" size="medium" @click="goGoodsDesc(item.id)">查看详情</el-button>-->
<!--            </div>-->
<!--            <img :src="item.img" style="height: 100%;width: 100%">-->
<!--            <h2><span style="color: #e4393c;font-family: simsun">&yen;{{money}}</span></h2>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--&lt;!&ndash;      <div style="float: left;width: 23%;height: 1px;"></div>&ndash;&gt;-->
<!--      <br><br>-->
<!--    </div>-->

<!--    详情图片-->
    <div class="goodsDescImg" id="goodsDescImg" style="text-align: center;margin-top: 50px">
      <hr />
      <h1 style="color: #777777">商品详情</h1><br><br><br>
      <img :src="detail_image" style="height: 85%;width: 75%">
    </div>
  </div>


</template>

<script>
    import axios from "axios";
    import url_path from "../../../config/url_path";


    export default {
        name: "goodsDesc",
        data() {
          return {
            name:'联想小新',
            goods_brief:'这是一款笔记本',
            price:123.00,
            goods_num:10,
            goods_front_image:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1296012258,3994659249&fm=26&gp=0.jpg',
            detail_image:'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1296012258,3994659249&fm=26&gp=0.jpg',
            ship_free:true,
            goods_sn:0,
            click_num:0,
            sold_num:0,
            fav_num:0,
            goods_desc:'',  //富文本,没有考虑如何使用
            add_time: new Date().toLocaleDateString(),
            is_new:true,
            is_hot:true,
            //分类

            ship_free_text:'该商品由用户承担运费',
            tag_text:'热销中', //右上角的图案中的文字



            num: 1,


            //隐形窗口
            ishow: false,
            current: 0,

            //按钮点击限制
            add1_can_press : true,
            add2_can_press : true,
            err_can_press : true,

            //商品详情
            // imgUrl: 'https://img13.360buyimg.com/n1/jfs/t1/127138/40/16031/89209/5f918b53E19746496/f0f235be5150056f.jpg',
            srcList: [
              'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1296012258,3994659249&fm=26&gp=0.jpg',
            ],
            // goodsLikesList:[
            //   {id:1,name:"Iphone XS Max", img:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1296012258,3994659249&fm=26&gp=0.jpg",prize:"10.00",desc:"苹果官方旗舰店"},
            //   {id:2,name:"Iphone XS Max", img:"https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=373013405,916647179&fm=11&gp=0.jpg",prize:"10.00",desc:"苹果官方旗舰店"},
            //   {id:3,name:"Iphone XS Max", img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460157289,154459426&fm=26&gp=0.jpg",prize:"10.00",desc:"苹果官方旗舰店"},
            //   {id:4,name:"Iphone XS Max", img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460157289,154459426&fm=26&gp=0.jpg",prize:"10.00",desc:"苹果官方旗舰店"},
            //   {id:5,name:"Iphone XS Max", img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3460157289,154459426&fm=26&gp=0.jpg",prize:"10.00",desc:"苹果官方旗舰店"},
            // ]
          };
        },
        created() {
          if (this.$route.query.goods==null) {
            this.$router.push('/helloHome');
          }
          this.goodsId = this.$route.query.goods;
          this.getdate();
        },

        methods: {
          //数据更新
          getdate() {
            axios.get(url_path + '/goods/' + this.goodsId + '/').then(res => {
              this.name = res.data.name;
              this.goods_brief = res.data.goods_brief;
              this.price = res.data.price;
              this.goods_num = res.data.goods_num;
              this.goods_front_image = res.data.goods_front_image;
              this.detail_image = res.data.detail_image;
              this.ship_free = res.data.ship_free;
              if(this.ship_free)
                this.ship_free_text = '该商品由用户承担运费'
              else
                this.ship_free_text = '该商品由商家承担运费'
              this.click_num = res.data.click_num;
              this.sold_num = res.data.sold_num;
              this.fav_num = res.data.fav_num;
              this.add_time = res.data.add_time;
              this.is_new = res.data.is_new;
              this.is_hot = res.data.is_hot;
              if (this.is_hot)
                this.tag_text = '热销中'
              else if(this.is_new)
                this.tag_text = '新品上市'
              else
                this.tag_text = '等你来抢'
              const list_temp = [];
              list_temp.push(this.goods_front_image)
              this.srcList = list_temp
            }).catch(err => {
              this.$alert('获取失败，请检查网络！', '', {
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
          handleChange(value) {
            this.money = value * this.prize;
            console.log(value);
          },
          //显示操作项
          showDialog(index, item) {
            this.ishow = true;
            this.current = index;
          },
          //隐藏蒙层
          hideDialog(index, item) {
            this.ishow = false;
            this.current = null;
          },
          //添加购物车
          add1() {
            if(this.add1_can_press==true)
            {
              this.$notify({
                title: '添加购物车',
                message: '商品已添加到你的购物车',
                type: 'success'
              });
              this.add1_can_press = false;
              setTimeout(()=>{
                this.add1_can_press = true;
              },2000)
            }else if(this.err_can_press==true){
              this.$notify.error({
                title: '错误',
                message: '请求过于频繁，2秒后重试'
              });
              this.err_can_press = false;
              setTimeout(()=>{
                this.err_can_press = true;
              },1000)
            }
          },
          //添加收藏
          add2() {
            if(this.add2_can_press==true)
            {
              this.$notify({
                title: '收藏',
                message: '收藏成功',
                type: 'success'
              });
              this.add2_can_press = false;
              setTimeout(()=>{
                this.add2_can_press = true;
              },2000)
            }else if(this.err_can_press==true){
              this.$notify.error({
                title: '错误',
                message: '请求过于频繁，2秒后重试'
              });
              this.err_can_press = false;
              setTimeout(()=>{
                this.err_can_press = true;
              },1000)
            }

          },
        }

    }
</script>

<style scoped>
  .goodsBox {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    background: #F2F8FE;
    position: relative;
    width:1400px;
    height: 800px;
    margin: 0 auto;
    text-align: center;
  }

  .goodsBox-img {
    position: absolute;
    top: 5%;
    left: 15%;
    width: 75%;
    height: 75%;
    background-color: #e1f3d8;
    border-radius: 15px;
     text-align: center;
     vertical-align: middle;
  }
  .goodsBox-btn {
    position: absolute;
    top: 15%;
    left: 55%;
    width: 40%;
    height: 20%;
    /*background-color: #409E1F;*/
     text-align: center;
     vertical-align: middle;
  }
  .goodsBox-store {
    position: absolute;
    top: 5%;
    left: 45%;
    width: 30%;
    height: 20%;
    /*background-color: #409E1F;*/
     text-align: center;
     vertical-align: middle;
  }

  /**
  卡片
   */

  .card{
    height: 170px;
    width: 170px;
    margin-left: 30px;
    margin-top: 30px;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 4px;
    float: left;
  }
  .card img {
    width: 100%;
    height: 100%;
  }
  .card span {
    font-size: 15px;
    color: #BFBFBF;
    display: block;
    letter-spacing: 2px;
    /*padding: 0px 20px;*/
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
丝带
 */

  .ribbon {
    display: inline-block;
    width: 100%;
    height: 100%;
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
    background-color: #dd6161;
  }
</style>
