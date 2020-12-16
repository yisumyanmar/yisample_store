<template>
  <div class="goodsrelease fl">
    <div class="issue_content clearfix">
      <div class="goods_title">
        <h1 class="titles size16">商品管理 - 列表</h1>
        <div class="tabrow">
            <div v-for="(item,ind) in tab" :key="ind" class="tabcol" @click="tabClick(item, ind)">
                <div>
                    <img v-if="selectedTab == ind" :src="item.activeImg" alt="" class="shop_img" />
                    <img v-else :src="item.image" alt="" class="shop_img" />
                </div>
                <div :class="selectedTab == ind ? 'tabtext' : 'tabtextNoActive'">
                    <p class="text1">{{item.step}}</p>
                    <p class="text2">{{item.name}}</p>
                </div>
            </div>
        </div>
        <div v-show="selectedTab == 0">
          <div class="relativetab">
              <div class="relativetab1">
                  <input type="text" id="myInput2" v-on:keyup="myFunction2" placeholder="输入名称/拼音首字母" title="Type in a name">
                  <perfect-scrollbar>
                      <ul id="myUL2">
                          <li v-for="(list, index) in firstData" :key="index"
                              :class="firCol == index ? 'liActive' : ''"
                          >
                              <a href="#" v-if="list.storeBind == 1" @click="list1Click(list, index)">{{ list.class_name }}</a>
                              <el-popover
                                  v-else
                                  placement="bottom"
                                  width="200"
                                  trigger="hover"
                              >
                                  <span>您无当前类目发布产品权限, 跨类目经验请提交申请, </span>
                                  <p @click="toShop" style="cursor: pointer; color: lightblue; ">立即申请</p>
                                  <a href="#" slot="reference" class="disablecss">{{ list.class_name }}</a>
                              </el-popover>
                              <a href="" v-show="firCol == index">></a>
                          </li>
                      </ul>
                  </perfect-scrollbar>
              </div>
              <div :class="secondtab != 0 ? 'relativetab1' : 'tabhidden'">
                  <input type="text" id="myInput" v-on:keyup="myFunction" placeholder="输入名称/拼音首字母" title="Type in a name">
                  <perfect-scrollbar>
                      <ul id="myUL">
                          <li v-for="(list, index) in secondData" :key="index+'i'" 
                              :class="secCol == index ? 'liActive' : ''"
                              @click="list2Click(list, index)">
                              <a href="#">{{ list.class_name }}</a>
                              <a href="" v-show="secCol == index">></a>
                          </li>
                      </ul>
                  </perfect-scrollbar>
              </div>
              <div :class="thirdtab != 0 ? 'relativetab1' : 'tabhidden'">
                  <input type="text" id="myInput3" v-on:keyup="myFunction3" placeholder="输入名称/拼音首字母" title="Type in a name">
                  <ul id="myUL3" class="scrollcss">
                      <li v-for="(list, index) in thirdData" :key="index" 
                          :class="thirdCol == index ? 'liActive' : ''"
                          @click="list3Click(list, index)">
                          <a href="#">{{ list.class_name }}</a>
                          <a href="" v-show="thirdCol == index">></a>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="divbtncss">
            <div v-if="btnActive != 0" class="btncss" @click="nextPage(1)">
                下一步，填写商品信息
            </div>
            <div v-else class="btncssdisable">
                下一步，填写商品信息
            </div>
          </div>
        </div>  
        <div v-show="selectedTab == 1">
          <secondTab  :data1="selectItem1" 
                      :data2="selectItem2"
                      :data3="selectItem3"
                      :data4="specData"
                      :data5="getGoodsAttrDetail"
                      v-on:childToParent="onChildClick"
                      @getParameter="getParameter"
                      @selectTab="selectTab(2)"></secondTab>
        </div>
        <div v-show="selectedTab == 2">
          <thirdTab v-on:thirdToParent="onChildClick" ref="album1"></thirdTab>
        </div>
        <div v-show="selectedTab == 3">
          <fourthTab :data1="fourthData" v-on:childToParent="onChildClick4"></fourthTab>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import secondTab from "./common/secondTab"
