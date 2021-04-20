import { GalleryImage } from "./gallery-image";

export class GalleryMockData {
    public static pokemons: readonly GalleryImage[] = Array(20).fill(null).map((_, i) => ({
        url : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(i + 1)
            .padStart(3, "0")}.png`,
        name: "Pokemon " + (i + 1),
    }));
}
