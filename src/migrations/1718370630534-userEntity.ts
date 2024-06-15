import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserEntity1718370630534 implements MigrationInterface {
    name = 'UserEntity1718370630534'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" character varying NOT NULL DEFAULT \'ROLE_USER\', "email" character varying NOT NULL, "password" character varying, "firstName" character varying, "secondName" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user"')
    }

}
