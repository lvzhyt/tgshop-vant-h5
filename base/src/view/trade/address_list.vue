<template>
    <div>
        <van-nav-bar
                title="地址列表"
                left-arrow
                @click-left="onNavBackClick"
        />
        <van-address-list
                v-model="chosenAddressId"
                :list="list"
                :disabled-list="disabledList"
                disabled-text=""
                @add="onAdd"
                @edit="onEdit"
                @select="onSelect"
        />
    </div>
</template>

<script>
    import {setOrderAddress} from "../../libs/util";
    import { NavBar,AddressList } from 'vant'
    export default {
        name: "address_list",
        components: {
            [NavBar.name]: NavBar,
            [AddressList.name]: AddressList
        },
        data () {
            return {
                chosenAddressId: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                    },
                    {
                        id: '2',
                        name: '李四',
                        tel: '1310000000',
                        address: '浙江省杭州市拱墅区莫干山路 50 号'
                    }
                ],
                disabledList: []
            }
        },
        methods: {
            onNavBackClick() {
                this.$router.go(-1);
            },
            onAdd() {
                let option ={
                    name: 'add_address',
                    params: {

                    }
                }
                this.$router.push(option)
            },
            onSelect(item,index){
                console.log(item,index)
                setOrderAddress(item)
            },

            onEdit(item, index) {
                this.$toast('编辑地址:' + index);
            },
        },
        mounted() {
            if(this.$route.params.addressId){
                this.chosenAddressId = this.$route.params.addressId
            }else {
                this.chosenAddressId='1'
            }
        }
    }
</script>

<style scoped>

</style>
