import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesController } from '../controller/recipe.controller';
import { RecipeService } from '../provider/recipe.service';
import { Recipe } from '../entity/Recipe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  controllers: [RecipesController],
  providers: [RecipeService],
  exports: [RecipeService],
})
export class RecipesModule {}
