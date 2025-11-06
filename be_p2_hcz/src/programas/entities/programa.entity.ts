import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { NivelAcademico } from '../../niveles_academicos/entities/niveles_academico.entity';

export enum EstadoPrograma {
  EN_PLANIFICACION = 'En Planificación',
  EN_CURSO = 'En curso',
  FINALIZADO = 'Finalizado',
}

@Entity('programas_postgrado')
export class Programa {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @ManyToOne(() => NivelAcademico, nivel => nivel.programas, { nullable: false })
  @JoinColumn({ name: 'id_nivel_academico' })
  nivelAcademico: NivelAcademico;

  @Column('varchar', { length: 100, nullable: false })
  nombre: string;

  @Column('varchar', { length: 2000, nullable: false })
  descripcion: string;

  @Column('int', { nullable: false })
  version: number;

  @Column('int', { nullable: false })
  duracionMeses: number;

  @Column('decimal', { precision: 12, scale: 2, nullable: false })
  costo: number;

  @Column('date', { nullable: false })
  fechaInicio: Date;

  @Column('varchar', { length: 20, nullable: false })
  estado: EstadoPrograma;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaModificacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;
}
