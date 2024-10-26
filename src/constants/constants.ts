import {
    AutoAwesome,
    StarPurple500,
    Bloodtype,
    MenuBook,
    FamilyRestroom,
    VolunteerActivism,
    MoodBad,
    Pool,
    LiveTv,
    LocalMovies,
    Reorder,
    Fort,
    SvgIconComponent
} from '@mui/icons-material'

export const iconComponents: Record<string, SvgIconComponent> = {
    AutoAwesome,
    StarPurple500,
    Bloodtype,
    MenuBook,
    FamilyRestroom,
    VolunteerActivism,
    MoodBad,
    Pool,
    LiveTv,
    LocalMovies,
    Reorder,
    Fort
}

export const TopList = [
    {
        title: 'Топ 100 популярных фильмов',
        icon: 'AutoAwesome',
        url: '/popular',
        value: 'TOP_POPULAR_MOVIES'
    },
    {
        title: 'Топ 250 лучших фильмов',
        icon: 'StarPurple500',
        url: '/best',
        value: 'TOP_250_MOVIES'
    },
    {
        title: 'Вампиры',
        icon: 'Bloodtype',
        url: '/vampire',
        value: 'VAMPIRE_THEME'
    },
    {
        title: 'Комиксы',
        icon: 'MenuBook',
        url: '/comics',
        value: 'COMICS_THEME'
    },
    {
        title: 'Семейные',
        icon: 'FamilyRestroom',
        url: '/family',
        value: 'FAMILY'
    },
    {
        title: 'Романтика',
        icon: 'VolunteerActivism',
        url: '/romantic',
        value: 'LOVE_THEME'
    },
    {
        title: 'Зомби',
        icon: 'MoodBad',
        url: '/zombie',
        value: 'ZOMBIE_THEME'
    },
    {
        title: 'Катастрофы',
        icon: 'Pool',
        url: '/catastrophe',
        value: 'CATASTROPHE_THEME'
    },
    {
        title: 'Популярные сериалы',
        icon: 'LiveTv',
        url: '/popularSerials',
        value: 'POPULAR_SERIES'
    },
];

export const MovieList = [
    {
        title: 'Фильмы',
        icon: 'LocalMovies',
        url: '/films',
        value: ''
    },
    {
        title: 'Сериалы',
        icon: 'Reorder',
        url: '/serials',
        value: ''
    },
    {
        title: 'Мультфильмы',
        icon: 'Fort',
        url: '/cartoons',
        value: ''
    },
];