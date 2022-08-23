import { 
  IsBoolean,
  IsDate,
  IsFQDN, 
  IsIn, 
  IsInt, 
  IsNotEmpty, 
  IsOptional, 
  IsUUID, 
  Length, 
  Max, 
  Min, 
  UUIDVersion 
} from "class-validator";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  Index, 
  ManyToOne, 
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "../../users";
import { PitchKeyList } from "../../../lib";

@Entity('orders', {
  orderBy: { 
    created_at: 'DESC' 
  }
})
export class OrderEntity {
  @IsUUID(4 as UUIDVersion)
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  public readonly id: string;

  @IsNotEmpty()
  @Length(30, 350)
  @IsFQDN() /* check if url suits pattern: abc.com */
  @Index('order_url_index', ['url'])
  @Column('text', {
    name: 'url',
    unique: true,
    nullable: false
  })
  public url: string;

  @IsOptional()
  @IsIn(PitchKeyList.uniqueKeys)
  @Column('enum', {
    name: 'key',
    enum: PitchKeyList.uniqueKeys
  })
  public key?: string;

  @IsOptional()
  @IsInt()
  @Min(30) 
  @Max(240)
  @Column('int', {
    name: 'bpm',
    default: 0
  })
  public bpm?: number;

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public created_at: Date;

  @IsBoolean()
  @Column('bool', {
    name: 'is_completed',
    default: false
  })
  public is_completed: boolean;

  /* relations */
  @ManyToOne(
    () => UserEntity, 
    user => user.orders,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' }
  )
  public user: UserEntity;
};
