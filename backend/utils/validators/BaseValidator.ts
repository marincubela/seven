export abstract class BaseValidator {
  public static async validate(dto: unknown): Promise<Array<string>> {
    return null;
  }
}
