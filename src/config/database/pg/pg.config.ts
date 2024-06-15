import { join } from 'path'
import { BaseConfig } from '../../base-config'

const ENTITIES_PATTERN = '**/*.entity{.ts,.js}'
const MIGRATIONS_PATTERN = 'migrations/*{.ts,.js}'

class PgConfig extends BaseConfig{
  public getTypeOrmConfig (): any {
    const entities = join(__dirname, '..', '..', '..', ENTITIES_PATTERN)
    const migrations = join(__dirname, '..', '..', '..', MIGRATIONS_PATTERN)

    return {
      type: 'postgres',
      migrationsRun: true,
      synchronize: false,
      host: this.getValue('POSTGRES_HOST'),
      port: +this.getValue('POSTGRES_PORT'),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DB'),
      entities: [entities],
      migrations: [migrations],
      logging: false,
      logger: 'advanced-console',
      extra: {
        max: +this.getValue('MAX_DATABASE_CONNECTION'),
        min: 0,
        acquireTimeoutMillis: +this.getValue('ACQUIRE'),
        idleTimeoutMillis: +this.getValue('IDLE'),
      },
    }
  }
}

const pgConfig = new PgConfig(
  process.env,
).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
  'MAX_DATABASE_CONNECTION',
  'ACQUIRE',
  'IDLE',
])

export { pgConfig }

