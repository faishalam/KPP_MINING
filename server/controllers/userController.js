const { Op } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async getAllUser(req, res) {
    try {
      const { filter, search, page = 1, limit = 10 } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const offset = (pageNum - 1) * limitNum;

      const whereConditions = {
        [Op.and]: [
          {
            [Op.or]: [
              { username: { [Op.like]: search ? `%${search}%` : "%" } },
              { email: { [Op.like]: search ? `%${search}%` : "%" } },
              {
                "$User.username$": { [Op.like]: search ? `%${search}%` : "%" },
              },
              { "$User.email$": { [Op.like]: search ? `%${search}%` : "%" } },
            ],
          },
        ],
      };

      const { count, rows } = await User.findAndCountAll({
        where: whereConditions,
        order: [["createdAt", "DESC"]],
        // limit: limitNum,
        // offset,
        attributes: { exclude: ["password"] },
      });

      const totalPages = Math.ceil(count / limitNum);
      const [userCount, headCount] = await Promise.all([
        User.count({ where: { ...whereConditions, role: "user" } }),
        User.count({ where: { ...whereConditions, role: "head" } }),
      ]);

      res.status(200).json({
        totalItems: count,
        totalPages,
        currentPage: pageNum,
        total_roles_user: userCount,
        total_roles_head: headCount,
        data: rows,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async register(req, res) {
    try {
      try {
        const { role } = req.user;
        // if (role !== "super_admin") {
        //   return res
        //     .status(403)
        //     .json({ message: "You are not authorized to add users" });
        // }

        const { username, email, password, district, department, site, roles } =
          req.body;

        const checkEmail = await User.findOne({ where: { email } });
        if (checkEmail)
          return res.status(400).json({ message: "Email already registered" });

        const checkUsername = await User.findOne({ where: { username } });
        if (checkUsername)
          return res
            .status(400)
            .json({ message: "Username already registered" });

        let newUser = await User.create({
          username,
          email,
          password,
          district,
          department,
          site,
          roles,
        });
        const withoutPassword = {
          username: newUser.username,
          email: newUser.email,
          district: newUser.district,
          department: newUser.department,
          site: newUser.site,
        };

        res.status(201).json(withoutPassword);
      } catch (error) {
        if (error.name === "SequelizeValidationError") {
          return res.status(400).json({ message: error.errors[0].message });
        }
        if (error.name === "SequelizeUniqueConstraintError") {
          return res.status(400).json({ message: error.errors[0].message });
        }
        res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email)
        return res.status(400).json({ message: "Please enter your email" });
      if (!password)
        return res.status(400).json({ message: "Please enter your password" });

      let findUser = await User.findOne({ where: { email } });
      if (!findUser)
        return res.status(401).json({ message: "Invalid email/password" });

      let checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword)
        return res.status(401).json({ message: "Invalid email/password" });

      let access_token = signToken({ id: findUser.id, email: findUser.email });

      res.status(200).json({ access_token: access_token, role: findUser.role });
    } catch (error) {
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getMyAccount(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findByPk(id);
      if (!user) throw { name: "User not found" };
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getUserDetail(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) throw { name: "User not found" };
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      await User.destroy({ where: { id } });
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const id = req.body.id;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const { email } = req.body;

      if (email && email !== user.email) {
        console.log(email, user.email);
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          return res.status(400).json({ message: "Email already registered" });
        }
      }

      await user.update(req.body);
      return res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;
