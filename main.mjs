import schedule from 'node-schedule';
import fs from 'fs'
import YAML from 'yaml'
import fetch from 'node-fetch'
import publicIp from 'public-ip';

const dnsEditRecord = ['https://i.hostker.com/api/dnsEditRecord']

const file = fs.readFileSync('./config.yml', 'utf8')
const conf = YAML.parse(file)

async function ddns() {

	// console.log(await publicIp.v4())
	// console.log(await publicIp.v6())

	var ip_address = await publicIp.v4()

	if (conf.dns.ip6) {
		ip_address = await publicIp.v6()
	}
	console.log(ip_address)

	let questData = {
		email: conf.account.hostker.email,
		token: conf.account.hostker.token,
		id: conf.account.hostker.id,
		data: ip_address,
		ttl: conf.dns.ttl,
		priority: conf.dns.priority,
	}

	let questheaders = {
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
	}

	let putdns = await fetch(dnsEditRecord, { method: 'POST', headers: questheaders, body: new URLSearchParams(questData).toString() })

	// if (putdns.ok){
	// 	ctx.sendOk(await eWeatherResponse.json())
	// 	return next()
	// }

	console.log(await putdns.json())

}

ddns()

// 设定规则 每半小时
let rule = new schedule.RecurrenceRule()
rule.minute = 30
rule.second = 0

//定时操作
let job = schedule.scheduleJob(rule, () => {
	console.log(new Date())

	//发送请求
	ddns()
})

