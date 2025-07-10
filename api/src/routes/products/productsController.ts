import { Request, Response } from 'express';
import { db } from '../../db/index';
import { productsTable } from '../../db/productsSchema';
import { eq } from 'drizzle-orm';

export async function listProducts(req: Request, res: Response) {
    try {
        const products = await db.select().from(productsTable);
        res.json(products);
    } catch (e) {
        res.status(500).send(e);
    }
};

export async function getProductById(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const products = await db.select().from(productsTable).where(eq(productsTable.id, id));
        if (!products) {
            res.status(404).send({ message: 'Product not found' });
        } else {
            res.json(products);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export async function createProduct(req: Request, res: Response) {
    try {
        const [product] = await db.insert(productsTable).values(req.body).returning();
        res.status(201).json(product);
    } catch (e) {
        res.status(500).send(e);
    }
};

export async function updateProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const updatedFields = req.body;

        const [products] = await db.update(productsTable).set(updatedFields).where(eq(productsTable.id, id)).returning();
        if (products) {
            res.json(products);
        } else {
            res.status(404).send({ message: 'Product was not found' });
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

export async function deleteProduct(req: Request, res: Response) {
    try {
        const id = Number(req.params.id);
        const deletedProduct = await db.delete(productsTable).where(eq(productsTable.id, id));
        if (deletedProduct) {
            res.status(204).send();
        } else {
            res.status(404).send({ message: 'Product was not found' });
        }
    } catch (e) {
        res.status(500).send(e);
    }
};