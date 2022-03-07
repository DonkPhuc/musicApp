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
        />
        <Label row="0" col="1" colSpan="7" text="Top 10 BXH" />
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
                height="75"
                width="60"
                paddingTop="25"
                @tap="
                  item.thich = !item.thich;
                  thich(item);
                "
              >
                <Image
                  v-if="item.thich"
                  src="~/assets/images/hearted.png"
                  height="21"
                  width="21"
                />
                <Image
                  v-else
                  src="~/assets/images/heart1.png"
                  height="21"
                  width="21"
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
            src="~/assets/images/heart1.png"
            @tap="favpage()"
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
            src="~/assets/images/bxh_selected.png"
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
import Fav from "./Fav.vue";
export default {
  data() {
    return {
      listViewData: [
        {
          name: "kiep thu 2",
          title: "Kiếp Thứ 2",
          artist: "Linh Cáo",
          cs: "linh cao",
          year: "2016",
          imageUrl: "~/assets/images/linhcao.jpg",
          webSrc: "https://www.youtube.com/watch?v=ADuxk-q745I",
          thich: false,
          type: "Trẻ",
        },
        {
          name: "yeu mot nguoi sao buon den the",
          title: "Yêu Một NGười Sao Buồn Đến Thế",
          artist: "Noo Phước Thịnh",
          cs: "noo phuoc thinh",
          year: "2018",
          imageUrl: "~/assets/images/noophuocthinh.jpg",
          webSrc:
            "https://www.youtube.com/watch?v=840Vw6IB5Zw&ab_channel=TaynguyensoundOfficial",
          thich: false,
          type: "1995",
        },
        {
          name: "doi minh ben nhau",
          title: "Đôi Mình Bên Nhau",
          artist: "Linh Cáo",
          cs: "linh cao",
          year: "2019",
          imageUrl: "~/assets/images/linhcao.jpg",
          webSrc:
            "https://www.youtube.com/watch?v=840Vw6IB5Zw&ab_channel=TaynguyensoundOfficial",
          thich: false,
          type: "1995",
        },
        {
          name: "em khong sai chung ta sai",
          title: "Em Không Sai Chúng Ta Sai",
          artist: "Erik",
          cs: "erik",
          year: "2021",
          imageUrl: "~/assets/images/erik.jpg",
          webSrc:
            "https://www.youtube.com/watch?v=840Vw6IB5Zw&ab_channel=TaynguyensoundOfficial",
          thich: false,
          type: "Trẻ",
        },
        {
          name: "dung cung thanh sai",
          title: "Đúng Cũng Thành Sai",
          artist: "Mỹ Tâm",
          cs: "my tam",
          year: "2017",
          imageUrl: "~/assets/images/mytam.jpg",
          webSrc: "https://youtu.be/5_ozB0ImkYA",
          thich: false,
          type: "1995",
        },
        {
          name: "tron tim",
          title: "Trốn Tìm",
          artist: "Đen Vâu",
          cs: "den vau",
          year: "2017",
          imageUrl: "~/assets/images/den.jpg",
          webSrc:
            "https://www.youtube.com/watch?v=Ws-QlpSltr8&ab_channel=%C4%90enV%C3%A2uOfficial",
          thich: false,
          type: "1995",
        },
        {
          name: "tinh nao khong nhu tinh dau",
          title: "Tình Nào Không Như Tình Đầu",
          artist: "Trung Quân Idol",
          cs: "trung quan idol",
          year: "2020",
          imageUrl: "~/assets/images/trungquan.jpg",
          webSrc:
            "https://www.youtube.com/watch?v=840Vw6IB5Zw&ab_channel=TaynguyensoundOfficial",
          thich: false,
          type: "Trẻ",
        },
        {
          name: "doi minh ben nhau 2",
          title: "Đôi Mình Bên Nhau 2",
          artist: "Linh Cáo",
          cs: "linh cao",
          year: "2019",
          imageUrl: "~/assets/images/linhcao.jpg",
          webSrc:
            "https://www.youtube.com/watch?v=840Vw6IB5Zw&ab_channel=TaynguyensoundOfficial",
          thich: false,
          type: "Trẻ",
        },
      ],
      searchString: "",
      moi: true,
      searchTime: null,
      sortBy: "new",
      flist: [],
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
    favpage() {
      this.$navigateTo(Fav, {
        props: {
          flist: this.flist,
        },
      });
    },
    thich(value) {
      var exits = false;
      if (this.flist.length < 0) {
        exits = false;
      } else {
        for (var i = 0; i < this.flist.length; i++) {
          if (value.name == this.flist[i].name) {
            exits = true;
          }
        }
      }
      if (exits == false) {
        this.flist.push(value);
      } else {
        for (var i = 0; i < this.flist.length; i++) {
          if (value.name == this.flist[i].name) {
            this.flist.splice(i, 1);
          }
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
      var search_array = this.listViewData,
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
