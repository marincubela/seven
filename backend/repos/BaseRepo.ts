export abstract class BaseRepo<T> {
  public abstract exists(t: T): Promise<boolean>;
  public abstract delete(t: T): Promise<any>;
  public abstract save(t: T): Promise<any>;
}
