<template>
    <div id="page-container">
        <van-nav-bar
                title="填写订单"
                left-arrow
                @click-left="onNavBackClick"
        />
        <div class="address-card" id="address-card">
            <van-cell   is-link @click="onClickAddress">
                <div slot="title">{{orderAddress.address}}</div>
                <div slot="label"><span>{{orderAddress.name}}</span> <span style="margin-left: 15px;">{{orderAddress.tel}}</span></div>
            </van-cell>
        </div>
        <div class="order-cell">
            <van-cell title="支付方式" value="在线支付" is-link>
                <van-icon class="icon-choose"
                        slot="right-icon"
                        name="ellipsis"
                        style="line-height: inherit;"
                />
            </van-cell>

            <van-panel v-if="singleGoods" class="order-cell">
                <div slot="header">
                    <van-cell title="糖果贝贝的店铺"  icon="shop-o" />
                </div>
                <div slot="default">
                    <van-card
                            class="store-goods"
                            num="2"
                            price="2.00"
                            desc="描述信息"
                            title="商品标题"
                            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                    >
                        <div slot="num"><van-stepper v-model="goodsNum" @change="onGoodsNumChange" button-size="18px"/></div>
                    </van-card>
                </div>
                <div slot="footer">
                    <van-cell title="配送" is-link >
                        <div slot="default">
                            <van-row>快递运输</van-row>
                            <van-row>全天</van-row>
                        </div>
<!--                        <div slot="label" class="shipping-time"> 全天-工作时间</div>-->
                        <van-icon class="icon-choose"
                                  slot="right-icon"
                                  name="ellipsis"
                                  style="line-height: inherit;"
                        />
                    </van-cell>
                </div>
            </van-panel>

            <van-panel v-if="!singleGoods" class="order-cell">
                <div slot="header">
                    <van-cell title="糖果贝贝的店铺"  icon="shop-o" />
                </div>
                <div slot="default">
                    <van-card
                            class="store-goods"
                            num="1"
                            price="2.00"
                            desc="描述信息"
                            title="商品标题1"
                            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                    >
                    </van-card>
                    <van-card
                            class="store-goods"
                            num="1"
                            price="2.00"
                            desc="描述信息"
                            title="商品标题2"
                            thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
                    >
                    </van-card>
                </div>
                <div slot="footer">
                    <van-cell title="配送" is-link >
                        <div slot="default">
                            <van-row>快递运输</van-row>
                            <van-row>全天</van-row>
                        </div>
                        <!--                        <div slot="label" class="shipping-time"> 全天-工作时间</div>-->
                        <van-icon class="icon-choose"
                                  slot="right-icon"
                                  name="ellipsis"
                                  style="line-height: inherit;"
                        />
                    </van-cell>
                </div>
            </van-panel>
            <van-cell-group class="order-cell">
                <van-cell title="发票" value="不开发票"  is-link >
                    <van-icon class="icon-choose"
                              slot="right-icon"
                              name="ellipsis"
                              style="line-height: inherit;"
                    />
                </van-cell>
                <van-cell title="优惠券" value="无可用"  is-link >
                    <van-icon class="icon-choose"
                              slot="right-icon"
                              name="ellipsis"
                              style="line-height: inherit;"
                    />
                </van-cell>
            </van-cell-group>
            <van-cell-group class="order-cell">
                <van-cell title="商品金额" >
                    <div slot="default" class="order-cell-val">¥168.00</div>
                </van-cell>
                <van-cell title="运费" >
                    <div slot="default" class="order-cell-val-red">+¥0.00</div>
                </van-cell>
                <van-cell title="优惠" >
                    <div slot="default" class="order-cell-val-red">-¥0.00</div>
                </van-cell>
            </van-cell-group>
            <van-row class="empty-bottom">

            </van-row>

            <van-popup
                    v-model="popupShow"
                    round
                    position="bottom"
                    :style="{ height: '80%' }"
            />

            <van-submit-bar
                    :price="3050"
                    button-text="提交订单"
                    @submit="onSubmit"
                    :loading="loading"
            >
                <span slot="tip" v-if="showTip">
                    {{orderAddress.address}}
                </span>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import { NavBar,Row,Col,Panel,CellGroup, Cell, Icon,Card,Stepper,SubmitBar,Popup,AddressList } from 'vant';
    import {setOrderAddress,getOrderAddress} from "../../libs/util";

    export default {
        name: "order_confirm",
        components:{
            [NavBar.name]:NavBar,
            [Row.name]:Row,
            [Col.name]:Col,
            [Panel.name]:Panel,
            [CellGroup.name]:CellGroup,
            [Card.name]:Card,
            [Stepper.name]:Stepper,
            [Icon.name]:Icon,
            [SubmitBar.name]:SubmitBar,
            [Popup.name]:Popup,
            [AddressList.name]:AddressList,
            [Cell.name]:Cell
        },
        data () {
            return {
                singleGoods: false,
                goodsNum: 1,
                loading: false,
                showTip: false,
                popupShow: false,
                addressId: '0',
                addressName: '张三',
                addressTel: '13000000000',
                addressAddress: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                orderAddress: {
                    id: '1',
                    name: '张三',
                    tel: '13000000000',
                    address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
                }

            }
        },
        methods:{
            onNavBackClick() {
                this.$router.go(-1);
            },
            onGoodsNumChange(val) {
                console.log("onGoodsNumChange val:"+val)
            },
            handleScroll: function () {
                let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
                // 设备/屏幕高度
                this.showTip = window.scrollY>80

            },
            onSubmit(){
                this.loading=true
                setTimeout( () => {
                    this.loading=false
                }, 3000 )
            },

            onClickAddress(){
                let option ={
                    name: 'address_list',
                    params: {
                        addressId: this.orderAddress.id
                    }
                }
                this.$router.push(option)
            }
        },
        mounted() {
            // 监听（绑定）滚轮滚动事件
            window.addEventListener('scroll', this.handleScroll, true);
            console.log('mounted')
            let orderAddressStr = getOrderAddress()
            if(orderAddressStr){
                let  address = JSON.parse(orderAddressStr)
                this.orderAddress = address
            }

            // 购物车 id  sku 数量

            // 是否单sku
            // 是否立即购买  单sku  购物车为空
            // sku 列表详情.  店铺 sku 列表


        }
    }
</script>

<style scoped>

    .address-card{
        /*height: 50px;*/
        width: 100%;
        display: flex;
        position: relative;
    }

    .address-card::before {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 2px;
        background: -webkit-repeating-linear-gradient(135deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background: repeating-linear-gradient(-45deg, #ff6c6c 0, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
        background-size: 80px;
        content: '';
        z-index: 1;
    }
    .order-cell{
        margin-top:5px;
    }
    .icon-choose{
        margin-left: 10px;
        font-size: 18px;
        font-weight: bold;
    }
    .store-goods{
        background-color: #ffffff;
    }
    .order-cell-val{
        color: #545454;
    }
    .order-cell-val-red{
        color: #ff4444;
    }
    .empty-bottom{
        height: 90px
    }
</style>
