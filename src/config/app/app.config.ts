import { BaseConfig } from '../base-config'
import { AppEnvs } from './envs.enum'

const validEnvs = ['dev', 'prod', 'stage', 'local', 'test']

class AppConfig extends BaseConfig{
  get appName () {
    return this.getValue(AppEnvs.APP_NAME)
  }

  get jwtOptions () {
    const secret = this.getValue(AppEnvs.APP_JWT_SECRET)
    const exp = this.getValue(AppEnvs.APP_JWT_EXP)
    const issuer = this.getValue(AppEnvs.APP_NAME)

    return { secret, exp, issuer }
  }

  get validEnvs (): Array<string> {
    return validEnvs
  }

  get appPort (): number {
    const appPort = this.getValue(AppEnvs.APP_PORT)
    return Number(appPort)
  }

}

const appConfig = new AppConfig(
  process.env,
).ensureValues([
  AppEnvs.APP_PORT,
  AppEnvs.APP_NAME,
  AppEnvs.APP_JWT_SECRET,
  AppEnvs.APP_JWT_EXP,
])

export { appConfig }
