const SlackBot = require('slackbots');
const axios = require('axios');

const bot = new SlackBot({
    token: 'xoxb-1523807783798-1531308881699-wDgfOcaA8GzJEDAfcN81drYg',
    name: 'mychatbot'
});


bot.on('start', function() {
    var params = {
        icon_emoji: ':cat:'
    };
    
    bot.postMessageToChannel('general', 'hello world!', params);
})