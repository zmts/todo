import * as fs from 'fs';
import { pgConfig } from '../config/database/pg/pg.config';

const PATH = 'ormconfig.ts';

(async () => {
  const typeOrmOptions = pgConfig.getTypeOrmConfig();

  const content = `import { DataSource } from 'typeorm';

export default new DataSource(${JSON.stringify(typeOrmOptions, null, 2)});
  `;
  fs.writeFileSync(PATH, content);
})();
