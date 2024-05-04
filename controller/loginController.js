const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const { generateToken } = require("../config/authConfig");
const path = require("path");

exports.getAllUsers = async (req, res) => {
  // Memperbaiki urutan res, req menjadi req, res
  try {
    const users = await User.findAll(); // Mengubah variabel user menjadi users untuk menyatakan bahwa ini adalah array pengguna
    res.json(users); // Mengirimkan daftar pengguna sebagai respons
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findByPk(id);

    if (!userById) {
      return res.status(404).json({ error: "User tidak ditemukan" });
    }

    const imagePath = path.join(__dirname, "../uploads/", userById.image);
    const imgUrl = `http://localhost:3000/${userById.image}`;

    res.json({ userById, imgUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, role_id, nama, alamat, affiliate } = req.body;
    const image = req.file.filename;

    if (!password && !email) {
      return res.status(400).json({ message: "Email or Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: hashedPassword,
      role_id,
      nama,
      alamat,
      affiliate,
      image,
    });

    res.status(201).json({ message: "User register successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "invalid Email or Password" });
    }

    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    const UserData = {
      userId: user.id,
      email: user.email,
      role_id: user.role_id,
    };

    const token = generateToken(UserData);

    res.status(200).json({ message: `Selamat Datang ${email}`, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    res.removeHeader("Authorization");

    res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
