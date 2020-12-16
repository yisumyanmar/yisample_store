<template>
  <div class="standard">
    <div class="notes-box">
      <div class="notes_title">温馨提示</div>
      <div class="notes_content">
        <p>必须添加商品规格才能在移动端和PC端显示商品</p>
      </div>
    </div>
    <div class="specification">
      <p class="goods_spec">商品规格</p>
      <div class="g_size" v-for="(item, index) in $store.state.spec_data.group" :key="index">
        <span class="fl">{{item.name}}：</span>
        <ul class="fl">
          <li
            style="margin:2px"
            v-for="(spec, indexByItem) in $store.state.spec_data.children"
            v-if="index == spec.spec_id"
            :key="spec.id"
            :class="{color:status[indexByItem]}"
            @click="tab1(indexByItem, spec, index)"
          >{{spec.item}}</li>
          <div class="edit_btn">
            <div v-if="!item.btn">
              <el-button
                style="margin-left:20px"
                type="info"
                plain
                @click="addStyle(item,index)"
              >＋添加规格值</el-button>
            </div>
            <div v-if="item.btn">
              <input placeholder="规格值名称" class="edit_input" v-model="item.spec_name" />
              <el-button size="mini" type="primary" @click="confirm(item,index)">确认</el-button>
              <el-button size="mini" type="danger" @click="cancel(item,index)">取消</el-button>
            </div>
          </div>
        </ul>
      </div>
    </div>
    <div class="g_editss"></div>
    <div class="tijiao">
      <span @click="submit">确认提交</span>
    </div>
  </div>
