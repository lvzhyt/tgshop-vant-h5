<template>
    <div>
        <van-search :placeholder="searchPlaceHolder" v-model="searchValue" shape="round" @focus="onHomeSearchFocus" />
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img class="swipe-img" v-lazy="image" />
            </van-swipe-item>
        </van-swipe>
<!--        <img v-for="img in images" :src="img" >-->

        <van-collapse v-model="activeNames">
            <van-collapse-item title="路由" name="1">
                <van-cell v-for="item in routers" :title="item.title" :key="item.name" is-link :to="item.name" />
            </van-collapse-item>
            <van-collapse-item title="标题2" name="2">
                <van-cell @click="logout">退出</van-cell>
            </van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
        </van-collapse>

        <van-tabbar v-model="activeTab">
            <van-tabbar-item name="home" to="/home" icon="wap-home">首页</van-tabbar-item>
            <van-tabbar-item name="kind" to="/category" icon="apps-o">分类</van-tabbar-item>
            <van-tabbar-item name="find" to="/find" icon="points">发现</van-tabbar-item>
            <van-tabbar-item name="cart" to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
            <van-tabbar-item name="my-page" to="/user" icon="manager-o">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import { Search, Swipe, SwipeItem,Image} from 'vant';
    import { Collapse, CollapseItem } from 'vant';
    import { List,Toast,Tabbar,TabbarItem } from 'vant';
    import { Cell, CellGroup,Button } from 'vant';
    import {setToken} from "@/libs/util";
    import {logoutApi} from '../../api/user'
    import {getToken} from "../../libs/util";

    export default {
        name: "home.vue",
        components: {
            [Search.name]: Search,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [Image.name]: Image,
            [Collapse.name]: Collapse,
            [CollapseItem.name]: CollapseItem,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [Button.name]: Button,
            [List.name]: List
        },
        data() {
            return {
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg',
                    'https://img.yzcdn.cn/vant/apple-3.jpg',
                    'https://img.yzcdn.cn/vant/apple-4.jpg'
                ],
                activeNames: ['1'],
                searchValue: '',
                searchPlaceHolder: 'T恤',
                routers: [
                    {
                        name: 'search',
                        title: '搜索'
                    },
                    {
                        name: 'goods-list',
                        title: '商品列表'
                    },
                    {
                        name: 'honey',
                        title: 'honey'
                    }
                ],
                activeTab: 'home'
            };
        },
        methods: {
            onHomeSearchFocus() {
                let option ={
                    name: 'search',
                    params: {
                        searchValue: this.searchValue,
                        searchPlaceHolder: this.searchPlaceHolder
                    }
                }
                this.$router.push(option)
            },
            logout() {
                let token = getToken()
                logoutApi(token).then(res=>{
                    console.log(res)
                    setToken('')
                    Toast('退出登录')
                    this.$router.push('home')
                })

            }
        }
    }
</script>

<style scoped>
    .swipe-img{
        width: 370px;
        height: 200px;
    }
</style>
