import { pool } from '../db.js'

export const result = async (req, res) => {
    const [result] = await pool.query('SELECT 1+1 AS Resultado')
    res.json(result[0])
}