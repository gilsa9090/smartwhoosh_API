const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const { generateToken } = require("../config/authConfig");
const fs = require("fs");

const path = require("path");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const formattedUsers = users.map((user) => ({
      id: user.id,
      email: user.email,
      password: user.password, // Jangan kirim password secara langsung ke frontend, ini hanya contoh
      role_id: user.role_id,
      nama: user.nama,
      alamat: user.alamat,
      affiliate: user.affiliate,
      imageUrl: `http://192.168.1.4:8000/${user.image}`,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
    res.json(formattedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userById = await User.findByPk(id);

    if (!userById) {
      return res.status(404).json({ error: "User not found" });
    }

    const imgUrl = `http://192.168.1.4:8000/${userById.image}`;

    res.json({ user: userById, imgUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.count({
      where: {
        role_id: 2,
      },
    });
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, role_id, nama, alamat, affiliate } = req.body;
    const image = req.file.filename;

    if (!password || !email) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
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

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Cari pengguna berdasarkan email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password" });
    }

    // Verifikasi password
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // Siapkan data pengguna tanpa password
    const { id, role_id, nama, alamat, affiliate, image } = user;
    const UserData = {
      userId: id,
      email: user.email,
      role_id,
      name: nama,
      address: alamat,
      affiliate,
      image,
    };

    // Generate token
    const token = generateToken(UserData);
    const imgUrl = `http://192.168.1.4:8000/${image}`;

    // Kirim respons sukses
    res.status(200).json({
      message: `Welcome ${email}`,
      token,
      user: { ...UserData, image: imgUrl },
    });
  } catch (error) {
    console.error("Error during login: ", error); // Log error untuk debugging
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role_id, nama, alamat, affiliate } = req.body;
    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Jika ada gambar baru diunggah dan ada gambar lama, hapus gambar lama
    if (image && user.image) {
      const imagePath = path.join(__dirname, "../uploads/", user.image);
      fs.unlinkSync(imagePath);
    }

    // Jika tidak ada gambar baru diunggah, gunakan gambar yang sudah ada
    if (!image && user.image) {
      image = user.image;
    }

    // Update field pengguna
    user.email = email || user.email;
    user.role_id = role_id || user.role_id;
    user.nama = nama || user.nama;
    user.alamat = alamat || user.alamat;
    user.affiliate = affiliate || user.affiliate;
    if (image) {
      user.image = image;
    }

    // Simpan pengguna yang sudah diperbarui
    await user.save();

    // Mengembalikan data pengguna yang sudah diperbarui
    const updatedUser = {
      userId: user.id,
      email: user.email,
      role_id: user.role_id,
      name: user.nama,
      address: user.alamat,
      affiliate: user.affiliate,
      image: user.image,
    };

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating paket:", error);
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
