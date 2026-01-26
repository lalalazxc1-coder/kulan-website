const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://postgres:password@127.0.0.1:5432/postgres', // Подключаемся к дефолтной базе, чтобы создать новую
});

async function createDB() {
    try {
        await client.connect();
        // Проверяем существование
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'adkulan_v2'");
        if (res.rowCount === 0) {
            console.log('Creating database adkulan_v2...');
            await client.query('CREATE DATABASE adkulan_v2');
            console.log('Database created!');
        } else {
            console.log('Database already exists.');
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
}

createDB();
