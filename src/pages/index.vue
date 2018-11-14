<template>
    <div class="wrap-box" :class="{'big-box':hideLeft}">
        <div class="wrap-left" :class="{'hide' : hideLeft}">
            <sidebar v-if="!hideLeft"></sidebar>
        </div>
        <div class="left-hide-show" v-if="hideLeft"></div>
        <div class="wrap-right">
            <div class="hide-open">
                <button class="toggle-left" :class="hideLeft?'showBtn':'hideBtn'" @click="toggleLeft()"></button>
            </div>
            <router-view/>
        </div>
    </div>
</template>
<script>
import sidebar from '../../src/components/sidebar'
export default {
    components: {
        sidebar
    },
    data() {
        return {
            hideLeft: false
        }
    },
    methods: {
        toggleLeft() {
            this.hideLeft = !this.hideLeft;
        }
    },
    mounted() {
        window.onscroll = () => {
            let SrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
            if (document.querySelector('.toggle-left')) {
                document.querySelector('.toggle-left').style.top = SrollHeight + 50 + 'px';
            }
        }
    }
}
</script>
<style  lang="scss" scoped>
    .wrap-box{
        width: 1200px;
        // width: 1920px; 
        // height: 100%;
        background: red;
        margin: 0 auto;
        margin-top:20px;
        flex: 1;
        display: flex;
        .wrap-left{
            width: 183px;
            white-space: nowrap;
            transition: .3s;
            overflow: hidden;
            display: block;
            background: #354053;
        }
        .left-hide-show {
            background: #fff;
        }
        .hide{
            width: 10px;
        }
        .wrap-right{
            position:relative;
            flex: 1;
            background: #fff;
            .hide-open{
                position: absolute;
                top: 100px;
            }
            .toggle-left{
                @include wh(17px,52px);
                position: absolute;
                z-index: 99;
            }
            .showBtn{
                left:-10px;
                background: url(../../src/assets/image/showBtn.png) no-repeat;
            }
            .hideBtn{
                left: -17px;
                background: url(../../src/assets/image/hideBtn.png) no-repeat;
            }
        }
    }
    .big-box{
        .follow-list{
            .el-table{
                width: 100% !important;
            }
        }
    }
</style>
