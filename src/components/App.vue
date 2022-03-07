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
      <!-- dòng thứ 0 thì để thiết kế nội dung của trang nhạc -->
      <StackLayout col="0" row="0">
        <StackLayout
          backgroundImage="~/assets/images/bg2.jpg"
          width="100%"
          stretch="aspectFit"
          class="album-image"
        >
          <!-- chứa chữ rap việt nam... dùng grid chia 2 dòng -->
          <GridLayout columns="*,auto,*" rows="*,auto,*" height="100%">
            <Label
              text="Nhạc Của Phúc"
              row="1"
              col="1"
              fontWeight="bold"
              fontSize="18"
              color="#FFFFFF"
            />
          </GridLayout>
        </StackLayout>
        <ScrollView orientation="vertical">
          <StackLayout>
            <!-- thiết kế mới phát hành -->
            <GridLayout columns="auto,*,auto" rows="auto">
              <Label
                text="Mới Phát Hành"
                class="title"
                col="0"
                row="0"
                fontWeight="bold"
                fontSize="20"
                paddingLeft="10"
                @tap="showDetail()"
              />
            </GridLayout>
            <!-- thiết kế nội dung, nội dung trượt ngang được thì scrollView horizontal-->
            <ScrollView orientation="horizontal">
              <StackLayout orientation="horizontal">
                <!-- duyệt qua danh mục nhạc lấy từng đối lượng lên, vì hình là nằm ngang nên ko dùng listView -->
                <StackLayout
                  margin="10"
                  v-for="item in listViewDataNew"
                  :key="item.title"
                >
                  <!-- lấy hình của bài nhạc -->
                  <GridLayout
                    class="album-image"
                    height="110"
                    width="125"
                    :backgroundImage="item.imageUrl"
                    borderRadius="5"
                  >
                  </GridLayout>
                  <Label
                    :text="item.title"
                    fontWeight="bold"
                    fontSize="16"
                    class="song_name"
                  />
                  <Label
                    :text="item.artist"
                    fontWeight="bold"
                    fontSize="14"
                    class="singer_name"
                  />
                </StackLayout>
              </StackLayout>
            </ScrollView>
            <!-- thiết kế album hot -->
            <GridLayout columns="auto,*,auto" rows="auto">
              <Label
                text="Album Hot"
                class="title"
                col="0"
                row="0"
                fontWeight="bold"
                fontSize="20"
                paddingLeft="10"
              />
            </GridLayout>
            <!-- thiết kế nội dung album hot -->
            <ScrollView orientation="horizontal">
              <StackLayout orientation="horizontal">
                <!-- duyệt qua danh mục nhạc lấy từng đối lượng lên, vì hình là nằm ngang nên ko dùng listView -->
                <StackLayout
                  margin="10"
                  v-for="item in listViewDataTopSong"
                  :key="item.title"
                  height="130"
                  width="110"
                  borderRadius="5"
                  backgroundColor="white"
                  paddingTop="5"
                  paddingLeft="5"
                >
                  <!-- lấy hình ảnh nhỏ nằm gốc phải -->
                  <Image
                    :src="item.imageUrl"
                    width="20"
                    height="20"
                    horizontalAlignment="right"
                    marginRight="5"
                  />
                  <!-- lấy hình lớn và tiêu đề bài hát, ca sĩ -->
                  <StackLayout
                    horizontalAlignment="center"
                    verticalAlignment="center"
                  >
                    <!-- lấy hình lớn -->
                    <Image
                      :src="item.imageUrl"
                      height="50"
                      width="50"
                      borderRadius="50"
                    />
                    <Label
                      :text="item.title"
                      fontWeight="bold"
                      fontSize="16"
                      class="song_name"
                    />
                    <Label
                      :text="item.artist"
                      fontWeight="bold"
                      fontSize="14"
                      class="singer_name"
                    />
                  </StackLayout>
                </StackLayout>
              </StackLayout>
            </ScrollView>
            <!-- thiết kế top song -->
            <GridLayout columns="auto,*,auto" rows="auto">
              <Label
                text="Có thể bạn thích"
                class="title"
                col="0"
                row="0"
                fontWeight="bold"
                fontSize="20"
                paddingLeft="10"
              />
            </GridLayout>
            <!-- thiết nội dung top song -->
            <ScrollView orientation="horizontal">
              <StackLayout orientation="horizontal">
                <StackLayout
                  margin="10"
                  v-for="item in listViewDataAlbum"
                  :key="item.album"
                >
                  <GridLayout
                    height="110"
                    width="125"
                    :backgroundImage="item.imageUrl"
                    borderRadisus="5"
                  >
                  </GridLayout>
                  <Label
                    :text="item.album"
                    fontSize="14"
                    fontWeight="bold"
                    class="singer_name"
                  />
                </StackLayout>
              </StackLayout>
            </ScrollView>
            <!-- end top song -->
          </StackLayout>
        </ScrollView>
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
            src="~/assets/images/user.png"
            @tap="loginpage()"
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
            src="~/assets/images/home_selected.png"
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
import Login from "./Account.vue";
import SongModal from "./SongModal";
import Detail from "./Detail.vue";
export default {
  data() {
    return {
      listViewDataNew: [
        {
          title: "Kiếp Thứ 2",
          artist: "Linh Cáo",
          imageUrl: "~/assets/images/linhcao.jpg",
        },
        {
          title: "Trốn Tìm",
          artist: "Đen Vâu",
          imageUrl: "~/assets/images/den.jpg",
        },
        {
          title: "Lối nhỏ",
          artist: "Linh Cáo",
          imageUrl: "~/assets/images/den.jpg",
        },
      ],
      listViewDataAlbum: [
        {
          album: "Hương Tràm",
          imageUrl: "~/assets/images/huongtram.jpg",
        },
        {
          album: "Trịnh Thăng Bình",
          imageUrl: "~/assets/images/trinhthangbinh.jpg",
        },
        {
          album: "Mr Siro",
          imageUrl: "~/assets/images/mrsiro.jpg",
        },
      ],
      listViewDataTopSong: [
        {
          title: "Anh Mệt Rồi",
          artist: "Anh Quân Idol",
          imageUrl: "~/assets/images/trungquan.jpg",
        },
        {
          title: "Ai Mang Cô Đơn Đi",
          artist: "K-ICM, ACM",
          imageUrl: "~/assets/images/K_ICM.jpg",
        },
        {
          title: "Hoa Hải Đường",
          artist: "Jack",
          imageUrl: "~/assets/images/jack.jpg",
        },
      ],
    };
  },
  methods: {
    showDetail() {
      this.$navigateTo(Detail);
    },
    loginpage() {
      this.$navigateTo(Login);
    },
    onItemTap(event) {
      this.$navigateTo(SongModal, {
        props: {
          webSrc: event.item.webSrc,
        },
      });
    },
  },
};
</script>

<style>
Page {
  background: rgb(236, 236, 236);
}
ActionBar {
  background-image: url("~/assets/images/actionbar.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.message {
  vertical-align: center;
  text-align: center;
  font-size: 20;
  color: #333333;
}
.album-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 300px;
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
}
.bottom_bar {
  background: rgb(255, 255, 255);
  height: auto;
}
.title {
  margin: 10px 0px 10px 0px;
  color: rgb(0, 0, 0);
}
.song_name {
  color: rgb(0, 0, 0);
}
.singer_name {
  color: rgba(70, 60, 60, 0.692);
}
</style>
