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

import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';

export const iconComponents: Record<string, SvgIconComponent> = {
    'AutoAwesome': AutoAwesome,
    'StarPurple500': StarPurple500,
    'Bloodtype': Bloodtype,
    'MenuBook': MenuBook,
    'FamilyRestroom': FamilyRestroom,
    'VolunteerActivism': VolunteerActivism,
    'MoodBad': MoodBad,
    'Pool': Pool,
    'LiveTv': LiveTv,
    'LocalMovies': LocalMovies,
    'Reorder': Reorder,
    'Fort': Fort,
    'VideocamOutlinedIcon': VideocamOutlinedIcon,
    'HistoryToggleOffOutlinedIcon': HistoryToggleOffOutlinedIcon
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
        icon: 'VideocamOutlinedIcon',
        url: '/films',
        value: 'FILM'
    },
    {
        title: 'Сериалы',
        icon: 'Reorder',
        url: '/tv-serials',
        value: 'TV_SERIES'
    },
    {
        title: 'Мультфильмы',
        icon: 'Fort',
        url: '/cartoons',
        value: 'FILM'
    },
    {
        title: 'Тв шоу',
        icon: 'LiveTv',
        url: '/tv-shows',
        value: 'TV_SHOW'
    },
    {
        title: 'Мини Сериалы',
        icon: 'HistoryToggleOffOutlinedIcon',
        url: '/mini-series',
        value: 'MINI_SERIES'
    },
];