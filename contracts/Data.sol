pragma solidity ^0.4.18;

contract Data {

    // Trusted account that can update rates
    address owner;

    // Holds rates how many fiat currency 1 PBL costs (e.g. EUR => 1.43e18)
    mapping (bytes3 => uint) public rates;

    // Decimal numbers
    uint256 constant public decimals = 18;

    modifier onlyOwner() {
        _;
    }

    function Data() public {
        owner = msg.sender;
    }
    
    //
    // Convert USD _amount to PBL
    //
    function convert(bytes3 _symbol, uint _amount) public view returns (uint) {
        return _amount * rates[_symbol] / 10**decimals;
    }

    function updateRate(bytes3 symbol, uint rate) public onlyOwner {
        rates[symbol] = rate;
    }
}
