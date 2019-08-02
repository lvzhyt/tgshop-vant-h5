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
            <van-collapse-item title="标题1" name="1">
                <van-cell v-for="item in routers" :title="item.title" :key="item.name" is-link :to="item.name" />
            </van-collapse-item>
            <van-collapse-item title="标题2" name="2">
                <van-button @click="logout">退出</van-button>
            </van-collapse-item>
            <van-collapse-item title="标题3" name="3" disabled>内容</van-collapse-item>
        </van-collapse>
    </div>
</template>

<script>
    import { Search, Swipe, SwipeItem,Image} from 'vant';
    import { Collapse, CollapseItem } from 'vant';
    import { List,Toast } from 'vant';
    import { Cell, CellGroup } from 'vant';
    import {setToken} from "../../libs/util";
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
                    }
                ]
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
                setToken('')
                Toast('退出登录')
                this.$router.push('home')
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
