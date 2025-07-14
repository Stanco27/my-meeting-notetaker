"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const handle_files_route_1 = __importDefault(require("./routes/handle.files.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const groq_route_1 = __importDefault(require("./routes/groq.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.upload = (0, multer_1.default)({ dest: 'uploads/' });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
// Health check endpoint
// app.use((req, res, next) => {
//   res.status(200).send({ message: "Server is running" });
// })
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/uploads', express_1.default.static('uploads'));
app.post('/uploadAudioFile', exports.upload.single('audioFile'), handle_files_route_1.default);
// Routes
app.use(handle_files_route_1.default, groq_route_1.default);
