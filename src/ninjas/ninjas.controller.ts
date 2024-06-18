import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Optional,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { create } from 'domain';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { OptionalParseIntPipe } from './pipe/optional-parse-int.pipe';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
export class NinjasController {
  // constructor will inject the service
  // private readonly ninjasService: NinjasService --> this is a shorthand way to declare a private property and assign a value to it
  constructor(private readonly ninjasService: NinjasService) {}
  // this constructor is creating a private property called ninjasService and assigning a value to it which is an instance of the NinjasService class. Therefore, we can use this.ninjasService to access the methods of the NinjasService class, which is the service class for the NinjasController class.

  // GET /ninjas --> []
  // GET /ninjas?type=fast&level=2&weapon=stars --> []
  @Get()
  getNinjas(
    @Query('type') type: string,
    @Query('weapon') weapon: string,
    @Query('level', OptionalParseIntPipe) level: number,
  ) {
    // const service = new NinjasService();
    // this is not the correct way to create an instance of the service class.
    // We should use dependency injection instead. We have created a private property called ninjasService in the constructor and assigned a value to it which is an instance of the NinjasService class. Therefore, we can use this.ninjasService to access the methods of the NinjasService class.

    return this.ninjasService.getNinjas(type, weapon, level); // type, weapon, level are optional parameters in this order
  }

  // GET /ninjas/:id --> {...}
  @Get(':id')
  getOneNinja(@Param('id') id: string) {
    try {
      return this.ninjasService.getNinja(id);
    } catch (error) {
      // return error.message;
      throw new NotFoundException(error.message);
    }
  }

  // POST /ninjas --> {...}
  @Post()
  @UseGuards(BeltGuard)
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    try {
      return this.ninjasService.createNinja(createNinjaDto);
    } catch (error) {
      return error.message;
    }
  }

  // PUT /ninjas/:id --> {...}
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    try {
      return this.ninjasService.updateNinja(id, updateNinjaDto);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // DELETE /ninjas/:id --> {...} // may or maynot return the deleted object
  @Delete(':id')
  removeNinja(@Param('id') id: string) {
    try {
      return this.ninjasService.removeNinja(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
