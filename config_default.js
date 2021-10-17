module.exports = {

    //基础参数配置
    dns: {

        //是否启用ipv4
        ip4: false,

        //是否启用ipv6
        ip6: true,

        ttl:200,
        priority:5,

    },
    
    //域名服务器参数配置
    account: {
        hostker: {
            email: "在此填入你的hostker 邮箱帐号",
            token: "在此填入你的hostker token"
        }
    },
    aliyun: {}
};