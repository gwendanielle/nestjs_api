import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, response, Response } from 'express';
import { RecipeService } from '../provider/recipe.service';
import { Recipe } from '../entity/Recipe.entity';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() createRecipeDto: Recipe, @Res() response: Response) {
    const recipe = await this.recipeService.create(createRecipeDto);
    if (!recipe) {
      return response.status(HttpStatus.OK).send({
        message: 'error in creating recipe',
        required: 'title, making_time, serves, ingredients, cost',
      });
    }
    return response.status(HttpStatus.OK).send({
      message: 'Recipe successfully created!',
      recipe: [recipe],
    });
  }

  @Get()
  async findAll(@Req() request: Request) {
    const recipes: Array<Recipe> = await this.recipeService.findAll();
    return { recipes: recipes };
  }

  @Get(':id')
  async findById(
    @Param('id') id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    const recipes: Recipe = await this.recipeService.findById(id);
    if (recipes) {
      return response
        .status(HttpStatus.OK)
        .send({ message: 'Recipe details by id', recipe: [recipes] });
    }
    return response.status(HttpStatus.OK).send({
      message: 'Recipe details by id not found',
    });
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    const newRecipe: any = await this.recipeService.update(id, body);
    return {
      message: 'Recipe successfully Updated!',
      recipes: [newRecipe],
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: Response) {
    const result = await this.recipeService.delete(id);
    if (result.affected > 0) {
      return response
        .status(HttpStatus.OK)
        .send({ message: 'Recipe successfully removed!' });
    } else {
      return response
        .status(HttpStatus.OK)
        .send({ message: 'No recipe was found!' });
    }
  }
}
