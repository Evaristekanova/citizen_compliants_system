import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1747506556035 implements MigrationInterface {
    name = 'CreateInitialSchema1747506556035'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "agency_id" integer`);
        await queryRunner.query(`ALTER TYPE "public"."users_user_type_enum" RENAME TO "users_user_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."users_user_type_enum" AS ENUM('Citizen', 'Staff', 'Admin', 'SuperAdmin', 'AgencyAdmin')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "public"."users_user_type_enum" USING "user_type"::"text"::"public"."users_user_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_6fdb3282cea9ba5877ab476aa76" FOREIGN KEY ("agency_id") REFERENCES "agencies"("agency_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_6fdb3282cea9ba5877ab476aa76"`);
        await queryRunner.query(`CREATE TYPE "public"."users_user_type_enum_old" AS ENUM('Citizen', 'Agent', 'Admin')`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "user_type" TYPE "public"."users_user_type_enum_old" USING "user_type"::"text"::"public"."users_user_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."users_user_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."users_user_type_enum_old" RENAME TO "users_user_type_enum"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "agency_id"`);
    }

}
