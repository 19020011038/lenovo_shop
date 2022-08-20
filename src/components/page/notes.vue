<template>
  <el-container>
    <el-header style="margin-top: 5px; margin-bottom: 50px; text-align: center; background-color: #c2e7b0">


      <el-row :gutter="20">
        <el-col :span="16"><div class="grid-content bg-purple"  style="margin-left: 500px;">帖子</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">
          <el-button type="primary" plain style="margin-left: 90px" @click="addVis=!addVis">发表帖子</el-button>
        </div></el-col>
      </el-row>
    </el-header>


    <el-row v-for="cla in notes_list" align="center">

      <el-container>

        <el-container>

          <el-aside width="200px" style="background-color: #e1f3d8">标题：{{cla.subject}}</el-aside>
          <el-container>
            <el-main>{{cla.message}}</el-main>
            <el-footer style="background-color: #e1f3d8">发帖时间：{{cla.post_time}}</el-footer>
          </el-container>
        </el-container>
      </el-container>

      <br><br>
    </el-row>
    <br><br>

      <!-- 弹出添加框 -->
      <el-dialog title="发表评论" :visible.sync="addVis" width="30%">
        <el-form ref="form" :model="form" :rules="rules" label-width="95px">
          <el-form-item label="主题" ><el-input v-model="form.subject"></el-input></el-form-item>
<!--          <el-form-item label="市" prop="address2"><el-input v-model="form.city"></el-input></el-form-item>-->
<!--          <el-form-item label="区域" prop="address2"><el-input v-model="form.district"></el-input></el-form-item>-->
<!--          <el-form-item label="详细地址" prop="address2"><el-input v-model="form.address"></el-input></el-form-item>-->
<!--          <el-form-item label="收件人" prop="reseP"><el-input v-model="form.signer_name"></el-input></el-form-item>-->
          <el-form-item label="内容" ><el-input v-model="form.message"></el-input></el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
                    <el-button @click="addVis = false">取 消</el-button>
                    <el-button @click="resetForm('form')">重 置</el-button>
                    <el-button type="primary" @click="add_note()">确 定</el-button>
                </span>
      </el-dialog>


  </el-container>


</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";

export default {
  name: "notes",
  data() {
    return {
      //数组
      arr2: [{
        title: '星期一'
      }, {
        title: '星期二'
      }, {
        title: '星期三'
      }],
      form: {
        id:'1',
        subject:'',
        message:'',
        message_id:'123213213213123',
        read_num:'0',
      },
      index_show_list:[],
      notes_list:[],
      addVis:false,


    };
  },

  created() {
    this.getnotes();
  },
  methods:{
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    add_note(){
      console.log(this.form.id);
      console.log(this.form.subject);
      console.log(this.form.message);
      console.log(this.form.read_num);
      axios.post(url_path+"note/",{
        id: this.form.id,
        subject:this.form.subject,
        message:this.form.message,
        read_num:this.form.read_num,
        message_id:this.form.message_id,
      }).then(res=>{
        if(res.status===201)
          this.$alert('添加成功！', '', {
            confirmButtonText: '确定',
          });
        // location.reload();
        this.$router.go(0)
      }).catch(error=>{
        console.log(error)
        this.$alert('添加失败！', '', {
          confirmButtonText: '确定',
        });
      })
    },
    getnotes()
    {
      const notes = [];
      axios.get(url_path + 'note/').then(res => {
        console.log(res);
        for (let i = 0; i < res.data.results.length; i++) {
          notes.push({"id":res.data.results[i].id, "message_id":res.data.results[i].message_id, "subject":res.data.results[i].subject, "message":res.data.results[i].message, "post_time":res.data.results[i].post_time,"read_num":res.data.results[i].read_num})
        }
        this.notes_list = notes;
      }).catch(err => {
        this.$alert('获取评论失败，请检查网络！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
    }

  }
}
</script>

<style>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
