import type { UserRole } from '@/features/onboarding/types/onboarding.types'

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

@Entity('onboarding')
export class Onboarding {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  nm_user!: string

  @Column({ nullable: true })
  nr_cpf?: string

  @Column({ type: 'varchar' })
  ie_role!: string
}