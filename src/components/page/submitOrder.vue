<template>
    <div style="width: 40%;margin-left: 30%">
      <!-- 订单确认窗口 -->
      <p style="width:100%;background:#2db7f5; line-height:50px; font-size:18px; text-align:center;color:#fff"><b>您的订单详情</b></p>
      <div id="box1" >
<!--        <p>商品名称：32</p>-->
        <p>订单编号：{{order[0].order_sn}}</p>
        <p>支付金额：<font color="red">{{order[0].order_mount}}</font>元</p>
<!--        <p>购买数量：<font color="red">1</font></p>-->
        <p>联系信息：{{order[0].signer_mobile}}</p>
        <p>联系人：{{order[0].signer_name}}</p>
<!--        <p>状态：未付款</p>-->
        <p>支付方式：
          <el-select v-model="payWay" slot="prepend" placeholder="请选择支付方式">
            <el-option label="支付宝" value="1"></el-option>
<!--            <el-option label="微信" value="2"></el-option>-->
          </el-select>
        </p>
        <div class="paybtn" id="d1">
          <button class="btn1" name="submit" type="submit" @click="pay_money()">
            立即付款
          </button>
        </div>
        <div style="clear:both"></div>
      </div>
    </div>
</template>

<script>
    import axios from "axios";
    import url_path from "../../../config/url_path";

    export default {
      name: "submitOrder",
      data() {
        return {
          orders_id:'',
          order:[],
          payWay: '1',
        }
      },
      created() {
        if (this.$route.query.orders_id == null) {
          this.$router.push('/helloHome');
        }
        this.orders_id = this.$route.query.orders_id;

        this.getdate();
      },
      methods: {
        pay_money(){
          //console.log(this.order[0].alipay_url)
           window.location.href = this.order[0].alipay_url;
        },

        getdate() {
          const order_list = [];
          axios.get(url_path + 'orders/' + this.orders_id + "/").then(res => {
            console.log(res)
            this.order.push({
              "id": res.data.id,
              "pay_status": res.data.pay_status,
              "trade_no": res.data.trade_no,
              "order_sn": res.data.order_sn,
              "pay_time": res.data.pay_time,
              "alipay_url": res.data.alipay_url,
              "pay_script": res.data.pay_script,
              "order_mount": res.data.order_mount,
              "address": res.data.address,
              "signer_name": res.data.signer_name,
              "signer_mobile": res.data.signer_mobile,
            });
          }).catch(err => {
            this.$alert('获取失败，请检查网络！', '', {
              confirmButtonText: '确定',
            });
            console.log(err);
          })
        },

      }
    }
</script>

<style scoped>
  #box1 {
    background: #fff;
    padding: 20px;
  }
  #box1 p {
    font-size: 16px;
    font-family: 'Microsoft YaHei';
    text-align: left;
  }

  .btn1 {
    float: left;
    height: 40px;
    width: 230px;
    background: #ff771a;
    text-align: center !important;
    line-height: 40px;
    border-radius: 3px;
    font-size: 14px;
    font-weight:bold;
    margin-right: auto;
    margin-top: 20px;
    margin-left: 25px;
    color: #fff;
    border:none;
    cursor:pointer;
  }

</style>
