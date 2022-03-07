<template>
  <Page>
    <ActionBar>
      <GridLayout
        orientation="horizontal"
        width="100%"
        height="100%"
        columns="*,*,*,*,*,*,*,*"
        row="*"
      >
        <Image
          src="~/assets/images/left-arrow.png"
          col="0"
          row="0"
          height="17"
          width="17"
          class="back_button"
          @tap="$navigateBack(App)"
        />
        <Label row="0" col="1" colSpan="7" text="Yêu Thích" />
      </GridLayout>
    </ActionBar>
    <GridLayout
      orientation="vertical"
      columns="*"
      rows="*,auto"
      width="100%"
      height="100%"
    >
      <!-- dòng thứ 0 thiết kế nội dung -->
      <StackLayout col="0" row="0">
         <GridLayout
          columns="*,*,*,*,*"
          rows="auto,auto"
          height="100"
          class="bar_top"
        >
          <!-- row0 -->
          <TextField
            row="0"
            col="1"
            colSpan="4"
            v-model="searchString"
            hint="Tên bài hát,ca sĩ"
            class="search_bar"
            marginTop="5"
          />
          <!-- row1  -->
          <Button
            col="1"
            row="1"
            fontSize="12"
            @tap="action_dialog()"
            text="Thể Loại"
          />
          <Button
            col="3"
            row="1"
            fontSize="12"
            @tap="moi = !moi"
            :text="moi ? 'Cũ Nhất' : 'Mới Nhất'"
          />
          <Image
            src="~/assets/images/up.png"
            height="17"
            width="17"
            col="4"
            row="1"
            v-if="!moi"
            marginLeft="-25"
          />
          <Image
            src="~/assets/images/down.png"
            height="17"
            width="17"
            col="4"
            row="1"
            v-else
            marginLeft="-25"
          />
          <TextField
            row="1"
            col="2"
            hint="Năm"
            v-model="searchTime"
            class="search_year"
          />
        </GridLayout>

        <!-- thiết kế nội dung top song -->
        <ListView for="item in filterName" @itemTap="onItemTap($event)">
          <v-template>
            <GridLayout columns="auto,*,auto" rows="auto">
              <!-- cột thứ  0 chứa image -->
              <Image
                :src="item.imageUrl"
                col="0"
                row="0"
                class="list_img_song"
              />
              <!-- cột thứ 1 chứa tên casi, bai hat... -->
              <StackLayout col="1" row="0" marginLeft="15">
                <Label :text="item.title" marginTop="5" paddingRight="5" />
                <Label :text="item.artist" marginTop="5" paddingRight="5" />
                <Label :text="item.year" marginTop="5" paddingRight="5" />
                <Label :text="item.type" marginTop="5" paddingRight="5" />
              </StackLayout>
              <!-- cột thứ 2 chứa icon là headphones -->
              <StackLayout
                col="2"
                row="0"
                horizontalAlignment="right"
                height="60"
                width="60"
                paddingTop="20"
                @tap="xoa(item)"
              >
                <Image
                  src="~/assets/images/trash_black.png"
                  height="18"
                  width="18"
                />
              </StackLayout>
            </GridLayout>
          </v-template>
        </ListView>
      </StackLayout>
      <!-- bottom -->
      <StackLayout col="0" row="1" class="bottom_bar">
        <GridLayout columns="*,*,*,*,*" rows="auto">
          <Image
            col="0"
            row="0"
            height="30"
            width="30"
            margin="10"
            src="~/assets/images/user.png"
          />
          <Image
            col="1"
            row="0"
            height="30"
            width="30"
            margin="10"
            src="~/assets/images/heart_selected.png"
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
import SongModal from "./SongModal";
import App from "./App.vue";
import Detail from "./Detail.vue";
export default {
  props: ["flist"],
  data() {
    return {
      searchString: "",
      moi: true,
      searchTime: null,
      sortBy: "new",
      typen: null,
    };
  },
  methods: {
    onItemTap(event) {
      this.$navigateTo(SongModal, {
        props: {
          webSrc: event.item.webSrc,
        },
      });
    },
    BackApp() {
      this.$navigateTo(App);
    },
    showDetail() {
      this.$navigateTo(Detail);
    },
    xoa(value) {
      for (var i = 0; i < this.flist.length; i++) {
        if (value.name == this.flist[i].name) {
          this.flist.splice(i, 1);
        }
      }
    },
    onSelect(val) {
      this.typen = val.value;
    },
    action_dialog() {
      action("Thể Loại", "Thoát", ["Tất Cả", "Trẻ", "1995"]).then((result) => {
        this.typen = result;
      });
    },
  },
  computed: {
    filterName() {
      var search_array = this.flist,
        searchString = this.searchString,
        searchTime = this.searchTime,
        searchString = searchString.trim().toLowerCase();
      search_array = search_array.filter((item) => {
        if (
          item.name.toLowerCase().indexOf(searchString) !== -1 ||
          item.title.toLowerCase().indexOf(searchString) !== -1 ||
          item.cs.toLowerCase().indexOf(searchString) !== -1 ||
          item.artist.toLowerCase().indexOf(searchString) !== -1
        ) {
          return item;
        }
      });
      // filter năm
      if (this.searchTime) {
        search_array = search_array.filter((item) => {
          if (item.year == searchTime) {
            return item;
          }
        });
      }
      // sắp xếp time
      search_array = search_array.sort((a, b) => {
        if (this.sortBy == "new") {
          return a.year - b.year;
        }
      });
      if (!this.moi) {
        search_array.reverse();
      }
      // theloai
      if (this.typen == "Tất Cả" || this.typen == null) {
        search_array = search_array;
      } else if (this.typen == "Trẻ") {
        search_array = search_array.filter(function(e) {
          return e.type == "Trẻ";
        });
      } else {
        search_array = search_array.filter(function(e) {
          return e.type == "1995";
        });
      }

      return search_array;
    },
  },
};
</script>
<style>
ActionBar {
  color: rgb(255, 255, 255);
  font-weight: bolder;
}
.album-image {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.search_bar {
  height: 80px;
  border-radius: 50%;
  color: black;
  background: rgba(202, 202, 202, 0.685);
  font-size: 12px;
  width: 100%;
  margin-right: 110px;
}
.list_img_song {
  width: 85;
  height: 85;
  border-radius: 12px;
  margin: 10px 0px 10px 25px;
}
.back_button {
  margin-left: 20px;
}
.bar_top {
  background-image: url("~/assets/images/actionbar.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-bottom-right-radius: 30%;
  border-bottom-left-radius: 30%;
}
ListView {
  color: rgb(0, 0, 0);
}
.search_year {
  color: white;
  text-align: center;
  placeholder-color: white;
}
</style>
