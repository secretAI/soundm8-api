import { 
  IsBoolean,
  IsDate,
  IsEmail,
  IsHash, 
  IsInt, 
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
  @IsUUID()
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
    unique: true
  })
  public username: string;

  @IsNotEmpty()
  @IsInt()
  @Index('user_telegram_id_index', ['telegram_id'])
  @Column('bigint', {
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

  @IsString()
  public invite_code_id?: string;

  @OneToMany(() => OrderEntity, order => order.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  public orders?: OrderEntity[];
};
