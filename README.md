# Hostker DDNS

[![GitHub](https://img.shields.io/github/license/Ediblewildfungi/hostker-ddns?color=1ccc1a)](https://opensource.org/licenses/MIT)

一个轻量化的基于node.js实现的 ipv6/ipv4 ddns 工具

目前已经实现 Hostker 的 DDNS 接口

> 注意：13以下版本的node可能不受支持，建议采用新版本的node，13以下版本可能需要使用`--experimental-modules` 参数

使用方法：

 编辑 `config_default.yml` 文件，填入相关参数

``` yml

dns:
    # 基础参数配置

    ip4: false
    # 是否启用ipv4

    ip6: true
    #是否启用ipv6

    ipAddress: 123
    #随便填，会自动更新成对应地址

    ttl: 200
    priority: 5

account:
    #域名服务器参数配置

    hostker:
        email: your-email
         #账号

        token: your-api-token
        #token

        id:  12366
        #域名id，如何查询见下文

    aliyun:
    #开发中

```
重命名  `config_default.yml` 为   `config.yml` 

运行：

``` bash
git clone https://github.com/Ediblewildfungi/hostker-ddns.git
npm i
npm start
```
后台运行
```bash
nohup npm start &
```

### 关于如何查询Hostker的解析id：
``` bash
curl --location --request POST 'https://i.hostker.com/api/dnsGetRecords' \
--form 'email="<你的邮箱>"' \
--form 'token="<你的token>"' \
--form 'domain="<你的域名>"'
```

该指令可以打印出你所有域名解析记录的信息，可以查到对应解析的id号。

