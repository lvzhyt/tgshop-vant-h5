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
              v-model="specShow"
              :sku="sku"
              :goods="goods"
              :goods-id="goodsId"
              :quota="quota"
              :quota-used="quotaUsed"
              :hide-stock="sku.hide_stock"
              :message-config="messageConfig"
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
      <van-goods-action-button round type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button round type="danger" @click="sorry">
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
import {getSkuByIdApi,getChooseSkuApi} from "../../api/appApi";

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
        "tags": null
      },
        loadedChooseSku: false,
        specShow: false,
        sku: {
            // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
            // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
            tree: [
                {
                    k: '颜色', // skuKeyName：规格类目名称
                    v: [
                        {
                            id: '30349', // skuValueId：规格值 id
                            name: '红色', // skuValueName：规格值名称
                            imgUrl: 'https://img.yzcdn.cn/2.jpg' // 规格类目图片，只有第一个规格类目可以定义图片
                        },
                        {
                            id: '1215',
                            name: '蓝色',
                            imgUrl: 'https://img.yzcdn.cn/2.jpg'
                        }
                    ],
                    k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                },
                {
                    k: '尺码', // skuKeyName：规格类目名称
                    v: [
                        {
                            id: '303491', // skuValueId：规格值 id
                            name: 'X', // skuValueName：规格值名称
                            imgUrl: '' // 规格类目图片，只有第一个规格类目可以定义图片
                        },
                        {
                            id: '12151',
                            name: 'XL',
                            imgUrl: ''
                        }
                    ],
                    k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                }
            ],
            // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
            list: [
                {
                    id: 2259, // skuId，下单时后端需要
                    price: 100, // 价格（单位分）
                    s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                    s2: '303491', // 规格类目 k_s 为 s2 的对应规格值 id
                    s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                    stock_num: 110 // 当前 sku 组合对应的库存
                },
                {
                    id: 2259, // skuId，下单时后端需要
                    price: 100, // 价格（单位分）
                    s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                    s2: '12151', // 规格类目 k_s 为 s2 的对应规格值 id
                    s3: '0', // 最多包含3个规格值，为0表示不存在该规格
                    stock_num: 110 // 当前 sku 组合对应的库存
                }
            ],
            price: '1.00', // 默认价格（单位元）
            stock_num: 227, // 商品总库存
            collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
            none_sku: true, // 是否无规格商品
            messages: [
                // {
                //     // 商品留言
                //     datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                //     multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                //     name: '留言', // 留言名称
                //     type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                //     required: '0', // 是否必填 '1' 表示必填
                //     placeholder: '' // 可选值，占位文本
                // }
            ],
            hide_stock: false // 是否隐藏剩余库存
        },
        goods: {
            // 商品标题
            title: '测试商品',
            // 默认商品 sku 缩略图
            picture: 'https://img.yzcdn.cn/2.jpg'
        },
        messageConfig: {

        },
        goodsId: '',
        quota: 0,
        quotaUsed: 0

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
          let info =  this.skuItem.colorAttrValName  + ' '+ this.skuItem.sizeAttrValName
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
      Toast('暂无后续逻辑~');
    },

    getSkuDetail(){
      getSkuByIdApi(this.skuId).then(res=>{
        const {result,data} = res.data
        if(result){
          this.skuItem = data
          this.pictureMainList = data.pictureMainList
            this.pictureDescriptionList=data.pictureDescriptionList
            this.tagList = data.tagList
        }
      })
    },
      onBuyClicked(){
          Toast('暂无后续逻辑~');
      },
      onAddCartClicked(){
          Toast('暂无后续逻辑~');
      },
      handChooseSpecClick(){
          this.specShow = true
          if(!this.loadedChooseSku){
              getChooseSkuApi(this.skuId).then(res=>{
                  const {result,data} = res.data
                  if(result){
                      this.loadedChooseSku = true
                      this.sku = data.sku
                      this.goods = data.goods
                  }
              })
          }
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
    this.loadedChooseSku = false
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
