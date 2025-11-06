import { Programa } from 'src/programas/entities/programa.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('niveles_academicos')
export class NivelAcademico {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 20, nullable: false })
  nombre: string;

  @Column('varchar', { length: 500, nullable: true })
  descripcion?: string;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaModificacion: Date;

  @DeleteDateColumn()
  fechaEliminacion: Date;

  // Relación con programas
  @OneToMany(() => Programa, programa => programa.nivelAcademico)
  programas: Programa[];
}
