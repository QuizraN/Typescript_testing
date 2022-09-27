"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkGroupAdmin = exports.getAllGroups = exports.getnonGroupEmployees = exports.getGroupEmployees = exports.getAllEmployees = void 0;
const axios_1 = __importDefault(require("axios"));
const getAllEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllEmployees is getting called...");
    const { data } = yield axios_1.default.get(`http://localhost:3001/apis/companies/1/users`, {
        headers: {
            Authorization: localStorage.getItem("google-token-popup-feature")
                ? "Bearer " + localStorage.getItem("google-token-popup-feature")
                : "",
        },
    });
    //console.log("Employees data:", data);->working
    return data;
});
exports.getAllEmployees = getAllEmployees;
const getGroupEmployees = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllEmployees is getting called...");
    const { data } = yield axios_1.default.get(`http://localhost:3001/apis/companies/1/users`, {
        headers: {
            Authorization: localStorage.getItem("google-token-popup-feature")
                ? "Bearer " + localStorage.getItem("google-token-popup-feature")
                : "",
        },
    });
    //console.log("Employees data:", data);->working
    return data;
});
exports.getGroupEmployees = getGroupEmployees;
const getnonGroupEmployees = ({ queryKey }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getnonGroupEmployees is getting called...", queryKey[1]);
    const { data } = yield axios_1.default.get(`http://localhost:3001/apis/companies/1/users?groupName=${queryKey[1]}&&nongroup=${true}`, {
        headers: {
            Authorization: localStorage.getItem("google-token-popup-feature")
                ? "Bearer " + localStorage.getItem("google-token-popup-feature")
                : "",
        },
    });
    console.log("getnonGroupEmployees data:", data);
    return data;
});
exports.getnonGroupEmployees = getnonGroupEmployees;
const getAllGroups = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getAllEmployees is getting called...");
    const { data } = yield axios_1.default.get(`http://localhost:3001/apis/companies/1/groups`, {
        headers: {
            Authorization: localStorage.getItem("google-token-popup-feature")
                ? "Bearer " + localStorage.getItem("google-token-popup-feature")
                : "",
        },
    });
    //console.log("Employees data:", data);->working
    return data;
});
exports.getAllGroups = getAllGroups;
const checkGroupAdmin = ({ queryKey }) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("checkuserinGroup is getting called...", queryKey);
    const { data } = yield axios_1.default.get(`http://localhost:3001/apis/companies/groups/admin/check?groupName=${queryKey[1]}`, {
        headers: {
            Authorization: localStorage.getItem("google-token-popup-feature")
                ? "Bearer " + localStorage.getItem("google-token-popup-feature")
                : "",
        },
    });
    //console.log("checkuserinGroup data:", data);
    return data;
});
exports.checkGroupAdmin = checkGroupAdmin;
