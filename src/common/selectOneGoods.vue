<template>
    <div>
        <el-form-item v-if="!status" v-show="hasCityData.length==0">
            <el-button type="success" @click.native="select">{{giveFlag ? '选择赠送商品' : '选择商品'}}</el-button>
            <el-dialog title="商品列表" :visible.sync="dialogTableVisible">
                <el-table @current-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable" :data="girdData" highlight-current-row width="700" height="300">
                    <el-table-column label="商品名称" width="300px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-radio v-model="isSelected" :label="scope.$index">{{scope.row.title}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price_market" label="价格"></el-table-column>
                    <el-table-column prop="stock" label="库存"></el-table-column>
                </el-table>
                <div class="page_size">
                    <!-- , jumper -->
                    <el-pagination background layout="total,prev, pager, next" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
                    </el-pagination>
                    <el-button class="select-submit-btn" @click="submitSelect" type="success">确认</el-button>
                </div>
            </el-dialog>
        </el-form-item>
         
        <el-form-item v-else><!-- v-show="updateGoods.length" -->
            <el-button type="success" @click.native="updateSelect">{{giveFlag ? '选择赠送商品' : '选择商品'}}</el-button>
            <el-dialog title="商品列表" :visible.sync="dialogTableVisible">
                <el-table @current-change="handleSelectionChange" tooltip-effect="dark" ref="multipleTable" :data="girdData" highlight-current-row width="700" height="300">
                    <el-table-column label="商品名称" width="300px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-radio v-model="isSelected" :label="scope.$index">{{scope.row.title}}</el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column prop="price_market" label="价格"></el-table-column>
                    <el-table-column prop="stock" label="库存"></el-table-column>
                </el-table>
                <div class="page_size">
                    <el-pagination background layout="total,prev, pager, next" :page-size="page_size" @current-change="handleCurrentChange" :total="page">
                    </el-pagination>
                    <el-button class="select-submit-btn" @click="submitSelect" type="success">确认</el-button>
                </div>
            </el-dialog>
        </el-form-item>
        <!-- {{updateGoods}} parent -->
        <el-form-item :label="listTitle">
            <el-table v-if="!status" :data="hasCityData" border style="width: 70%;">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="商品名称">
                </el-table-column>
                <el-table-column prop="price_market" label="价格">
                </el-table-column>
                <el-table-column prop="stock" label="库存">
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                        <el-button @click="viewItem(scope.row.id)" size="mini" icon="el-icon-view"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table v-else-if="updateGoods" :data="updateGoods" border style="width: 70%;">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="商品名称">
                </el-table-column>
                <el-table-column prop="price_market" label="价格">
                </el-table-column>
                <el-table-column prop="stock" label="库存">
                </el-table-column>
                <el-table-column label="操作" width="130px">
                    <template slot-scope="scope">
                        <el-button @click="deleteItem(scope.row.id)" size="mini" type="danger" icon="el-icon-delete"></el-button>
                        <el-button @click="viewItem(scope.row.id)" size="mini" icon="el-icon-view"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <!-- {{updateGoodsChild}}child -->
        <el-form-item :label="listTitle1">
            <el-table v-if="!status" :data="hasCityDataChild" border style="width: 70%;">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="商品名称">
                </el-table-column>
                <el-table-column label="操作" width="130px" prop="item">
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox :label="scope.row.item"></el-checkbox>
                        </el-checkbox-group>
                        <!-- <input type="checkbox" :value="scope.row.item" v-model="checkList"> <span class="checkbox-label"> {{scope.row.item}} </span> <br> -->
                    </template>
                </el-table-column>
                <el-table-column prop="price_market" label="价格">
                </el-table-column>
                <el-table-column prop="stock" label="库存">
                </el-table-column>
            </el-table>
            <el-table v-else-if="updateGoodsChild" :data="updateGoodsChild" border style="width: 70%;">
                <el-table-column prop="id" label="ID">
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="title" label="商品名称">
                </el-table-column>
                <el-table-column label="操作" width="130px" prop="item">
                    <template slot-scope="scope">
                        <el-checkbox-group v-model="checkList">
                            <el-checkbox :label="scope.row.item"></el-checkbox>
                        </el-checkbox-group>
                    </template>
                </el-table-column>
                <el-table-column prop="price_market" label="价格">
                </el-table-column>
                <el-table-column prop="stock" label="库存">
                </el-table-column>
            </el-table>
        </el-form-item>
    </div>
