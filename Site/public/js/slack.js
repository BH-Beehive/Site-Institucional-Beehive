const { WebClient } = require("@slack/web-api");

const BOT_USER_TOKEN = "xoxb-4293968427975-4414721659319-6MEJADwODjfB8RANT9sKyKYv";
const web = new WebClient(BOT_USER_TOKEN);

class SlackService {
  postTextMessage(messageArguments) {
    web.chat.postMessage(messageArguments);
  }
}

module.exports = new SlackService();
