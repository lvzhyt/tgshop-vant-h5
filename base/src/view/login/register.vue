<template>
    <div>
        <i
        <van-nav-bar
                left-text="返回"
                left-arrow
                @click-left="onNavBackClick"
        />
        <div>
            <van-image
                    width="100"
                    height="100"
                    src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
            <van-cell-group>
                <van-field
                        v-model="username"
                        label="用户名"
                        placeholder="请输入用户名"
                />
                <van-field
                        v-model="password"
                        label="密码"
                        placeholder="请输入用户名"
                />
                <van-field
                        v-model="phone"
                        label="手机号"
                        placeholder="请输入手机号"
                        :error-message="errorMessage"
                />
                <van-field
                        v-model="sms"
                        center
                        clearable
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                >
                    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
                </van-field>
            </van-cell-group>
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
                userName: '',
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
            }
        }
    }
</script>

<style scoped>

</style>
