import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './interfaces/libro.interface';

@Injectable()
export class LibroService {
    private libros: Libro[] = [
        {
            id: uuid(),
            titulo: 'Cien años de soledad',
            autor: 'Gabriel García Márquez',
            año_publicacion: 1967,
            genero: 'Realismo mágico',
            editorial: 'Sudamericana',
            idioma: 'Español',
            paginas: 417
        }
    ];

    findAll() {
        return this.libros;
    }

    findOneById(id: string) {
        const libro = this.libros.find(libro => libro.id === id);
        if (!libro) {
            throw new NotFoundException(`Libro con Id '${id}' no existe!`);
        }
        return libro;
    }

    findOneByTitulo(titulo: string) {
        return this.libros.filter(libro => libro.titulo === titulo);
    }

    create(createLibroDto: CreateLibroDto) {
        const libro: Libro = {
            id: uuid(),
            ...createLibroDto,
            titulo: '',
            autor: '',
            año_publicacion: 0,
            genero: '',
            editorial: '',
            idioma: '',
            paginas: 0
        };
        this.libros.push(libro);
        return libro;
    }

    update(id: string, updateLibroDto: UpdateLibroDto) {
        let libroDB = this.findOneById(id);
        if (updateLibroDto.id && updateLibroDto.id !== id) {
            throw new BadRequestException(`El id del libro no es válido`);
        }

        this.libros = this.libros.map(libro => {
            if (libro.id === id) {
                libroDB = { ...libroDB, ...updateLibroDto, id };
                return libroDB;
            }
            return libro;
        });
        return libroDB;
    }

    delete(id: string) {
        const libro = this.findOneById(id);
        this.libros = this.libros.filter(libro => libro.id !== id);
        console.log({ libro });
    }
}

