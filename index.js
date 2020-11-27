const SlackBot = require('slackbots')
const axios = require('axios')

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer xoxp-1523807783798-1527450767029-1525822560294-a9b6588d4458bb85525fb09eeb1fa431'
    config.withCredentials = true
    return config
})

const bot = new SlackBot({
  token: 'xoxb-1523807783798-1529465570805-X5JGqcVWtvrnUCaHA6fjLLG9',
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
        user: 'B01GCBMMC72'
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
  }
//   else if (message.includes('questions')) {
//     runQuestions()
//   }
}

// Show Help Text
function runHelp() {
  const params = {
    icon_emoji: ':question:',
  }

  bot.postMessageToChannel(
    'general',
    `Type @mychatbot with either 'questions' to get a question`,
    params
  )
}

function runQuestions() {
  const params = {
    icon_emoji: ':question:',
  }
  const questions = 'You asked me to remind you to "log time Jira".'
  bot.postMessageToChannel('general', questions, params)
}
