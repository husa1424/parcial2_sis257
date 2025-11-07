import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramasService } from './programas.service';
import { ProgramasController } from './programas.controller';
import { Programa } from './entities/programa.entity';
import { NivelesAcademicosModule } from '../niveles_academicos/niveles_academicos.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Programa]),  
    NivelesAcademicosModule,               
  ],
  controllers: [ProgramasController],
  providers: [ProgramasService],
})
export class ProgramasModule {}
