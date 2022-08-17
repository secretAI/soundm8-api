import { 
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
  PrimaryColumn, 
} from "typeorm";

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
  @Index('user_email_index', ['email'])
  @Column('varchar', {
    name: 'email',
    nullable: false,
    unique: false
  })
  public username: string;

  @IsNotEmpty()
  @Length(6, 12)
  @Column('varchar', {
    name: 'telegram_id',
    nullable: true,
    unique: true
  })
  public telegram_id: string;

  @IsNotEmpty()
  @IsString()
  @Column('text', {
    name: 'invite_code',
    nullable: false,
  })
  public invite_code: string;

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public created_at: Date;

  /* add order instance */
  /* add invite_code instance */
};
