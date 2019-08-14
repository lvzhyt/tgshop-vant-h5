<template>
  <div class="goods">
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in pictures" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.skuGoodsName }}</div>
        <div class="goods-price">{{ goodsPrice }}</div>
      </van-cell>
      <van-cell class="goods-express">
<!--        <van-col span="10">运费：{{ goods.express }}</van-col>-->
<!--        <van-col span="14">剩余：{{ goods.remain }}</van-col>-->
        <van-col span="10">运费：{{expressFee}} </van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">{{goods.shopName}}</span>
<!--          <van-tag class="goods-tag" type="danger">官方</van-tag>-->
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>

    <van-goods-action v-if="this.goods.inventoryNum">
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
    <van-goods-action v-if="!this.goods.inventoryNum">
      <van-goods-action-button type="warning" @click="sorry">
        补货中
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import {
  Tag,
  Col,
  Icon,
  Cell,
  CellGroup,
  Swipe,
  Toast,
  SwipeItem,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant';
import {getSkuByIdApi} from "../../api/appApi";

export default {
  components: {
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [GoodsAction.name]: GoodsAction,
    [GoodsActionIcon.name]: GoodsActionIcon,
    [GoodsActionButton.name]: GoodsActionButton
  },

  data() {
    return {
      skuId: '',
      pictures: [],
      goods: {
        "skuId": "",
        "goodsId": "",
        "goodsName": null,
        "shopName": "",
        "storeId": null,
        "areaId": null,
        "skuGoodsName": "",
        "specFacePictures": "",
        "marketPrice": 0,
        "salePrice": 0,
        "promotePrice": null,
        "groupBuyOpen": null,
        "groupBuyPrice": null,
        "inventoryNum": 1,
        "locationOffset": null,
        "saleNum": 0,
        "commentNum": 0,
        "advertAble": null,
        "tags": null
      }
    };
  },

  computed: {
    goodsPrice (){
      let price =  this.goods.promotePrice ? this.goods.promotePrice:this.goods.salePrice
      return '¥'+price
    },
    expressFee (){
      return this.goods.expressFee?'¥'+this.goods.expressFee:'包邮'
    }
  },
  methods: {
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push('cart');
    },

    sorry() {
      Toast('暂无后续逻辑~');
    },

    getSkuDetail(){
      getSkuByIdApi(this.skuId).then(res=>{
        const {result,data} = res.data
        if(result){
          this.goods = data
          this.pictures = []
          if(data.pictureMain){
            this.pictures = data.pictureMain.split(",")
          }
          this.tags = []
          if(data.tags){
            this.tags = data.tags.split(",")
          }
          console.log(this.goods)
        }
      })
    }
  },
  mounted() {
    if(this.$route.params.skuId){
      this.skuId = this.$route.params.skuId
      this.getSkuDetail()
    }else {
      this.skuId='610570601907752960'
      this.getSkuDetail()
    }
  }
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
