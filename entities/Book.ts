
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  nm_title!: string

  @Column()
  nm_author!: string

  @Column({ type: 'int' })
  dt_published_year!: number

  @Column({ default: 0 })
  nr_followup_count!: number

  @Column({ default: 0 })
  nr_followdown_count!: number;

  @Column({ type: 'timestamp', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
  dt_criado?: Date

  @Column({ type: 'varchar', nullable: true })
  nm_user_cri?: string
}