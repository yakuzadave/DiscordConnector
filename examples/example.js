const DC = require('./../DiscordConnector');
const CS = require('./../ConnectorStorage');
const TCS = require('./../TestConnectorStorage');

require('dotenv').config();

// A ConnectorStorage or TestConnectorStorage client must be instantiated and initialized. This class provides the logic to map Direct Line conversation IDs to Discord Channel IDs.

// Example configuration for ConnectorStorage
// var storage = new CS.ConnectorStorage({
//     host: process.env.DOCUMENTDB_HOST,
//     masterKey: process.env.DOCUMENTDB_MASTER_KEY,
//     database: process.env.DOCUMENTDB_DB_NAME,
//     collection: process.env.DOCUMENTDB_COLLECTION
// });

// This example implements the TestConnectorStorage which caches the conversation-channel pairings.
var storage = new TCS.TestConnectorStorage();
storage.initialize();

// DiscordConnector configuration file, discordSecret, dlSecret and botName are all required at this time.
var DiscordConnectorConfig = { 
    discordSecret: process.env.DISCORD_SECRET, 
    dlSecret: process.env.DIRECTLINE_SECRET,
    botName: process.env.BOT_NAME,
    botId: process.env.BOT_ID
}

// Creating a DiscordConnector instance.
var connector = new DC.DiscordConnector(DiscordConnectorConfig);

// Adding our ConnectorStorage, enabling a basic relay, and conversationUpdate events from Discord to Direct Line.
connector.addStorageClient(storage);
connector.enableBasicRelay();
connector.conversationUpdate();
