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
        url: '/popular'
    },
    {
        title: 'Топ 250 лучших фильмов',
        icon: 'StarPurple500',
        url: '/best'
    },
    {
        title: 'Вампиры',
        icon: 'Bloodtype',
        url: '/vampire'
    },
    {
        title: 'Комиксы',
        icon: 'MenuBook',
        url: '/comics'
    },
    {
        title: 'Семейные',
        icon: 'FamilyRestroom',
        url: '/family'
    },
    {
        title: 'Романтика',
        icon: 'VolunteerActivism',
        url: '/romantic'
    },
    {
        title: 'Зомби',
        icon: 'MoodBad',
        url: '/zombie'
    },
    {
        title: 'Катастрофы',
        icon: 'Pool',
        url: '/catastrophe'
    },
    {
        title: 'Популярные сериалы',
        icon: 'LiveTv',
        url: '/popularSerials'
    },
];

export const MovieList = [
    {
        title: 'Фильмы',
        icon: 'LocalMovies',
        url: '/films'
    },
    {
        title: 'Сериалы',
        icon: 'Reorder',
        url: '/serials'
    },
    {
        title: 'Мультфильмы',
        icon: 'Fort',
        url: '/cartoons'
    },
];