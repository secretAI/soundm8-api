import { IsDate, IsString, IsUUID, Length, Matches, UUIDVersion } from "class-validator";
import { InviteCodeEntity } from "../../../domain/invite-codes/entity";
import { UserEntity } from "../../../domain/users/entity";

export class InviteCodeResponseDto {
  constructor(data: InviteCodeEntity) {
    this.id = data.id;
    this.body = data.body;
    this.generated_at = data.generated_at;
    this.user = data?.user || null;
  }

  @IsUUID()
  public readonly id: string;

  @Matches(/^SM8(\w{15})$/gm)
  @IsString()
  @Length(18, 18)
  public body: string;

  @IsDate()
  public generated_at: Date;

  public user: UserEntity;
}
