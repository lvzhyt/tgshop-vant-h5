<template>
  <div class="goods">
      <van-nav-bar
              title="商品详情"
              left-arrow
              @click-left="onNavBackClick"
      />
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in pictureMainList" :key="thumb">
        <img :src="thumb" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ skuItem.skuGoodsName }}</div>
        <div class="goods-price">{{ goodsPrice }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col >运费：{{expressFee}} </van-col>
      </van-cell>
        <van-cell class="goods-express" is-link>
            <div @click="handChooseSpecClick">已选：{{specInfo}}</div>
        </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template slot="title">
          <span class="van-cell-text">{{skuItem.shopName}}</span>
<!--          <van-tag class="skuItem-tag" type="danger">官方</van-tag>-->
        </template>
      </van-cell>
<!--      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />-->
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="商品详情" />
        <div class="detail-remark">{{skuItem.textDescription}}</div>
        <img class="img-detail" v-for="img in pictureDescriptionList" :key="img" v-lazy="img" >
    </van-cell-group>

    <van-sku
            ref="sku"
            v-model="specShow"
            :sku="sku"
            :goods="goods_info"
            :goods-id="goods_id"
            :hide-stock="hide_stock"
            :quota="quota"
            :quota-used="quota_used"
            reset-stepper-on-hide
            reset-selected-sku-on-hide
            disable-stepper-input
            :close-on-click-overlay="closeOnClickOverlay"
            :message-config="messageConfig"
            :initial-sku="initialSku"
            :custom-sku-validator="customSkuValidator"
            @sku-selected="onSkuSelected"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
    />

    <van-goods-action v-if="this.skuItem.inventoryNum">
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon :info="cartNum" icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button round type="warning" @click="onAddCartClicked">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button round type="danger" @click="onBuyClicked">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
    <van-goods-action v-if="!this.skuItem.inventoryNum">
      <van-goods-action-button round type="warning" @click="sorry">
        补货中
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
  /* eslint-disable */
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
  GoodsActionButton,
    Image,
    NavBar,
    Sku
} from 'vant';
import {getSkuEsByIdApi,getChooseSkuApi} from "../../api/appApi";
import skuDataDemo from "../../data/skuDataDemo";

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
    [GoodsActionButton.name]: GoodsActionButton,
    [Image.name]: Image,
    [Sku.name]: Sku,
    [NavBar.name]: NavBar
  },

  data() {
    return {
      skuId: '',
      // 规格选择数据
      skuDataCache: {},
      specShow: false,
      sku: {},
      hide_stock: false,
      goods_info: {},
      goods_id: '',
      quota: 0,
      quota_used:0,
      // sku规格加载标记
      loadedChooseSku: false,
      closeOnClickOverlay: true,
      messageConfig: {
        uploadImg: (file, img) => new Promise(resolve => {
          setTimeout(() => resolve(img), 1000);
        }),
        uploadMaxSize: 3
      },
      customSkuValidator: () => '请选择规格',

      showCustom: false,
      showStepper: false,
      showSoldOut: false,
      // 初始选择
      initialSku: {
        s1: '',
        s2: '',
        selectedNum: 1
      },

      pictureMainList: [],
      pictureDescriptionList: [],
      tagList: [],
      cartNum: 1,
      skuItem: {
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
        "tags": null,
        "colorAttrValId": '0',
        "colorAttrValName": "蜜语红",
        "sizeAttrValId": '0',
        "sizeAttrValName": "8+128G",
        "textDescription": ''
      }

    };
  },

  computed: {
    goodsPrice (){
      let price =  this.skuItem.promotePrice ? this.skuItem.promotePrice:this.skuItem.salePrice
      return '¥'+price
    },
    expressFee (){
      return this.skuItem.expressFee?'¥'+this.skuItem.expressFee:'包邮'
    },
      specInfo (){
        let info = '';
        if(this.skuItem && this.skuItem.colorAttrValName){
          info =  this.skuItem.colorAttrValName
        }
        if(this.skuItem && this.skuItem.sizeAttrValName){
          info = info + ' '+ this.skuItem.sizeAttrValName
        }
          return info
      }
  },
  methods: {
      onNavBackClick() {
          this.$router.go(-1);
      },
    formatPrice() {
      return '¥' + (this.skuItem.price / 100).toFixed(2);
    },

    onClickCart() {
      this.$router.push('cart');
    },

    sorry() {
        this.$toast('暂无后续逻辑~')
    },
    // 选择规格
    onSkuSelected(data) {

        console.log("selected sku:",data.selectedSkuComb)
      if(data.selectedSkuComb){
        this.skuId = data.selectedSkuComb.id
        this.getSkuDetail()
      }
    },

    getSkuDetail(){
        if(!this.skuId){
          return
        }
        if(this.skuDataCache[this.skuId]){
          let data = this.skuDataCache[this.skuId]
          console.log('getSkuDetail',data)
          this.resetSkuItemData(data)
        }else {
          getSkuEsByIdApi(this.skuId).then(res=>{
            const {result,data} = res.data
            if(result){
              console.log(this.skuDataCache)
              this.skuItem = data
              this.skuDataCache[this.skuId] = data
              console.log(this.skuDataCache)
              this.resetSkuItemData(data)
            }
          })
        }
    },
    resetSkuItemData(data){
      this.skuItem = data

      this.pictureMainList = data.pictureMainList
      this.pictureDescriptionList=data.pictureDescriptionList
      this.tagList = data.tagList
      this.initialSku.s1 = data.colorAttrValId
      this.initialSku.s2 = data.sizeAttrValId
      console.log("initialSku",this.initialSku)
    },
    // 立即购买
    onBuyClicked(data) {
      this.$toast('buy:' + JSON.stringify(data));
      let option ={
        name: 'order_confirm',
        params: {
          skuId: this.skuId,
          buyImmediately: true
        }
      }
      this.$route.push(option)

    },

    onAddCartClicked(data) {
      this.$toast('add cart:' + JSON.stringify(data));
    },
    onAddCartClicked(){
        Toast('暂无后续逻辑~');
    },
      // 选择规格
      handChooseSpecClick(){
          this.specShow = true
      },
    // 加载选择的规格
    loadSkuSpecData(){
      getChooseSkuApi(this.skuId).then(res=>{
        const {result,data} = res.data
        if(result){
          this.loadedChooseSku = true
          this.sku = data.sku
          this.goods_info = data.goods_info
          this.goods_id = data.goods_id
          this.initialSku = data.initialSku
          console.log(data)
          console.log(skuDataDemo)
        }
      })
    }
  },
  mounted() {

    if(this.$route.params.skuId){
      this.skuId = this.$route.params.skuId
      this.getSkuDetail()
      this.loadSkuSpecData()
    }else {
      this.skuId='610570601907752960'
    }
    this.skuDataCache = {}
    this.getSkuDetail()
    this.loadSkuSpecData()


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
  .img-detail{
    width: 100%;
  }
    .detail-remark{
        margin-left: 15px;
        color: #6b6b6b;
        text-align: center;
    }
}
</style>
