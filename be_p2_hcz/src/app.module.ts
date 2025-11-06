import { ConfigModule } from "@nestjs/config";
import { NivelesAcademicosModule } from "./niveles_academicos/niveles_academicos.module";
import { ProgramasModule } from "./programas/programas.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,  // Solo desarrollo
      autoLoadEntities: true, // Carga automáticamente las entidades registradas
    }),
    NivelesAcademicosModule,
    ProgramasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
