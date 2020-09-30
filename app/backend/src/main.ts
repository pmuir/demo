import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as helmet from "helmet";
import * as cookieParser from "cookie-parser";
import * as rateLimit from 'express-rate-limit';
import * as csurf from 'csurf';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle('Inventory')
      .setDescription('The inventory API description')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.use(cookieParser());
  //app.use(csurf({ cookie: true }));
  app.enableCors({origin: true});
  app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // limit each IP to 100 requests per windowMs
      }),
  );

  await app.listen(3001);
}
bootstrap();
