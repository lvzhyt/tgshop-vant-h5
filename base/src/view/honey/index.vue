<template>
    <div>
        <div>honey</div>
        <van-image
                round
                fit="fill"
                width="10rem"
                height="10rem"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
    </div>
</template>

<script>
    import {Image} from 'vant'
    export default {
        name: "honey",
        components: {
            [Image.name]: Image
        }
    }
</script>

<style scoped>

</style>
