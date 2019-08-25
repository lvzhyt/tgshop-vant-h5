<template>
    <div>
        <van-nav-bar
                title="新增地址"
                left-arrow
                @click-left="onNavBackClick"
        />
        <van-address-edit
                :area-list="areaList"
                show-postal
                show-delete
                show-set-default
                show-search-result
                :search-result="searchResult"
                @save="onSave"
                @delete="onDelete"
                @change-detail="onChangeDetail"
        />
    </div>
</template>

<script>
    import { NavBar,AddressEdit } from 'vant'
    import  areaList  from '../../data/area'

    export default {
        name: "add_address",
        components: {
            [NavBar.name]: NavBar,
            [AddressEdit.name]: AddressEdit
        },
        data () {
            return {
                areaList,
                searchResult: []
            }
        },
        methods: {
            onNavBackClick() {
                this.$router.go(-1);
            },
            onSave() {
                this.$toast('save');
            },
            onDelete() {
                this.$toast('delete');
            },
            onChangeDetail(val) {
                if (val) {
                    this.searchResult = [{
                        name: '黄龙万科中心',
                        address: '杭州市西湖区'
                    }];
                } else {
                    this.searchResult = [];
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
