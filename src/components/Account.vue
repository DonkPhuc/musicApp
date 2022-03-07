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
    <GridLayout
      orientation="vertical"
      columns="*"
      rows="*,auto"
      width="100%"
      height="100%"
    >
      <StackLayout col="0" row="0">
        <Image class="acc-avt" />
        <Label class="acc-name center" :text="user" />
        <Label class="acc-member center" text="New Member" />
        <Button class="acc-btn" text="log out" @tap="loginpage()" />
      </StackLayout>
      <!-- bottom bar -->
      <StackLayout col="0" row="1" class="bottom_bar">
        <GridLayout columns="*,*,*,*,*" rows="auto">
          <Image
            col="0"
            row="0"
            height="30"
            width="30"
            margin="10"
            src="~/assets/images/user_selected.png"
          />
          <Image
            col="1"
            row="0"
            height="30"
            width="30"
            margin="10"
            src="~/assets/images/heart1.png"
          />
          <Image
            col="2"
            row="0"
            height="30"
            width="30"
            margin="10"
            src="~/assets/images/home.png"
            @tap="BackApp()"
          />
          <Image
            col="3"
            row="0"
            height="30"
            width="30"
            margin="10"
            src="~/assets/images/bxh.png"
            @tap="showDetail()"
          />
          <Image
            col="4"
            row="0"
            height="30"
            width="30"
            margin="10"
            src="~/assets/images/share.png"
          />
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </Page>
</template>

<script>
import Login from "./LoginPage.vue";
import Detail from "./Detail.vue";
import App from "./App.vue";

export default {
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    showDetail() {
      this.$navigateTo(Detail);
    },
    loginpage() {
      this.$navigateTo(Login);
    },
    BackApp() {
      this.$navigateTo(App);
    },
  },
};
</script>

<style scoped>
.acc-avt {
  height: 500px;
  width: 500px;
  background-image: url("~/assets/images/avt.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  margin-bottom: 50px;
  margin-top: 100px;
}
.acc-btn {
  background-color: blueviolet;
  color: white;
  font-weight: bold;
  border-radius: 25;
  padding-top: 14;
  padding-bottom: 14;
  text-transform: uppercase;
  letter-spacing: 0.1;
  margin-top: 200px;
  width: 250px;
}
.center {
  width: 300px;
  margin: auto;
  text-align: center;
}
.acc-name {
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-top: 10px;
}
.acc-member {
  color: rgb(107, 107, 107);
}
</style>
