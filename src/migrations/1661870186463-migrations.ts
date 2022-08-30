import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1661870186463 implements MigrationInterface {
    name = 'migrations1661870186463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_e6dfce6d759dcd3e43a39c6374b"
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ALTER COLUMN "created_at"
            SET DEFAULT now()::timestamp
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ALTER COLUMN "created_at"
            SET DEFAULT now()::timestamp
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_e5ccfc7e7062b9538b56e6f6a92"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "id"
            SET DEFAULT gen_random_uuid()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "created_at"
            SET DEFAULT now()::timestamp
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ADD CONSTRAINT "FK_e5ccfc7e7062b9538b56e6f6a92" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_e6dfce6d759dcd3e43a39c6374b" FOREIGN KEY ("invite_code_id") REFERENCES "invite_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_e6dfce6d759dcd3e43a39c6374b"
        `);
        await queryRunner.query(`
            ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes" DROP CONSTRAINT "FK_e5ccfc7e7062b9538b56e6f6a92"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "created_at"
            SET DEFAULT (now())
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE
            SET NULL ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ADD CONSTRAINT "FK_e5ccfc7e7062b9538b56e6f6a92" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ALTER COLUMN "created_at"
            SET DEFAULT (now())
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "orders"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ALTER COLUMN "created_at"
            SET DEFAULT (now())
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            ALTER TABLE "invite_codes"
            ALTER COLUMN "id"
            SET DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_e6dfce6d759dcd3e43a39c6374b" FOREIGN KEY ("invite_code_id") REFERENCES "invite_codes"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

}
