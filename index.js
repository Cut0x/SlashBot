const { Intents, Client, MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders"); 
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

const { get, add, set } = require("quick.db");

client.color = {
    def: "#94f1e0",
    red: "RED"
};

const profil = new SlashCommandBuilder()
    .setName("profil")
    .setDescription("Donne le profile d'un membre.")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Mentionne un membre")
        .setRequired(true))

const addrole = new SlashCommandBuilder()
    .setName("addrole")
    .setDescription("Permet de donner un rôle à un membre.")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Mentionne un membre")
        .setRequired(true))
    /*.addStringOption(args => args
        .setName("raison")
        .setDescription("Donne une raison au mute")
        .setRequired(false))*/
    .addRoleOption(role => role
        .setName("role")
        .setDescription("Mentionne un rôle")
        .setRequired(true));

client.on("ready", async () => {
    console.log(`Connecté sur ` + client.user.username)

    client.user.setActivity("En développement")
    client.user.setStatus("idle")


    client.guilds.cache.get("840770323988873227").commands.cache.map(command => {
        command.delete();
    });
    client.guilds.cache.get("840770323988873227").commands.create(profil);
    client.guilds.cache.get("840770323988873227").commands.create(addrole);

});

client.on("interactionCreate", interaction => {
    if (interaction.isCommand()) {
        if (interaction.commandName === "profil") {
            let user = interaction.options.getUser("utilisateur");

            if (!user.bot) {
                const profil_embed = new MessageEmbed()
                    .setColor(client.color.def)
                    .setTitle(`Profile de ${user.username}`)
                    .setThumbnail(user.avatarURL({ dynamic: true, format: "webp" }))
                    .addFields([
                        {
                            name: "Niveau(x) :",
                            value: `Ce membre à **${get(`${user.id}_niveau`) ?? 0} niveau**.`
                        },
                        {
                            name: "XP :",
                            value: `Ce membre à **${get(`${user.id}_xp`) ?? 0}/${get(`${user.id}_xp_limite`) ?? 0} xp**.`
                        }
                    ])
                interaction.reply({ embeds: [ profil_embed ] })
            } else {
                const profil_embed = new MessageEmbed()
                    .setColor(client.color.red)
                    .setDescription(":x: Les bots n'ont pas de profil.")
                interaction.reply({ embeds: [ profil_embed ], ephemeral: true })
            }
        }
        if (interaction.commandName === "addrole") {
            let user = interaction.options.getUser("utilisateur");
        
            let raison = interaction.options.getString("raison");

            let role = interaction.options.getRole("role")

            if (raison === undefined) { raison = "aucune raison" } else { raison = raison }
    
            const member = client.users.cache.get(user.id);

            //member.roles.add(role/*.id*/)
    
            interaction.channel.send({
                content: `:white_check_mark: ${user} a reçut le rôle ${role}`,
                ephemeral: true
            })
    
            /*const logsChannel = client.channels.cache.get("881352731963572264");
    
            const embed = new MessageEmbed()
            .setColor("ORANGE")
            .setTitle("Nouveau mute")
            .addFields([
                {
                    name: "Membre :",
                    value: `${user} (\`${user.username}\`) - \`${user.id}\``
                },
                {
                    name: "Raison :",
                    value: raison
                },
                {
                    name: "Modérateur :",
                    value: `${interaction.author} (\`${interaction.author.username}\`) - \`${interaction.author.id}\``
                }
            ])
            logsChannel.send({ embeds: [ embed ] })*/
        }
    }
});

client.login("ODgxMzQ0MDc4Nzc0NjkzODkx.YSrdog.EcVqW9_rHBNjrKl9UMRJ5U2Kvqk")