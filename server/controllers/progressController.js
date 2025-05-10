const { Op } = require("sequelize");
const { Progress } = require("../models");

class ProgressController {
  static async geAllProgress(req, res) {
    try {
      const { filter, search, page = 1, limit = 10 } = req.query;

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const offset = (pageNum - 1) * limitNum;

      const whereConditions = {
        [Op.and]: [
          {
            [Op.or]: [
              { dept: { [Op.like]: search ? `%${search}%` : "%" } },
              { projectNumber: { [Op.like]: search ? `%${search}%` : "%" } },
              {
                projectDescription: { [Op.like]: search ? `%${search}%` : "%" },
              },
              { remarks: { [Op.like]: search ? `%${search}%` : "%" } },
              { progressCapex: { [Op.like]: search ? `%${search}%` : "%" } },
              { posisiUnit: { [Op.like]: search ? `%${search}%` : "%" } },
              {
                "$Progress.dept$": { [Op.like]: search ? `%${search}%` : "%" },
              },
              {
                "$Progress.projectNumber$": {
                  [Op.like]: search ? `%${search}%` : "%",
                },
              },
              {
                "$Progress.projectDescription$": {
                  [Op.like]: search ? `%${search}%` : "%",
                },
              },
              {
                "$Progress.remarks$": {
                  [Op.like]: search ? `%${search}%` : "%",
                },
              },
              {
                "$Progress.progressCapex$": {
                  [Op.like]: search ? `%${search}%` : "%",
                },
              },
              {
                "$Progress.posisiUnit$": {
                  [Op.like]: search ? `%${search}%` : "%",
                },
              },
            ],
          },
        ],
      };

      const { count, rows } = await Progress.findAndCountAll({
        where: whereConditions,
        order: [["createdAt", "DESC"]],
        // limit: limitNum,
        // offset,
      });

      const totalPages = Math.ceil(count / limitNum);

      res.status(200).json({
        totalItems: count,
        totalPages,
        currentPage: pageNum,
        data: rows,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getProgressById(req, res) {
    try {
      const { id } = req.params;
      const response = await Progress.findOne({ where: { id } });
      if (!response)
        return res.status(404).json({ message: "Asset not found" });
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
    }
  }

  static async addProgress(req, res) {
    try {
      const {
        dept,
        projectNumber,
        projectDescription,
        totalBudget,
        totalRecipt,
        totalPr,
        balance,
        bulanRealisasi,
        remarks,
        progressCapex,
        posisiUnit,
        estimateTimeArrival,
        assetNumber,
        poOutstanding,
        prOutstanding,
      } = req.body;

      const { role } = req.user;
      if (role !== "super_admin")
        return res.status(403).json({ message: "You are not authorized" });

      let newProgress = await Progress.create({
        userId: req.user.id,
        dept,
        projectNumber,
        projectDescription,
        totalBudget,
        totalRecipt,
        totalPr,
        balance,
        bulanRealisasi,
        remarks,
        progressCapex,
        posisiUnit,
        estimateTimeArrival,
        assetNumber,
        poOutstanding,
        prOutstanding,
      });
      res.status(200).json(newProgress);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteProgress(req, res) {
    try {
      const { id } = req.params;

      const { role } = req.user;
      if (role !== "super_admin")
        return res.status(403).json({ message: "You are not authorized" });

      const progress = await Progress.findOne({ where: { id } });
      if (!progress)
        return res.status(404).json({ message: "Asset not found" });

      await Progress.destroy({ where: { id } });
      res.status(200).json({ message: "Progress deleted successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProgress(req, res) {
    try {
      const { id } = req.params;
      const {
        dept,
        projectNumber,
        projectDescription,
        totalBudget,
        totalRecipt,
        totalPr,
        balance,
        bulanRealisasi,
        remarks,
        progressCapex,
        posisiUnit,
        estimateTimeArrival,
        poOutstanding,
        prOutstanding,
      } = req.body;

      const findProgress = await Progress.findOne({ where: { id } });
      if (!findProgress)
        return res.status(404).json({ message: "Progress not found" });

      const { role } = req.user;
      if (role !== "super_admin")
        return res.status(403).json({ message: "You are not authorized" });

      await Progress.update(
        {
          userId: req.user.id,
          dept,
          projectNumber,
          projectDescription,
          totalBudget,
          totalRecipt,
          totalPr,
          balance,
          bulanRealisasi,
          remarks,
          progressCapex,
          posisiUnit,
          estimateTimeArrival,
          poOutstanding,
          prOutstanding,
        },
        { where: { id } }
      );
      res.status(200).json({ message: "Progress updated successfully" });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateProgressCapex(req, res) {
    try {
      const { progressCapex, id } = req.body;

      const findProgress = await Progress.findAll({
        where: { id: id },
      });
      const { role } = req.user;
      if (role !== "super_admin")
        return res.status(403).json({ message: "You are not authorized" });

      if (!findProgress.length)
        return res.status(404).json({ message: "No progress entries found" });

      await Progress.update(
        { progressCapex },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).json({ message: "Progress updated successfully" });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProgressController;