</template>
<script>
//import "../../../../../../../js/jquery.form"
import Vue from "vue";
import qs from "qs";
export default {
  name: "standard",
  data() {
    return {
      status: [false],
      specResult: [],
      inputList: {},
      btn: false,
      spec_name: ""
    };
  },
  methods: {
    //提交
    submit() {
      // let item = {};
      // $("#myForm input").each(function(index, item){
      //     eval($(item).attr('name')+ ' = '+ $(item).val())
      // })
      // let data = $("#myForm").formToArray();
      // console.log(data)
      let that = this;
      let inputList = {};
      let flag = false;
      let tmp = {};
      let key;
      //	console.log($('#spec_input_tab tr'))
      $("#spec_input_tab tr").each(function(index, ele) {
        //  console.log(ele);
        console.log("ele",ele);
        $(ele)
          .find("input")
          .each(function(index, ele) {
            // console.log(ele)
            key = $(ele).attr("data-key");
            let name = $(ele).attr("name");
            let val = $(ele).val();
            tmp[name] = val;
            inputList[key] = {};
            if (val === "" && name !== 'pic_url' && typeof name !== "undefined") {
              flag = true;
            }
          });
        if (typeof key !== "undefined") {
          inputList[key] = tmp;
        }
        tmp = {};
      });
      //	console.log(inputList)
      // if (flag !== true) {
      //   this.$message({
      //     duration: 1000,
      //     type: "error",
      //     message: "规格信息错误"
      //   });
      // } else {
        this.$HTTP(this.$httpConfig.addGoodsSpec, { item: inputList }, "post")
          .then(res => {
            this.$message({
              duration: 1000,
              message: res.data.message
            });
            this.$emit("selectTab");
            this.$store.state.tab_state = 2;
            this.$emit("getParameter");
            if (!this.$store.state.tab_Index[2]) {
              this.$store.state.tab_Index.push(2);
            }
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      // }
    },
    //选择规格
    tab1(index, spec, specGroupId) {
      //	console.log(spec)
      this.specResult[specGroupId] = [];
      if (this.status[index] === true) {
        this.$set(this.status, index, false);
      } else {
        this.$set(this.status, index, true);
      }
      // console.log(this.specResult);
      for (let i = 0; i < this.status.length; i++) {
        if (this.status[i] === true) {
          if (this.$store.state.spec_data.children[i].spec_id == specGroupId) {
            this.specResult[specGroupId].push(
              this.$store.state.spec_data.children[i].id
            );
          }
        }
      }
      //	console.log(this.specResult)
      this.getSpecItem();
    },
    /**
     * 合并单元格
     */
    mergeCell(id) {
      var tab = document.getElementById(id); //要合并的tableID
      var maxCol = 2,
        val,
        count,
        start; //maxCol：合并单元格作用到多少列
      if (tab != null) {
        for (var col = maxCol - 1; col >= 0; col--) {
          count = 1;
          val = "";
          for (var i = 0; i < tab.rows.length; i++) {
            if (val == tab.rows[i].cells[col].innerHTML) {
              count++;
            } else {
              if (count > 1) {
                //合并
                start = i - count;
                tab.rows[start].cells[col].rowSpan = count;
                for (var j = start + 1; j < i; j++) {
                  tab.rows[j].cells[col].style.display = "none";
                }
                count = 1;
              }
              val = tab.rows[i].cells[col].innerHTML;
            }
          }
          if (count > 1) {
            //合并，最后几行相同的情况下
            start = i - count;
            tab.rows[start].cells[col].rowSpan = count;
            for (var j = start + 1; j < i; j++) {
              tab.rows[j].cells[col].style.display = "none";
            }
          }
        }
      }
    },
    //获取编辑调用的接口
    confirm(item) {
      if (item.spec_name) {
        var str = item.spec_name.replace(/\s+/g, "");
        if (str == "") {
          this.$message("输入信息不能为空");
          return "";
        } else {
          this.$HTTP(this.$httpConfig.confirmGoodsItem, {
            spec_id: Number(item.id),
            item: str
          }).then(res => {
            if (res.data.status === 1) {
              this.$HTTP(
                this.$httpConfig.getGoodsSpecInfo,
                { id: this.$store.state.three_class_id },
                "post"
              ).then(res => {
                this.$store.state.spec_data = res.data.data;
              });
            }
          });
        }
      } else {
        this.$message("输入信息不能为空");
        return "";
      }
    },
    //取消
    cancel(item, index) {
      item.btn = false;
      Vue.set(this.$store.state.spec_data.group[index], "btn", false);
    },
    addStyle(item, index) {
      Vue.set(this.$store.state.spec_data.group[index], "btn", true);
    },
    //获取规格项
    getSpecItem() {
      this.$HTTP(
        this.$httpConfig.getGoodsSpec,
        { spec: this.specResult },
        "post"
      )
        .then(res => {
          $(".g_editss").html("");
          $(".g_editss").append(res.data.data);
          let id = "spec_input_tab";
          this.mergeCell(id);
          this.$nextTick(() => {
            this.addUploadImg();
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    addUploadImg() {
      let _this = this;
      $(".uploadBtn").on("change", function(e) {
        _this.uploadImg(e.target.files[0], e.target);
      });
    },
    uploadImg(file, _dom) {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      this.axios
        .post(
          this.$store.state.image_api_url + "FileUpload/getGoodsImageConfig",
          qs.stringify({})
        )
        .then(res => {
          if (res.data.status == 0) {
            this.$layer.msg(data.message);
            loading.close();
            return;
          }
          let data = res.data.data;
          this.imageConf = data.config;
          this.imageToken = data.token;
          this.sToken = data.s_token;

          var formData = new FormData();
          formData.append("fileData", file);
          formData.append("imageToken", this.imageToken);
          formData.append("sessionToken", this.sToken);
          this.axios
            .post(
              this.$store.state.image_api_url +
                "FileUpload/uploadImageToLocal/",
              formData
            )
            .then(res => {
              let _data = res.data;
              if (_data.status == 1) {
                this.$message.success(_data.message);
                $(_dom)
                  .siblings("input[type='hidden']")
                  .val(_data.data);
                $(_dom)
                  .parent()
                  .siblings(".showImg")
                  .find("img")
                  .attr("src", this.URL + _data.data);
                loading.close();
              } else {
                this.$message.warning(_data.message);
                loading.close();
              }
            });
        });
    }
  }
};
</script>
<style>
.g_editss .table {
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  margin-top: 15px;
}
.g_editss .table tr td {
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  text-align: center;
  vertical-align: inherit;
  position: relative;
}
.g_editss .table tr td span {
  background: #088be6;
  display: inline-block;
  color: #ffffff;
  font-size: 12px;
  border-radius: 4px;
  line-height: 24px;
  width: 58px;
  height: 24px;
  position: relative;
  bottom: -1px;
  z-index: -1;
}

.g_editss .table tr td b {
  font-weight: bold;
  color: #333;
}
.g_editss .table tr td input {
  padding-left: 5px;
  height: 32px;
  border: 1px solid #cccccc;
}
.uploadBtn {
  width: 58px;
  height: 24px;
  border: none;
  background: #088be6;
  color: #ffffff;
  font-size: 12px;
  border-radius: 4px;
  opacity: 0;
  position: absolute;
}
.uploadImg {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  opacity: 0;
}
</style>

<style lang="less" scoped>
.standard {
  height: auto;
  min-height: 100px;
  line-height: 20px;
  padding: 10px;
  border-top: 0;
  color: #333;
  .specification {
    border-left: 1px solid #dddddd;
    border-right: 1px solid #dddddd;
    border-top: 1px solid #dddddd;
    margin-bottom: 25px;
    .g_type {
      padding-left: 80px;
      border-bottom: 1px solid #ddd;
      span {
        margin: 10px 0;
        display: inline-block;
      }
      select {
        margin: 10px 0;
        width: 288px;
        height: 32px;
        border: 1px solid #cccccc;
      }
    }
    .goods_spec {
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      padding-left: 80px;
      font-weight: bold;
    }
    .g_size {
      padding-left: 100px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      span {
        margin: 18px 0;
      }
      ul {
        margin: 12px 0;
        li {
          padding: 0 5px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background-color: #ddd;
          color: #333;
          display: block;
          margin-right: 25px;
          float: left;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }
        li.color {
          background-color: #f7bc0a;
          color: #fff;
        }
      }
    }
  }
  .g_editss {
    margin-bottom: 25px;
    span {
      background: red;
    }
  }

  .tijiao {
    height: 32px;
    border-radius: 6px;
    background: #f7bc0a;
    width: 199px;
    span {
      display: block;
      line-height: 32px;
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
  }
  .edit_btn {
    display: inline-block;
    margin: 1px;
    line-height: 50px;
    padding: 1px;
  }
  .edit_input {
    vertical-align: middle;
    margin: 10px;
    line-height: 10px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    height: 26px;
  }
}
</style>
