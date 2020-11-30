const { App, LogLevel, ExpressReceiver } = require('@slack/bolt');
require('dotenv').config();

console.log(process.env.BOT_TOKEN)

const app = new App({
  token: process.env.BOT_TOKEN,
  logLevel: LogLevel.DEBUG,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: {
     events: '/slack/events',
     commands: '/slack/commands'  // explicitly enable commands
   },
});
/* Add functionality here */
app.command('/echo', async ({ command, ack, say }) => {
  // Acknowledge command request
  await ack();
  await say(`${command.text}`);
});

app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});


app.error((error) => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});
(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
console.log('⚡️ Bolt app is running!');
})();