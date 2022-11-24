
// // cấu hình news

const express = require('express');
const router = express.Router();

const nhanvienControler = require('../app/controllers/nhanvienControler');

// newcontroller.index

router.get("/", nhanvienControler.showLishNhanVien);
router.get("/createnhanvien", nhanvienControler.create);
router.post("/store", nhanvienControler.store);
router.get('/:id/edit',nhanvienControler.edit);
router.put('/:id',nhanvienControler.update);
router.delete('/:id', nhanvienControler.delete);

module.exports = router;

