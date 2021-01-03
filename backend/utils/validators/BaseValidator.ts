export abstract class BaseValidator {
  static schema = null;

  public static async validate(dto: any): Promise<Array<string>> {
    if (!this.schema) {
      throw new Error('Schema is not defined');
    }

    return await this.schema
      .validate(dto)
      .then(() => [])
      .catch(({ errors }) => errors);
  }
}
