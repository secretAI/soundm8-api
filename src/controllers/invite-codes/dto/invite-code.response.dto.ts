import { IsDate, IsString, IsUUID, Length, UUIDVersion } from "class-validator";
import { InviteCodeEntity } from "src/domain/invite-codes";

export class InviteCodeResponseDto {
  constructor(data: InviteCodeEntity) {
    this.id = data.id;
    this.body = data.body;
    this.generated_at = data.generated_at;
  }

  @IsUUID(4 as UUIDVersion)
  public readonly id: string;

  @IsString()
  @Length(10, 10)
  public body: string;

  @IsDate()
  public generated_at: Date;
}
