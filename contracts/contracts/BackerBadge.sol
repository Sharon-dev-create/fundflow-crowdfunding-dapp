// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title  BackerBadge
/// @notice Soulbound (non-transferable) ERC721 minted to every contributor
///         as on-chain proof of participation. Metadata is fully on-chain SVG.
contract BackerBadge is ERC721, Ownable {
    using Strings for uint256;

    // ─── Errors ───────────────────────────────────────────────────────────────
    error NotEscrowContract();
    error EscrowNotSet();
    error SoulboundToken();

    // ─── State ────────────────────────────────────────────────────────────────
    uint256 private _tokenIdCounter;
    address public  escrowContract;

    struct BadgeMeta {
        uint256 campaignId;
        string  campaignTitle;
        uint256 amount;    // original msg.value in wei
        uint256 mintedAt;
    }

    mapping(uint256 => BadgeMeta)  public badgeData;
    mapping(address => uint256[])  private ownerBadges;

    // ─── Events ───────────────────────────────────────────────────────────────
    event BadgeMinted(uint256 indexed tokenId, address indexed to, uint256 indexed campaignId, uint256 amount);
    event EscrowSet(address indexed escrow);

    // ─── Constructor ──────────────────────────────────────────────────────────
    constructor(address initialOwner)
        ERC721("FundFlow Backer Badge", "FFBADGE")
        Ownable(initialOwner)
    {}

    // ─── Admin ────────────────────────────────────────────────────────────────
    function setEscrowContract(address _escrow) external onlyOwner {
        escrowContract = _escrow;
        emit EscrowSet(_escrow);
    }

    // ─── Mint (escrow only) ───────────────────────────────────────────────────
    function mintBadge(
        address        to,
        uint256        campaignId,
        string calldata campaignTitle,
        uint256        amount
    ) external returns (uint256 tokenId) {
        if (escrowContract == address(0)) revert EscrowNotSet();
        if (msg.sender != escrowContract) revert NotEscrowContract();

        tokenId = ++_tokenIdCounter;

        badgeData[tokenId] = BadgeMeta({
            campaignId:    campaignId,
            campaignTitle: campaignTitle,
            amount:        amount,
            mintedAt:      block.timestamp
        });

        ownerBadges[to].push(tokenId);
        _safeMint(to, tokenId);

        emit BadgeMinted(tokenId, to, campaignId, amount);
    }

    // ─── Soulbound: block all transfers ───────────────────────────────────────
    function transferFrom(address, address, uint256) public pure override {
        revert SoulboundToken();
    }

    // ─── On-chain SVG tokenURI ────────────────────────────────────────────────
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        BadgeMeta memory m = badgeData[tokenId];

        string memory svg = _buildSVG(tokenId, m);

        string memory json = Base64.encode(bytes(string.concat(
            '{"name":"FundFlow Backer Badge #', tokenId.toString(), '",',
            '"description":"Proof of contribution to ', m.campaignTitle, ' on FundFlow.",',
            '"image":"data:image/svg+xml;base64,', Base64.encode(bytes(svg)), '",',
            '"attributes":[',
                '{"trait_type":"Campaign ID","value":"',   m.campaignId.toString(),     '"},',
                '{"trait_type":"Campaign","value":"',      m.campaignTitle,              '"},',
                '{"trait_type":"Amount (wei)","value":"',  m.amount.toString(),          '"},',
                '{"trait_type":"Minted At","value":"',     m.mintedAt.toString(),        '"}',
            ']}'
        )));

        return string.concat("data:application/json;base64,", json);
    }

    // ─── Views ────────────────────────────────────────────────────────────────
    function getBadgesByOwner(address owner) external view returns (uint256[] memory) {
        return ownerBadges[owner];
    }

    function totalSupply() external view returns (uint256) {
        return _tokenIdCounter;
    }

    // ─── Internal ─────────────────────────────────────────────────────────────
    function _buildSVG(uint256 tokenId, BadgeMeta memory m) internal pure returns (string memory) {
        return string.concat(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">',
            '<defs>',
              '<linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">',
                '<stop offset="0%"   style="stop-color:#0b1326"/>',
                '<stop offset="100%" style="stop-color:#1a1f3a"/>',
              '</linearGradient>',
              '<linearGradient id="acc" x1="0%" y1="0%" x2="100%" y2="0%">',
                '<stop offset="0%"   style="stop-color:#4cd7f6"/>',
                '<stop offset="100%" style="stop-color:#4edea3"/>',
              '</linearGradient>',
            '</defs>',
            '<rect width="400" height="400" rx="24" fill="url(#bg)"/>',
            '<rect width="398" height="398" x="1" y="1" rx="23" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>',
            '<text x="200" y="72" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#c7c4d7" letter-spacing="4">FUNDFLOW BACKER BADGE</text>',
            '<circle cx="200" cy="165" r="52" fill="none" stroke="url(#acc)" stroke-width="1.5"/>',
            '<text x="200" y="158" text-anchor="middle" font-family="Inter,sans-serif" font-size="30" fill="#c0c1ff">&#9670;</text>',
            '<text x="200" y="180" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#4edea3">#', tokenId.toString(), '</text>',
            '<text x="200" y="254" text-anchor="middle" font-family="Inter,sans-serif" font-size="17" fill="#dae2fd" font-weight="600">', _truncate(m.campaignTitle, 26), '</text>',
            '<text x="200" y="284" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" fill="#c7c4d7">Contributed ', _formatEth(m.amount), ' ETH</text>',
            '<text x="200" y="348" text-anchor="middle" font-family="Inter,sans-serif" font-size="10" fill="#464554">Campaign #', m.campaignId.toString(), '</text>',
            '</svg>'
        );
    }

    function _formatEth(uint256 wei_) internal pure returns (string memory) {
        uint256 eth  = wei_ / 1e18;
        uint256 dec  = (wei_ % 1e18) / 1e14;
        return string.concat(eth.toString(), ".", _pad4(dec));
    }

    function _pad4(uint256 n) internal pure returns (string memory) {
        if (n < 10)   return string.concat("000", n.toString());
        if (n < 100)  return string.concat("00",  n.toString());
        if (n < 1000) return string.concat("0",   n.toString());
        return n.toString();
    }

    function _truncate(string memory s, uint256 max) internal pure returns (string memory) {
        bytes memory b = bytes(s);
        if (b.length <= max) return s;
        bytes memory t = new bytes(max);
        for (uint256 i; i < max - 3; i++) t[i] = b[i];
        t[max-3] = "."; t[max-2] = "."; t[max-1] = ".";
        return string(t);
    }
}
