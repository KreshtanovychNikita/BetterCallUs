import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'ad-type-entity' })
@Index('idx_id_type', ['id'])
export class AdTypeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float' })
  ad_density: number;

  @Column({ type: 'float' })
  ad_number_percent: number;

  @Column({ type: 'float' })
  coefficient_k: number;

  @Column({ type: 'float' })
  ad_act_cost: number;

  @Column({ type: 'varchar', length: 550 })
  description: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
