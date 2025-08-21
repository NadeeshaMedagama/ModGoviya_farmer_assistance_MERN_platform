// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware');
// const Farm = require('../models/Farm');
// const asyncHandler = require('express-async-handler');
//
// // @desc    Get all farms for the logged-in user
// // @route   GET /api/farms
// // @access  Private
// router.get('/', (req, res) => {
//     // const farms = await Farm.find({ userId: req.user._id });
//     // res.status(200).json({
//     //     success: true,
//     //     count: farms.length,
//     //     data: farms
//     // });
//     res.send('Test route working');
// });
//
// // @desc    Get single farm
// // @route   GET /api/farms/:id
// // @access  Private
// // router.get('/:id', protect, asyncHandler(async (req, res) => {
// //     const farm = await Farm.findOne({
// //         _id: req.params.id,
// //         userId: req.user._id
// //     });
// //
// //     if (!farm) {
// //         res.status(404);
// //         throw new Error('Farm not found');
// //     }
// //
// //     res.status(200).json({
// //         success: true,
// //         data: farm
// //     });
// // }));
//
// // @desc    Create new farm
// // @route   POST /api/farms
// // @access  Private
// router.post('/', protect, asyncHandler(async (req, res) => {
//     const { name, size, location, soilType, crops } = req.body;
//
//     // Basic validation
//     if (!name || !size || !location || !soilType) {
//         res.status(400);
//         throw new Error('Please include all required fields');
//     }
//
//     const farm = await Farm.create({
//         userId: req.user._id,
//         name,
//         size,
//         location,
//         soilType,
//         crops: crops || []
//     });
//
//     res.status(201).json({
//         success: true,
//         data: farm
//     });
// }));
//
// // @desc    Update farm
// // @route   PUT /api/farms/:id
// // @access  Private
// router.put('/:id', protect, asyncHandler(async (req, res) => {
//     let farm = await Farm.findOne({
//         _id: req.params.id,
//         userId: req.user._id
//     });
//
//     if (!farm) {
//         res.status(404);
//         throw new Error('Farm not found');
//     }
//
//     // Update only the fields that are passed in
//     farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//         runValidators: true
//     });
//
//     res.status(200).json({
//         success: true,
//         data: farm
//     });
// }));
//
// // @desc    Delete farm
// // @route   DELETE /api/farms/:id
// // @access  Private
// router.delete('/:id', protect, asyncHandler(async (req, res) => {
//     const farm = await Farm.findOne({
//         _id: req.params.id,
//         userId: req.user._id
//     });
//
//     if (!farm) {
//         res.status(404);
//         throw new Error('Farm not found');
//     }
//
//     await farm.remove();
//
//     res.status(200).json({
//         success: true,
//         data: {}
//     });
// }));
//
// // @desc    Add crop to farm
// // @route   POST /api/farms/:id/crops
// // @access  Private
// router.post('/:id/crops', protect, asyncHandler(async (req, res) => {
//     const { name, area, plantingDate } = req.body;
//
//     if (!name || !area || !plantingDate) {
//         res.status(400);
//         throw new Error('Please include all required crop fields');
//     }
//
//     const farm = await Farm.findOne({
//         _id: req.params.id,
//         userId: req.user._id
//     });
//
//     if (!farm) {
//         res.status(404);
//         throw new Error('Farm not found');
//     }
//
//     farm.crops.push({
//         name,
//         area,
//         plantingDate
//     });
//
//     await farm.save();
//
//     res.status(201).json({
//         success: true,
//         data: farm
//     });
// }));
//
// // @desc    Update crop in farm
// // @route   PUT /api/farms/:id/crops/:cropId
// // @access  Private
// router.put('/:id/crops/:cropId', protect, asyncHandler(async (req, res) => {
//     const farm = await Farm.findOne({
//         _id: req.params.id,
//         userId: req.user._id
//     });
//
//     if (!farm) {
//         res.status(404);
//         throw new Error('Farm not found');
//     }
//
//     const cropIndex = farm.crops.findIndex(
//         crop => crop._id.toString() === req.params.cropId
//     );
//
//     if (cropIndex === -1) {
//         res.status(404);
//         throw new Error('Crop not found');
//     }
//
//     // Update crop fields
//     if (req.body.name) farm.crops[cropIndex].name = req.body.name;
//     if (req.body.area) farm.crops[cropIndex].area = req.body.area;
//     if (req.body.plantingDate) farm.crops[cropIndex].plantingDate = req.body.plantingDate;
//     if (req.body.harvestDate) farm.crops[cropIndex].harvestDate = req.body.harvestDate;
//
//     await farm.save();
//
//     res.status(200).json({
//         success: true,
//         data: farm
//     });
// }));
//
// // @desc    Delete crop from farm
// // @route   DELETE /api/farms/:id/crops/:cropId
// // @access  Private
// router.delete('/:id/crops/:cropId', protect, asyncHandler(async (req, res) => {
//     const farm = await Farm.findOne({
//         _id: req.params.id,
//         userId: req.user._id
//     });
//
//     if (!farm) {
//         res.status(404);
//         throw new Error('Farm not found');
//     }
//
//     const cropIndex = farm.crops.findIndex(
//         crop => crop._id.toString() === req.params.cropId
//     );
//
//     if (cropIndex === -1) {
//         res.status(404);
//         throw new Error('Crop not found');
//     }
//
//     farm.crops.splice(cropIndex, 1);
//     await farm.save();
//
//     res.status(200).json({
//         success: true,
//         data: farm
//     });
// }));
//
// module.exports = router;
