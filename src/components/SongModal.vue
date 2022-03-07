<template>
  <Page>
    <ActionBar>
      <GridLayout row="*" columns="*,auto,*">
        <Image
          src="~/assets/images/left-arrow.png"
          col="0"
          row="0"
          @tap="goBack()"
          marginLeft="-80"
          height="30"
          width="30"
        />
        <Image
          src="~/assets/images/logo.png"
          col="1"
          row="0"
          height="30"
          width="30"
        />
      </GridLayout>
    </ActionBar>
    <!--  -->
    <GridLayout
      orientation="vertical"
      columns="*"
      rows="*,auto"
      width="100%"
      height="100%"
    >
      <StackLayout col="0" row="0">
        <GridLayout columns="*" row="*" height="310">
          <WebView row="1" :src="webSrc" />
        </GridLayout>
        <!-- thiết kế nội dung top song -->
        <RadListView ref="listView" class="list-group" for="item in cmt">
          <v-template>
            <StackLayout class="listcmt">
              <!-- cột thứ  0 chứa image -->
              <GridLayout
                columns="auto,auto,auto"
                rows="*,*"
                class="div_tong_cmt"
              >
                <Image
                  col="1"
                  row="0"
                  :src="item.avt"
                  borderRadius="50"
                  class="avt"
                />
                <StackLayout col="2" row="0" colSpan="2" class="div_cmt">
                  <Label class="user" :text="item.user"  />
                  <Label :text="item.cmt" class="binhluan" />
                </StackLayout>
              </GridLayout>
            </StackLayout>
          </v-template>
        </RadListView>
      </StackLayout>
      <!--  -->
      <StackLayout col="0" row="1" height="40" backgroundColor="white">
        <GridLayout class="listcmtbar" columns="*,*,*,*,*" row="*">
          <Image src="~/assets/images/avt.png" col="0" row="0" />
          <TextField
            hint="Bình luận"
            class="search_cmt"
            col="1"
            colSpan="3"
            row="0"
            v-model="comment"
          />
          <Image
            src="~/assets/images/send.png"
            col="5"
            row="0"
            @tap="postcmt()"
          />
        </GridLayout>
      </StackLayout>
    </GridLayout>
  </Page>
</template>
<script>
import Detail from "./Detail.vue";
export default {
  props: ["webSrc"],
  data() {
    return {
      avtn: "~/assets/images/avt.png",
      usern: "Đỗ Phúc",
      comment: "",
      cmt: [
        {
          avt: "~/assets/images/huongtram.jpg",
          user: "Đỗ Hạ Long Bay",
          cmt: "Hay quá bay bay",
        },
        {
          avt: "~/assets/images/den.jpg",
          user: "Đỗ Ghệ Miền Tây",
          cmt: "Nhạc hay",
        },
        {
          avt: "~/assets/images/huongtram.jpg",
          user: "Đỗ Đại Học",
          cmt: "Trượt đh rồi",
        },
        {
          avt: "~/assets/images/mrsiro.jpg",
          user: "Đỗ Đạt",
          cmt: "Hariwon",
        },
        {
          avt: "~/assets/images/huongtram.jpg",
          user: "Đỗ Hạ Long Bay",
          cmt: "Hay quá bay bay",
        },
        {
          avt: "~/assets/images/jack.jpg",
          user: "Đỗ Ghệ Miền Tây",
          cmt: "Nhạc hay",
        },
        {
          avt: "~/assets/images/huongtram.jpg",
          user: "Đỗ Đại Học",
          cmt: "Trượt đh rồi",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$navigateTo(Detail, {});
    },
    postcmt() {
      var data = {
        avt: this.avtn,
        user: this.usern,
        cmt: this.comment,
      };
      this.cmt.push(data);
      this.$refs.listView.refresh();

      if (this.comment != null) {
        this.comment = "";
      }
    },
  },
};
</script>

<style scoped>
.list-group {
  background: rgb(240, 240, 240);
}
image {
  height: 25px;
  width: 25px;
  margin-left: -20px;
}
.avt {
  height: 100px;
  width: 100px;
  margin-left: 10px;
}
.user {
  font-weight: bolder;
  font-size: 18px;
  color: rgb(0, 0, 0);
}
.binhluan {
  color: rgb(82, 82, 82);
}
.div_cmt {
  background: rgb(228, 228, 228);
  border-radius: 10%;
  margin-left: 10px;
  padding: 10px;
}
.div_tong_cmt {
  margin-bottom: 10px;
}
.listcmtbar image {
  width: 60px;
  height: 60px;
}
.search_cmt {
  height: 80px;
  border-radius: 50%;
  color: black;
  background: rgba(243, 243, 243, 0.808);
  font-size: 12px;
  width: 100%;
}
</style>
