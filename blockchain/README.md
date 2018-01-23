# Publica MVP - Container with Geth and Solc

This container will be used to setup RPC server and this RPC server will be used to run test.

#### Init a private node using provided genesis.json file
```
geth --datadir ./data/main init genesis.json
```

#### Create accounts for test
*Alternatively you can create accounts directly from the geth console. See RPC server step below.*
```
geth --datadir ./data/main account new
```

#### Start RPC server with console
Here you can provide `--mine` flag, but keep in mind that at least one account on that node should be created.
```
geth --rpc --rpcapi="db,eth,net,web3,personal,web3" --rpccorsdomain "http://node" --rpcaddr "0.0.0.0" --datadir ./data/main --port 30301 --nodiscover --networkid 123123 console
```

In order to create accounts from geth console you can use `helper.js` file
```
loadScript('helper.js');
addAccount();
```
