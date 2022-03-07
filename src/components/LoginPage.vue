<template>
  <Page>
    <ActionBar>
      <GridLayout
        orientation="horizontal"
        width="100%"
        height="100%"
        columns="*,auto,*"
        row="*"
      >
        <Image
          src="~/assets/images/logo.png"
          col="1"
          row="0"
          height="30"
          width="30"
        />
      </GridLayout>
    </ActionBar>
    <FlexboxLayout class="page" backgroundColor="#ffff">
      <StackLayout class="form">
        <Image class="logo" src="~/assets/images/logo.png" />

        <StackLayout class="input-field" marginBottom="25">
          <TextField
            class="login-input"
            hint="User Name"
            v-model="user1"
            fontSize="18"
          />
          <Label
            v-show="!isLoggingIn"
            v-if="user1.length < 3"
            text="UserName cần ít nhất 3 kí tự"
            class="validate"
          />
        </StackLayout>

        <StackLayout class="input-field" marginBottom="25">
          <TextField
            class="login-input"
            hint="Password"
            secure="true"
            v-model="pass"
            fontSize="18"
          />
          <Label
            v-show="!isLoggingIn"
            v-if="pass.length < 3"
            text="Password cần ít nhất 3 kí tự"
            class="validate"
          />
        </StackLayout>

        <StackLayout v-show="!isLoggingIn" class="input-field">
          <TextField
            class="login-input"
            hint="Confirm password"
            secure="true"
            v-model="confirmPass"
            fontSize="18"
          />
          <Label
            class="validate"
            v-show="!isLoggingIn"
            v-if="confirmPass == '' || pass != confirmPass"
            text="Phải trùng khớp với Password"
          />
        </StackLayout>

        <Button
          class="login-btn"
          text="Log in"
          @tap="submit()"
          v-show="isLoggingIn"
        />
        <Button
          class="login-btn"
          text="Sign Up"
          @tap="reg()"
          v-show="!isLoggingIn"
        />
        <Label
          v-show="isLoggingIn"
          text="Forgot your password?"
          class="login-label"
        />
      </StackLayout>

      <Label
        class="login-label sign-up-label"
        @tap="
          toggleForm();
          inputnull();
        "
      >
        <FormattedString>
          <Span
            :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"
          />
          <Span :text="isLoggingIn ? 'Sign up' : ''" />
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Acc from "./Account.vue";
export default {
  data() {
    return {
      isLoggingIn: true,
      user1: "",
      pass: "",
      confirmPass: "",
      // gia su co 1 dối tuọng
      account: [
        {
          user: "Ad",
          password: "ad",
          conformPassWord: "ad",
        },
      ],
    };
  },
  // tính số dòng
  methods: {
    submit() {
      let fail = {
        title: "ERROR",
        message: "Tài khoản không tồn tại",
        okButtonText: "OK",
      };
      var hople = false;
      for (var i = 0; i < this.account.length; i++) {
        if (
          this.user1 == this.account[i].user &&
          this.pass == this.account[i].password
        ) {
          hople = true;
        }
      }
      if (hople == true) {
        this.$navigateTo(Acc, {
          props: {
            user: this.user1,
          },
        });
      } else {
        alert(fail).then(() => {
          console.log("fail!");
        });
      }
    },
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },
    reg() {
      let success = {
        title: "REGISTER",
        message: "Đăng ký thành công",
        okButtonText: "OK",
      };
      let fail = {
        title: "REGISTER",
        message: "Thông tin đăng ký không hợp lệ! Vui lòng thử lại",
        okButtonText: "OK",
      };
      var ok = false;
      if (
        this.user1.length > 2 &&
        this.pass.length > 2 &&
        this.pass == this.confirmPass
      ) {
        ok = true;
      }
      if (ok == true) {
        this.account.push({
          user: this.user1,
          password: this.pass,
          conformPassWord: this.confirmPass,
        });
        alert(success).then(() => {
          console.log("Success!");
        });
        this.user1 = "";
        this.pass = "";
        this.confirmPass = "";
      } else {
        alert(fail).then(() => {
          console.log("fail!");
        });
      }
    },
    inputnull() {
      this.user1 = "";
      this.pass = "";
      this.confirmPass = "";
    },
  },
};
</script>

<style scoped>
.logo {
  text-align: center;
  width: 100;
  height: 100;
  margin-bottom: 100px;
}
.page {
  align-items: center;
  flex-direction: column;
  background: rgb(91, 85, 186);
  background: linear-gradient(
    90deg,
    rgba(91, 85, 186, 1) 17%,
    rgba(191, 17, 187, 1) 86%
  );
}
.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
.login-btn {
  background-color: #1b7d9b;
  color: white;
  font-weight: bold;
  border-radius: 25;
  padding-top: 14;
  padding-bottom: 14;
  text-transform: uppercase;
  letter-spacing: 0.1;
  margin-bottom: 20;
  margin-top: 10;
}
.login-input {
  color: white;
  text-align: center;
  placeholder-color: white;
}
.login-label {
  color: white;
  text-align: center;
}
.validate {
  text-align: center;
  color: red;
  margin-top: 5px;
}
</style>
