import schedule from 'node-schedule';
import fs from 'fs'
import YAML from 'yaml'
import fetch from 'node-fetch'
// import publicIp from 'public-ip';
import { publicIp, publicIpv4, publicIpv6 } from 'public-ip';

const dnsEditRecord = ['https://i.hostker.com/api/dnsEditRecord']

const file = fs.readFileSync('./config.yml', 'utf8')
const conf = YAML.parse(file)

async function ddns() {

	var ipAddress = ""


	if (conf.dns.ip4) {
		ipAddress = await publicIpv4()
	} else if (conf.dns.ip6) {
		ipAddress = await publicIpv6({
			onlyHttps:true,
			fallbackUrls: [
				'https://ifconfig.co/ip'
			]
		})
	}

	console.log('Current ip address: ' + ipAddress)
	console.log('saved ip address: ' + conf.dns.ipAddress)

	let questData = {
		email: conf.account.hostker.email,
		token: conf.account.hostker.token,
		id: conf.account.hostker.id,
		data: ipAddress,
		ttl: conf.dns.ttl,
		priority: conf.dns.priority,
	}

	let questheaders = {
		"Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
	}

	if (ipAddress == conf.dns.ipAddress) {

		console.log("No update required")
		console.log("# IP地址没有变化，未进行更新")

	} else {
		let putdns = await fetch(dnsEditRecord, { method: 'POST', headers: questheaders, body: new URLSearchParams(questData).toString() })

		let feedback = await putdns.json()

		console.log("feedback: " + feedback.success)

		while (feedback.success !== 0) {

			console.log('Update failed! Retry in progress ... ')
			console.log("# 更新失败，重试中")

			putdns = await fetch(dnsEditRecord, { method: 'POST', headers: questheaders, body: new URLSearchParams(questData).toString() })
			feedback = await putdns.json()

			console.log("feedback: " + feedback.success)

		}
		conf.dns.ipAddress = ipAddress
		fs.writeFileSync('./config.yml', YAML.stringify(conf))
		console.log('Update successful : ' + ipAddress)
		console.log("# 更新成功！")
	}
}

ddns()

// 设定规则 
let rule = new schedule.RecurrenceRule()
// rule.minute = 0
rule.second = 0

//定时操作
let job = schedule.scheduleJob(rule, () => {
	console.log(new Date())

	//发送请求
	ddns()
})

