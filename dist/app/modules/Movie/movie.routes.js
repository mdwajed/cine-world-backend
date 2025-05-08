"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieRoutes = void 0;
const express_1 = __importDefault(require("express"));
const movie_controller_1 = require("./movie.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.get("/", movie_controller_1.movieController.getAllMovie);
router.get("/:id", movie_controller_1.movieController.getMovieById);
router.post("/", (0, auth_1.default)(client_1.Role.ADMIN), movie_controller_1.movieController.createMovie);
router.patch("/:id", (0, auth_1.default)(client_1.Role.ADMIN), movie_controller_1.movieController.updateMovie);
router.delete("/:id", (0, auth_1.default)(client_1.Role.ADMIN), movie_controller_1.movieController.deleteMovie);
exports.movieRoutes = router;
