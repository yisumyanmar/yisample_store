<template>
  <div class="logistics fl">
    <div class="t_tab">
      <h1 class="t_title">
        <span v-if="!status" class="size16">添加包邮地址</span>
        <span v-else class="size16">设置包邮地址</span>
        <div @click="to" class="t_m fr">返回运费模板列表</div>
      </h1>
      <div class="t-table-content">
        <table cellspacing="0" class="wtsc-table-style" style="width:100%" cellpadding="0" border="1px solid #ddd;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;height:50px;line-height:50px;">
              <th style="padding-left:5px">运送到</th>
              <th class="w110">首(件、重、体积)</th>
              <th class="w110">首费(元)</th>
              <th class="w110">续(件、重、体积)</th>
              <th class="w110">续费(元)</th>
              <th class="w110" style="border-right: 1px solid #ddd;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in itemInfo" :key="index">
              <td style="width:300px;max-height:60px;">{{item.address}}</td>
              <td>
                <input v-model="item.firstWeight" placeholder />
              </td>
              <td>
                <input v-model="item.firstPay" placeholder />元
              </td>
              <td>
                <input v-model="item.secondWeight" placeholder />
              </td>
              <td>
                <input v-model="item.secondPay" placeholder />元
              </td>
              <td style="border-right: 1px solid #ddd;">
                <i class="el-icon-delete"></i>
                <span class="pointer" @click="deleteItem(index,item)">删除</span>
                <el-popover v-model="item.popover" ref="popover4" placement="top-start" width="400" trigger="click">
                  <el-tree class="tree" :data="cityData" show-checkbox node-key="id" highlight-current ref="tree"
                    :default-checked-keys="item.hasCityId" :props="defaultProps"></el-tree>
                  <div class="bottom">
                    <el-tag class="tag" type="danger">如果本页有选择内容，先点击确认再翻页哦~</el-tag>
                    <div class="page_size">
                      <el-pagination background :current-page="currentPage" layout="prev, pager, next"
                        :page-size="page_size" @current-change="handleCurrentChange" :total="page"></el-pagination>
                    </div>
                    <div class="add-box">
                      <el-button type="success" class="add" @click="getCheckedKeys(index)">确认</el-button>
                      <el-button class="add" @click="close(index)">关闭</el-button>
                    </div>
                  </div>
                </el-popover>
                <i class="el-icon-edit"></i>
                <span class="pointer" slot="reference" @click="getCity(index)">编辑</span>
                <span class="pointer" style="margin-left: 5px;" @click="saveItem(index)">保存</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="setPay" @click="addRow()">为指定地区城市设置运费</span>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td style="border-right: 1px solid #ddd;"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "addFreightTempletPostage",
    data() {
      return {
        title: '',
        itemInfo: [],
        status: 0, //0代表是新增，1代表是修改
        params: {
          freight_id: "",
          mail_area_num: "",
          mail_area_wieght: "",
          mail_area_volume: "",
          mail_area_monery: ""
        },
        cityData: [], //所有的地址数据
        hasCityData: [], //已经存在于服务器的地区数据
        defaultProps: {
          // children: "city",
          children: "",
          label: "name"
        },
        hasCityId: [], //已存在/选中的数据，只有ID
        popover: false, //popover是否可见
        page_size: 0, //每页显示几个
        page: 0, //总页数
        currentPage: 1 //当前页
      };
    },
    mounted() {
      this.title = this.$route.meta.title;
      this.status = this.$route.params.status;
      if (this.status) {
        /*修改*/
        this.id = this.$route.params.id;
        this.queryData();
      }
    },
    watch: {
      itemInfo: {
        deep: true,
        immediate: true,
        handler(newName, oldName) {
          for (var i = 0; i < newName.length; i++) {
            var firstWeight = newName[i].firstWeight;
            var firstPay = newName[i].firstPay;
            var secondWeight = newName[i].secondWeight;
            var secondPay = newName[i].secondPay;
            if (isNaN(firstWeight)) {
              this.$message.warning("不能输入字符！");
              newName[i].firstWeight = "";
              return false;
            }
            if (isNaN(firstPay)) {
              this.$message.warning("不能输入字符！");
              newName[i].firstPay = "";
              return false;
            }
            if (isNaN(secondWeight)) {
              this.$message.warning("不能输入字符！");
              newName[i].secondWeight = "";
              return false;
            }
            if (isNaN(secondPay)) {
              this.$message.warning("不能输入字符！");
              newName[i].secondPay = "";
              return false;
            }
          }

          console.log(newName, oldName);
        }
      }
    },
    created() { },
    methods: {
      saveItem(index) {
        var arr = Array.from(new Set(this.itemInfo[index].hasCityId));
        if (this.itemInfo[index].hasCityId == "") {
          this.$message.warning("请选择配送地区！");
          return false;
        }
        this.$HTTP(
          this.$httpConfig.getFreightModelSave,
          {
            freight_id: this.id,
            id: this.itemInfo[index].id || "",
            first_thing: this.itemInfo[index].firstWeight,
            frist_money: this.itemInfo[index].firstPay,
            continued_heavy: this.itemInfo[index].secondWeight,
            continued_money: this.itemInfo[index].secondPay,
            carry_way: 0,
            area: arr || "",
            token: ""
          },
          "post"
        )
          .then(res => {
            // this.$message.success(res.data.message);
            this.queryData();
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

      addRow() {
        this.itemInfo.push({
          popover: false,
          address: "未添加地区",
          firstWeight: "",
          firstPay: "",
          secondWeight: "",
          secondPay: "",
          hasCityId: []
        });
      },
      /*翻面跳转*/
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        this.getCity1();
      },
      close(index) {
        this.itemInfo[index].popover = false;
      },
      getCheckedKeys(index) {
        //   console.log(this.$refs.tree);
        var IDs = this.$refs.tree[index].getCheckedKeys();
        var datas = this.$refs.tree[index].getCheckedNodes();
        var arr = [];
        for (var i = 0; i < datas.length; i++) {
          if (datas[i].city) {
            arr.push(datas[i]);
          }
        }
        var arr1 = [];
        // 把子数组里面的所有id放进一个数组
        arr.forEach((item, index) => {
          for (var i = 0; i < item.city.length; i++) {
            arr1.push(item.city[i].id);
          }
        });
        var arr2 = [];
        // 判断父数组里面是否包含子数组里面的id ，不包含的话放进一个数组
        datas.forEach((item, index) => {
          if (arr1.indexOf(item.id) == -1) {
            let obj = {
              name: item.name,
              id: item.id,
              disabled: true
            };
            //   arr2.push(item.name);
            arr2.push(obj);
          }
        });
        var arr3 = [];
        for (var i = 0; i < arr2.length; i++) {
          // arr3.push(this.itemInfo[index].address);
          arr3.push(arr2[i].name);
          var str = arr3.join(",");
          this.itemInfo[index].address =this.itemInfo[index].address+","+ str;
          var str1 = this.itemInfo[index].address;
          var arr4= str1.split(',');
          var arr5 = [...new Set(arr4)].join(',');
          debugger
          this.itemInfo[index].address = arr5;
        }
        for (var i in IDs) {
          for (var j in this.hasCityId) {
            if (this.hasCityId[j] == IDs[i]) {
              IDs.splice(i, 1);
              datas.splice(i, 1);
            }
          }
        }
        var Id = Array.from(new Set(IDs));
        for (var i in Id) {
          this.itemInfo[index].hasCityId.push(Id[i]);
          this.hasCityData.push(datas[i]);
        }
        this.currentPage = 1;
        this.itemInfo[index].popover = false;
        //   this.$set(this.itemInfo[index], "popover", false);
      },
      deleteItem(index, rows) {

        this.$confirm("此操作将删除这一项, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (rows.id == undefined) {
              debugger
              this.itemInfo.splice(index, 1);
              return false;
            }
            this.$HTTP(
              this.$httpConfig.getFreightModelDel,
              { id: rows.id },
              "post"
            ).then(res => {
              this.queryData();
              this.$message.success(res.message);
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      to() {
        this.$router.back();
      },
      queryData() {
        this.$HTTP(
          this.$httpConfig.getFreightModelOne,
          { freight_id: this.id },
          "post"
        )
          .then(res => {
            if (res.data.data.length != 0) {
              this.itemInfo = res.data.data;
              for (var i = 0; i < res.data.data.length; i++) {
                this.itemInfo[i].firstWeight = res.data.data[i].first_thing;
                this.itemInfo[i].firstPay = res.data.data[i].frist_money;
                this.itemInfo[i].secondWeight = res.data.data[i].continued_heavy;
                this.itemInfo[i].secondPay = res.data.data[i].continued_money;
                this.itemInfo[i].address = res.data.data[i].name.join(",");
                this.$set(
                  this.itemInfo[i],
                  "hasCityId",
                  res.data.data[i].mail_area.split(",")
                );
                this.$set(this.itemInfo[i], "popover", false);
              }
            }
            this.$message.success(res.data.message);
          })
          .catch(err => {
            this.$message.error(err);
          });
      },

      getCity1() {
        //获取省份地址
        this.$HTTP(this.$httpConfig.getArea, { page: this.currentPage }, "post")
          .then(res => {
            if (!res.data.data) {
              this.$layer.msg("暂无数据:(");
              return;
            }
            var list = [];
            list = res.data.data.prov;
            this.cityData = list;
            var arr = []; //所有选择城市id
            console.log(this.itemInfo);
            //   把所有选中的城市Id放在一个数组里面
            this.itemInfo.forEach((item, index) => {
              item.hasCityId.forEach(el => {
                arr.push(el);
              });
            });
            //   把所有选中的城市禁用
            this.cityData.forEach((item, index) => {
              if (arr.indexOf(item.id) != -1) {
                this.$set(this.cityData[index], "disabled", true);
              }
            });
            console.log(this.cityData);
            this.page_size = list.length;
            this.page = Number(res.data.data.page * list.length);
            // this.itemInfo[index].popover = true;
          })
          .catch(err => {
            this.$message.error(err);
          });
      },
      getCity(index) {
        //获取省份地址
        this.$HTTP(this.$httpConfig.getArea, { page: this.currentPage }, "post")
          .then(res => {
            if (!res.data.data) {
              this.$layer.msg("暂无数据:(");
              return;
            }
            var list = [];
            list = res.data.data.prov;
            this.cityData = list;
            var arr = []; //所有选择城市id
            console.log(this.itemInfo);
            //   把所有选中的城市Id放在一个数组里面
            this.itemInfo.forEach((item, index) => {
              item.hasCityId.forEach(el => {
                arr.push(el);
              });
            });
            //   把所有选中的城市禁用
            this.cityData.forEach((item, index) => {
              if (arr.indexOf(item.id) != -1) {
                this.$set(this.cityData[index], "disabled", true);
              }
            });
            console.log(this.cityData);
            this.page_size = list.length;
            this.page = Number(res.data.data.page * list.length);
            this.itemInfo[index].popover = true;
          })
          .catch(err => {
            this.$message.error(err);
          });
      }
    }
  };
</script>
<style>
  .logistics .el-popover {
    right: 0;
    top: 0;
  }
</style>
<style scoped>
  input {
    width: 80px;
    height: 40px;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    cursor: pointer;
  }

  /** 
* 弹出框 的样式 
*/
  .tree {
    height: 350px;
    padding: 10px 0;
    overflow: scroll;
  }

  .bottom {
    text-align: center;
    height: 120px;
    padding: 10px;
  }

  .page_size {
    text-align: center;
    padding: 10px;
    width: 95%;
    margin: 0 auto;
  }

  .address-table {
    width: 70%;
    height: 500px;
    overflow: scroll;
    margin: 10px 0 0 0;
  }

  .add {
    margin-top: 10px;
  }
</style>
<style scoped>
  .el-table-column--selection .cell {
    text-align: center;
  }

  .mainTable {
    width: 80%;
    width: 400px !important;
    height: 460px !important;
    overflow: scroll;
  }

  .el-table--fit {}

  .add-box {
    width: 400px;
    height: 40px;
    position: absolute;
  }

  .el-popper[x-placement^="right"] {
    width: 400px !important;
    height: 500px;
    position: relative;
    text-align: center;
  }

  .el-table__expanded-cell[class*="cell"] {
    padding: 0 !important;
  }

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 500px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
<style lang="less">
  .t_tab {
    .t-table-content {
      th {
        border: 1px solid #ddd;
        border-right: 1px solid #fff;
      }

      tr {
        border: 1px solid #ddd;
        border-right: 1px solid #fff;
        height: 60px;
        line-height: 60px;

        td {
          .pointer {
            cursor: pointer;
          }
        }
      }

      .setPay {
        background: #b8bcc3;
        text-align: center;
        padding: 8px;
        border-radius: 2px;
        color: #fff;
        margin-left: 10px;
      }
    }

    .t_title {
      color: #333;
      border-bottom: 1px solid #dddddd;
      overflow: hidden;
      margin-bottom: 22px;
      line-height: 50px;

      span {
        float: left;
        color: #333;
      }

      .t_m {
        background: url(../../../../assets/return.jpg) no-repeat 10px #ff9f24;
        width: 135px;
        height: 32px;
        border: 1px solid #ff920b;
        border-radius: 4px;
        font-size: 12px;
        font-weight: normal;
        cursor: pointer;
        color: #fff;
        line-height: 32px;
        text-indent: 30px;
      }
    }
  }
</style>

<style lang="less" scoped>
  .logistics {
    width: 1000px;
  }
</style>