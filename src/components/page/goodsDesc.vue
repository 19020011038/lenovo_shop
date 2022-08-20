<template >
  <div style="background-color: #e1f3d8">
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


          <el-button @click=buy() type="primary" style="margin-left: 16px;">
            购买
          </el-button>

          <el-drawer
            title="选择收货地址"
            :visible.sync="drawer"
            :direction="direction"
            :before-close="handleClose" style="height: 200%">

            <!--    地址-->
            <div style="width: 90%;margin-left: 10%;">
              <div style="width: 23%;float: left;margin-left: 20px;margin-bottom: 10px;"
                   v-for="(item, index) in address_lists"
                   @click="setFirst(index)">
                <!--          地址卡片-->
                <el-card class="box-card" :style="index==choose_num?'background: #F2F8FE':'background: #606266'">
                  <div slot="header" class="clearfix">


                    <!--              选中标志-->
                    <el-button style="float: right; padding: 3px 0"
                               type="success" icon="el-icon-check"
                               v-show="index==choose_num?true:false">
                    </el-button>
                    <!--              地址具体信息-->
                  </div>
                  <p>{{item.province}}</p>
                  <p>{{item.city}}</p>
                  <p>{{item.district}}</p>
                  <p>{{item.address}}</p>
                  <p>签收人：{{item.signer_name}}</p>
                  <p>联系方式:{{item.signer_mobile}}</p>
                </el-card>
              </div>
            </div>

            <el-button size="medium" @click="buy_sure">提交购买</el-button>
            <!--            <span>我来啦!</span>-->
          </el-drawer>

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

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin-left: 5%" >
      <el-tab-pane label="商品详情" name="first" >
        <div class="goodsDescImg" id="goodsDescImg" style="text-align: center;margin-top: 50px">
          <hr />
          <h1 style="color: #777777">商品详情</h1><br><br><br>
          <img :src="detail_image" style="height: 85%;width: 75%">
        </div>
      </el-tab-pane>
      <el-tab-pane label="配置详情" name="second">
        <div>
          <div class="title" style="width: 80%;margin-left: 10%;">
            <h3>配置信息</h3>
            <el-table
              :data="settings"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="配置名"
                width="600">
              </el-table-column>
              <el-table-column
                prop="info"
                label="配置信息"
                width="600">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>

    </el-tabs>





  </div>




</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";


