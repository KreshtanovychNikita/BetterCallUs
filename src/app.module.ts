import { Module } from '@nestjs/common';
import { AppController } from './customer/app.controller';
import { AppService } from './customer/app.service';
import * as process from 'process';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AdAnalysisEntity } from './entities/ad-analysis.entity';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { AdTypeEntity } from './entities/ad-type.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserEntity, AdAnalysisEntity, AdTypeEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity, AdAnalysisEntity, AdTypeEntity]),
  ],
  controllers: [AppController, AdminController],
  providers: [AppService, AdminService],
})
export class AppModule {}
