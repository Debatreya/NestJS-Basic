import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas: Array<CreateNinjaDto> = [
    {
      id: '1',
      name: 'Ryu',
      type: 'fast',
      weapon: 'shuriken',
      level: 2,
    },
    {
      id: '2',
      name: 'Ken',
      type: 'slow',
      weapon: 'katana',
      level: 3,
    },
    {
      id: '3',
      name: 'Gouki',
      type: 'fast',
      weapon: 'katana',
      level: 4,
    },
    {
      id: '4',
      name: 'Dan',
      type: 'slow',
      weapon: 'shuriken',
      level: 1,
    },
  ];

  getNinjas(type?: string, weapon?: string, level?: number) {
    // if(type && weapon && level){
    //     return this.ninjas.filter(ninja => ninja.type === type && ninja.weapon === weapon && ninja.level === level);
    // }
    // if(type && weapon){
    //     return this.ninjas.filter(ninja => ninja.type === type && ninja.weapon === weapon);
    // }
    // if(type && level){
    //     return this.ninjas.filter(ninja => ninja.type === type && ninja.level === level);
    // }
    // if(weapon && level){
    //     return this.ninjas.filter(ninja => ninja.weapon === weapon && ninja.level === level);
    // }
    // if(type){
    //     return this.ninjas.filter(ninja => ninja.type === type);
    // }
    // if(weapon){
    //     return this.ninjas.filter(ninja => ninja.weapon === weapon);
    // }
    // if(level){
    //     return this.ninjas.filter(ninja => ninja.level === level);
    // }

    // Better way to filter ninjas
    return this.ninjas.filter(
      (ninja) =>
        (!type || ninja.type === type) &&
        (!weapon || ninja.weapon === weapon) &&
        (!level || ninja.level === level), // == is used because level is a number and level is a string -> now i used === as I have used ParseIntPipe in the controller
    );

    // All ninjas if no filter is applied
    return this.ninjas;
  }

  getNinja(id: string) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    if (!createNinjaDto.name) {
      throw new Error('Name is required');
    }
    const newNinja: CreateNinjaDto = {
      id: Date.now().toString(),
      ...createNinjaDto,
    };
    this.ninjas.push(newNinja);
    return newNinja;
  }

  updateNinja(id: string, updateNinjaDto: UpdateNinjaDto) {
    const ninja = this.getNinja(id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    const updatedNinja = {
      ...ninja,
      ...updateNinjaDto,
    };
    this.ninjas = this.ninjas.map((ninja) =>
      ninja.id === id ? updatedNinja : ninja,
    );
    return this.getNinja(id);
  }
  removeNinja(id: string) {
    const ninja = this.getNinja(id);
    if (!ninja) {
      throw new Error('Ninja not found');
    }
    this.ninjas = this.ninjas.filter((ninja) => ninja.id !== id);
    return ninja;
  }
}
