import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../entity/Recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  create(recipe: Recipe): Promise<Recipe> {
    return this.recipeRepository.save(this.recipeRepository.create(recipe));
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  findById(id: number): Promise<Recipe> {
    return this.recipeRepository.findOneBy({ id });
  }

  async update(id: number, recipe: Recipe): Promise<Recipe> {
    await this.recipeRepository
      .createQueryBuilder()
      .update()
      .set(recipe)
      .where('id = :id', { id })
      .execute();
    return this.recipeRepository.findOneBy({ id });
  }

  delete(id: string): Promise<any> {
    return this.recipeRepository
      .createQueryBuilder()
      .delete()
      .from(Recipe)
      .where('id = :id', { id })
      .execute();
  }
}
