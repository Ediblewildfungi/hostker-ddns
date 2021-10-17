const publicIp = require('public-ip')
const dns = require('./middleware/dns')
const conf = require('./config')
const fetch = require('node-fetch')

const dnsEditRecord = ['https://i.hostker.com/api/dnsEditRecord']

async function ddns() {

	// console.log(await publicIp.v4())
	// console.log(await publicIp.v6())

	const ipv6 = await publicIp.v6()

	questData = {
		email: conf.account.hostker.email,
		token: conf.account.hostker.token,
		id: 201915,
		data: ipv6,
		ttl: conf.dns.ttl,
		priority: conf.dns.priority,
	}

	
	questheaders = {
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
	}

	putdns = await fetch(dnsEditRecord, { method: 'POST',headers:questheaders, body: new URLSearchParams(questData).toString() })

	// if (putdns.ok){
	// 	ctx.sendOk(await eWeatherResponse.json())
	// 	return next()
	// }

	console.log(await putdns.json())

}


ddns()


