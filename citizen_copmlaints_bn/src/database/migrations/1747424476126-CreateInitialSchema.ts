import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1747424476126 implements MigrationInterface {
    name = 'CreateInitialSchema1747424476126'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "name" TO "user_type"`);
        await queryRunner.query(`ALTER TYPE "public"."users_name_enum" RENAME TO "users_user_type_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."users_user_type_enum" RENAME TO "users_name_enum"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "user_type" TO "name"`);
    }

}
