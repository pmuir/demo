import {HttpException, Injectable, NestMiddleware, Optional} from "@nestjs/common";
import {Request, Response} from "express";

@Injectable()
export class ApiCastAuthorizationMiddleware implements NestMiddleware {

    private static readonly  HEADER_NAME= 'X-3scale-proxy-secret-token';
    private readonly proxySecretToken = process.env.APICAST_SECRET_TOKEN;

    use(req: Request, res: Response, next: Function) {
        if (this.proxySecretToken === undefined) {
            next();
        }
        if (req.header(ApiCastAuthorizationMiddleware.HEADER_NAME) === undefined) {
            const err = new HttpException(`missing header ${ApiCastAuthorizationMiddleware.HEADER_NAME}`, 400);
            next(err);
        }
        if (req.header(ApiCastAuthorizationMiddleware.HEADER_NAME) !== this.proxySecretToken) {
            console.log(`${ApiCastAuthorizationMiddleware.HEADER_NAME}: ${req.header(ApiCastAuthorizationMiddleware.HEADER_NAME)}`);
            console.log(`APICAST_SECRET_TOKEN: ${this.proxySecretToken}`);
            const err = new HttpException(`invalid ${ApiCastAuthorizationMiddleware.HEADER_NAME}`, 401);
            next(err);
        }
        next();
    }
}
