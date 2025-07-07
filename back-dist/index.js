"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const handle_files_route_1 = __importDefault(require("./routes/handle.files.route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
console.log('--- Debugging handleFilesRoute ---');
console.log('Location of this index.ts file:', __dirname); // This will show the directory of the current index.ts
console.log('Import path used:', './routes/handle.files.route'); // Confirm the path you are using
console.log('Type of handleFilesRoute:', typeof handle_files_route_1.default);
console.log('handleFilesRoute object (if it is an object):', handle_files_route_1.default);
console.log('--- End Debugging ---');
// Routes
app.use(handle_files_route_1.default);
