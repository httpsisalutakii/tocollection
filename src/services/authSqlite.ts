import {db} from '../database/sqlite';

type userRow = {
    id: number;
    email: string;
    senha: string;
    created_at: string;
};

export function validateUser(
    email: string,
    senha: string
): boolean {
     
    const user = db.getFirstSync<userRow>(
        `
        SELECT * FROM users
        WHERE email = ? AND senha = ?
        LIMIT 1;
        `,
        [email,senha]
    )

    return Boolean(user);
}
