<template>
  <div>


    <!--头部-->
    <div style="width: 80%;margin-left: 20%;">
      <span>

<!--        <h1>哈喽商城</h1>-->
        <!--        <h1>购物车</h1>-->
      </span>
    </div>

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

    <br><br>

    <!--表头-->
    <div class="title" style="width: 80%;margin-left: 10%;">
      <!--      -->
      <!--      <h3>购物车</h3>-->

      <el-table
        ref="multipleTable"
        :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        @selection-change="handleSelectionChange"
        style="width: 100%;">
        <!--        多选框-->
        <el-table-column align="center" type="selection" width="55"></el-table-column>
        <!--        商品图片-->
        <el-table-column label="商品" prop="img" width="110px" align="center">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px;" :src="scope.row.img"/>
          </template>
        </el-table-column>
        <!--        商品名字-->
        <el-table-column label="商品名" prop="name" align="center"></el-table-column>
        <!--        商品单价-->
        <el-table-column label="单价" prop="prize" width="110px" align="center">
          <template slot-scope="scope">
            <span>&yen;</span>{{ scope.row.price }}
          </template>
        </el-table-column>
        <!--        商品数量-->

        <el-table-column label="数量" prop="num" width="140px" align="center">
          <template slot-scope="scope">
            <span></span>{{ scope.row.nums }}
          </template>
        </el-table-column>
        <!--        商品小计-->
        <el-table-column label="小计" prop="allPrize" width="110px" align="center">
          <template slot-scope="scope">
            <span>&yen;</span>{{ (parseFloat(scope.row.price) * parseFloat(scope.row.nums)).toFixed(2) }}
          </template>
        </el-table-column>
        <!--        操作-->
        <el-table-column align="right">
          <template slot="header" slot-scope="scope">
            <el-input v-model="search" size="mini" placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <!--            <el-button size="mini" :disabled="scope.row.status==1?true:false" type="warning" @click="handleEdit(scope.$index, scope.row)">移到收藏</el-button>-->
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.goods_id)">移出购物车</el-button>
            <el-button size="mini" type="success" @click="handleJiesuan(scope.row)">结算</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="width: 80%;margin-left: 10%;">

      <!--描述：商品结算开始-->
      <div class="balance">
        <ul class="balance_ul1">
          <el-button type="danger" size="medium" class="button1" plain @click="delete_select()">删除选中商品</el-button>
          <!--          <el-button type="danger" size="medium" class="button1" plain>清除下架商品</el-button>-->
          <!--          <el-button type="warning" size="medium" class="button1" plain>移到我的收藏</el-button>-->
          <el-button type="success" size="medium" class="button1" plain @click="jiesuan_select()">结算选中商品</el-button>
          <span class="balance_ul2">
              <span>共<span class="spanText">{{ changeNumPri(1) }}</span>件商品</span>
              <span>总价<span class="spanText">&yen;{{ changeNumPri(2) }}</span></span>
              <span @click="jiesuan_all()">
                <router-link >
                  <el-button>全部结算</el-button>
                </router-link>
              </span>
          </span>
        </ul>
      </div>
      <!--描述：商品结算结束-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";


