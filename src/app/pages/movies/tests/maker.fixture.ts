import {AbstractFixture} from "gtools/out/tests/abstract.fixture";
import {ImageUtils} from "../../../shared/utils/image.utils"; // TODO: fix path
import {Maker} from "../models/maker.model";

export class MakersFixture extends AbstractFixture<Maker> {
    public constructor() {
        super([
            {
                id: 1,
                name: "Test movie maker1",
                birthday: "1995-05-23",
                csfdId: 21,
                imdbId: "TestMovieMaker1ImdbId",
                movieDbId: 31,
                avatars: [ImageUtils.getTemplate("avatar")],
            },
            {
                id: 2,
                name: "Test movie maker2",
                birthday: "1995-05-23",
                csfdId: 22,
                imdbId: "TestMovieMaker2ImdbId",
                movieDbId: 32,
                avatars: [ImageUtils.getTemplate("avatar")],
            },
            {
                id: 3,
                name: "Test movie director",
                birthday: "1995-05-23",
                csfdId: 23,
                imdbId: "TestMovieDirector1ImdbId",
                movieDbId: 33,
                avatars: [ImageUtils.getTemplate("avatar")],
            },
        ]);

    }

}
