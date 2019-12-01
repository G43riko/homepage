import {Maker} from "./maker.model";
import {MovieType} from "./movie-type.type";

export class Movie {
    public id: number;
    public imdbId: string;
    public csfdId: number;
    public movieDbId: number;
    public title: string;
    public titleSk: string;
    public rating: number;
    public tags: string[] = [];
    public content: string;
    public saw: boolean;
    public want_see: boolean;
    public duration: number;
    public type: MovieType;
    public year = new Date().getFullYear();
    public classification: string;
    public genres: string[] = [];
    public countries: string[] = [];
    public makers: Maker[] = [];
    public directors: Maker[] = [];
    public avatar: string;
}
