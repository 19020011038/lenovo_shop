<template>
  <div>
    <!--表头-->
    <div class="title" style="width: 80%;margin-left: 10%;">
      <h3>收藏</h3>
      <el-table
        ref="multipleTable"
        @row-click="goDesc"
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
        <!--        上下架状态-->
        <el-table-column label="操作"  prop="prize" width="110px" align="center">
          <template slot-scope="scope">
            <el-button type="warning" @click="remove_collection(scope.row.goods_id)">取消收藏</el-button>
          </template>
        </el-table-column>
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
  name: "collection",
  data()
  {
    return{
      // tableData: [{
      //   name: '华为P40 Pro',
      //   price:5988.00,
      //
      //   img:"http://05imgmini.eastday.com/mobile/20200507/20200507135939_9e1683aae3ee6fe14f853d422cdc32be_2.jpeg",
      //   nums:1
      // }, {
      //   name: 'iPhone 11 Pro Max',
      //   price:6338.90,
      //
      //   img:"https://img12.360buyimg.com/n1/jfs/t1/68636/31/9824/169738/5d780ed7E97e88252/7b62380330636738.jpg",
      //   nums:2
      // }],
      tableData:[],
      search : '',
    }
  },
  created() {
    this.getdate();
  },
  methods:{
    getdate(){
      axios.get(url_path + 'userfavs/').then(res => {
        console.log(res)
        for(let i = 0; i < res.data.results.length; i ++ )
        {
          this.tableData.push({name:res.data.results[i].goods.name, price:res.data.results[i].goods.price,
            img:res.data.results[i].goods.goods_front_image, goods_id:res.data.results[i].goods.id,
            goods_sn:res.data.results[i].goods.goods_sn})
        }
      }).catch(err => {
        this.$alert('获取用户收藏信息失败！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
    },

    goDesc(row, column, event)
    {
      this.$router.push({
        path:'/goodsDesc',
        query:{
          goods:this.tableData[row].goods_sn
        }
      });
    },

    remove_collection(goods_id){
      axios.delete(url_path + 'userfavs/' + goods_id+"/").then(res=>{
          this.$alert('删除成功！', '', {
            confirmButtonText: '确定',
          });
         // location.reload();
          this.$router.go(0)
      }).catch(error=>{
        this.$alert('取消收藏失败！', '', {
          confirmButtonText: '确定',
        });
        console.log(error);
      })
    }

  },

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
