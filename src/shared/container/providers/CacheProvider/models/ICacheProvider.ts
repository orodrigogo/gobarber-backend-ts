export default interface ICacheProvider {
  save(key: string, value: any): Promise<void>;
  recover<T>(key: string): Promise<T | null>;
  invalidade(key: string): Promise<void>;
  invalidadePrefix(prefix: string): Promise<void>;
}