</template>
<script>
// import logs from 'D:/TDA Project/data.js' ////////////
export default {
    data() {
        return {
            radio: '1',
            dialogTableVisible: false,
            girdData: [],
            hasCityData: [], //已经存在于服务器的地区数据
            multipleSelection: [],
            hasCityId: null, //已存在/选中的数据，只有ID
            status: 0, //0代表是新增，1代表是修改
            id: 0,
            updateGoods: [],
            updateGoodsChild: [],
            hasCityDataChild: [],
            page_size: 0, //每页显示几个
            page: 0, //总页数
            currentPage: 1, //当前页
            isSelected:'',
            listTitle:'',
            listTitle1:'',
            checkList: [],
            updateId: null,
            updateAgain: false
        }
    },
    props: {
        sendStatus: '',
        sendUpdateData: '',
        giveFlag:false,
        sendUpdateId: null,
        lookcount: 0,
        addIntegral: ''
    },
    created() {
        
    },
    watch: {
        sendStatus() {
            this.status = this.sendStatus;
        },
        sendUpdateData() {
            if(this.updateAgain == true) {
            } else {
                if(this.sendUpdateData == '') {
                    this.updateGoods = []
                } else {
                    this.updateGoods = this.sendUpdateData;
                }
                this.checkList = []
                this.updateGoodsChild = []
                this.updateGoodsChild = this.updateGoods[0].GoodsSpec
                // for(let i = 0; i < this.updateGoodsChild.length; i++) {
                //     this.checkList.push(this.updateGoodsChild[i].item)
                // }
                for(let i = 0; i < this.updateGoodsChild.length; i++) {
                    if(this.updateGoodsChild[i].isAdded == true) {
                        this.checkList.push(this.updateGoodsChild[i].item)
                    }
                }
            }
        },
        sendUpdateId() {
            this.updateId = this.sendUpdateId
            if(this.updateId == 'addFullcut') {
            } else {
                this.createdSelect()
            }
        },
        checkList() {
            // alert(this.lookcount)
            if (this.status) {
                let tempArr = []
                let tempList = []
                this.updateGoods[0].GoodsSpec = []
                for(let j = 0; j < this.checkList.length; j++) {
                    for(let i = 0; i < this.updateGoodsChild.length; i++) {
                        if(this.checkList[j] == this.updateGoodsChild[i].item) {
                            tempArr.push(this.updateGoodsChild[i].id)
                            tempList.push(this.updateGoodsChild[i])
                            this.updateGoods[0].GoodsSpec.push(this.updateGoodsChild[i])
                        }
                    }
                }
                let groupId = tempArr;
                this.hasCityId = groupId;
                this.sendDataUp(this.updateGoods, this.lookcount);
            } else {
                let tempArr = []
                let tempList = []
                for(let j = 0; j < this.checkList.length; j++) {
                    for(let i = 0; i < this.hasCityDataChild.length; i++) {
                        if(this.checkList[j] == this.hasCityDataChild[i].item) {
                            tempArr.push(this.hasCityDataChild[i].id)
                            tempList.push(this.hasCityDataChild[i])
                        }
                    }
                }
                let groupId = tempArr;
                this.hasCityId = groupId;
                if(this.addIntegral && this.addIntegral == 'addIntegral') {
                    // alert('hello ' + this.checkList.length)
                    this.sendDataAddTnte(tempList);
                } else {
                    this.sendData(tempList, this.lookcount);
                }
            }
        },
    },
    
    mounted() {
        console.log(this.giveFlag,222);
        if(this.giveFlag){
            this.listTitle = '选择赠送产品';
            // this.listTitle1 = '已选择赠送产品';
        }else {
            // this.listTitle = '已选择优惠产品';
            this.listTitle = '选择优惠产品';
        }
    },
    methods: {
        /*翻页*/
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
            this.select();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if (val.length && val.length > 1) {
                console.log(val)
            }
        },
        // 删除单个商品
        deleteItem(id) {
            if(this.status) {
                if(this.updateGoods) {
                    for (var i in this.updateGoods) {
                        if (this.updateGoods[i].id == id) {
                            this.updateGoods.splice(i, 1);
                            // delete this.updateGoods;
                            this.updateGoodsChild = []
                            this.checkList = []
                            this.hasCityId = []
                            this.sendDataUp();
                        }
                    }
                }
            } else {
                for (var i in this.hasCityData) {
                    if (this.hasCityData[i].id == id) {
                        this.hasCityData.splice(i, 1);
                        delete this.hasCityId;
                        this.hasCityDataChild = []
                        this.checkList = []
                        if(this.listTitle == '已选择优惠产品'){
                            this.listTitle = '选择优惠产品';
                        } else if(this.listTitle == '已选择赠送产品') {
                            this.listTitle = '选择赠送产品'
                        }
                    }
                }
            }
        },
        // 查看单个商品
        viewItem(id){
            window.open('http://b2b2c.shopsn.cn/shopsn_product?id=' + id);
            // window.open(logs[0].APIName[4].b2b2cshopsn + 'shopsn_product?id=' + id); ////////////
        },
        // 修改时的删除
        deleteItem2(id) {
            console.log(this.giveFlag,222)
            if (this.updateGoods[0].goods_id == id) {
                this.updateGoods = [];
                delete this.hasCityId;
            }
        },
        // 商品选择框的确认功能
        submitSelect() {
            let groupId = this.multipleSelection.id;
            this.hasCityId = groupId;
            if (this.status) {
                // this.multipleSelection.goods_id = this.multipleSelection.id;
                this.updateGoods = []
                this.updateGoods.push(this.multipleSelection);
                console.log('submitSelect ' + JSON.stringify(this.updateGoods))
                this.updateGoodsChild = []
                for(let i = 0; i < this.multipleSelection.GoodsSpec.length; i++) {
                    this.updateGoodsChild.push(this.multipleSelection.GoodsSpec[i]);
                }
                // this.sendDataUp();
            } else {
                this.hasCityData.push(this.multipleSelection);
                this.hasCityDataChild = []
                this.hasCityDataChild = this.multipleSelection.GoodsSpec
                // this.sendData();
            }
            //console.log(this.hasCityId)

            if(this.listTitle == '选择优惠产品'){
                this.listTitle = '已选择优惠产品';
            } else if(this.listTitle == '选择赠送产品') {
                this.listTitle = '已选择赠送产品'
            }
            
            this.isSelected = '';
            this.dialogTableVisible = false;
        },
        // 点了“选择商品”按钮之后弹出框
        select() {
            this.$HTTP(this.$httpConfig.getPromotionGoods,{page: this.currentPage}).then((res) => {
                let list = res.data.data.goods;
                this.hasCityId = [];
                this.girdData = [];
                for (var i in list) {
                    this.girdData.push(list[i]);
                }
                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.count);
                this.$message.success(res.data.message);
                this.dialogTableVisible = true;
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        createdSelect() {
            this.$HTTP(this.$httpConfig.getPromotionGoods,{page: this.currentPage}).then((res) => {
                let list = res.data.data.goods;
                this.hasCityId = [];
                this.girdData = [];
                for (var i in list) {
                    this.girdData.push(list[i]);
                }
                
                this.updateGoodsChild = []
                let result = this.girdData.map(i => {
                    if(i.id == this.updateId) {
                        this.updateGoodsChild.push(i)
                    }
                })

                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.count);
                this.$message.success(res.data.message);
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        updateSelect() {
            this.$HTTP(this.$httpConfig.getPromotionGoods,{page: this.currentPage}).then((res) => {
                let list = res.data.data.goods;
                this.updateAgain = true
                this.hasCityId = [];
                this.checkList = []
                this.girdData = [];
                for (var i in list) {
                    this.girdData.push(list[i]);
                }
                this.page_size = res.data.data.page_size;
                this.page = Number(res.data.data.count);
                this.$message.success(res.data.message);
                this.dialogTableVisible = true;
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        // 发送数据给父组件
        sendData(tempList, loopcount) {
            this.$emit('sendGoodsData', this.hasCityId, this.hasCityData, tempList, loopcount);
        },
        sendDataAddTnte(tempList) {
            this.$emit('sendGoodsData', this.hasCityId, this.hasCityData, tempList);
        },
        // 发送数据给父组件
        sendDataUp(data) {
            this.$emit('sendGoodsData', this.hasCityId, data); //data = this.updateGoods
        }
    },
}
</script>
<style>
.el-table th > .cell, .el-table .cell{
    text-align: left!important;
}
</style>
