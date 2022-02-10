import { Request, Response, Router } from "express";
import { MenusService } from "./services/menus.service";
import { Utils } from "./utils/utils";
const createError = require('http-errors');

export class MenusController {
    public router = Router();
    public utils = new Utils();
    constructor(private menuService: MenusService) {
        this.setRoutes();
    }
   
    public setRoutes() {
        try {
            // Get menu
            this.router.route("/:id").get(this.findOne);
            // Get all menus
            this.router.route("/").get(this.findAll);
        } catch (e) {
            console.log((e as Error).message);
        }
    }

    private findOne = async (req: Request, res: Response) => {
        try {
            if (this.utils.checkRequest(req.headers)) {
                const result:any = await this.menuService.findOne(req.params.id);
                if (result.statusCode) { 
                    throw createError(result.statusCode, result.message);
                } else { 
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
                const result:any = await this.menuService.findAll();
                if (result.statusCode) { 
                    throw createError(result.statusCode, result.message);
                } else { 
                    res.send(result);
                };
            }
        } catch (e: any) {
            return this.handleError(e, res);
        }
    };
    
    private handleError = (err: any, res: Response) => {
        if (err.statusCode === 400) {
            let msg = (err as Error).message;
            res.status(400).send({ message: msg });
        } else if (err.statusCode === 403) {
            let msg = (err as Error).message;
            res.status(403).send({ message: msg });
        } else if (err.statusCode === 404) {
            let msg = (err as Error).message;
            res.status(404).send({ message: msg });
        } else {
            let msg = (err as Error).message;
            res.status(500).send({ message: msg });
        }
    }
}