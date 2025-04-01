import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  getAllLibros() {
    return this.libroService.findAll();
  }

  @Get('id/:id')
  getLibroById(@Param('id', ParseUUIDPipe) id: string) {
    return this.libroService.findOneById(id);
  }

  @Get('titulo/:titulo')
  getLibroByTitulo(@Param('titulo') titulo: string) {
    return this.libroService.findOneByTitulo(titulo);
  }

  @Post()
  createLibro(@Body() createLibroDto: CreateLibroDto) {
    return this.libroService.create(createLibroDto);
  }

  @Patch('id/:id')
  updateLibro(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLibroDto: UpdateLibroDto
  ) {
    return this.libroService.update(id, updateLibroDto);
  }

  @Delete('id/:id')
  deleteLibro(@Param('id', ParseUUIDPipe) id: string) {
    return this.libroService.delete(id);
  }
}
