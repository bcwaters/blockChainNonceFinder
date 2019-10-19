const https = require('https');

var nonce = 1000000000000
var largestNonce = 0;
var nonceBlock = ''
var largestNonceBlock = ''
var request = require('request');
var baseUrl = "https://blockchain.info/rawblock"




var getBlockHash = function (blockHash, depth){

    request('https://blockchain.info/rawblock/' + blockHash, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        //console.log(body) // Print the google web page.
        
        


    try{    

        var newNonce = JSON.parse(body).nonce >>> 0;
        nonce = newNonce > nonce ? nonce : newNonce;
        nonceBlock = newNonce > nonce ? nonceBlock : blockHash;
            largestNonce = newNonce < nonce ? nonce : newNonce;
        largestNonceBlock  = largestNonce==newNonce ? blockHash : largestNonceBlock;
        console.log('at depth:' + depth)
           if(depth>0){
            getBlockHash(JSON.parse(body).next_block[0], --depth)
        }else{
            console.log('smallest nonce: ' + nonce + ' blockHash: '+ nonceBlock)
                console.log('\nlargest nonce: ' + largestNonce + ' blockHash: '+ largestNonceBlock)
        }
            }catch(anything){     
                        getBlockHash(blockHash, depth)
                
                console.log('recovered from unexpected parse error')
            console.log('smallest nonce: ' + nonce + ' blockHash: '+ nonceBlock)
                console.log('\nlargest nonce: ' + largestNonce + ' blockHash: '+ largestNonceBlock)}


        
     }else{
         console.log('recovered from unexpected api error')
            console.log('smallest nonce: ' + nonce + ' blockHash: '+ nonceBlock)
                console.log('\nlargest nonce: ' + largestNonce + ' blockHash: '+ largestNonceBlock)
        
     }
        
     
})

    
    
}


getBlockHash('0000000000000000000f0f12f2835fdc3e355ef9a047a174671db02bacbd9bbc', 1000)

