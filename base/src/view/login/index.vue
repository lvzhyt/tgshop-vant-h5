<template>
    <div>
        <van-nav-bar
                left-text="返回"
                left-arrow
                @click-left="onNavBackClick"
        />
        <div class="login-container">
            <div>
                <van-image
                        round
                        width="150"
                        height="150"
                        src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <van-cell-group>
                    <van-field
                            v-model="username"
                            label="用户名"
                            placeholder="请输入用户名/手机号"
                    />
                    <van-field
                            v-model="password"
                            label="密码"
                            placeholder="请输入密码"
                    />
                    <div class="login-button">
                        <van-button size="large" type="primary" @click="login">登录</van-button>
                    </div>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>

    import { setToken } from '@/libs/util'
    import { NavBar,Icon,Row,Col,Field,CellGroup,Button,Image } from 'vant';

    export default {
        name: "login",
        components:{
            [NavBar.name]:NavBar,
            [Row.name]:Row,
            [Col.name]:Col,
            [Icon.name]:Icon,
            [Field.name]:Field,
            [Button.name]:Button,
            [Image.name]:Image,
            [CellGroup.name]:CellGroup
        },
        data() {
            return {
                username: '',
                password: '',
                phone: '',
                sms: '',
                errorMessage: ''
            }
        },
        methods:{
            onNavBackClick() {
                this.$router.go(-1);
            },
            login() {
                setToken("token")
                this.$router.go(-1);
            }
        }
    }
</script>

<style scoped>
    .login-container{
        margin-left: 10px;
        margin-right: 10px;
    }
    .login-button{
        /*margin-left: 20px;*/
        /*margin-right: 20px;*/
    }
</style>
