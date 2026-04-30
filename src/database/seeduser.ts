import {db} from './sqlite';

export function seeduser(){
    db.runSync(
        `
        INSERT OR IGNORE INTO users(email, senha, created_at)
        VALUES (?,?,?);`,
        ['isabellitocollection@gmail.com','12345678910', new Date().toISOString()]
        
    )
}