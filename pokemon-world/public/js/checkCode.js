let code; //在全局定义验证码
//产生验证码
window.onload = function() {
    createCode();
}

function createCode() {
    code = "";
    let codeLength = 5; //验证码的长度
    let checkCode = document.getElementById("checkCode");
    let random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
        'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'); //随机数
    for(let i = 0; i < codeLength; i++) { //循环操作
        let charIndex = Math.floor(Math.random() * 36); //取得随机数的索引
        code += random[charIndex]; //根据索引取得随机数加到code上
    }
    checkCode.value = code; //把code值赋给验证码
}
//校验验证码
function validate() {
    let inputCode = document.getElementById("input-check-code").value.toUpperCase(); //取得输入的验证码并转化为大写
    if(inputCode.length <= 0) { //若输入的验证码长度为0
        //alert("请输入验证码！"); //则弹出请输入验证码
        createCode(); //刷新验证码
        return false;
    } else if(inputCode != code) { //若输入的验证码与产生的验证码不一致时
        //alert("验证码输入错误！"); //则弹出验证码输入错误
        createCode(); //刷新验证码
        return false;
    }
    else
    {
        createCode(); //刷新验证码
        return true;
    }
}