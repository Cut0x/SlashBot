# SlashBot
Template de bot avec /commands

# Modules
```
npm install --save discord.js @discordjs/rest discord-api-types
```

# Config -> `./exmple.config.js`
Modifie avec les informations de ton bot/sevreur.
<br>Renome le ensuite en `config.js`
```js
module.export = {
  token: "token de ton bot",
  guildId: "id de ton serveur", // genre "840770323988873227"
  channelId: "id d'un salon pour les log", // genre "881352721066770493"
}
```

# Commande
En faisant `/`, vous trouverez la commande `ping`
```
/ping
```
