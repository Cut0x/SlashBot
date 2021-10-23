const { Intents, Client, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders"); 
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

const { token, guildId, channelId } = require("./Data/config");
const { def, red } = require("./Data/color");

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Répond pong.");

client.on("ready", async () => {
    console.log(`Connecté sur ` + client.user.username)

    client.user.setPresence({
        activities: [
            {
                name: 'Template bot slash'
            }
        ],
        status: 'dnd'
    });

    /*client.guilds.cache.get(guildId).commands.cache.map(command => {
        command.delete();
    });*/
    client.guilds.cache.get(guildId).commands.create(data);

});

client.on("interactionCreate", interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === "data") {
            interaction.reply({ content: "pong!", ephemeral: true })
        }
    }
});

client.login(token)
