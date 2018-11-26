exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, {Recipe}) => {
            const allRecipes = await Recipe.find();
            return allRecipes
        }
    },
    Mutation: {
        addRecipe: async (root,{name, description, instructions, category, username},{Recipe}) => {
            const newRecipe = await new Recipe({
                name,
                description,
                instructions,
                category,
                username
            }).save()
            return newRecipe;
        }
    }
}