import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  /**
   * Return 'Hello World!' message.
   */
  public getHello(): string {
    return 'Hello World!';
  }

}
