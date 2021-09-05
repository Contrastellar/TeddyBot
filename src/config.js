/*
  config.js
  Handles bot configuration and setup on startup -- will alert the user to missing files, create them if necessary, etc.
*/

import { existsSync, writeFileSync, copyFile } from "fs";
import { loadConfig } from "./stars";

function configure() {
  let didConfigure = false;
  if (!existsSync("./info/blacklistIgnore.json")) {
    didConfigure = true;
    console.log(
      "Blacklist Ignore file not found. This file contains an array of Channel IDs in which to not enforce the blacklist."
    );
    writeFileSync("./info/blacklistIgnore.json", "[]", "utf8");
    console.log("./info/blacklistIgnore.json created.");
  }

  if (!existsSync("./info/blacklist.json")) {
    didConfigure = true;
    console.log(
      "Blacklist file not found. This file contains an array of words which, if found, are to have their containing message removed, or warned about."
    );
    writeFileSync("./info/blacklist.json", "[]", "utf8");
    console.log("./info/blacklist.json created.");
  }

  if (!existsSync("./info/blacklistWarningSpecialCases.json")) {
    didConfigure = true;
    console.log(
      "Blacklist Warning Special Cases file not found. This file contains any words which, due to their short nature, come up frequently as false warning positives. These are ignored."
    );
    writeFileSync("./info/blacklistWarningSpecialCases.json", "[]", "utf8");
    console.log("./info/blacklistWarningSpecialCases.json created.");
  }

  if (!existsSync("./info/censorshipInfo.json")) {
    didConfigure = true;
    console.log(
      "Censorship info not found. This is a list of users with infractions."
    );
    writeFileSync("./info/censorshipInfo.json", "{}", "utf8");
    writeFileSync("./info/censorshipInfo.csv", "", "utf8");
    console.log("./info/censorshipInfo.json and .csv created.");
  }

  if (!existsSync("./info/discordToken.txt")) {
    didConfigure = true;
    console.log(
      "Discord Token text file not found. This file should contain your Discord Bot token."
    );
    writeFileSync("./info/discordToken.txt", "PutYour.Token_Here", "utf8");
    console.log(
      "./info/discordToken.txt created and filled with example token."
    );
  }

  if (!existsSync("./info/botName.txt")) {
    didConfigure = true;
    console.log(
      "Bot name file not found, will default to TeddyBot. Update this file with your desired bot name."
    );
    writeFileSync("./info/botName.txt", "TeddyBot", "utf8");
    console.log("./info/botName.txt created and filled with example name.");
  }

  if (!existsSync("./img/avatar.png")) {
    didConfigure = true;
    console.log(
      "Bot avatar file not found, will default to TeddyBot. Update this file with your desired bot avatar png image."
    );
    copyFile(
      "./img/avatar-default.png",
      "./img/avatar.png",
      function (err, data) {}
    );
    console.log("./img/avatar.png created and filled with example avatar.");
  }

  if (!existsSync("./info/ids.json")) {
    didConfigure = true;
    let ids = {
      server: "123456",
      rulesChannel: "123456",
      announcementsChannel: "123456",
      moderationChannel: "123456",
      introductionsChannel: "0",
      galleryChannel: "0",
      memesChannel: "0",
      botlogChannel: "0",
      rolesChannel: "123456",
      helpChannel: "0",
    };
    console.log(
      "ids file not found. This file contains the specific IDs of either messages or channels that are used for things like reading specific message reactions, posting to specific server channels, etc."
    );
    writeFileSync("./info/ids.json", JSON.stringify(ids, null, "\t"), "utf8");
    console.log("./info/ids.json created and populated with example data.");
  }

  if (!existsSync("./info/memberRoles.json")) {
    didConfigure = true;
    writeFileSync("./info/memberRoles.json", "[]", "utf8");
    console.log(
      "./info/memberRoles.json created. List of IDs to use for roles automatically assigned to new members. Leave blank if none."
    );
  }

  if (!existsSync("./info/modRoles.json")) {
    didConfigure = true;
    writeFileSync("./info/modRoles.json", "[]", "utf8");
    console.log(
      "./info/modRoles.json created. List of IDs to use for moderator and staff roles for advanced bot features."
    );
  }

  if (!existsSync("./info/introMessages.json")) {
    didConfigure = true;
    writeFileSync("./info/introMessages.json", "[]", "utf8");
    console.log(
      './info/introMessages.json created. List of custom intro messages for new users. These should end with a blank for the user\'s name ("Oh hi, "). Leave blank if none.'
    );
  }

  if (!existsSync("./info/roleEmoji.json")) {
    didConfigure = true;
    let exampleRoleEmoji = {
      emote: "11111",
      role: "22222",
    };
    writeFileSync(
      "./info/roleEmoji.json",
      JSON.stringify(exampleRoleEmoji, null, "\t"),
      "utf8"
    );
    console.log(
      "./info/roleEmoji.json created. The first emoji in this list should be your setup reaction. This list is what gets added to any message in the role-assignment channel after it sees a setup reaction, and their corresonding roles. Configured with the !emotelist command."
    );
  }

  if (!existsSync("./info/botReplies.json")) {
    didConfigure = true;
    writeFileSync("./info/botReplies.json", "[]", "utf8");
    console.log(
      "./info/botReplies.json created. This is a list of emotes the bot can reply with to any 'question' (i.e. mention the bot with a question mark"
    );
  }

  if (!existsSync("./info/userCommands.json")) {
    didConfigure = true;
    writeFileSync("./info/userCommands.json", "[]", "utf8");
    console.log(
      "./info/userCommands.json created. This is the list of dynamically created call-and-response commands for all users, managed with !setcommand, !describecommand, and !deletecommand"
    );
  }

  if (!existsSync("./info/spam.json")) {
    didConfigure = true;
    writeFileSync("./info/spam.json", "[]", "utf8");
    console.log(
      "./info/spam.json created. This file contains strings banned from new user IDs to prevent incoming spambots and kick them on join."
    );
  }
  didConfigure = loadConfig();

  if (didConfigure) {
    console.log("Configuration complete.");
    console.log(
      "The bot will not work properly until the created files are populated with accurate information, if applicable."
    );
  }
}

const _configure = configure;
export { _configure as configure };