export default {
  name: "goodsDesc",
  refresh_num: false,
  data() {
    return {
      activeName: 'second',
      name:'联想小新',
      goods_brief:'这是一款笔记本',
      price:123.00,
      goods_num:10,
      goods_front_image:'',
      detail_image:'',
      ship_free:true,
      goods_sn:0,
      click_num:0,
      sold_num:0,
      fav_num:0,
      goods_desc:'',  //富文本,没有考虑如何使用
      add_time: new Date().toLocaleDateString(),
      is_new:true,
      is_hot:true,
      goods_id:'0',
      //分类

      ship_free_text:'该商品由用户承担运费',
      tag_text:'热销中', //右上角的图案中的文字

      settings:[],
      choose_num:0,
      address_lists:[],

      num: 1,
      order_mount:0.0,

      drawer:false,
      direction:'ttb',

      order_id: 0,

      //隐形窗口
      ishow: false,
      current: 0,

      //按钮点击限制
      add1_can_press : true,
      add2_can_press : true,
      buy_can_press : true,
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
    this.getAddress();

  },

  methods: {
    //数据更新
    handleClick(tab, event) {
      console.log(tab, event);
    },
    buy_sure()
    {
      if(this.goods_num < this.num){
        this.$alert('购买数量不得大于库存！', '', {
          confirmButtonText: '确定',
        });
      }else{
        this.order_mount = this.num * this.price;

        if(this.ship_free==true)
        {
          this.order_mount = this.order_mount + 10;
        }

        //提交订单
        let address = this.address_lists[this.choose_num].province + this.address_lists[this.choose_num].city
          + this.address_lists[this.choose_num].district + this.address_lists[this.choose_num].address;

        let signer_name = this.address_lists[this.choose_num].signer_name;
        let signer_mobile = this.address_lists[this.choose_num].signer_mobile;

        axios.post(url_path+'orders/', {
          pay_script:"暂无留言",
          order_mount: this.order_mount,
          address: address,
          signer_name: signer_name,
          signer_mobile:signer_mobile,
          buy_only:true,
        }).then(res=>{
          if(res.status === 201)
          {
            this.order_id = res.data.id;


            axios.post(url_path+'order_goods/', {
              order:this.order_id,
              goods:this.goods_id,
              goods_num:this.num,
            }).then(res=>{
              if(res.status === 201)
              {
                //修改库存和购买量
                this.$message('结算成功');
                this.drawer=false;
                this.$router.push({
                  path:'/submitOrder',
                  query:{
                    orders_id:this.order_id,
                  }
                });
              }
            }).catch(error=>{
              this.$alert('提交订单商品失败！', '', {
                confirmButtonText: '确定',
              });
            });

          }
        }).catch(error=>{
          this.$alert('提交订单失败！', '', {
            confirmButtonText: '确定',
          });
        });


      }

    },
    getAddress(){
      const address_list = []
      axios.get(url_path +'address/').then(res=>{
        for (let i = 0; i< res.data.results.length;i++)
        {
          address_list.push({"id":res.data.results[i].id, "province":res.data.results[i].province,
            "city":res.data.results[i].city,"district":res.data.results[i].district,"address":res.data.results[i].address,
            "signer_name":res.data.results[i].signer_name,"signer_mobile":res.data.results[i].signer_mobile
          });
        }
        this.address_lists = address_list;

      }).catch(err => {
        this.$alert('获取失败，请检查网络！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
    },
    setFirst(index)
    {
      this.choose_num = index;

    },

    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {
        });
    },
    buy(){
      if(this.buy_can_press==true) {
        this.drawer=true;
      }
    },

    getdate() {
      axios.get(url_path + 'goods/' + this.goodsId + '/').then(res => {
        this.goods_id = res.data.id;
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
      });
      axios.get(url_path + 'settings/?goods_sn=' + this.goodsId ).then(res => {
        //console.log(res);
        const settings = [];
        for(let i = 0 ;i < res.data.results.length;i++)
        {
          settings.push({
            "id":res.data.results[i].id,
            "setting_id":res.data.results[i].setting_id,
            "name":res.data.results[i].name,
            "info":res.data.results[i].info,
            "goods_sn":res.data.results[i].goods_sn,
          })
        }
        this.settings = settings;
      }).catch(err => {
        this.$alert('获取失败，请检查网络！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      });

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
      console.log(this.num)
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
        if(this.num > this.goods_num){
          this.$alert('添加购物车数量不得大于库存', '', {
            confirmButtonText: '确定',
          });
        }else{
          axios.post(url_path+"shopcarts/",{
            goods:this.goods_id,
            goods_num:this.num,
          }).then(res=>{
            this.$notify({
              title: '购物车',
              message: '加入购物车成功',
              type: 'success'
            });
            this.add2_can_press = false;
            // setTimeout(()=>{
            //   this.add2_can_press = true;
            // },2000)
            this.$router.go(0)
          }).catch(error => {
            this.$alert('加入购物车失败！', '', {
              confirmButtonText: '确定',
            });
            console.log(error);
          });
        }
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

        axios.post(url_path+"userfavs/",{goods:this.goods_id}).then(res=>{
          this.$notify({
            title: '收藏',
            message: '收藏成功',
            type: 'success'
          });
          this.add2_can_press = false;
          // setTimeout(()=>{
          //   this.add2_can_press = true;
          // },2000)
          this.$router.go(0)
        }).catch(error => {
          this.$alert('收藏失败！', '', {
            confirmButtonText: '确定',
          });
          console.log(error);
        });


      }
      else if(this.err_can_press==true){
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
