var router = require('express').Router();
var rp = require('request-promise');
var wechat = require('wechat');

var TOKEN = process.env.TOKEN;
var APPID = process.env.APPID;
var EncodingAESKey = process.env.EncodingAESKey;
var SecretKey = process.env.SecretKey;
var TuLingAPIKey = process.env.TuLingAPIKey;

var config = {
  token: TOKEN,
  appid: APPID,
  encodingAESKey: EncodingAESKey
};

var WechatAPI = require('wechat-api');

router.use('/', wechat(config.token).text(function(message, req, res, next) {
  var content = message.Content;

  if(content === 'test') {
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }

  var options = {
    method: 'POST',
    uri: 'http://www.tuling123.com/openapi/api',
    body: {
      "key": TuLingAPIKey,
      "info": content,
      "loc": "上海市浦东新区"
    },
    json: true
  };

	rp(options)
    .then(function (parsedBody) {
      res.reply({
        type: "text",
        content: parsedBody.text
      });
    })
    .catch(function (err) {
        console.error(err);
    });
}).middlewarify());

module.exports = router;