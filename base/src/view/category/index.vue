<template>
    <div>
        <div>Category Page</div>
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
    import {Tabbar,TabbarItem} from "vant"

    export default {
        name: "category",
        components:{
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data(){
            return{
                activeTab: 'kind'
            }
        }
    }
</script>

<style scoped>

</style>
