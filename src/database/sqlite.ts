import * as SQlite from 'expo-sqlite';

export const db = SQlite.openDatabaseSync('pokedex.db');