<template>
  <div>
    <van-checkbox-group class="card-goods" v-model="checkedGoods">
      <van-checkbox
        class="card-goods__item"
        v-for="item in goods"
        :key="item.id"
        :name="item.id"
      >
        <van-card
          :title="item.title"
          :desc="item.desc"
          :num="item.num"
          :price="formatPrice(item.price)"
          :thumb="item.thumb"
        />
      </van-checkbox>
    </van-checkbox-group>

    <van-submit-bar style="bottom: 49px"
                    :price="totalPrice"
                    :disabled="!checkedGoods.length"
                    :button-text="submitBarText"
                    @submit="onSubmit"
    />
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
import { Checkbox, CheckboxGroup, Card, SubmitBar, Toast,Tabbar,TabbarItem } from 'vant';

export default {
  components: {
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [SubmitBar.name]: SubmitBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [CheckboxGroup.name]: CheckboxGroup
  },

  data() {
    return {
      activeTab: 'cart',
      checkedGoods: ['1', '2', '3'],
      skuItem: [{
        id: '1',
        title: '进口香蕉',
        desc: '约250g，2根',
        price: 200,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
      }, {
        id: '2',
        title: '陕西蜜梨',
        desc: '约600g',
        price: 690,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
      }, {
        id: '3',
        title: '美国伽力果',
        desc: '约680g/3个',
        price: 2680,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
      }]
    };
  },

  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return '结算' + (count ? `(${count})` : '');
    },

    totalPrice() {
      return this.skuItem.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
    }
  },

  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },

    onSubmit() {
      Toast('点击结算');
    }
  }
};
</script>

<style lang="less">
.card-goods {
  padding: 10px 0;
  background-color: #fff;

  &__item {
    position: relative;
    background-color: #fafafa;

    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }

    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }

    .van-card__price {
      color: #f44;
    }
  }
}
</style>
