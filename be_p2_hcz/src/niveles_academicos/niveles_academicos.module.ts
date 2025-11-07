import { Module } from '@nestjs/common';
import { NivelesAcademicosService } from './niveles_academicos.service';
import { NivelesAcademicosController } from './niveles_academicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelAcademico } from './entities/niveles_academico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NivelAcademico])],
  controllers: [NivelesAcademicosController],
  providers: [NivelesAcademicosService],
  exports: [NivelesAcademicosService],
})
export class NivelesAcademicosModule {}


