exports.resolvers = {
    Query: {
        getAllRecipes: () => {}
    },
    Mutation: {
        addRecipe: async (root,{name, description, instructions, category, username},{Recipe}) => {
            const newRecipe = await new Recipe({
                name,
                description,
                intructions,
                category,
                username
            }).save()

            return newRecipe;
        }
    }
}