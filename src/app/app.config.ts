import { environment } from "../environments/environment";
import { MenuItemModel } from "./shared/components/menu-item.model";
import { Roles } from "./shared/enums/roles.enum";

export class AppConfig {
    public static TITLE = "DemoPage";
    // public static BASE_URL					      = "http://localhost:3000";
    public static BASE_URL = environment.base_url;
    public static ITEMS_PER_PAGE = 10;
    public static API_ENDPOINT_ADD_IMAGE = "http://localhost:8080/images/add";
    public static API_ENDPOINT_IMAGES = "http://localhost:8080/images";
    public static YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3/search";
    public static YOUTUBE_API_KEY = "AIzaSyAh6T37m_p-3DQ6JELbqIIhnvqXBgOXf-E";

    public static GOOGLE_MAPS_API_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
    public static GOOGLE_MAPS_API_KEY = "AIzaSyB6feh5xBQnhLno2YRNNbjOdp17XA8Cmss";

    public static GOOGLE_MAPS_API_EMBED_KEY = "AIzaSyD6PqlCJNkkQy4azb6XFtyR1Zb-RVlJjW8";
    public static GOOGLE_MAPS_API_EMBED_URL = "https://www.google.com/maps/embed/v1/place";

    public static FIREBASE_AUTH     = {
        apiKey           : "AIzaSyDFjU52OiDx66u_jI5QAAiCB0QQufaLgxo",
        authDomain       : "foods-5d312.firebaseapp.com",
        databaseURL      : "https://foods-5d312.firebaseio.com",
        projectId        : "foods-5d312",
        storageBucket    : "foods-5d312.appspot.com",
        messagingSenderId: "265768844504",
    };
    public static PATH_ABOUT        = "about";
    public static PATH_LOCATION     = "location";
    public static PATH_DEMOS        = "demos";
    public static PATH_HOME         = "home";
    public static PATH_PROFILE      = "profile";
    public static PATH_IMAGES       = "images";
    public static PATH_PERSONS      = "persons";
    public static PATH_MOVIES       = "movies";
    public static PATH_IMAGE_UPLOAD = "upload";
    public static PATH_YOUTUBE      = "youtube";
    public static PATH_SONGS        = "songs";
    public static PATH_TODO         = "todo";
    public static PATH_BROWSER      = "browser";
    public static PATH_FOODS        = "food";
    public static PATH_IMAGE_DETAIL = "detail";

    public static AUTH_COOKIE_KEY = "__auth_key__";

    public static MENU_ITEMS: MenuItemModel[] = [
        {
            icon  : "home",
            link  : AppConfig.PATH_HOME,
            access: "",
            label : "home",
        },
        {
            icon  : "account",
            link  : AppConfig.PATH_PROFILE,
            access: [Roles.ROLE_VISITOR],
            label : "profile",
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
            icon  : "address book",
            link  : AppConfig.PATH_PERSONS,
            access: [Roles.ROLE_VISIT_PERSONS],
            label : "persons",
        }, {
            icon  : "address book",
            link  : AppConfig.PATH_MOVIES,
            access: [Roles.ROLE_VISIT_MOVIES],
            label : "movies",
        },
        /*
        {
            icon: "marker",
            link: AppConfig.PATH_DEMOS,
            label: "demos",
        },
        */
        {
            icon  : "music",
            link  : AppConfig.PATH_SONGS,
            access: [Roles.ROLE_VISIT_SONGS],
            label : "songs",
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
            icon  : "info circle",
            link  : AppConfig.PATH_ABOUT,
            access: "",
            label : "about",
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
