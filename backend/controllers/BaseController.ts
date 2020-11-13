import { IRequest, IResponse } from '../interfaces/network';

export abstract class BaseController {
  /**
   * This is the implementation that we will leave to the
   * subclasses to figure out.
   */
  protected abstract executeImpl(
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse>;

  /**
   * This is what we will call on the route handler.
   * We also make sure to catch any uncaught errors in the
   * implementation.
   */
  public async execute(req: IRequest, res: IResponse): Promise<void> {
    try {
      await this.executeImpl(req, res);
    } catch (err) {
      console.log(`[BaseController]: Uncaught controller error`);
      console.log(err);

      this.fail(res, 'An unexpected error occurred');
    }
  }

  public static jsonResponse(
    res: IResponse,
    code: number,
    messages: Array<string>
  ) {
    return res.status(code).json({
      errors: messages.map((message) => ({ message })),
    });
  }

  public ok<T>(res: IResponse, dto?: T) {
    if (!!dto) {
      res.type('application/json');

      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: IResponse) {
    return res.sendStatus(201);
  }

  public clientError(res: IResponse, messages: Array<string>) {
    return BaseController.jsonResponse(res, 400, messages || ['Loš zahtjev']);
  }

  public unauthorized(res: IResponse, messages: Array<string>) {
    return BaseController.jsonResponse(
      res,
      401,
      messages || ['Neautorizirana radnja']
    );
  }

  // public paymentRequired(res: IResponse,messages: Array<string>) {
  //   return BaseController.jsonResponse(res, 402, messages || ['Payment required']);
  // }

  public forbidden(res: IResponse, messages: Array<string>) {
    return BaseController.jsonResponse(
      res,
      403,
      messages || ['Zabranjena radnja']
    );
  }

  public notFound(res: IResponse, messages: Array<string>) {
    return BaseController.jsonResponse(
      res,
      404,
      messages || ['Nije pronađeno']
    );
  }

  public conflict(res: IResponse, messages: Array<string>) {
    return BaseController.jsonResponse(res, 409, messages || ['Sukob']);
  }

  public tooMany(res: IResponse, messages: Array<string>) {
    return BaseController.jsonResponse(
      res,
      429,
      messages || ['Previše zahtjeva']
    );
  }

  // public todo(res: IResponse) {
  //   return BaseController.jsonResponse(res, 400, 'TODO');
  // }

  public fail(res: IResponse, error: Error | string) {
    console.log('error', error);

    return BaseController.jsonResponse(res, 500, [error.toString()]);
  }
}
