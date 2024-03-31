import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./ExceptionHandler/HttpException";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.useGlobalPipes(
   new ValidationPipe({
     whitelist: true, // Strip properties that do not have any decorators
     forbidNonWhitelisted: true, // Throw errors if non-whitelisted values are provided
     transform: true, // Automatically transform payloads to be objects typed according to their DTO classes
     transformOptions: {
       enableImplicitConversion: true, // Automatically convert primitive types
     },
   }),
 );
 app.useGlobalFilters(new HttpExceptionFilter());
  const options = new DocumentBuilder()
    .setTitle('Lottery API')
    .setDescription('For Lottery')
    .setVersion('1.0')
    .addTag('Routes')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app
    .listen(process.env.PORT)
    .then(() => {
      console.log(`successfully stared on port ${process.env.PORT}`);
    })
    .catch((error) => {
      console.log(error);
    });
}
bootstrap();
