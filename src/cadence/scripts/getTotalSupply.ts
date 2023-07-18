export const getTotalSupply = `
import QzardNft from 0xb29336435dbb3e22;

pub fun main(): UInt64 {

    return QzardNft.totalSupply;

}
`;
