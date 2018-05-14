var SMS = require('../lib')

var sms = new SMS({
    AccessKeyId: 'LTAIpg9JgkfWwUm3',
    AccessKeySecret: 'SYg4HrssVdnh6qklEMZ5Vh7Fr5qUGY'
})
var TemplateCodeArr =[
    'SMS_133271139',//进度通知  ${name}同学，您当前毕设进度：${process}，请按时完成。    0
    'SMS_133266203',//您的注册验证码${code},该验证码5分钟内有效，请勿泄露他人！          1
    'SMS_133970802',//您正在找回密码，验证码${code},该验证码5分钟内有效，请勿泄露他人！   2
]
var SmsService = {
    // '{"code":'+code+'}'
    sendSmsRegister: function (options,callback) {
        sms.send({
            Format: 'JSON',
            Action: 'SendSms',
            TemplateParam:'{"code":' + options.templateParam + '}' ,
            PhoneNumbers: options.phoneNumbers,
            SignName: '毕业设计进度管理系统',
            TemplateCode: TemplateCodeArr[options.templateIndex]
        }).then((result) => {
            console.log(result)
            callback(result)
        }).catch(err => {
            console.log(err)
        })
    },

    sendSmsTemplate: function (options,callback) {
        sms.send({
            Format: 'JSON',
            Action: 'SendSms',
            TemplateParam:'{"name":' + options.name +",process:"+options.process+ '}' ,
            PhoneNumbers: options.phoneNumbers,
            SignName: '毕业设计进度管理系统',
            TemplateCode: TemplateCodeArr[options.templateIndex]
        }).then((result) => {
            console.log(result)
            callback(result)
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = SmsService;