import thirdTab from "./common/thirdTab"
import fourthTab from "./common/fourthTab"
export default {
  name: "goodsrelease",
  data() {
    return {
      tab: [
        { step: "STEP.1", name: "选择商品分类", image: require("../../../../../assets/images/tabImg/1.png"), activeImg: require("../../../../../assets/images/activeTabImg/1.png") },
        { step: "STEP.2",name: "填写商品详情", image: require("../../../../../assets/images/tabImg/2.png"), activeImg: require("../../../../../assets/images/activeTabImg/2.png") },
        { step: "STEP.3",name: "上传商品图片", image: require("../../../../../assets/images/tabImg/3.png"), activeImg: require("../../../../../assets/images/activeTabImg/3.png") },
        { step: "STEP.4",name: "商品发布成功", image: require("../../../../../assets/images/tabImg/4.png"), activeImg: require("../../../../../assets/images/activeTabImg/4.png") }
      ],
      data: "",
      secondtab: 0,
      thirdtab: 0,
      btnActive: 0,
      name: '',
      firCol: null,
      secCol: null,
      thirdCol: null,
      firstData: null,
      selectItem1: null,
      secondData: null,
      selectItem2: null,
      thirdData: null,
      selectItem3: null,
      selectedTab: 0,
      fromChild: null,
      specData: null,
      getGoodsAttrDetail: null,
      fromChild2: null,
      fourthData: null,
      visible: false
    };
  },
  methods: {
    toShop() {
        // this.$store.state.link = 'operateCategory?a=' + new Date().getTime();
        parent.location.href = "#/shop?type=shopData";
        
        
    },
    // childToParent(index) {
    //   alert("hello Thanks You " + index)
    // },
    //切换选项卡
    selectTab(index) {
      if (index === 2) {
        this.$refs.album1.imageConfigure();
      }
      // if (index === 1) {
      //   this.getSpecData();
      // }
      // for (var i = 0; i < this.status.length; i++) {
      //   this.$set(this.status, i, false);
      // }
      // this.$set(this.status, index, true);
    },
    getParameter() {
        if(this.selectItem3) {
            this.$HTTP(
              this.$httpConfig.getGoodsAttrDetail,
              { class_three: this.selectItem3.id },
              "post"
            )
              .then(res => {
                if (res.data.data != null) {
                  this.getGoodsAttrDetail = res.data.data
                  this.$store.state.relInfo = res.data.data;
                } else {
                  this.$store.state.relInfo = "暂无数据";
                }
              })
              .catch(err => {
                // this.$message.error(err.data.message);
              });
        }
    },
    //切换选项卡
    onChildClick(value) {
        if(value.tab) {
            this.selectedTab = value.tab
            if(value.uploadData) {
                this.fourthData = value.uploadData
            } 
        } else {
            this.fromChild = value
            this.selectedTab = this.fromChild[this.fromChild.length-1].currentTab
        }
        
    },
    onChildClick4(value) {
        // alert(JSON.stringify(value.tab))
        this.selectedTab = value.tab
        
    },
    tabThree(value) {
        // this.fromChild2 = value
        alert(value)
    },
    nextPage(item) {
        if(this.selectItem1 && this.selectItem2 && this.selectItem3 && item) {
            this.selectedTab = item
        }
    },
    tabClick(item, index) {
      // this.selectedTab = 3 //just testing
    },
    getData() {
        this.$HTTP(this.$httpConfig.getClassById, {
          goods_class_id: 0
        })
        .then(res => {
          this.firstData = res.data.data
        })
        .catch(err => {
          console.log(err);
        });
    },
    myFunction() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    },
    myFunction2() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput2");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL2");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    },
    myFunction3() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput3");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL3");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    },
    // myFunction1: function(event) {
    //     console.log("hello " + event.key);
    //     if(event.key == "Enter") {
    //       console.log("Enter key was pressed!")
    //     }
    // },
    
    list1Click(item, id) {
        this.secondtab = 1;
        this.firCol= id;
        this.selectItem1 = item // to send data to secondTab
        this.getClass1()
    },
    list2Click(item, id) {
        this.thirdtab = 1;
        this.secCol= id;
        this.selectItem2 = item // to send data to secondTab
        this.getClass2()
    },
    list3Click(item, id) {
        this.thirdCol= id;
        this.selectItem3 = item // to send data to secondTab
        this.btnActive = 1
        if(this.selectItem3) {
          this.$HTTP(
            this.$httpConfig.getGoodsSpecInfo,
            { id: this.selectItem3.id },
            "post"
          ).then(res => {
            this.$store.state.spec_data = res.data.data;
            this.specData = res.data.data
            // alert("hello " + this.$store.state.spec_data)
          });
        }
        if(this.selectItem3) {
            this.$HTTP(
              this.$httpConfig.getGoodsAttrDetail,
              { class_three: this.selectItem3.id },
              "post"
            )
              .then(res => {
                if (res.data.data != null) {
                  this.getGoodsAttrDetail = res.data.data
                  this.$store.state.relInfo = res.data.data;
                } else {
                  this.$store.state.relInfo = "暂无数据";
                }
              })
              .catch(err => {
                // this.$message.error(err.data.message);
              });
        }
    },
    
    getClass1() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: this.selectItem1.id
      }, 'post')
      .then((res) => {
				this.secondData = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
    },
    getClass2() {
			this.$HTTP(this.$httpConfig.getClassById, {
				goods_class_id: this.selectItem2.id
      }, 'post')
      .then((res) => {
				this.thirdData = res.data.data;
			}).catch((err) => {
				console.log(err)
			});
    },
    
  },
  created() {
    this.getData();
  },
  components: {
    secondTab,
    thirdTab,
    fourthTab
  }
};
</script>
<style>
body {
  overflow: inherit;
}
</style>

