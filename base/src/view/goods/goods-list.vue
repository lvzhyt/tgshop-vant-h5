<template>
    <div class="goods-list-container">
        <van-row>
            <van-col span="1">
                <div class="search-nav" @click="onNavBackClick">
                    <van-icon name="arrow-left" />
                </div>
            </van-col>
            <van-col span="23">
                <van-search
                        v-model="searchValue"
                        :placeholder="searchPlaceHolder"
                        show-action
                        shape="round"
                        @focus="onSearchFocus"
                >
                    <div slot="action" @click="onSearchFocus">搜索</div>
                </van-search>
            </van-col>
        </van-row>
        <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoadSearch"
        >

            <van-card
                    v-for="item in list"
                    class="goods-card"
                    :title="item.skuGoodsName"
                    :thumb="item.specFacePictures"
                    @click="onGoodsItemClick(item)"
            >
                <div slot="tags" v-if="item.tags">
                    <van-tag  v-for="tag in tags.split(',')" plain round type="danger" class="goods-item-tag">{{tag}}</van-tag>
                </div>
                <div slot="price" class="goods-item-price">
                    <div v-if="item.promotePrice">
                        <span class="price-pre">¥</span>
                        <span class="price-val">{{item.promotePrice}}</span>
                        <span class="price-origin">¥{{item.salePrice}}</span>
                    </div>
                    <div v-if="!item.promotePrice">
                        <span class="price-pre">¥</span>
                        <span class="price-val">{{item.salePrice}}</span>
                    </div>

                </div>
                <div slot="bottom">
                    <div class="goods-item-bottom" v-if="item.commentNum">评价{{item.commentNum}}</div>
                    <div class="goods-item-bottom">{{item.shopName}}</div>
                    <van-divider class = "goods-item-divider"/>
                </div>
<!--                <div slot="footer">-->
<!--                    <van-button size="mini">按钮</van-button>-->
<!--                    <van-button size="mini">按钮</van-button>-->
<!--                </div>-->

            </van-card>

        </van-list>


        <div>

        </div>
    </div>
</template>

<script>
    import {Row, Col, NavBar, Icon, Search, Toast} from 'vant';
    import { Card,Tag,Button,List,Cell,Divider   } from 'vant';
    import { searchGoodsApi } from '../../api/appApi';

    export default {
        name: "goods-list",
        components:{
            [NavBar.name]:NavBar,
            [Search.name]:Search,
            [Row.name]:Row,
            [Col.name]:Col,
            [Card.name]:Card,
            [Tag.name]:Tag,
            [Button.name]:Button,
            [List .name]:List ,
            [Cell .name]:Cell ,
            [Divider .name]:Divider ,
            [Icon.name]:Icon
        },
        data() {
            return {
                searchValue: '',
                searchPlaceHolder: '请输入搜索关键词',
                list: [],
                loading: false,
                finished: false,
                page: {
                    pageNum: -1,
                    pageSize: 10,
                    totalElements: 0,
                    totalPages: 0
                },
                sortField: ''
            }
        },
        methods:{
            onSearchClick (){
                this.$toast('search');
                let val = this.searchValue?this.searchValue:this.searchPlaceHolder
                let option ={
                    name: 'goods-list',
                    params: {
                        searchValue: val
                    }
                }
                this.$route.push(option)
            },
            onNavBackClick() {
                this.$router.go(-1);
            },
            onSearchFocus() {
                let option ={
                    name: 'search',
                    params: {
                        searchValue: this.searchValue,
                        searchPlaceHolder:this.searchPlaceHolder
                    }
                }
                this.$router.push(option)
            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    for (let i = 0; i < 10; i++) {
                        let item = {

                        }
                        this.list.push(this.list.length + 1);
                    }
                    // 加载状态结束
                    this.loading = false;

                    // 数据全部加载完成
                    if (this.list.length >= 40) {
                        this.finished = true;
                    }
                }, 500);
            },
            onLoadSearch(){
              let data = {
                  search: this.searchValue,
                  pageNum: this.page.pageNum+1,
                  pageSize: this.page.pageSize,
                  sortField: this.sortField
              }
                searchGoodsApi(data).then(res=>{
                    // 加载状态结束
                    this.loading = false;
                    const {result,message,data} = res.data
                    if(result){
                        this.page.pageNum = data.pageNum
                        this.page.pageSize = data.pageSize
                        this.page.totalElements = data.totalElements
                        this.page.totalPages =  data.totalPages
                        let dataArr = data.data
                        for (let i = 0; i < dataArr.length; i++) {
                            this.list.push(dataArr[i]);
                        }
                        if(this.page.pageNum===this.page.totalPages-1){
                            this.finished = true;
                        }
                    }else {
                        Toast(message)
                    }
                }).catch(err=>{
                    // 加载状态结束
                    this.loading = false;
                })
            },
            onGoodsItemClick(item){
                let option = {
                    name: 'goods-detail',
                    params: {
                        skuId: item
                    }
                }
                this.$router.push(option)
            }
        },
        mounted() {
            if(this.$route.params.searchValue){
                this.searchValue = this.$route.params.searchValue
            }
            if(this.$route.params.searchPlaceHolder){
                this.searchPlaceHolder = this.$route.params.searchPlaceHolder
            }
            this.onLoadSearch()
        }
    }
</script>

<style scoped>
    .goods-list-container{
        background-color: #ffffff;
    }
    .search-nav{
        background-color: #ffffff;
        height:53px;
        width: 31px;
        vertical-align: middle;
        text-align: center;
    }
    .search-nav i{
        margin-top: 18px;
    }
    .goods-card{
        background-color: #ffffff;
    }
    .goods-item-divider{

    }
    .goods-item-tag{
        margin-right: 5px;
        padding: 2px;
    }
    .goods-item-price{
        padding-top: 10px;
        color: #ff4444;

    }
    .price-pre{
        font-size: 13px;

    }
    .price-val{
        font-size: 16px;
        font-weight:bold;
        /*color: #ff4444;*/
        /*font-weight:bold;*/
    }
    .price-origin{
        font-size: 12px;
        color: #979797;
        margin-left: 5px;
        text-decoration:line-through
    }
    .goods-item-bottom{
        font-size: 10px;
        color: #898989;
    }
</style>
