import Vue from 'vue'
import Router from 'vue-router'
import publicMethod from '@/tools/publicMethod'

const login = r => require.ensure([], () => r(require('../pages/login')), 'login'); // A01 登录
const home = r => require.ensure([], () => r(require('../pages/home')), 'home'); // 未登录首页
const index = r => require.ensure([], () => r(require('../pages/index')), 'index'); // 登录后右侧路由容器
const generateMd5 = r => require.ensure([], () => r(require('../pages/generateMd5')), 'generateMd5'); // 生成md5

// 定义路由（tab切换内容处）
// 常用功能
const commonFunction = r => require.ensure([], () => r(require('../pages/commonFunction')), 'commonFunction'); // B01 常用功能 B21 B22 B31
// 智投组合--智投组合
const intellectualInvestmentCombinationList = r => require.ensure([], () => r(require('../pages/intellectualInvestmentCombination/intellectualInvestmentCombinationList')), 'intellectualInvestmentCombinationList'); // C01智投组合
// 智投组合--关注的组合
const attentionCombination = r => require.ensure([], () => r(require('../pages/intellectualInvestmentCombination/attentionCombination')), 'attentionCombination'); // C11关注的组合
// 智投组合--关注的组合--组合列表
const combineDetail = r => require.ensure([], () => r(require('../pages/intellectualInvestmentCombination/combineDetail')), 'combineDetail'); // C12 关注的组合详情
// 智投组合--关注的组合--组合列表--调仓记录
const adjustRecord = r => require.ensure([], () => r(require('../pages/intellectualInvestmentCombination/adjustRecord')), 'adjustRecord'); // C15 调仓记录
// 智投组合--关注的组合--仓位优化
const combineOptimize = r => require.ensure([], () => r(require('../pages/intellectualInvestmentCombination/combineOptimize')), 'combineOptimize'); // C13 仓位优化
// 智投组合--个性化设置
const personalizationSettings = r => require.ensure([], () => r(require('../pages/intellectualInvestmentCombination/personalizationSettings')), 'attentionCombination'); // C21个性化设置
// 用户概况--用户概况
const userProfileList = r => require.ensure([], () => r(require('../pages/userProfile/userProfileList')), 'userProfileList'); // D01用户概况
// 用户概况--用户行为
const userBehavior = r => require.ensure([], () => r(require('../pages/userProfile/userBehavior')), 'userBehavior'); // D01用户行为
// 用户持仓
const userHolding = r => require.ensure([], () => r(require('../pages/userHolding')), 'userHolding'); // 
// 账户设置--修改密码
const changePassword = r => require.ensure([], () => r(require('../pages/accountSettings/changePassword')), 'changePassword');
// 账户设置--权限管理
const powerSettings = r => require.ensure([], () => r(require('../pages/accountSettings/powerSettings')), 'powerSettings');
// 账户设置--内部账户管理
const internalAccountManagement = r => require.ensure([], () => r(require('../pages/accountSettings/internalAccountManagement')), 'internalAccountManagement');

Vue.use(Router)

const $router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/home',
            redirect: '/'
        },
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/generateMd5',
            name: 'generateMd5',
            component: generateMd5
        },
        {
            path: '/index',
            component: index,
            redirect: '/index/commonFunction',
            children: [
                {
                    path: 'commonFunction',
                    name: 'commonFunction',
                    component: commonFunction
                    // meta: {
                    //     checkIndex: 0
                    // }
                },
                {
                    path: 'intellectualInvestmentCombinationList',
                    name: 'intellectualInvestmentCombinationList',
                    component: intellectualInvestmentCombinationList
                },
                {
                    path: 'attentionCombination',
                    name: 'attentionCombination',
                    component: attentionCombination
                },
                {
                    path: 'personalizationSettings',
                    name: 'personalizationSettings',
                    component: personalizationSettings
                },
                {
                    path:'userProfileList',
                    name: 'userProfileList',
                    component: userProfileList
                },
                {
                    path: 'userBehavior',
                    name: 'userBehavior',
                    component: userBehavior
                },
                {
                    path: 'combinedetail',
                    name: 'combineDetail',
                    component: combineDetail
                },
                {
                    path: 'combineoptimize',
                    name: 'combineOptimize',
                    component: combineOptimize
                },
                {
                    path: 'adjustrecord',
                    name: 'adjustRecord',
                    component: adjustRecord
                },
                {
                    path: 'userHolding',
                    name: 'userHolding',
                    component: userHolding
                },
                {
                    path: 'changePassword',
                    name: 'changePassword',
                    component: changePassword
                },
                {
                    path: 'powerSettings',
                    name: 'powerSettings',
                    component: powerSettings
                },
                {
                    path: 'internalAccountManagement',
                    name: 'internalAccountManagement',
                    component: internalAccountManagement
                }
            ]
        }
    ]
})

$router.beforeEach((to, from, next) => {
    if(to.path == '/login') return next()
    const tokenStr = window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/login')
    next()
})

export default $router;
