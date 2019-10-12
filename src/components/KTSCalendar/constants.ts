import { EventCategory } from './interfaces';

export const DEFAULT_MONTHS_NAMES: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
] = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december'
];

export const DEFAULT_DAYS_NAMES: [
    string,
    string,
    string,
    string,
    string,
    string,
    string
] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday'
];

export const KTS_DEFAULT_CATEGORY: EventCategory = {
    color: '#000000',
    id: '__default_category_id__',
    name: 'Default'
};
