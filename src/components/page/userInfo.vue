<template>
  <div style="text-align: center;width: 20%;margin-left: 40%;margin-top: 30px;">

    <div>
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :disabled="editable">
        <img v-if="form.image" :src="form.image" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <br>


    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="账号">
        <el-input v-model="form.username" size="medium" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.name" size="medium" :disabled="editable"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio v-model="form.gender" label="male" :disabled="editable">男♂</el-radio>
        <el-radio v-model="form.gender" label="female" :disabled="editable">女♀</el-radio>
      </el-form-item>
      <el-form-item label="生日">
        <div class="block">
          <el-date-picker
            v-model="form.birthday"
            type="date"
            value-format="yyyy-MM-DD"
            placeholder="选择日期"
            :disabled="editable">
          </el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.mobile" size="medium" :disabled="editable"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-show="!editable">提交修改</el-button>
        <el-button type="primary" @click="editabled" v-show="editable">修改个人信息</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import url_path from "../../../config/url_path";


export default {
  name: "userInfo",
  data() {
    return {
      editable:true,
      imageUrl: '',
      form: {
        username:localStorage.getItem("username"),
        name:localStorage.getItem("name"),
        gender:localStorage.getItem("gender"),
        birthday:localStorage.getItem("birthday"),
        mobile:localStorage.getItem("mobile"),
        image:localStorage.getItem("image"),
        password:localStorage.getItem("password"),
        token:localStorage.getItem("token"),
      }
    }
  },
  created() {
    this.getdate();
  },
  methods: {
    // formatDate(time){undefined
    //
    //   var date = new Date(time);
    //
    //   return formatDate(date, 'YYYY-MM-DD');
    //
    // },
    getdate(){

      //axios.defaults.headers.post("token", localStorage.getItem("token"))
      axios({
        method:'get',
        url:url_path + 'user/1/',

        ///headers:{'Authorization':JSON("JWT",localStorage.getItem('token'))},
        params:{}

      }).then(res => {
        //res.headers.Authorization = localStorage.getItem("token")

        this.form.birthday = res.data.birthday;
        this.form.name = res.data.name;
        this.form.image = res.data.image;
        this.form.mobile = res.data.mobile;
        this.form.gender = res.data.gender;



        console.log(res)
        localStorage.setItem("birthday", res.data.birthday);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("image", res.data.image);
        localStorage.setItem("mobile", res.data.mobile);
        localStorage.setItem("gender", res.data.gender);
        localStorage.setItem("password", res.data.password);


      }).catch(err => {
        this.$alert('获取用户信息失败，请检查网络！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
    },

    onSubmit() {
      console.log(this.form.birthday)
      axios.put(url_path + 'user/'+ "1/", {
        email:localStorage.getItem("username"),
        birthday:this.form.birthday,
        name:this.form.name,
        image: this.form.image,
        mobile: this.form.mobile,
        gender:this.form.gender,
        username:localStorage.getItem("username"),
        password:localStorage.getItem("password"),
      }).then(res => {

        if (res.status === 200){
          console.log(res);
          this.getdate();
          this.$message.success('修改信息成功');

        }


      }).catch(err => {
        this.$alert('提交修改个人信息失败！', '', {
          confirmButtonText: '确定',
        });
        console.log(err);
      })
      this.editable = !this.editable;
    },

    editabled() {
      this.editable = !this.editable;
    },
    editPwd() {

    },
    handleAvatarSuccess(res, file) {
      this.form.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isPng = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }
}
</script>

<style scoped>

.avatar {
  width: 100px;
  height: 100px;
}
/deep/ .el-upload{
  width: 100px;
  height: 100px;
  line-height: 100px;
  margin-left: 60px;
}

</style>
