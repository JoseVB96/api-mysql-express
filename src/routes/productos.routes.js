import { Router } from 'express'
import { getProductos, getProducto, createProducto, updateProducto, delateProducto } from '../controllers/productos.controller.js'

const router = Router()

router.get('/productos', getProductos)

router.get('/productos/:id', getProducto)

router.post('/productos', createProducto)

router.patch('/productos/:id', updateProducto)

router.delete('/productos/:id', delateProducto)

export default router