<style lang="less" scoped>
.editPopover {
  font-size: 12px !important;
}
.goodsrelease {
  width: 1000px;
  padding-bottom: 80px;
  .issue_content {
    width: 100%;
    margin: 0 auto;
    .goods_title {
      height: 31px;
      border-right: 0;
      position: relative;
      margin-bottom: 22px;
      .tabrow {
          display: flex;
          margin-bottom: 22px;
          .tabcol {
            display: flex;
            align-items: center;
            width: 20%;
            cursor: pointer;
          }
          .tabtext {
            color: #F7BC0A;
            padding-left: 10px;
            .text1 {
              font-size: 12px;
            }
            .text2 {
              font-size: 16px;
            }
          }
          .tabtextNoActive {
            color: #999999;
            padding-left: 10px;
            .text1 {
              font-size: 12px;
            }
            .text2 {
              font-size: 16px;
            }
          }
      }
      .titles {
        color: #333;
        border-bottom: 1px solid #dddddd;
        overflow: hidden;
        margin-bottom: 22px;
        line-height: 50px;
      }
      .relativetab {
        padding: 2rem 0.5rem;
        background: #FCFCFC;
        border: 1px solid #E7E7E7;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .relativetab1 {
          background: #FFF;
          width: 30%;
          border: 1px solid #E7E7E7;
          padding-left: 10px;
          padding-right: 10px;
          .licss {
            cursor: pointer;
            margin: 15px 0;
            padding: 10px 0;
            color: #FFF;
            background: hotpink;
          }
          // .inputdiv {
          //   display: flex;
          //   justify-content: center;
          // }
        }
        .tabhidden {
          width: 30%;
          visibility: hidden;
          .licss {
            cursor: pointer;
            margin: 15px 0;
            padding: 10px 0;
            color: #FFF;
            background: hotpink;
          }
        }
        .scrollcss {
          height: 150px;
          overflow-y: scroll;
        }
      }
      .divbtncss {
        display: flex;
        justify-content: center;
        padding: 2rem 0px;
        .btncss {
          background: #EEB407;
          padding: 10px 20px;
          color: #FFF;
          border-radius: 2px;
          cursor: pointer;
        }
        .btncssdisable {
          opacity: 0.4;
          background: #EEB407;
          padding: 10px 20px;
          color: #FFF;
          border-radius: 2px;
          cursor: pointer;
        }
      }
      .title {
        color: #333;
      }
    }
  }
}
input#firstsearch {
    background-image: url(../../../../../../static/images/search.jpg);
    background-repeat: no-repeat;
    text-indent: 30px;
    width: 100%;
    height: 30px;
}
input#secondsearch {
    background-image: url(../../../../../../static/images/search.jpg);
    background-repeat: no-repeat;
    text-indent: 30px;
    width: 100%;
    height: 30px;
}
.ps {
    height: 150px;
}




#myInput2, #myInput, #myInput3 {
  background-image: url('../../../../../../static/images/search.png');
  background-repeat: no-repeat;
  background-position: 7px 10px;
  width: 100%;
  font-size: 12px;
  padding: 7px 0px 7px 0px;
  border: 1px solid #E7E7E7;
  margin-top: 10px;
  text-indent: 35px;
  border-radius: 1px;
  color: #999999;
}

#myUL2, #myUL, #myUL3 {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

#myUL2 li a, #myUL li a, #myUL3 li a {
  margin-top: -1px; /* Prevent double borders */
  color: #646464;
  padding: 8px 12px;
  text-decoration: none;
  font-size: 12px;
  display: block
}

#myUL2 li a:hover:not(.header), #myUL li a:hover:not(.header), #myUL3 li a:hover:not(.header) {
  background-color: #E0ECFB;
}
.liActive {
  background-color: #E0ECFB;
  border: 1px solid #ddd;

  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    color: #1B9AF7 !important;
  }
}
.disablecss {
  color: lightgray !important;
}
</style>


<!-- https://stackoverflow.com/questions/47765755/how-to-get-child-components-data-in-vuejs -->
