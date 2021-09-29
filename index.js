const { Intents, Client, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders"); 
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.color = {
    def: "#94f1e0",
    red: "RED"
};

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Répond pong.");

client.on("ready", async () => {
    console.log(`Connecté sur ` + client.user.username)

    client.user.setActivity("SlahTemplate")
    client.user.setStatus("dnd")


    client.guilds.cache.get("id_serveur").commands.cache.map(command => {
        command.delete();
    });
    client.guilds.cache.get("id_serveur").commands.create(data);

});

client.on("interactionCreate", interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === "data") {
            interaction.reply({ content: "pong!", ephemeral: true })
        }
    }
});

client.login("token")
