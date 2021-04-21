import { GalleryImage } from "./gallery-image";

export class GalleryMockData {
    public static pokemons: readonly GalleryImage[] = Array(20).fill(null).map((_, i) => ({
        url : `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${String(i + 1)
            .padStart(3, "0")}.png`,
        name: "Pokemon " + (i + 1),
        tags: ["Pokemon"],
    }));

    public static images: Readonly<GalleryImage[]> = [
        ["After Match_s.jpg", ["Photoshop"]],
        ["Blue Flower_s.jpg", ["Cinema 4D"]],
        ["Bratislava Destroyed_s.jpg", ["Photoshop"]],
        ["Bratislava Night_s.jpg", ["Photoshop"]],
        ["Bratislava's Castle 5_s.jpg", ["Photoshop"]],
        ["Castle_s.jpg", ["Photoshop"]],
        ["Crystal Ball_s.jpg", ["Cinema 4D"]],
        ["Cubes_s.jpg", ["Cinema 4D"]],
        ["Dark Image_s.jpg", ["Photoshop"]],
        ["destroyed building_s.jpg", ["Photoshop"]],
        ["Dragon Fighter_s.jpg", ["Photoshop"]],
        ["Erika Circle_s.jpg", ["Cinema 4D"]],
        ["Erika Deufalt_s.jpg", ["Cinema 4D"]],
        ["Erika White_s.jpg", ["Cinema 4D"]],
        ["Erika_s.jpg", ["Cinema 4D"]],
        ["Flower Long_s.jpg", ["Cinema 4D"]],
        ["Flower of Glass_s.jpg", ["Cinema 4D"]],
        ["Flower Short_s.jpg", ["Cinema 4D"]],
        ["Gabriel Black_s.jpg", ["Cinema 4D"]],
        ["Gabriel City_s.jpg", ["Cinema 4D"]],
        ["Gabriel Frozen_s.jpg", ["Cinema 4D"]],
        ["Gabriel Hairy_s.jpg", ["Cinema 4D"]],
        ["Gabriel highlights_s.jpg", ["Cinema 4D"]],
        ["Gabriel lights_s.jpg", ["Cinema 4D"]],
        ["Gabriel Metal_s.jpg", ["Cinema 4D"]],
        ["Gabriel Multicolor _s.jpg", ["Cinema 4D"]],
        ["Gabriel of Glass_s.jpg", ["Cinema 4D"]],
        ["Gabriel Pieces_s.jpg", ["Cinema 4D"]],
        ["Gabriel Stray_s.jpg", ["Cinema 4D"]],
        ["Gabriel White_s.jpg", ["Cinema 4D"]],
        ["Gabs of Titans_s.jpg", ["Photoshop"]],
        ["Heart_s.jpg", ["Cinema 4D"]],
        ["MIchael's tower_s.jpg", ["Photoshop"]],
        ["Mirrors_s.jpg", ["Cinema 4D"]],
        ["Nikusa Balls_s.jpg", ["Cinema 4D"]],
        ["Nikusa Circle_s.jpg", ["Cinema 4D"]],
        ["Nikusa Hairy _s.jpg", ["Cinema 4D"]],
        ["Nikusa Heart 2_s.jpg", ["Cinema 4D"]],
        ["Nikusa Heart_s.jpg", ["Cinema 4D"]],
        ["Nikusa lentilky_s.jpg", ["Cinema 4D"]],
        ["Nikusa Pink_s.jpg", ["Cinema 4D"]],
        ["Nikusa Sunset_s.jpg", ["Cinema 4D"]],
        ["Waterfall_s.jpg", ["Photoshop"]],
    // ].map((name: string | [string, string[]]) => {
    ].map((name: any) => {
        const realName = typeof name === "string" ? name : name[0];
        const tags = (typeof name === "string" ? [] : name[1]) ;

        return {
            tags,
            url: "http://g43.clanweb.eu/blog/showtrail/" + realName,
            name: realName.replace(".jpg", ""),
        };
    }).concat(
        ...new Array(7).fill(null).map((_, i) => ({
            url: "http://g43.clanweb.eu/blog/showtrail/niks/img" + (i + 1) + ".jpg",
            name: "Picture " + (i + 1),
            tags: ["Niks"],
        })),
    ).concat(
        ...[
            ["Erika Stars.jpg", ["Photoshop"]],
            ["nikusa 2.jpg", ["Cinema 4D"]],
            ["Snob.jpg", ["Cinema 4D"]],
            ["Erika CinemaTest 2.jpg", ["Photoshop"]],
            ["srdco.jpg", ["Cinema 4D"]],
            ["Planetka modra.jpg", ["Photoshop"]],
            ["Nikol.jpg", ["Photoshop"]],
        ].map((name: any) => {
            const realName = typeof name === "string" ? name : name[0];
            const tags = (typeof name === "string" ? [] : name[1]) ;

            return {
                tags,
                url: "http://g43.clanweb.eu/blog/showtrail/misc/" + realName,
                name: realName.replace(".jpg", ""),
            };
        })
    );
}
