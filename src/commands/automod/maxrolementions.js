const { Command } = require("@src/structures");
const { maxRoleMentions } = require("@schemas/guild-schema");
const { Message } = require("discord.js");

module.exports = class MaxRoleMentions extends Command {
  constructor(client) {
    super(client, {
      name: "maxrolementions",
      description: "sets maximum role mentions allowed per message",
      command: {
        enabled: true,
        usage: "<number>",
        minArgsCount: 1,
        category: "AUTOMOD",
        userPermissions: ["ADMINISTRATOR"],
      },
    });
  }

  /**
   * @param {Message} message
   * @param {string[]} args
   */
  async messageRun(message, args) {
    let input = args[0];

    if (isNaN(input)) {
      if (input === "none" || input === "off") input = 0;
      else return message.reply("Not a valid input");
    }

    if (parseInt(input, 10) < 2) return message.reply("Maximum mentions must atleast be 2");

    await maxRoleMentions(message.guildId, input);
    message.channel.send(
      `${
        input === 0
          ? "Maximum role mentions limit is disabled"
          : `Messages having more than \`${input}\` role mentions will now be automatically deleted`
      }`
    );
  }
};