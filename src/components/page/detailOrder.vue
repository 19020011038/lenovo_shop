<template>
  <div>

    <!--表头-->
    <div class="title" style="width: 80%;margin-left: 10%;">
      <h3>订单详情</h3>
      <el-table
        ref="multipleTable"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%;">
        <!--        商品图片-->
        <el-table-column label="商品" prop="img" width="110px" align="center">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px;" :src="scope.row.img"/>
          </template>
        </el-table-column>
        <!--        商品名字-->
        <el-table-column label="商品名" prop="name" align="center"></el-table-column>
        <!--        商品单价-->
        <el-table-column label="单价"  prop="prize" width="110px" align="center">
          <template slot-scope="scope">
            <span>&yen;</span>{{scope.row.price}}
          </template>
        </el-table-column>
        <!--        商品数量-->
        <el-table-column label="数量"  prop="num" width="140px" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.nums}}</span>
          </template>
        </el-table-column>
        <!--        商品小计-->
        <el-table-column label="小计"  prop="allPrize" width="110px" align="center">
          <template slot-scope="scope">
            <span>&yen;</span>{{(parseFloat(scope.row.price)*parseFloat(scope.row.nums)).toFixed(2)}}
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>

</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";
export default {
  name: "detailOrder",
  data()
  {
    return{
      order_id:'',
      tableData:[],

      search : '',
      //选中列表
      multipleSelection : [],
    }
  },
  created() {
    if (this.$route.query.order_id == null) {
     // this.$router.push('/helloHome');
    }
    this.order_id = this.$route.query.order_id;
    console.log("?????");
    console.log(this.order_id);
    this.getdate();

  },
  methods:{

    getdate(){
      axios.get(url_path+'order_goods/?order_id='+this.order_id).then(res=>{
        console.log(res);
        for(let i = 0; i < res.data.results.length; i ++ )
        {
          this.tableData.push({"name":res.data.results[i].goods.name, "price":res.data.results[i].goods.price, "img":res.data.results[i].goods.goods_front_image, "nums":res.data.results[i].goods_num})
        }
      }).catch(err=>{
        this.$alert('获取当前订单失败，请检查网络！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
    },


    submit_order(){
      this.$router.push({
        path:'/submitOrder',
        query:{
          orders_id:this.order_id
        }
      });
    },

    changeNumPri(which)
    {
      const length = this.tableData.length;
      //总价
      //全部数量
      let allPricess = 0.0;
      let allNumss = 0;
      for (let i = 0; i < length; i++) {
        allPricess += parseFloat(this.tableData[i].nums)*parseFloat(this.tableData[i].price);
        allNumss += parseInt(this.tableData[i].nums);
      }
      if(which=='2'){
        return parseFloat(allPricess).toFixed(2);
      }else{
        return allNumss;
      }
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
/*商品结算*/
.balance{
  height: 50px;
  border: 1px solid gray;
  margin-top: 40px;
}
.balance li{
  float: left;
  line-height: 5px;
  margin-left: 22px;
}
.balance_ul2{
  float: right;
  margin-right: 10px;
}
.balance_ul1 .button1{
  margin-top: 5px;
}
.balance_ul2 .spanText{
  font-size: 25px;
  color: #C91623 ;
  font-weight: bold;
}
.balance_ul2 button{
  width: 100px;
  height: 50px;
  background-color: brown;
  border: 1px solid #c91623;
  font-weight: bold;
  font-size: 20px;
  color: white;
}
.balance_ul2 button:hover{
  background-color:#C91623 ;
}
</style>
