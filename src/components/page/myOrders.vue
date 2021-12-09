<template>
  <div>
    <!--表头-->
    <div class="title" style="width: 80%;margin-left: 10%;">
      <h3>我的订单</h3>
      <el-table
        ref="multipleTable"
        @row-click="goOrder"
        :span-method="objectSpanMethod"
        :data="order_lists.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;">
        <el-table-column label="订单号" prop="name" align="center">
          <template slot-scope="scope">
            {{scope.row.order_sn}}
          </template>
        </el-table-column>
        <el-table-column label="订单金额" prop="name" align="center">
          <template slot-scope="scope">
            <span>&yen;</span>{{scope.row.order_mount}}
          </template>
        </el-table-column>


        <el-table-column label="订单留言" prop="name" align="center">
          <template slot-scope="scope">
            <span></span>{{scope.row.pay_script}}
          </template>
        </el-table-column>


        <!--        上下架状态-->
        <el-table-column label="状态"  prop="prize" width="110px" align="center">
          <template slot-scope="scope">
            <el-tag :type="orderStatus(scope.row.pay_status)">{{scope.row.pay_status=="False"?"未支付":"已支付"}}</el-tag>
          </template>
        </el-table-column>

        <!--        商品数量-->
<!--        <el-table-column label="数量"  prop="prize" width="110px" align="center">-->
<!--          <template slot-scope="scope">-->
<!--            <span>&yen;</span>{{scope.row.order_mount}}-->
<!--          </template>-->
<!--        </el-table-column>-->

      </el-table>
    </div>
    <div style="width: 80%;margin-left: 10%;">

    </div>
  </div>
</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";
  export default {
    name: "myOrders",
    data()
    {
      return{
        order_lists:[],
        tableData: [{
          name: '华为P40 Pro',
          price:5988.00,
          status:"1",
          img:"http://05imgmini.eastday.com/mobile/20200507/20200507135939_9e1683aae3ee6fe14f853d422cdc32be_2.jpeg",
          nums:1
        },{
          name: '华为P40 Pro',
          price:5988.00,
          status:"1",
          img:"http://05imgmini.eastday.com/mobile/20200507/20200507135939_9e1683aae3ee6fe14f853d422cdc32be_2.jpeg",
          nums:1
        }, {
          name: 'iPhone 11 Pro Max',
          price:6338.90,
          status:"2",
          img:"https://img12.360buyimg.com/n1/jfs/t1/68636/31/9824/169738/5d780ed7E97e88252/7b62380330636738.jpg",
          nums:2
        }, {
          name: 'iPhone 11 Pro Max',
          price:6338.90,
          status:"2",
          img:"https://img12.360buyimg.com/n1/jfs/t1/68636/31/9824/169738/5d780ed7E97e88252/7b62380330636738.jpg",
          nums:2
        }],
        search : '',
      }
    },
    created() {
      this.getdate();
    },
    methods:{
      getdate() {
        const order_lists = []
        axios.get(url_path + 'orders/').then(res => {
          //console.log(res)
          for (let i = 0; i < res.data.results.length; i++) {
            order_lists.push({
              "id": res.data.results[i].id,
              "pay_status": res.data.results[i].pay_status,
              "trade_no": res.data.results[i].trade_no,
              "order_sn": res.data.results[i].order_sn,
              "pay_time": res.data.results[i].pay_time,
              "alipay_url": res.data.results[i].alipay_url,
              "pay_script": res.data.results[i].pay_script,
              "order_mount": res.data.results[i].order_mount,
              "address": res.data.results[i].address,
              "signer_name": res.data.results[i].signer_name,
              "signer_mobile": res.data.results[i].signer_mobile,
            });
          }
          this.order_lists = order_lists

        }).catch(err => {
          this.$alert('获取失败，请检查网络！', '', {
            confirmButtonText: '确定',
          });
          console.log(err);
        })
      },

      orderStatus(status)
      {
        if(status=="False")
          return "warning";
        else if(status=="True")
          return "success";
      },
      goOrder(row, column, event)
      {
        this.$router.push({
          path:'/submitOrder',
          query:{
            orders_id:row.id
          }
        });
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {

      },
    }
  }
</script>

<style scoped>
  .title{
    margin-top: 50px;
  }
  .title h3{
    /*float: left;*/
    font-size: 23px;
    color: #c91623;
  }
</style>
