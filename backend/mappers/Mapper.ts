export abstract class Mapper<Model = any, DTO = any> {
  public abstract toDomain(raw: any): Model;

  public abstract toPersistence(vinyl: Model): any;

  public abstract toDTO(vinyl: Model): DTO;
}
