import { Maker } from "./maker.model";

export class Movie {
    public movie_id: number;
    public imdb_id: string;
    public csfd_id: number;
    public moviedb_id: number;
    public title: string;
    public title_sk: string;
    public rating: number;
    public tags: string[]      = [];
    public content: string;
    public saw: boolean;
    public want_see: boolean;
    public duration: number;
    public year: string;
    public classification: string;
    public genres: string[]    = [];
    public countries: string[] = ["AL", "AK"];
    public makers: Maker[]     = [];
    public avatar: string;
}
