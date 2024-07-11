import { Client, ActivityType,GatewayIntentBits, ApplicationCommandOptionType, ClientPresence, } from 'discord.js';
import config from "./config.js";
// const client = new Client({intents:["GuildMessages","DirectMessages","Guilds","GuildBans","GuildMessages","GuildMembers","GuildIntegrations","MessageContent","GuildScheduledEvents"]})

const client = new Client({ intents: [GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildScheduledEvents,'32767']})
// const client = new Client({ intents: [ GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMembers,'32767']});
  
export default client
export const commands = {}
export const autocompletes = {}
export const buttons = {}
export const selects = {}
export const modal = {}

client.on('interactionCreate', (interaction) => {
    if(interaction.isCommand()) {
        if(commands[interaction.commandName]) {
          commands[interaction.commandName](interaction)
        }
    } else if(interaction.isAutocomplete()){
        if(autocompletes[interaction.commandName]){
            autocompletes[interaction.commandName](interaction)
        }
    } else if(interaction.isButton()) {
        if(buttons[interaction.customId]) {
            buttons[interaction.customId](interaction)
        }
    } else if(interaction.isStringSelectMenu()) {
        if(selects[interaction.customId]) {
            selects[interaction.customId](interaction)
        }
    }   else if(interaction.isModalSubmit()) {
        if(modal[interaction.customId]) {
            modal[interaction.customId](interaction)
        }
    }
})

client.on('ready', (interaction) => {
    const guild = client.guilds.cache.get(config.main.guild);
    if (!guild) return;
    const memberCount = guild.memberCount;
    let activities = [
       { name: '🌐 SmartCode', type: ActivityType.Playing},
       { name: `👥 ${memberCount} Pessoas`, type: ActivityType.Watching},
       { name: `🥇 Dev By ! vRP.Tuma`, type: ActivityType.Streaming, url: 'https://www.twitch.tv/tumagameplays'}
    ]
    let i = 0;
    setInterval(() => {
        if( i >= activities.length) i = 0
        client.user.setActivity(activities[i])
        i++;
    },40000)
    let status = [
        'dnd',
        'online',
        'idle'
    ]
    let s = 0;
    setInterval(() => {
        if( s >= status.length) s = 0
        client.user.setStatus(status[s])
        s++;
    },40000)
    // client.user.setStatus('invisible')

    console.log(('\x1b[32m[LOGS]\x1b[0m') + (` Sistema do bot iniciado com sucesso em: ${client.user.username}`));
    console.log(('\x1b[32m[LOGS]\x1b[0m') + (' Modulos ligados com sucesso'));
    console.log(('\x1b[32m[LOGS]\x1b[0m') + (' Conectado no banco com sucesso'));

    client.application.commands.set([
        {
            name: "liberation",
            description: "Sistema de Liberação no servidor",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "punishmentpanel",
            description: "Painel de punição",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "allowlist",
            description: "Sistema de Allowlist",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "ticket",
            description: "Sistema de Ticket",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "captcha",
            description: "Sistema de Captcha",  
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "verification",
            description: "Sistema de Verificação",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "search",
            description: "painel de gerenciamento SEARCH",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "code",
            description: "Painel de gerenciamento de CODIGUINS",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: "painelbot",
            description: "Painel de gerenciamento de CODIGUINS",
            defaultMemberPermissions: "Administrator",
            dmPermission: false
        },
        {
            name: 'embed',
            description: 'envie um embed com uma mensagem em um canal',
            defaultMemberPermissions: 'Administrator',
            options: [
                { description: 'Titulo do Embed', name: 'title', type: ApplicationCommandOptionType.String, required: true },
                { description: 'Descrição do Embed', name: 'description', type: ApplicationCommandOptionType.String, required: true },
                { description: 'Conteudo da mensagem', name: 'content', type: ApplicationCommandOptionType.String },
            ],
            dmPermission: false
        },
    ])
})

// process.on('unhandledRejection', (err, promise) => {
//     console.error(err)
// });
      
// process.on('uncaughtException', (err, origin) => {
//     console.error(err)
// });
      
// process.on('uncaughtExceptionMonitor', (err, origin) => {
//     console.error(err)
// });

client.login(process.env.TOKEN)