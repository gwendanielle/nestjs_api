export default () => ({
  database: {
    type: 'mariadb',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  },
});
