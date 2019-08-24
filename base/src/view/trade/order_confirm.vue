<template>
    <div>
        <van-nav-bar
                title="填写订单"
                left-arrow
                @click-left="onNavBackClick"
        />
        <div class="address-card" >
            <van-cell title="北京朝阳红星美凯龙" label="张三丰 18610239332"  is-link />
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
            <van-submit-bar
                    :price="3050"
                    button-text="提交订单"
                    @submit="onSubmit"
                    :loading="loading"
            >
                <span slot="tip">
                    北京朝阳红星美凯龙,
                </span>
            </van-submit-bar>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import { NavBar,Row,Col,Panel,CellGroup, Cell, Icon,Card,Stepper,SubmitBar } from 'vant';

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
            [Cell.name]:Cell
        },
        data () {
            return {
                singleGoods: false,
                goodsNum: 1,
                loading: false
            }
        },
        methods:{
            onNavBackClick() {
                this.$router.go(-1);
            },
            onGoodsNumChange(val) {
                console.log("onGoodsNumChange val:"+val)
            }
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
