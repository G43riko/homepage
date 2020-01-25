export const UserDetailMock: any = [
    {
        person_id: "EmptyPersonId",
        name: "EmptyPersonName"
    },
    {
        person_id: "TestPersonId",
        name: "TestPersonName",
        surName: "TestPersonSurName",
        birthday: "1999-11-22",
        nick: "TestPersonNick",
        numbers: [
            {
                number: "0905123456",
                active: true,
                number_id: "TestPersonNumber1Id"
            },
            {
                number: "0905654321",
                active: false,
                number_id: "TestPersonNumber2Id"
            }
        ],
        emails: [
            {
                email: "abc@gmail.com",
                active: true,
                email_id: "TestPersonEmail1Id"
            },
            {
                email: "gmail@abc.com",
                active: false,
                email_id: "TestPersonEmail2Id"
            }
        ],
        accounts: [
            {
                type: "FACEBOOK",
                userName: "TestPersonAccountFbUserName",
                active: true,
                link: "TestPersonAccountFbLink",
                account_id: "TestPersonAccountFbId"
            }, {
                type: "LINKEDIN",
                userName: "TestPersonAccountLIUserName",
                active: true,
                link: "TestPersonAccountLILink",
                account_id: "TestPersonAccountLIId"
            }
        ],
        gender: "FEMALE",
        address: {
            country: "SK",
            city: "TestPersonAddressCity",
            street: "TestPersonAddressStreet",
            streetNumber: "TestPersonAddressStreetNumber"
        }
    },
    {
        person_id: "1",
        name: "Gabriel",
        surName: "Csollei",
        birthday: "12.11.1993",
        nick: "Gabo",
        numbers: [
            {
                number: "0905123456",
                active: true,
                number_id: "1"
            },
            {
                number: "0905654321",
                active: true,
                number_id: "2"
            }
        ],
        emails: [
            {
                email: "gcsollei@hotmail.com",
                active: true,
                email_id: "1"
            },
            {
                email: "gcsollei@gmail.com",
                active: true,
                email_id: "2"
            }
        ],
        accounts: [
            {
                type: "FACEBOOK",
                userName: "Gabriel",
                active: true,
                link: "TestPersonAccountFbLink",
                account_id: "TestPersonAccountFbId"
            }, {
                type: "LINKEDIN",
                userName: "TestPersonAccountLIUserName",
                active: true,
                link: "TestPersonAccountLILink",
                account_id: "TestPersonAccountLIId"
            }
        ],
        gender: "MALE",
        address: {
            country: "SK",
            city: "Slovakia",
            street: "Mierová",
            streetNumber: "23"
        }
    }
];

export const UserListMock = UserDetailMock.map((personDetail: any) => ({
    person_id: personDetail.person_id,
    name: personDetail.name,
    surName: personDetail.surName,
    birthday: personDetail.birthday,
    nick: personDetail.nick,
    emails: !personDetail.emails ? [] : personDetail.emails.filter((email: any) => email.active).map((email: any) => email.email),
    numbers: !personDetail.numbers ? [] : personDetail.numbers.filter((number: any) => number.active).map((number: any) => number.number),
    accounts: [],
    address: !personDetail.address ? {} : {
        country: personDetail.address.country,
        city: personDetail.address.city,
        street: personDetail.address.street,
        streetNumber: personDetail.address.streetNumber
    }
}));

export const MovieDetailMock = [{
    id: "TestMovieId",
    imdbId: "TestMovieImdbId",
    csfdId: "TestMovieCsfdId",
    movieDbId: "TestMovieMovieDbId",
    content: "TestMovieContent",
    title: "TestMovieTitle",
    classification: "PG-13",
    titleSk: "TestMovieTitleSk",
    countries: ["SK", "HU"],
    makers: [
        {
            name: "Test movie maker1",
            birthday: "1995-05-23",
            csfd: "TestMovieMaker1CsfdId",
            imdb: "TestMovieMaker1ImdbId",
            movieDb: "TestMovieMaker1MoviedbId",
            avatar: "TestMovieMaker1Avatar.jpg"
        },
        {
            name: "Test movie maker2",
            birthday: "1995-05-23",
            csfd: "TestMovieMaker2CsfdId",
            imdb: "TestMovieMaker2ImdbId",
            movieDb: "TestMovieMaker2MoviedbId",
            avatar: "TestMovieMaker2Avatar.jpg"
        }
    ],
    year: "1999",
    genres: ["akcny", "komedie"],
    rating: "96%",
    duration: 213
}];
export const MovieListMock = MovieDetailMock.map((movieDetail) => ({
    id: movieDetail.id,
    imdbId: movieDetail.imdbId,
    csfdId: movieDetail.csfdId,
    moviedbId: movieDetail.movieDbId,
    title: movieDetail.title,
    titleSk: movieDetail.titleSk,
    year: movieDetail.year,
    genres: movieDetail.genres,
    rating: movieDetail.rating,
    classification: movieDetail.classification
}));

export const SongListMock = [
    {
        artists: "TestSongArtist",
        title: "TestSongTitle",
        spotifi_link: "TestSongSpotifyLink",
        duration: 3511361,
        popularity: "TestSongPopularity",
        preview: "https://www.w3schools.com/html/horse.ogg"
    },

    {
        artists: "TestSongArtist2",
        title: "TestSongTitle2",
        spotifi_link: "TestSongSpotifyLink2",
        duration: 13516168,
        popularity: "TestSongPopularity2",
        preview: "http://hcmaslov.d-real.sci-nnov.ru/public/mp3/Queen/Queen%20'All%20Dead,%20All%20Dead'.mp3"
    }
];
