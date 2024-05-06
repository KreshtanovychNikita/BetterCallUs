import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'ad-analysis-entity' })
@Index('idx_id_analysis', ['id'])
export class AdAnalysisEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column()
  customer_id: number;

  @Column()
  adequacy_of_advertising: boolean;

  @Column({ type: 'float' })
  t_one: number;

  @Column({ type: 'float' })
  number_of_buyers: number;

  @Column({ type: 'jsonb' })
  data_for_diagrams: Record<string, number>;

  @Column({ type: 'float' })
  total_income: number;

  @Column({ type: 'float' })
  total_cost: number;

  @Column({ type: 'float' })
  profit: number;

  @Column()
  key: string;

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
