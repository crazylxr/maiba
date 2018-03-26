<template>
<div class="login-container">
  <main>
    <div>
      <h3 class="title">
        <a href="javascript:;" :class="{'a-active':showSignIn}" @click="changeSign('sign-in')">登录</a>·<a :class="{'a-active':showSignUp}" href="javascript:;" @click="changeSign('sign-up')">注册</a>
      </h3>
      <div class="sign-container">
        <div class="sign-in" v-if="showSignIn">
          <el-input placeholder="请输入用户名" class="username-in" v-model="input2">
            <template slot="prepend"><i class="el-icon-edit"></i></template>
          </el-input>
          <el-input placeholder="请输入密码" class="password-in" v-model="input3">
            <template slot="prepend"><i class="el-icon-share"></i></template>
          </el-input>
          <el-button type="primary" class="sign-in-btn" round>登录</el-button>
        </div>
        <div v-if="showSignUp">
          <el-input placeholder="请输入内容" class="username-up" v-model="input3">
            <template slot="prepend"><i class="el-icon-share"></i></template>
          </el-input>
          <el-input placeholder="请输入内容" class="password-up" v-model="input3">
            <template slot="prepend"><i class="el-icon-share"></i></template>
          </el-input>
          <el-button type="primary" class="sign-up-btn" round>注册</el-button>
        </div>
      </div>
    </div>
  </main>
</div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'sign-in',
            showSignIn: true,
            showSignUp: false,
            input2: '',
            input3: ''
        }
    },

    methods: {
        changeSign(type) {
            console.log(type);
            if (type === 'sign-in') {
                this.showSignIn = true
                this.showSignUp = false
            }else {
                this.showSignIn = false
                this.showSignUp = true
            }
        },
        handleClick() {
            console.log(55);
        }
    }
}
</script>
<style lang="less" scoped>
.login-container {
    display: flex;
    background: #f1f1f1;
    justify-content: center;
    align-items: center;
    height: 100%;


    .title {
        text-align: center;
        a {
            text-decoration: none;
            color: #969696;
        }
        a:hover { color: #409eff };

        .a-active {
            color: #409eff;
        }
    }

    main {
        width: 300px;
        background: #fff;
        padding: 50px 50px 30px 50px;
        height: 300px;
        border-radius: 4px;
    }

    .sign-in-btn {
        width: 300px;
        margin-top: 50px;
    }

    .sign-up-btn {
        width: 300px;
        margin-top: 50px;
    }

    .password-in, .password-up {
        margin-top: 20px;
    }
}

</style>
