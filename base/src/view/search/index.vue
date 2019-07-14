<template>
    <div>
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
                    @search="onSearchClick"
                >
                    <div slot="action" @click="onSearchClick">搜索</div>
                </van-search>
            </van-col>
        </van-row>
        <div id="search-empty-suggest" v-if="!searchValue">
            <div id="search-history">
                history
            </div>
            <div id="search-find">
                find
            </div>
        </div>
        <div id="search-auto-suggest" v-if="searchValue">
            search-auto-suggest
        </div>



    </div>
</template>

<script>
    import { NavBar,Icon,Search } from 'vant';
    import { Row, Col } from 'vant';

    export default {
        name: "search.vue",
        components:{
            [NavBar.name]:NavBar,
            [Search.name]:Search,
            [Row.name]:Row,
            [Col.name]:Col,
            [Icon.name]:Icon
        },
        data() {
            return {
                searchValue: '',
                searchPlaceHolder: '请输入搜索关键词'
            }
        },
        methods:{
            onSearchClick (){
                let val = this.searchValue?this.searchValue:this.searchPlaceHolder
                let option ={
                    name: 'goods-list',
                    params: {
                        searchValue: val,
                        searchPlaceHolder: this.searchPlaceHolder
                    }
                }
                this.$router.push(option)
            },
            onNavBackClick() {
                this.$router.go(-1);
            }
        },
        mounted() {
            if(this.$route.params.searchValue){
                this.searchValue = this.$route.params.searchValue
            }
            if(this.$route.params.searchPlaceHolder){
                this.searchPlaceHolder = this.$route.params.searchPlaceHolder
            }
        }
    }
</script>

<style scoped>
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

</style>