export default {
  name: "carts",
  data() {
    return {
      order_id:'',
      // address_lists:[{"province": ' 山东',
      //   "city":'青岛',
      //   "district":'市南区',
      //   "address":'中国海洋大学',
      //   "signer_name":'sbyyx',
      //   "signer_mobile":'12391293123',}],
      address_lists:[],
      choose_num:0,
      tableData:[],
      // tableData: [{
      //   name: '华为P40 Pro',
      //   price: 5988.00,
      //   img: "http://05imgmini.eastday.com/mobile/20200507/20200507135939_9e1683aae3ee6fe14f853d422cdc32be_2.jpeg",
      //   nums: 1,
      //   goods_id:'1',
      // }, {
      //   name: 'iPhone 11 Pro Max',
      //   price: 6338.90,
      //   img: "https://img12.360buyimg.com/n1/jfs/t1/68636/31/9824/169738/5d780ed7E97e88252/7b62380330636738.jpg",
      //   nums: 2,
      //   goods_id:1,
      // },
      //   {
      //     name: 'iPhone 11 Pro Max',
      //     price: 6338.90,
      //     img: "https://img12.360buyimg.com/n1/jfs/t1/68636/31/9824/169738/5d780ed7E97e88252/7b62380330636738.jpg",
      //     nums: 2,
      //     goods_id:1,
      //   },
      //   {
      //     name: '123123',
      //     price: 6338.90,
      //     img: "https://img12.360buyimg.com/n1/jfs/t1/68636/31/9824/169738/5d780ed7E97e88252/7b62380330636738.jpg",
      //     nums: 2,
      //     goods_id:1,
      //   },],
      search: '',
      //选中列表
      multipleSelection: [],
      chooseList: [],
    }
  },
  created() {
    this.getdate();
    this.getAddress();

  },
  methods: {
    getAddress()
    {
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
    handleDelete(goods_id) {

      axios.delete(url_path + 'shopcarts/' + goods_id + '/').then(res => {
        this.$router.go(0)
      }).catch(error => {
        this.$alert('移除购物车失败！', '', {
          confirmButtonText: '确定',
        });
        console.log(error);
      })
    },

    delete_select(){
      let flag = true;
      for(let i = 0; i < this.multipleSelection.length; i ++ )
      {
        if(!flag)break;
        axios.delete(url_path + 'shopcarts/' + this.multipleSelection[i].goods_id + '/').then(res => {

        }).catch(error => {
          flag = false;
        })
      }

      if(flag){
        this.$alert('移除购物车成功！', '', {
          confirmButtonText: '确定',
        });
      }else{
        this.$alert('移除购物车失败！', '', {
          confirmButtonText: '确定',
        });
      }

    },

    post_order(pay_script, order_mount){
      //提交订单
      let address = this.address_lists[this.choose_num].province + this.address_lists[this.choose_num].city
        + this.address_lists[this.choose_num].district + this.address_lists[this.choose_num].address;

      let signer_name = this.address_lists[this.choose_num].signer_name;
      let signer_mobile = this.address_lists[this.choose_num].signer_mobile;


      axios.post(url_path+'orders/', {
        pay_script:pay_script,
        order_mount: order_mount,
        address: address,
        signer_name: signer_name,
        signer_mobile:signer_mobile,
        buy_only:false,
      }).then(res=>{
        if(res.status === 201)
        {
          console.log(res.data)
          this.order_id = res.data.id;
          this.$message('结算成功');
          console.log("1111111");
          console.log(this.order_id);

          this.goMakeSureOrder(this.order_id);
        }
      }).catch(error=>{
        this.$alert('提交订单失败！', '', {
          confirmButtonText: '确定',
        });
      })
    },

    //前往确认订单页
    goMakeSureOrder(order_id) {
      this.$router.push({
        path:'/makeSureOrder',
        query:{
          order_id:order_id
        }
      });
    },

    handleJiesuan(row){
      axios.put(url_path+'shopcarts/'+row.goods_id+'/', {goods_num:row.nums, goods:row.goods_id, is_choosen: false}).then(res => {
        if (res.status === 200){
          this.post_order('暂无留言', (parseFloat(row.nums) * parseFloat(row.price).toFixed(2)));
        }
      }).catch(err => {
        this.$alert('结算失败！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
    },

    jiesuan_select(){
      let flag = true;
      for(let i = 0; i < this.multipleSelection.length; i ++ )
      {
        axios.put(url_path+'shopcarts/'+this.multipleSelection[i].goods_id+'/', {goods_num:this.multipleSelection[i].nums, goods:this.multipleSelection[i].goods_id, is_choosen: false}).then(res => {
          if (res.status === 200){
            if(i === this.multipleSelection.length-1){
              if(flag){
                let mount = 0;
                for (let i = 0; i < this.multipleSelection.length; i ++ )
                {
                  mount = mount + (parseFloat(this.multipleSelection[i].price)*parseFloat(this.multipleSelection[i].nums)).toFixed(2)
                }
                this.post_order('暂无留言', mount);
              }
              else
              {
                this.$alert('结算失败！', '', {
                  confirmButtonText: '确定',
                });
                this.$router.go(0)
              }

            }
          }
        }).catch(err => {
          flag = false;

        })

      }


    },

    jiesuan_all(){
      let flag = true;
      for(let i = 0; i < this.tableData.length; i ++ )
      {
        axios.put(url_path+'shopcarts/'+this.tableData.goods_id+'/', {nums:this.tableData.nums, goods:this.tableData.goods_id, is_choosen: false}).then(res => {
          if (res.status === 200){

          }
        }).catch(err => {
          flag = false;
        })
      }
      if(flag){
        let mount = 0;
        for (let i = 0; i < this.tableData.length; i ++ )
        {
          mount = mount + (parseFloat(this.tableData[i].price)*parseFloat(this.tableData[i].nums)).toFixed(2)
        }
        this.post_order('暂无留言', mount);
      }
      else
      {
        this.$alert('结算失败！', '', {
          confirmButtonText: '确定',
        });
        this.$router.go(0)
      }
    },

    getdate() {
      axios.get(url_path + 'shopcarts/').then(res => {
        console.log(res);
        for (let i = 0; i < res.data.results.length; i++) {
          if(res.data.results[i].is_choosen)
          {
            this.tableData.push({
              name: res.data.results[i].goods.name,
              price: res.data.results[i].goods.price,
              img: res.data.results[i].goods.goods_front_image,
              nums: res.data.results[i].goods_num,
              goods_id: res.data.results[i].goods.id,
            })
          }
        }
      }).catch(err => {
        console.log(err);
        this.$alert('获取用户购物车内容失败！', '', {
          confirmButtonText: '确定',
        });
      })
    },
    changeNumPri(which) {
      const length = this.tableData.length;
      //总价
      //全部数量
      let allPricess = 0.0;
      let allNumss = 0;
      for (let i = 0; i < length; i++) {

        allPricess += this.tableData[i].nums * this.tableData[i].price;
        allNumss += this.tableData[i].nums;

      }
      if (which == '2') {
        return parseFloat(allPricess).toFixed(2);
      } else {
        return allNumss;
      }
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
}
</script>

<style scoped>
.title {
  margin-top: 50px;
}

.title h3 {
  /*float: left;*/
  font-size: 23px;
  color: #c91623;
}

/*商品结算*/
.balance {
  height: 50px;
  border: 1px solid gray;
  margin-top: 40px;
}

.balance li {
  float: left;
  line-height: 5px;
  margin-left: 22px;
}

.balance_ul2 {
  float: right;
  margin-right: 10px;
}

.balance_ul1 .button1 {
  margin-top: 5px;
}

.balance_ul2 .spanText {
  font-size: 25px;
  color: #C91623;
  font-weight: bold;
}

.balance_ul2 button {
  width: 100px;
  height: 50px;
  background-color: brown;
  border: 1px solid #c91623;
  font-weight: bold;
  font-size: 20px;
  color: white;
}

.balance_ul2 button:hover {
  background-color: #C91623;
}
</style>
