const program = require('commander');
const logger = require('./core/logger');
const { executeStrategy } = require('./trading-engine');

program
  .command('start')
  .description('Запуск бота')
  .requiredOption('-n, --network <type>', 'Тестнет или мейнет')
  .requiredOption('-s, --strategy <type>', 'Название стратегии')
  .action(async (options) => {
    logger.info(`Запуск бота на ${options.network} с стратегией ${options.strategy}`);
    
    let keypair;
    if (options.network === 'testnet') {
      const testnetModule = require('./network/testnet');
      keypair = await testnetModule.getTestnetAccount();
    } else {
      const mainnetModule = require('./network/mainnet');
      keypair = mainnetModule.loadMainnetAccount(process.env.SECRET_KEY);
    }

    const baseAsset = new Asset(process.env.BASE_ASSET_CODE, process.env.ISSUER_ADDRESS);
    const counterAsset = Asset.native();

    executeStrategy(options.strategy, keypair, baseAsset, counterAsset);
  });

program.parse(process.argv);
