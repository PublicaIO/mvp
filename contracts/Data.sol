pragma solidity ^0.4.18;

import './SafeMath.sol';

contract Data {

    /* Trusted account that can update rates */
    address public owner;

    /* Decimal numbers */
    uint256 constant public decimals = 18;

    /* Holds rates how many PBL does 1 FIAT costs (e.g. EUR => 0.5 * 1e18 PBL) */
    mapping (bytes3 => uint) public rates;

    /**
     * Only the deployer of this contract should be able to update the rates.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * Constructor.
     * Sets owner from msg.sender
     */
    function Data() public {
        owner = msg.sender;
    }

    /**
     * Convert currency to PBL
     *
     * @param _code bytes3 ISO 4217 currency code.
     * @param _amount uint Amount of FIAT to be converted to PBL (e.g. $4*1e18)
     * @return uint
     */
    function convert(bytes3 _code, uint _amount) public view returns (uint) {
        return SafeMath.div(SafeMath.mul(_amount, rates[_code]), 10**decimals);
    }

    /**
     * Updates the rate from the outside world.
     *
     * @param _code bytes3 ISO 4217 currency code.
     * @param _rate uint Current rate for 1 FIAT in PBL
     * @return bool
     */
    function updateRate(bytes3 _code, uint _rate) public onlyOwner returns (bool) {
        require(_rate > 0);
        rates[_code] = _rate;

        return true;
    }
}
