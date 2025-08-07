import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { StrategiesModule } from './strategies/strategies.module';
import { JournalsModule } from './journals/journals.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // for dev only
      ssl: true, // Important for Railway, they enforce SSL
      extra: {
        ssl: {
          rejectUnauthorized: false, // Prevents SSL certificate error
        },
      },
    }),
    AuthModule,
    UsersModule,
    StrategiesModule,
    JournalsModule,
    AnalyticsModule,
  ],
})

export class AppModule {}