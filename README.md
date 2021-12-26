# Hostker DDNS

[![GitHub](https://img.shields.io/github/license/Ediblewildfungi/hostker-ddns?color=1ccc1a)](https://opensource.org/licenses/MIT)

一个轻量化的基于node.js实现的 ipv6/ipv4 ddns 工具

目前已经实现 Hostker 的 DDNS 接口

使用方法：

 编辑 `config_default.js` 文件，填入相关参数

``` json

 {
    //基础参数配置
    dns: {

        //是否启用ipv4
        ip4: false,

        //是否启用ipv6 ,目前 IPv4和IPv6 两者只能二选一
        ip6: true,

        ttl:200,
        priority:5,

    },
    
    //域名服务器参数配置
    account: {
        hostker: {
            email: "在此填入你的hostker 邮箱帐号",
            token: "在此填入你的hostker token",
             id:123456 //要更改域名id
        }
    },
    aliyun: {}
}

```

重命名  `config_default.js` 为   `config` 

``` bash
npm i
npm start
```