import { GalleryImage } from "./gallery-image";

export class GalleryMockData {
    public static pokemons: readonly GalleryImage[] = Array(20).fill(null).map((_, i) => ({
        url : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(i + 1)
            .padStart(3, "0")}.png`,
        name: "Pokemon " + (i + 1),
        tags: ["Pokemon"],
    }));

    public static images: Readonly<GalleryImage[]> = [
        "After Match_s.jpg",
        "Blue Flower_s.jpg",
        "Bratislava Destroyed_s.jpg",
        "Bratislava Night_s.jpg",
        "Bratislava's Castle 5_s.jpg",
        "Castle_s.jpg",
        "Crystal Ball_s.jpg",
        "Cubes_s.jpg",
        "Dark Image_s.jpg",
        "destroyed building_s.jpg",
        "Dragon Fighter_s.jpg",
        "Erika Circle_s.jpg",
        "Erika Deufalt_s.jpg",
        "Erika White_s.jpg",
        "Erika_s.jpg",
        "Flower Long_s.jpg",
        "Flower of Glass_s.jpg",
        "Flower Short_s.jpg",
        "Gabriel Black_s.jpg",
        "Gabriel City_s.jpg",
        "Gabriel Frozen_s.jpg",
        "Gabriel Hairy_s.jpg",
        "Gabriel highlights_s.jpg",
        "Gabriel lights_s.jpg",
        "Gabriel Metal_s.jpg",
        "Gabriel Multicolor _s.jpg",
        "Gabriel of Glass_s.jpg",
        "Gabriel Pieces_s.jpg",
        "Gabriel Stray_s.jpg",
        "Gabriel White_s.jpg",
        "Gabs of Titans_s.jpg",
        "Heart_s.jpg",
        "MIchael's tower_s.jpg",
        "Mirrors_s.jpg",
        "Nikusa Balls_s.jpg",
        "Nikusa Circle_s.jpg",
        "Nikusa Hairy _s.jpg",
        "Nikusa Heart 2_s.jpg",
        "Nikusa Heart_s.jpg",
        "Nikusa lentilky_s.jpg",
        "Nikusa Pink_s.jpg",
        "Nikusa Sunset_s.jpg",
        "Waterfall_s.jpg",
    ].map((name) => ({
        url: "http://g43.clanweb.eu/blog/showtrail/" + name,
        name: name.replace(".jpg", ""),
        tags: [] as string[],
    })).concat(
        ...new Array(7).fill(null).map((_, i) => ({
            url: "http://g43.clanweb.eu/blog/showtrail/niks/img" + (i + 1) + ".jpg",
            name: "Picture " + (i + 1),
            tags: ["Niks"],
        })),
    );
}
