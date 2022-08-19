cd test-network

./network.sh down
./network.sh up -ca -s couchdb  
./network.sh createChannel 
./network.sh deployCC -ccn basic -ccp ../insurance-basic/chaincode-javascript -ccl javascript

Directory="../insurance-basic/application-javascript/"

cd $Directory

if [ -d "./wallet" ];
then
	echo "=======> Deleting Wallet <==========="
    rm -r ./wallet
fi

if [ -d "./node_modules" ];
then
	echo "=======> Deleting nodeModules <==========="
    rm -r ./node_modules
    sleep 5
fi

echo "=======> Installing nodeModules <==========="
npm install
echo "=======> starting server <==========="
npm start   