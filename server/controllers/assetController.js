const { Asset, User } = require('../models')
const moment = require('moment-timezone');
const cron = require('node-cron');
const { sendEmail } = require('../helpers/nodemailer');
const { Op } = require("sequelize");

const nowWIB = moment().format('YYYY-MM-DD');
moment.tz.setDefault('Asia/Jakarta');

cron.schedule('0 9 * * *', async () => {
    const getData = async () => {
        try {
            const response = await Asset.findAll({
                include: {
                    model: User,
                    attributes: ["username", "email"]
                },
                order: [
                    ['planRealisasi', 'DESC']
                ]
            })

            if (response.length === 0) return ("Asset not found");

            response.map((item) => {
                const planRealisasiTime = moment(item.planRealisasi).subtract(1, 'days').format('YYYY-MM-DD');
                if (planRealisasiTime === nowWIB) {
                    console.log('h1 realisasi', item.User.dataValues.email, item.namaAsset);
                    sendEmail(item.User.dataValues.email)
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
    getData();
});

class AssetController {
    static async getAsset(req, res) {
        try {
            const { filter } = req.query
            let response;

            if (filter) {
                response = await Asset.findAll({
                    include: {
                        model: User,
                        where: {
                            department: {
                                [Op.like]: `%${filter}%`
                            }
                        },
                    },
                    order: [
                        ['createdAt', 'DESC']
                    ]
                })
                return res.status(200).json(response)
            }

            response = await Asset.findAll({
                include: {
                    model: User,
                    attributes: ['username']
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            if (response.length === 0) return res.status(404).json({ message: "Asset not found" })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    static async getAssetByUser(req, res) {
        try {
            const response = await Asset.findAll({
                where: { userId: req.user.id },
                include: {
                    model: User,
                    attributes: ["username", "email"]
                },
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    static async getAssetById(req, res) {
        try {
            const { id } = req.params
            const response = await Asset.findOne({ where: { id } })
            if (!response) return res.status(404).json({ message: "Asset not found" })
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
        }
    }

    static async addAsset(req, res) {
        try {
            const { namaAsset, nilaiAsset, quantityAsset, benefit, planRealisasi } = req.body

            const totalAsset = quantityAsset * nilaiAsset
            const plan = moment.tz(planRealisasi, 'Asia/Jakarta').format('YYYY-MM-DD');

            const now = moment.tz(nowWIB, 'Asia/Jakarta').format('YYYY-MM-DD');
            if (plan < now) return res.status(400).json({ message: "Plan date must be in the future" })
            if(nilaiAsset < 0) return res.status(400).json({ message: "Nilai Asset must be greater than 0" })
            if(quantityAsset < 0) return res.status(400).json({ message: "Quantity Asset must be greater than 0" })

            let newAsset = await Asset.create({ namaAsset, nilaiAsset, quantityAsset, totalNilaiAsset: totalAsset, benefit, planRealisasi: plan, userId: req.user.id })
            res.status(201).json(newAsset)
        } catch (error) {
            console.log(error)
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async deleteAsset(req, res) {
        try {
            const { id } = req.params

            const asset = await Asset.findOne({ where: { id } })
            if (asset.userId !== req.user.id) return res.status(403).json({ message: "Cannot delete other user's asset" })


            await Asset.destroy({ where: { id } })
            res.status(200).json({ message: "Asset deleted successfully" })
        } catch (error) {
            console.log(error)
        }
    }

    static async updateAsset(req, res) {
        try {
            const { id } = req.params
            const { namaAsset, nilaiAsset, quantityAsset, benefit, planRealisasi } = req.body

            const totalAsset = quantityAsset * nilaiAsset

            const asset = await Asset.findOne({ where: { id } })
            console.log(asset)
            if (asset.userId !== req.user.id) return res.status(403).json({ message: "Cannot update other user's asset" })

            

            await asset.update({ namaAsset, nilaiAsset, quantityAsset, totalNilaiAsset: totalAsset, benefit, planRealisasi, userId: req.user.id }, { where: { id } })
            res.status(200).json({ message: "Asset updated successfully" })
        } catch (error) {
            // console.log(error)
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: error.errors[0].message })
            }
            res.status(500).json({ message: "Internal server error" })
        }
    }

    static async updateAssetStatus(req, res) {
        try {
            const { id } = req.params
            const role = req.user.role


            if (role !== "head") return res.status(403).json({ message: "Only head can update asset status" })

            const asset = await Asset.findOne({ where: { id } })
            await asset.update({ status: "approved" }, { where: { id } })

            res.status(200).json({ message: "Asset status updated successfully" })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AssetController