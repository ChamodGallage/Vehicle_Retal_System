import asyncHandler from "express-async-handler";
import Vehicle from "../models/vehicleModel.js";
import User from "../models/userModel.js";


const validateLicensePlate = (license) => {
  const regex = /^[A-Z]{2}[A-Z]{3}\d{4}$/;
  return regex.test(license) && license.length === 9;
};


const createVehicle = asyncHandler(async (req, res) => {
  const { license, category, model, status, price } = req.body;

  
  if (!license || !category || !model || !status || !price) {
    res.status(400);
    throw new Error("All fields are required");
  }

  
  const userId = req.user._id;

  
  if (!userId) {
    res.status(401);
    throw new Error("User not authorized or user ID missing");
  }

  
  if (!validateLicensePlate(license)) {
    res.status(400);
    throw new Error("Invalid license plate format");
  }

  
  const vehicle = await Vehicle.create({
    license,
    category,
    model,
    status,
    price,
    owner: userId,
  });

 
  if (vehicle) {
    res.status(201).json(vehicle);
  } else {
    res.status(400);
    throw new Error("Failed to add new vehicle");
  }
});


const getVehiclesByOwner = asyncHandler(async (req, res) => {
  const ownerId = req.params.ownerId; 

  
  const vehicles = await Vehicle.find({ owner: ownerId });

  if (vehicles) {
    res.status(200).json(vehicles); 
  } else {
    res.status(404);
    throw new Error("Vehicles not found for the specified owner");
  }
});

// get all vehicles
const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles = await Vehicle.find();
  res.status(200).json(vehicles);
});

export { createVehicle, getVehiclesByOwner, getAllVehicles };
