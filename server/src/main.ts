import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { drizzle } from "drizzle-orm/neon-http";

//db setup
const databaseUrl = process.env.DATABASE_URL;
const db = databaseUrl ? drizzle(databaseUrl) : new Error("DATABASE_URL is not defined");


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
