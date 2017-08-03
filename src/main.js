const SteamUser = require('steam-user');
const client = new SteamUser();
const SteamCommunity = require('steamcommunity');
const TradeOfferManager = require('steam-tradeoffer-manager');

const logOnOptions = {
    accountName: 'abc5528951',
    password: 'tjuwuhao0428'
};

const community = new SteamCommunity();
const manager = new TradeOfferManager({
    steam: client,
    community: community,
    language: 'en'
});

client.logOn(logOnOptions);

client.on('webSession', (sessionid, cookies) => {
    manager.setCookies(cookies);
    community.setCookies(cookies);
});

manager.on('newOffer', (offer) => {
       //  if (offer.partner.getSteamID64() === 'tju_wuhao') {
            offer.accept((err, status) => {
                if (err) {
                            console.log(err);
                } else {
                            console.log(`Accepted offer. Status: ${status}.`);
                }
        });
    // }
});

client.on('loggedOn', () => {
    console.log('Logged into Steam');
    client.setPersona(SteamUser.Steam.EPersonaState.Online, 'R0_prototype');
    client.gamesPlayed(570);
});

client.on('friendMessage', (senderID, message ) => {
    console.log(`${senderID}说： ${message}`);
    if (message.startsWith('#')) {
        client.setPersona(SteamUser.Steam.EPersonaState.Online, message.slice(1));
        client.chatMessage(senderID, '可以，老哥，改名成功！');
    }else {
        client.chatMessage(senderID, '我现在是个机器人，主人可能回复可能不回复（nodejs拯救世界）');
    }

});
