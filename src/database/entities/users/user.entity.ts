import { 
  IsDate,
  IsEmail,
  IsHash, 
  IsNotEmpty, 
  IsOptional, 
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

  @JoinColumn({
    name: 'email',
    referencedColumnName: 'user_email',
  })
  @IsNotEmpty()
  @IsEmail()
  @Length(6, 48)
  @Index('user_email_index', ['email'])
  @Column('varchar', {
    name: 'email',
    nullable: false,
    unique: true
  })
  public email: string;

  @IsNotEmpty()
  @IsHash('sha256')
  @Column('text', {
    name: 'pass',
    nullable: false,
  })
  public pass: string;

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public created_at: Date;

  @IsOptional()
  @Length(6, 12)
  @Column('varchar', {
    name: 'telegram_id',
    nullable: true,
    unique: true
  })
  public telegram_id: string;
};
