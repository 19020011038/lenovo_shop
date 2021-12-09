<template>
  <div style="height: 100%;">
    <!--    地址-->
    <div style="width: 90%;margin-left: 10%;margin-top: 50px;">
      <h1 style="font-size: 23px;color: #c91623;">收货地址管理</h1>

      <div style="width: 23%;float: left;margin-left: 20px;margin-bottom: 10px;"
           v-for="(item, index) in address_lists"@click="setFirst(item)">
        <!--          地址卡片-->
        <el-card class="box-card">
          <div slot="header" class="clearfix" >
            <span>{{item.isFirst==1?"默认地址":"备用地址"}}</span>


            <!--              删除按钮-->
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="remove_address(item.id)">
              删除地址
            </el-button>
            <!--              选中标志-->
            <el-button style="float: right; padding: 3px 0"
                       type="success" icon="el-icon-check"
                       v-show="item.isFirst==1?true:false">
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
<!--      添加按钮  -->




      <button class="addbtn2" @click="addVis=!addVis">
        添加
      </button>
<!--      <div class="addbtn"-->
<!--           :style="seen==0?'background: #00a854;':'background: #4D6530;'"-->
<!--           @mouseenter="enter()"-->
<!--           @mouseleave="leave()"-->
<!--            @click="addVis=!addVis">-->
<!--        <div style="background: black;width: 8%;height: 35%;margin-left: 46%;margin-top: 18%;border-radius: 5px;">-->

<!--        </div>-->
<!--        <div style="background: black;width: 70%;height: 8%;margin-left: 15%;margin-top: -5%;border-radius: 5px;">-->

<!--        </div>-->
<!--        <div style="background: black;width: 8%;height: 35%;margin-left: 46%;margin-top: -5%;border-radius: 5px;">-->

<!--        </div>-->

<!--      </div>-->


    </div>

    <!-- 弹出添加框 -->
    <el-dialog title="添加地址" :visible.sync="addVis" width="30%">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px">
        <el-form-item label="省" prop="address2" ><el-input v-model="form.province"></el-input></el-form-item>
        <el-form-item label="市" prop="address2"><el-input v-model="form.city"></el-input></el-form-item>
        <el-form-item label="区域" prop="address2"><el-input v-model="form.district"></el-input></el-form-item>
        <el-form-item label="详细地址" prop="address2"><el-input v-model="form.address"></el-input></el-form-item>
        <el-form-item label="收件人" prop="reseP"><el-input v-model="form.signer_name"></el-input></el-form-item>
        <el-form-item label="联系电话" prop="tel"><el-input v-model="form.signer_mobile"></el-input></el-form-item>
<!--          <div class="block">-->
<!--            <span class="demonstration"></span>-->
<!--            <el-cascader-->
<!--              placeholder="地址"-->
<!--              v-model="form.address"-->
<!--              :options="options"-->
<!--              filterable></el-cascader>-->
<!--          </div>-->
      </el-form>

      <span slot="footer" class="dialog-footer">
                <el-button @click="addVis = false">取 消</el-button>
                <el-button @click="resetForm('form')">重 置</el-button>
                <el-button type="primary" @click="add_address()">确 定</el-button>
            </span>
    </el-dialog>

  </div>
</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";
    export default {
        name: "addressMag",
      data()
      {
        return {
          seen: 0,
          addVis: false,
          form: {
            province:'',
            city:'',
            disrtict:'',
            address:'',
            signer_name:'',
            signer_mobile:'',
          },
          address_lists:[],
          //数据
          userAddress: [{
            name: '光头强',
            tel: '17654236555',
            loc: "山东省烟台市白云区关东升街道",
            loc2: "黑土大学",
            isFirst: 1
          }, {
            name: '泡泡',
            tel: '16548965754',
            loc: "青范省富华市白云区关东升街道",
            loc2: "黑土大学",
            isFirst: 2
          }, {
            name: '泡泡',
            tel: '16548965754',
            loc: "青范省富华市白云区关东升街道",
            loc2: "黑土大学",
            isFirst: 2
          }],
          //验证规则
          rules: {
            reseP: [
              { required: true, message: '请输入收件人', trigger: 'blur' },
              { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
            tel: [
              { required: true, message: '请输入联系电话', trigger: 'blur' },
              { min: 11, max: 11, message: '', trigger: 'blur' }
            ],
            address: [
              { required: true, message: '请输入地址', trigger: 'blur' },
              { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
            ],
            address2: [
              { required: true, message: '请输入详细地址', trigger: 'blur' },
              { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
            ]
          },
          //地址选择
          options: [{
            value: 'sd',
            label: '山东',
            children: [{
              value: 'yt',
              label: '烟台',
            },{
              value: 'qd',
              label: '青岛',
            },{
              value: 'wf',
              label: '潍坊',
            },{
              value: 'rz',
              label: '日照',
            }]
          },{
            value: 'sd',
            label: '山西',
            children: [{
              value: 'yt',
              label: '太原',
            }]
          },{
            value: 'sd',
            label: '湖南',
            children: [{
              value: 'yt',
              label: '岳阳',
            }]
          },{
            value: 'sd',
            label: '湖北',
            children: [{
              value: 'yt',
              label: '武汉',
            }]
          },{
            value: 'sd',
            label: '安徽',
            children: [{
              value: 'yt',
              label: '徐州',
            }]
          },{
            value: 'sd',
            label: '河北',
            children: [{
              value: 'yt',
              label: '张家口',
            }]
          }]
        }},
      created() {
          this.getdate();
      },
      methods:{
          add_address(){
            axios.post(url_path+"address/",{
              province: this.form.province,
              city:this.form.city,
              district:this.form.district,
              address:this.form.address,
              signer_name:this.form.signer_name,
              signer_mobile:this.form.signer_mobile,
            }).then(res=>{
              if(res.status==201)
              this.$alert('添加成功！', '', {
                confirmButtonText: '确定',
              });
              // location.reload();
              this.$router.go(0)
            }).catch(error=>{
              this.$alert('添加失败！', '', {
                confirmButtonText: '确定',
              });
            })
          },
          remove_address(id)
          {
            axios.delete(url_path+"address/"+id+"/").then(res=>{
              this.$alert('删除成功！', '', {
                confirmButtonText: '确定',
              });
              // location.reload();
              this.$router.go(0)
            }).catch(error=>{
              this.$alert('删除地址失败！', '', {
                confirmButtonText: '确定',
              });
              console.log(error);
            })

          },

          getdate()
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
          const length = this.userAddress.length;
          for (let i = 0; i < length; i++) {
            this.userAddress[i].isFirst = 2;
          }
          this.userAddress[index].isFirst = 1;
        },enter(){
          this.seen = 1;
        },
        leave(){
          this.seen = 0;
        },
        // 保存添加
        saveAdd(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$message.success('添加成功');
              this.addVis = false;
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }
    }
</script>

<style scoped>
.addbtn{
  /*background: cyan;*/
  width: 80px;
  /*background: #00a854;*/
  /*background: #4D6530;*/
  height: 80px;
  text-align: center;
  float: left;
  border-radius: 100px;
  margin-left: 20px;
}
.addbtn2{
    height: 100px;
    margin-left: 30px;
    width: 100px;
    background-color: #428bca;
    border-color: #357ebd;
    color: #fff;
    -moz-border-radius: 15px;
    -webkit-border-radius: 15px;
    text-align: center;
    vertical-align: middle;
    font-weight: 900;
    font-size:125%
  }
</style>
