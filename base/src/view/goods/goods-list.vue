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
                        @focus="onSearchFocus"
                >
<!--                    <div slot="action" @click="onSearchClick">搜索</div>-->
                </van-search>
            </van-col>
        </van-row>
        <div>
            goodsList
        </div>
    </div>
</template>

<script>
    import { NavBar,Icon,Search } from 'vant';
    import { Row, Col } from 'vant';

    export default {
        name: "goods-list",
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

</style>
