import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from 'typeorm'

import { Book } from './Book'
import { Onboarding } from './Onboarding'

@Entity('book_follow')

@Unique(['onboarding_user', 'book'])
export class Follow {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(
    () => Onboarding,
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({
    name: 'id_onboarding_user',
  })
  onboarding_user!: Onboarding

  @ManyToOne(
    () => Book,
    {
      onDelete: 'CASCADE',
    }
  )
  @JoinColumn({
    name: 'id_book',
  })
  book!: Book

  @Column({
    type: 'boolean',
    default: false,
  })
  is_followup!: boolean

  @Column({
    type: 'boolean',
    default: false,
  })
  is_followdown!: boolean

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dt_criado!: Date
}