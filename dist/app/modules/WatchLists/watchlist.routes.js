"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchlistRoutes = void 0;
const express_1 = __importDefault(require("express"));
const watchlist_controller_1 = require("./watchlist.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(client_1.Role.USER), watchlist_controller_1.watchlistController.addToWatchlist);
router.get("/", (0, auth_1.default)(client_1.Role.USER), watchlist_controller_1.watchlistController.getUserWatchlist);
router.delete("/:id", (0, auth_1.default)(client_1.Role.USER), watchlist_controller_1.watchlistController.removeFromWatchlist);
exports.watchlistRoutes = router;
