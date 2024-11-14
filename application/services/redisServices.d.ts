declare class RedisService {
    private redisClient;
    constructor();
    getData<T>(key: string): Promise<T | null>;
    setData<T>(key: string, data: T, expirationInSeconds?: number): Promise<void>;
    deleteData(key: string): Promise<void>;
    close(): Promise<void>;
}
declare const _default: RedisService;
export default _default;
