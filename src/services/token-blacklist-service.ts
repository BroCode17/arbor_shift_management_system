class TokenBlacklistService {
    private blacklistedTokens: Set<string> = new Set();

    addToBlacklist(token: string, expiryTime: number): void {
        this.blacklistedTokens.add(token);
        
        // Remove token from blacklist after it expires
        setTimeout(() => {
            this.blacklistedTokens.delete(token);
        }, expiryTime * 1000);
    }

    isBlacklisted(token: string): boolean {
        return this.blacklistedTokens.has(token);
    }
}

export default new TokenBlacklistService();