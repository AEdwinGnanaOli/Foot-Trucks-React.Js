import express from 'express';
import { validateProductId } from '../../Middlewares/productMiddleware.js';
import { authenticate, roleAuthentication } from '../../Middlewares/AuthMiddleware.js';
import { createProduct, deleteProduct, getOneProduct, getOneVendorProducts, productsLiked, updateProduct } from '../../Controllers/productController.js';
import multer from 'multer';
import { getAllProducts } from '../../Controllers/adminController.js';
import { storage } from '../../config/cloudinary.js';
const router = express.Router();

const upload = multer({
    storage,  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 2MB
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
})
// Get a single product by ID (Authenticated + Role-based access control)
// authenticate, roleAuthentication(["admin", "vendor"])
router.get("/one/:id", validateProductId, getOneProduct);
// Get a single vendor product by ID (Authenticated + Role-based access control)
router.get("/vendor/:id", authenticate, roleAuthentication(["admin", "vendor"]), getOneVendorProducts);

// Get all products (Authenticated + Role-based access control)
// authenticate, roleAuthentication(["user", 'admin'])
router.get("/all", authenticate, roleAuthentication(["user", 'admin']), getAllProducts);
// router.get("/all", authenticate, roleAuthentication(["admin", "vendor", "user"]), getAllProducts);

// Create a new product (Authenticated + Role-based access control for vendors and admins)
router.post("/create/:id", authenticate, roleAuthentication(["admin", "vendor"]), upload.fields([{ name: 'shopImage' }, { name: 'menuImage' }]), createProduct);

// Update product (Authenticated + Role-based access control + Validate product ID)
router.put("/update/:id", validateProductId, authenticate, roleAuthentication(["admin", "vendor"]), upload.fields([{ name: 'shopImage' }, { name: 'menuImage' }]), updateProduct);

router.put("/like/:id", validateProductId, authenticate, roleAuthentication(["admin", "vendor", "user"]), productsLiked)
// Delete product (Authenticated + Role-based access control + Validate product ID)
router.delete("/delete/:id", validateProductId, authenticate, roleAuthentication(["admin", "vendor"]), deleteProduct);

export default router;
