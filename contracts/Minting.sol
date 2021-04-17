pragma solidity 0.8.3;

import '@openzeppelin/contracts/token/ERC721/ERC721Full.sol';

contract Minting is ERC721Full {

  nft[] public nfts;
  mapping(nft => bool) private _nftExists;
  uint fromTokenId = 1;
  uint toTokenId = 16846;
  address fromAddress = '0x0';
  address toAddress = '';


  constructor() ERC721Full("NFT collection", "NFT") public {
  }

  // E.G. NFT = "#FFFFFF"
  function mint(nft _nft) public {
    require(!_nftExists[_nft], "NFT exists");
    uint _id = nfts.push(_nft);
    _mint(msg.sender, _id);
    _nftExists[_nft] = true;
    event ConsecutiveTransfer(uint256 indexed fromTokenId, uint256 toTokenId, address indexed fromAddress, address indexed toAddress);
    //Single token creation
    emit ConsecutiveTransfer(1, 1, address(0), toAddress);
    //Batch token creation
    emit ConsecutiveTransfer(1, 100000, address(0), toAddress);
    //Batch token transfer
    emit ConsecutiveTransfer(1, 100000, fromAddress, toAddress);
    //Burn
    emit ConsecutiveTransfer(1, 100000, from, address(0));
  }
}