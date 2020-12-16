<template>
    <!-- 商品规格编辑 -->
    <div class="spec">
        <div class="g_att">
            <h1 class="t_title">
                <span class="size16">店内分类列表</span>
                <div @click="addNextClass(0)" class="t_add fr">添加店内分类</div>
            </h1>
            <div class="notes-box">
                <div class="notes_title">温馨提示</div>
                <div class="notes_content">
                    <p>1.发布商品后请勿随意删除分类</p>
                </div>
            </div>
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    row-key="id"
                    border
                    lazy
                    :load="load"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <!--<el-table-column-->
                <!--prop="id"-->
                <!--label="id"-->
                <!--width="180">-->
                <!--</el-table-column>-->
                <el-table-column
                        prop="class_name"
                        label="类名"
                        width="180">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                        <el-button v-if="scope.row.status != 3"
                                   size="mini"
                                   type="success"
                                   @click="addNextClass(scope.row.id,scope.row)">添加下级分类
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--<div v-else class="center_else">没有数据</div>-->
        </div>
    </div>
</template>
<script>
    export default {
        name: "spec",
        data() {
            return {
                tableData: [],
                resolveListTwo: [],
                resolveListThree: [],
            };
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                this.$HTTP(this.$httpConfig.storeClassList, {}, 'post').then(res => {
                    this.tableData = res.data.data;
                    this.tableData.forEach((item, index) => {
                        item.hasChildren = true
                    })
                }).catch(err => {
                    console.log(err);
                })
            },
            load(tree, treeNode, resolve) {

                this.$HTTP(this.$httpConfig.nextClass, {id: tree.id}, 'post').then(res => {
                    var list = res.data.data;
                    list.forEach((item, index) => {
                        if (item.status != 3) {
                            item.hasChildren = true
                        }
                    });

                    if (tree.status == 1) { //添加二级分类
                        this.operationTwo(tree, list, resolve);
                    }
                    if (tree.status == 2) { //添加三级分类
                        this.operationThress(tree, list, resolve)
                    }
                    resolve(list)
                }).catch(err => {
                    console.log(err)
                    resolve([])
                })
            },
            operationTwo(tree, list, resolve) {
                var index = this.getIndex(tree.id, this.tableData)
                this.$set(this.tableData[index], "children", list);
                this.resolveListTwo.push({id: tree.id, status: tree.status, resolve: resolve})
            },
            operationThress(tree, list, resolve) {
                var index = this.getIndex(tree.f_id, this.tableData);
                var index1 = this.getIndex(tree.id, this.tableData[index].children);
                this.tableData[index].children[index1].children = list;
                this.resolveListThree.push({id: tree.id, status: tree.status, resolve: resolve})
            },
            handleDelete(index, item) {

                this.$HTTP(this.$httpConfig.delClass, {id: item.id}).then(res => {
                    if (item.status == 1) {
                        var index = this.getIndex(item.id, this.tableData)
                        this.tableData.splice(index, 1);
                    }
                    if (item.status == 2) {
                        var index = this.getIndex(item.f_id, this.tableData)
                        var index1 = this.getIndex(item.id, this.tableData[index].children)
                        this.tableData[index].children.splice(index1, 1)
                    }
                    if (item.status == 3) {
                        var threeIndex = '',threeIndex1 = '',threeIndex3 = ''
                        this.tableData.forEach((item1, index1) => {
                            if (item1.children) {
                                for (var i = 0; i < item1.children.length; i++) {
                                    if (item1.children[i].id == item.f_id) {
                                        threeIndex = index1;
                                        threeIndex1 = i;
                                    }
                                }
                            }
                        });
                        threeIndex3 = this.getIndex(item.id,this.tableData[threeIndex].children[threeIndex1].children)
                        this.tableData[threeIndex].children[threeIndex1].children.splice(threeIndex3,1);

                    }
                    this.$message({
                        type: 'success',
                        message: "删除成功"
                    });
                }).catch(err => {
                    console.log(err)
                })

            },
            getIndex(id, array) {
                var result = '';
                array.forEach((item, index) => {
                    if (item.id == id) {
                        result = index
                    }
                });

                return result
            },
            handleEdit(item){
                this.$prompt('请输入分类名称', '正在进行店内分类名称修改', {
                    confirmButtonText: '确定修改',
                    cancelButtonText: '取消',
                    inputValue:item.class_name,
                }).then(({value}) => {

                    this.$HTTP(this.$httpConfig.updateClass, {class_name: value, id: item.id}, 'post').then(res => {
                        this.$message({
                            type: 'success',
                            message: "修改成功"
                        });
                        item.class_name = value;
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: err.data.message
                        });
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消修改'
                    });
                });
            },
            addNextClass(id, item) {
                this.$prompt('请输入分类名称', '正在进行店内分类添加', {
                    confirmButtonText: '确定添加',
                    cancelButtonText: '取消',
                }).then(({value}) => {

                    this.$HTTP(this.$httpConfig.addStoreClass, {class_name: value, f_id: id}, 'post').then(res => {
                        this.$message({
                            type: 'success',
                            message: "创建成功"
                        });
                        if (id == 0) {
                            this.getList();
                        } else {
                            if (item.status == 1) {
                                var index = this.getIndex(item.id, this.tableData);
                                this.addTwo(item.id, index);
                            }
                            if (item.status == 2) {
                                this.addThree(item);
                            }
                        }
                    }).catch(err => {
                        this.$message({
                            type: 'error',
                            message: err.data.message
                        });
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消添加'
                    });
                });
            },
            addThree(item) {
                this.$HTTP(this.$httpConfig.nextClass, {id: item.id}, "post").then(res => {
                    var index = this.getIndex(item.f_id, this.tableData);
                    var index1 = this.getIndex(item.id, this.tableData[index].children);
                    this.tableData[index].children[index1].hasChildren = true;
                    this.$set(this.tableData[index].children[index1], 'children', res.data.data);
                    this.resolveListThree.forEach((item1, index3) => {
                        if (item1.id == item.id) {
                            this.resolveListThree[index3].resolve(res.data.data);
                        }
                    })
                }).catch(err => {
                    console.log(err)
                })
            },
            addTwo(id, index) {
                this.$HTTP(this.$httpConfig.nextClass, {id: id}, "post").then(res => {
                    this.tableData[index].hasChildren = true;
                    this.$set(this.tableData[index], 'children', res.data.data);
                    //this.resolve(res.data.data);
                    res.data.data.forEach((item, index) => {
                        item.hasChildren = true
                    })
                    this.resolveListTwo.forEach((item, index) => {
                        if (item.id == id) {
                            this.resolveListTwo[index].resolve(res.data.data);
                        }
                    })
                }).catch(err => {
                    console.log(err)
                })
            }
        }
    };
</script>

<style>
    .el-table__indent{

    }
</style>

<style lang="less" scoped>
    .el-button {
        padding: 5px 12px;
    }

    .spec {
        width: 1000px;
        padding-bottom: 80px;

        .t_add {
            background: url(../../../../assets/plus2.jpg) no-repeat 35px #ff9f24;
            width: 135px;
            height: 32px;
            border: 1px solid #ff920b;
            border-radius: 4px;
            font-size: 12px;
            font-weight: normal;
            cursor: pointer;
            color: #fff;
            line-height: 32px;
            text-indent: 50px;
        }

        .g_att {
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
            }
        }

        .center {
            margin-top: .3rem;

            .page_size {
                text-align: center;
                padding: 20px;
                width: 95%;
            }

            .search {
                padding: 10px;
                margin-bottom: 10px;

                span {
                    margin-left: 10px;
                }
            }
        }

        .center_else {
            text-align: center;
            font-size: 15px;
            color: #ff920b;
            line-height: 250px;
        }
    }
</style>
