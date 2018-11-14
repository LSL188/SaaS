<template>
    <div class="container">
        <div class="context clear">
            <el-input placeholder="输入需加密密码" v-model="password"></el-input>
            <el-button type="primary" class="cirm-btn" @click="commit()">确定</el-button>
        </div>
        <p>{{newPassword}}&nbsp;&nbsp;<el-button v-if="newPassword" id="passwordCopy" @click="clickCopy">复制</el-button></p>
    </div>
</template>
<script>
import hexMd5 from '../tools/md5'
export default {
    data() {
        return {
            password: '',
            savepassword: '',
            newPassword: ''
        }
    },
    watch: {
        password (val) {
            if (val.length !== this.savepassword.length) {
                this.newPassword = '';
            }
        }
    },
    methods: {
        commit() {
            if (this.password === '') {
                this.$message({
                    message: '密码不能为空',
                    type: 'error'
                });
                return false;
            } else if (this.password.length < 8) {
                this.$message({
                    message: '密码长度不能小于8位',
                    type: 'error'
                });
                return false;
            } else {
                this.savepassword = this.password;
                this.newPassword = hexMd5.hex_md5(this.password).toUpperCase();
            }
        },
        clickCopy() {
            const oInput = document.createElement('input');
            oInput.setAttribute('readonly', 'readonly');
            oInput.setAttribute('value', this.newPassword);
            document.body.appendChild(oInput);
            oInput.focus();
            oInput.setSelectionRange(0, this.newPassword.length);
            if (document.execCommand('copy')) {
                document.execCommand('copy');
                this.$message({
                    message: '复制成功',
                    type: 'success'
                });
            }
            document.body.removeChild(oInput);
        }
    }
}
</script>
<style lang="scss">
    .container {
        .context{
            width: 500px;
            margin: 80px auto 20px;
            .el-input{
                width:340px;
                height:46px;
                // padding-left:10px;
                // float: left;
                // border-top-left-radius:5px;
                // border-bottom-left-radius:5px;
                float: left;
                input{
                    width:340px;
                    height:46px;
                    border: 0;
                    border-top-left-radius:5px;
                    border-bottom-left-radius:5px;
                }
            }
            .cirm-btn{
                width:120px;
                height:46px;
                float: left;
                line-height:45px;
                padding: 0;
                @include font(22px,30px,#fff);
                padding-left:10px;
                border-radius:0;
                border-top-right-radius:5px;
                border-bottom-right-radius:5px;
            }
        }
        p{
            width: 500px;
            margin: 0 auto;
            text-align: left;
        }
    }
</style>
