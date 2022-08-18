import { 
  IsBoolean, 
  IsDate, 
  IsString, 
  IsUUID, 
  Length, 
  UUIDVersion 
} from "class-validator";
import { 
  Column, 
  CreateDateColumn, 
  Entity, 
  JoinColumn, 
  OneToOne, 
  PrimaryColumn 
} from "typeorm";
import { UserEntity } from "../users";

@Entity('invite_codes')
export class InviteCodeEntity {
  @IsUUID(4 as UUIDVersion)
  @PrimaryColumn('uuid', {
    name: 'id',
    default: () => 'gen_random_uuid()'
  })
  public readonly id: string;

  @IsString()
  @Length(15, 15)
  @Column('text', {
    name: 'body',
    unique: true
  })
  public body: string;

  @IsDate()
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'now()::timestamp'
  })
  public generated_at: Date;

  @IsBoolean()
  @Column('bool', {
    name: 'is_used',
    default: false
  })
  public is_used: boolean;

  /* relations */
  @OneToOne(
    () => UserEntity, 
    (user) => user.invite_code,
    { onDelete: 'CASCADE', onUpdate: 'CASCADE' }
  )
  @JoinColumn()
  user: UserEntity;
}
