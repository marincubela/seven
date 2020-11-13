export abstract class Mapper {
  public static toDomain(raw: any): any {
    return null;
  }

  public static toPersistence(model: any): any {
    return null;
  }

  public static toDTO(model: any): any {
    return null;
  }
}
