var SMS = require('../lib')

var sms = new SMS({
    AccessKeyId: 'LTAIpg9JgkfWwUm3',
    AccessKeySecret: 'SYg4HrssVdnh6qklEMZ5Vh7Fr5qUGY'
})

var SmsService = {

    sendSmsRegister: function (phoneNumber,callback) {
        sms.send({
            Format: 'JSON',
            Action: 'SendSms',
            TemplateParam: '{"code":"6666"}',
            PhoneNumbers: phoneNumber,
            SignName: '毕业设计进度管理系统',
            TemplateCode: 'SMS_133266203'
        }).then((result) => {
            console.log(result)
            callback(result)
        }).catch(err => {
            console.log(err)
        })
    }
}

module.exports = SmsService;
