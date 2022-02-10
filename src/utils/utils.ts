const moment = require("moment");
const axios = require("axios");
const getDockerHost = require("get-docker-host");
const isInDocker = require("is-in-docker");
const os = require("os");
const createError = require('http-errors');

import { MENUS_API_KEY } from "../constants/menus.constants";
import { ICategory, ICategoryItem } from "../interfaces/categories.interfaces";

export class Utils {

    // Expressions
    private emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    public isEmpty(obj: any) {
        return !Object.keys(obj).length > false;
    }

    public isNull(value: any | string | null | undefined) {
        if (value !== undefined && value !== null && value !== "") return false;
        else return true;
    }

    public isDate(date: string) {
        if (date == undefined || date == null || date == "" || date.length !== 10) {
            return false;
        } else {
            return moment(date, "YYYY-MM-DD", true).isValid();
        }
    }

    public isDateTime(date: string) {
        if (date !== undefined && date !== null && date !== "") return false;
        else return moment(date, "YYYY-MM-DD HH:mm:ss", true).isValid();
    }

    public isEmailValid(email: string) {
        if (!email)
            return false;

        if (email.length > 254)
            return false;

        var valid = this.emailRegex.test(email);
        if (!valid)
            return false;

        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if (parts[0].length > 64)
            return false;

        var domainParts = parts[1].split(".");
        if (domainParts.some(function (part) { return part.length > 63; }))
            return false;

        return true;
    }

    public containsInvalidCharacters(param: string) {
        for (var i = 0; i < param.length; i++) {
            var c = param[i];
            if (c == '\"' || c == '$' || c == '@' || c == '#' || c == '<' || c == '>' || c == '|' || c == '*' || c == '¡' || c == '!' || c == '¿' || c == '?' || c == '&' || c == '{' || c == '}' || c == '%' || c == '_' || c == '(' || c == ')' || c == '=') {
                return true;
            }
        }
        return false;
    }

    public getType(p: any) {
        if (Array.isArray(p)) return 'array';
        else if (typeof p == 'string') return 'string';
        else if (typeof p == 'number') return 'number';
        else if (p != null && typeof p == 'object') return 'object';
        else if (p != null && typeof p == 'boolean') return 'boolean';
        else return 'other';
    }

    //DATETIME FUNCTIONS
    public getNow(): string {
        let date = new Date();
        // current date
        // adjust 0 before single digit date
        let dayMonth = ("0" + date.getDate()).slice(-2);
        // current month
        let month = ("0" + (date.getMonth() + 1)).slice(-2);
        // current year
        let year = date.getFullYear();
        // current hours
        let hours = date.getHours();
        // current minutes
        let minutes = date.getMinutes();
        // current seconds
        let seconds = date.getSeconds();

        return (year + "-" + month + "-" + dayMonth + " " + hours + ":" + minutes + ":" + seconds + "." + moment().millisecond());
    }

    public formatDateTime(date: string) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        var hours = '' + d.getHours(),
            minutes = '' + d.getMinutes()
        let seconds = '' + d.getSeconds();

        if (hours.length < 2)
            hours = '0' + hours;
        if (minutes.length < 2)
            minutes = '0' + minutes;
        if (seconds.length < 2)
            seconds = '0' + seconds;

        return [year, month, day].join('-') + ' ' + [hours, minutes, seconds].join(':');
    }

    //OTHERS
    public async msleep(n: number) {
        Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n);
    }


    public async sleep(n: number) {
        this.msleep(n * 1000);
    }

    public dockerHost() {
        getDockerHost(async (error: any, result: any) => {
            if (result) {
                console.log(result);
                return await result;
            } else if (error) {
                console.log(error);
                return await error;
            }
        })
    }

    public async getIPv4() {
        if (await isInDocker()) {
            return this.dockerHost();
        } else {
            let networkInterfaces = await os.networkInterfaces();
            return networkInterfaces["Wi-Fi"][1].address;
        }
    }

    public checkRequest(headers: any) {
        if (this.isNull(headers["x-api-key"]) || headers["x-api-key"] !== MENUS_API_KEY) {
            throw new createError(403, "Forbidden.");
        } else {
            return true;
        }
    }

    public checkCategory(category: ICategory) {
        if (this.isNull(category.categoryName)) {
            throw new createError(400, "Please add category name.");
        } else if (this.isNull(category.description)) {
            throw new createError(400, "Please add description to category.");
        } else {
            return true;
        }
    }

    public checkCategoryItem(item: ICategoryItem) {
        if (this.isNull(item.categoryId)) {
            throw new createError(400, "Category id is empty.");
        } else if (this.isNull(item.categoryItemName)) {
            throw new createError(400, "Please add category name.");
        } else if (this.isNull(item.description)) {
            throw new createError(400, "Please add description to category.");
        } else if (isNaN(item.price)) {
            throw new createError(400, "Please set valid item price.");
        } else {
            return true;
        }
    }
}