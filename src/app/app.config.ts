import {environment} from "../environments/environment";
import {MenuItemModel} from "./shared/components/menu-item.model";
import {Roles} from "./shared/enums/roles.enum";

export class AppConfig {
    public static readonly TITLE = "DemoPage";
    public static readonly BASE_URL = environment.base_url;
    public static readonly ITEMS_PER_PAGE = 10;
    public static readonly YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
    public static readonly YOUTUBE_API_KEY = "AIzaSyAh6T37m_p-3DQ6JELbqIIhnvqXBgOXf-E";

    public static readonly GOOGLE_MAPS_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    public static readonly GOOGLE_MAPS_API_KEY = "AIzaSyB6feh5xBQnhLno2YRNNbjOdp17XA8Cmss";

    // public static readonly GOOGLE_MAPS_API_EMBED_KEY = "AIzaSyD6PqlCJNkkQy4azb6XFtyR1Zb-RVlJjW8";
    public static readonly GOOGLE_MAPS_API_EMBED_KEY = "AIzaSyCooxFtIu4-NHFUyWXU3ANppefKsaRdyss";

    public static readonly GOOGLE_MAPS_API_EMBED_URL = "https://www.google.com/maps/embed/v1/place";

    public static readonly FIREBASE_AUTH = {
        apiKey: "AIzaSyCooxFtIu4-NHFUyWXU3ANppefKsaRdyss",
        authDomain: "foods-5d312.firebaseapp.com",
        databaseURL: "https://foods-5d312.firebaseio.com",
        projectId: "foods-5d312",
        storageBucket: "foods-5d312.appspot.com",
        messagingSenderId: "265768844504",
    };

    public static readonly DEFAULT_ALERT_DURATION = 2000;

    public static readonly PATH_ABOUT = "about";
    public static readonly PATH_ACCOUNTS = "accounts";
    public static readonly PATH_LOCATION = "location";
    public static readonly PATH_DEMOS = "demos";
    public static readonly PATH_HOME = "home";
    public static readonly PATH_PROFILE = "profile";
    public static readonly PATH_MIXES = "mixes";
    public static readonly PATH_IMAGES = "images";
    public static readonly PATH_PERSONS = "persons";
    public static readonly PATH_MOVIES = "movies";
    public static readonly PATH_IMAGE_UPLOAD = "upload";
    public static readonly PATH_YOUTUBE = "youtube";
    public static readonly PATH_SONGS = "songs";
    public static readonly PATH_FILES = "files";
    public static readonly PATH_TODO = "todo";
    public static readonly PATH_BROWSER = "browser";
    public static readonly PATH_FOODS = "foods";
    public static readonly PATH_IMAGE_DETAIL = "detail";

    public static readonly AUTH_COOKIE_KEY = "__auth_key__";

    public static readonly MENU_ITEMS: MenuItemModel[] = [
        {
            icon: "home",
            link: AppConfig.PATH_HOME,
            access: "",
            label: "home",
        },
        {
            icon: "account",
            link: AppConfig.PATH_PROFILE,
            access: [Roles.ROLE_VISITOR],
            label: "profile",
        },
        {
            icon: "account",
            link: AppConfig.PATH_MIXES,
            access: [Roles.ROLE_VISIT_MIXES],
            label: "mixes",
        },
        {
            icon: "account",
            link: AppConfig.PATH_ACCOUNTS,
            access: [Roles.ROLE_VISIT_ACCOUNTS],
            label: "accounts",
        },
        {
            icon: "file",
            link: AppConfig.PATH_FILES,
            access: [Roles.ROLE_VISIT_FILES],
            label: "files",
        },
        /*
        {
            icon: "block layout",
            link: AppConfig.PATH_IMAGES,
            label: "images",
        },
        {
            icon: "marker",
            link: AppConfig.PATH_LOCATION,
            label: "location",
        },
        */
        {
            icon: "address book",
            link: AppConfig.PATH_PERSONS,
            access: [Roles.ROLE_VISIT_PERSONS],
            label: "persons",
        },
        {
            icon: "address book",
            link: AppConfig.PATH_MOVIES,
            access: [Roles.ROLE_VISIT_MOVIES],
            label: "movies",
        },
        /*
        {
            icon: "marker",
            link: AppConfig.PATH_DEMOS,
            label: "demos",
        },
        */
        {
            icon: "music",
            link: AppConfig.PATH_SONGS,
            access: [Roles.ROLE_VISIT_SONGS],
            label: "songs",
        },
        {
            icon: "fodds",
            link: AppConfig.PATH_FOODS,
            access: "",
            label: "foods",
        },
        /*
        {
            icon: "",
            link: AppConfig.PATH_YOUTUBE,
            label: "youtube",
        },
        {
            icon: "",
            link: AppConfig.PATH_BROWSER,
            label: "browser",
        },
        {
            icon: "",
            link: AppConfig.PATH_FOODS,
            label: "foods",
        },
        */
        {
            icon: "info circle",
            link: AppConfig.PATH_ABOUT,
            access: "",
            label: "about",
        },
        /*
        {
            icon: "",
            link: AppConfig.PATH_TODO,
            label: "todo",
        },
        */
    ];
}
