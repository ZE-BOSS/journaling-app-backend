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
      type: 'postgres',
      host: 'turntable.proxy.rlwy.net',
      port: 22275,
      username: 'postgres',
      password: 'HMyNlTdgXJXrxzzzWuKIEKitaEpgveAj',
      database: 'railway',
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