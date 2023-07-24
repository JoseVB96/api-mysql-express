import { pool } from '../db.js'

export const getProductos = async (req, res) => {
    try {
        //throw new Error('error :3') //FORZAR ERROR
        const [productos] = await pool.query("SELECT * FROM productos")
        res.json(productos)
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error"
        })
    }
}

export const getProducto = async (req, res) => {
    try {
        const id = req.params.id
        const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id])

        if (producto.length <= 0) return res.status(404).json({ message: "el producto no existe" })

        res.json(producto[0])
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error"
        })
    }
}

export const createProducto = async (req, res) => {
    try {
        const { nombre, precio } = req.body
        const [rows] = await pool.query("INSERT INTO productos(nombre, precio) VALUE(?, ?)", [nombre, precio])
        res.status(201).json({
            id: rows.insertId,
            nombre,
            precio
        })
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error"
        })
    }
}

export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, precio } = req.body
        const [update] = await pool.query('UPDATE productos SET nombre = ISNULL(?, nombre), precio = ISNULL(?, precio) WHERE id = ?', [nombre, precio, id])

        if (update.affectedRows === 0) return res.status(404).json({ message: "el producto no existe" })

        const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id])

        res.json(producto[0])
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error"
        })
    }
}

export const delateProducto = async (req, res) => {
    try {
        const id = req.params.id
        const [producto] = await pool.query('DELETE FROM productos WHERE id = ?', [id])

        if (producto.affectedRows <= 0) return res.status(404).json({ message: "el producto no existe" })

        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({
            message: "ocurrio un error"
        })
    }
}