import { 
  IsBoolean,
  IsDate,
  IsEmail,
  IsHash, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsUUID, 
  Length, 
  UUIDVersion 
} from "class-validator";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  Index, 
  JoinColumn, 
  OneToMany, 
  OneToOne, 
  PrimaryColumn, 
} from "typeorm";
import { InviteCodeEntity } from "../../invite-codes";
import { OrderEntity } from "../../orders";

@Entity('users', {
  orderBy: {
    created_at: 'DESC'
  }
})
export class UserEntity {
  @IsUUID(4 as UUIDVersion)
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  public readonly id: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 48)
  @Column('varchar', {
    name: 'username',
    nullable: false,
    unique: false
  })
  public username: string;

  @IsNotEmpty()
  @Length(6, 12)
  @Index('user_telegram_id_index', ['telegram_id'])
  @Column('int', {
    name: 'telegram_id',
    nullable: true,
    unique: true
  })
  public telegram_id: number;

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public created_at: Date;

  @IsBoolean()
  @Column('bool', {
    name: 'is_activated',
    default: false
  })
  public is_activated: boolean;

  /* relations */
  @OneToOne(() => InviteCodeEntity, code => code.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({
    name: 'invite_code_id',
  })
  public invite_code: InviteCodeEntity;

  @OneToMany(() => OrderEntity, order => order.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public orders: OrderEntity[];
};
