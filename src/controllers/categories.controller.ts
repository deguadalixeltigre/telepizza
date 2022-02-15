import { Request, Response, Router } from "express";
import { ICategory, ICategoryItem } from "../interfaces/categories.interfaces";
import { CategoriesService } from "../services/categories.service";
import { Utils } from "../utils/utils";
import { Logger } from "../utils/logger";

const createError = require('http-errors');

export class CategoriesController {
    public router = Router();
    public utils = new Utils();
    constructor(private categoryService: CategoriesService, private logger: Logger) {
        this.setRoutes();
    }

    public setRoutes() {
        try {
            // Get category
            this.router.route("/:id").get(this.findCategory);
            // Get all categories
            this.router.route("/").get(this.findAll);
            // Create new category
            this.router.route("/").post(this.createCategory);
            // Create new category item
            this.router.route("/:id/items").post(this.createCategoryItem);
            // Update category
            this.router.route("/:id").put(this.updateCategory);
            // Update category item
            this.router.route("/:id/items/:itemId").put(this.updateCategoryItem);
            // Delete category
            this.router.route("/:id").delete(this.deleteCategory);
            // Delete category item
            this.router.route("/:id/items/:itemId").delete(this.deleteCategoryItem);
        } catch (e) {
            this.logger.writeSysLog((e as Error).message);           
        }
    }

    private createCategory = async (req: Request, res: Response) => {
        try {
            let category = !this.utils.isNull(req.body.data) ? req.body.data : req.body;
            let headers = !this.utils.isNull(req.body.headers) ? req.body.headers : req.headers;
            if (this.utils.checkCategory(category) && this.utils.checkRequest(headers)) {
                const result: any = await this.categoryService.createCategory(category);
                if (result.statusCode) {
                    throw createError(result.statusCode, result.message);
                } else {
                    this.logger.writeHistory("category", "POST", category.categoryId, JSON.stringify(result));
                    res.send(result);
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private createCategoryItem = async (req: Request, res: Response) => {
        try {
            let categoryItem: ICategoryItem = !this.utils.isNull(req.body.data) ? req.body.data : req.body;
            categoryItem.categoryId = req.params.id;
            let headers = !this.utils.isNull(req.body.headers) ? req.body.headers : req.headers;
            if (this.utils.checkCategoryItem(categoryItem) && this.utils.checkRequest(headers)) {
                const result: any = await this.categoryService.createCategoryItem(categoryItem);
                if (result.statusCode) {
                    throw createError(result.statusCode, result.message);
                } else {
                    this.logger.writeHistory("categitems", "POST", categoryItem.categoryItemId, JSON.stringify(result));
                    res.send(result);
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private updateCategory = async (req: Request, res: Response) => {
        try {
            let category: ICategory = !this.utils.isNull(req.body.data) ? req.body.data : req.body;
            category.categoryId = req.params.id;
            let headers = !this.utils.isNull(req.body.headers) ? req.body.headers : req.headers;
            if (this.utils.checkCategory(category) && this.utils.checkRequest(headers)) {
                const result: any = await this.categoryService.updateCategory(category);
                if (result.statusCode) {
                    throw createError(result.statusCode, result.message);
                } else {
                    this.logger.writeHistory("category", "PUT", category.categoryId, JSON.stringify(result));
                    res.send(result);
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private updateCategoryItem = async (req: Request, res: Response) => {
        try {
            let categoryItem: ICategoryItem = !this.utils.isNull(req.body.data) ? req.body.data : req.body;
            categoryItem.categoryId = req.params.id;
            categoryItem.categoryItemId = req.params.itemId;
            let headers = !this.utils.isNull(req.body.headers) ? req.body.headers : req.headers;
            if (this.utils.checkCategoryItem(categoryItem) && this.utils.checkRequest(headers)) {
                const result: any = await this.categoryService.updateCategoryItem(categoryItem);
                if (result.statusCode) {
                    throw createError(result.statusCode, result.message);
                } else {
                    this.logger.writeSysLog(JSON.stringify(result));
                    this.logger.writeHistory("categitems", "PUT", categoryItem.categoryItemId, JSON.stringify(result));

                    res.send(result);
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private findCategory = async (req: Request, res: Response) => {
        try {
            if (this.utils.checkRequest(req.headers)) {
                const result: any = await this.categoryService.findCategory(req.params.id);
                if (result.statusCode) {
                    throw createError(result.statusCode, result.message);
                } else {
                    this.logger.writeHistory("categories", "GET", req.params.id, JSON.stringify(result));
                    res.send(result);
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private findAll = async (req: Request, res: Response) => {
        try {
            if (this.utils.checkRequest(req.headers)) {
                const result: any = await this.categoryService.findAll();
                console.log(result);
                if (result.statusCode) {
                    throw createError(result.statusCode, result.message);
                } else {
                    this.logger.writeHistory("categories", "GET", "all", JSON.stringify(result));
                    res.send(result);
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private deleteCategory = async (req: Request, res: Response) => {
        try {
            if (this.utils.checkRequest(req.headers) && !this.utils.isNull(req.params.id)) {
                const result: any = await this.categoryService.deleteCategory(req.params.id);
                if (result === 0) {
                    throw createError(404, "Category not found.");
                } else {
                    this.logger.writeHistory("categories", "DELETE", req.params.id, JSON.stringify(result));
                    res.send({message: "Category records deleted."});
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private deleteCategoryItem = async (req: Request, res: Response) => {
        try {
            if (this.utils.checkRequest(req.headers) && !this.utils.isNull(req.params.id) && !this.utils.isNull(req.params.itemId)) {
                const result: any = await this.categoryService.deleteCategoryItem(req.params.id, req.params.itemId);
                if (result === 0) {
                    throw createError(404, "Category Item not found.");
                } else {
                    this.logger.writeHistory("categitems", "DELETE", req.params.id, JSON.stringify(result));
                    res.send({message: "Category Item record deleted."});
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };

    private handleError = (err: any, res: Response) => {
        let msg = (err as Error).message;
        // Write syslog error
        this.logger.writeSysLog(msg);
        // Send response http error
        if (err.statusCode === 400) {
            res.status(400).send({ message: msg });
        } else if (err.statusCode === 403) {
            res.status(403).send({ message: msg });
        } else if (err.statusCode === 404) {
            res.status(404).send({ message: msg });
        } else {
            res.status(500).send({ message: msg });
        }
    }
}