const express = require('express');
const router = express.Router()
const { signInRoute,loginRoute,fetchingAllUsername , upload ,admin,adminCheck,fileUpload,fetchUserData,downloadFile,deleteUser,deleteFile} = require('../controllers/controller')

router.route('/signup').post(signInRoute)
router.route('/login').post(loginRoute)
router.route('/fetchingusername').get(fetchingAllUsername)
router.route('/upload').post(upload)
router.route('/adminschema').post(admin)
router.route('/admin').post(adminCheck)
router.route('/fileupload').post(fileUpload)
router.route('/user/:userId').get(fetchUserData);   
router.route('/download/:userId').get(downloadFile); 
router.route('/deleteUser/:id').delete(deleteUser);
router.route('/delete-file/:id').delete(deleteFile)


module.exports = router;