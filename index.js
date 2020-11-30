const SlackBot = require('slackbots')
const axios = require('axios')
const env = require('.env')

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${BOT_TOKEN}`
  config.withCredentials = true
  return config
})

const bot = new SlackBot({
  token: BOT_TOKEN,
  name: 'mychatbot3',
})

bot.on('start', function () {
  const params = {
    icon_emoji: ':cat:',
  }

  bot.postMessageToChannel('general', 'Get Ready to Laugh with Chatbot', params)
  runReminder()
})

function runReminder() {
  const result = axios.post('https://slack.com/api/reminders.add', {
    text: 'answer the questions',
    time: '10',
    user: 'B01GCBMMC72',
  })
}

bot.on('error', (err) => console.log(err))

bot.on('message', (data) => {
  if (data.type !== 'message') {
    return
  }
  console.log(data)
  handleMessage(data.text)
})

function handleMessage(message) {
  if (message.includes('help')) {
    runHelp()
  } else if (message.includes('question')) {
    runQuestion()
  }
}

// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:',
  }

  bot.postMessageToChannel(
    'general',
    `Type 'question' to get a question`,
    params
  )
}

// run template question
function runQuestion() {
  const data = {
    channel: 'C01FDPRPETY',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Please give a seconds to answer the question',
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Section block with radio buttons',
        },
        accessory: {
          type: 'radio_buttons',
          options: [
            {
              text: {
                type: 'plain_text',
                text: '*this is plain_text text*',
                emoji: true,
              },
              value: 'value-0',
            },
            {
              text: {
                type: 'plain_text',
                text: '*this is plain_text text*',
                emoji: true,
              },
              value: 'value-1',
            },
            {
              text: {
                type: 'plain_text',
                text: '*this is plain_text text*',
                emoji: true,
              },
              value: 'value-2',
            },
          ],
          action_id: 'radio_buttons-action',
        },
      },
      {
        "type": "actions",
        "elements": [
          {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Complete",
              "emoji": true
            },
            "value": "click_me_123",
            "action_id": "actionId-0"
          }
        ]
      }
    ],
  }
  const result = axios.post('https://slack.com/api/chat.postMessage', data)
}
