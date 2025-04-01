import { Module } from '@nestjs/common';
import { LibroModule } from './libro/libro.module';

@Module({
  imports: [LibroModule],
})
export class AppModule {}