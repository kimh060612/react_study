import crypto from "crypto";

interface BlockShape {
    prevHash: string;
    height: number;
    data: string;
    hash: string;
}

class Block implements BlockShape {
    public hash: string;
    constructor (
        public prevHash: string,
        public height: number,
        public data: string,
        
    ) {
        this.hash = Block.calculateHash(this.prevHash, this.height, this.data);
    }

    static calculateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash('sha256').update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = []
    }

    private getPrevHash() {
        if(this.blocks.length === 0) return ""
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
        const newBlock = new Block(this.getPrevHash(), this.blocks.length + 1, data);
        this.blocks.push(newBlock);
    } 
    public getBlocks() {
        return [...this.blocks]
    }
}

const blockChain = new BlockChain();

blockChain.addBlock("First One");
blockChain.addBlock("Second One");
blockChain.addBlock("Thrid One");



console.log(blockChain.getBlocks());
