const { Asset, User } = require('../models')
const moment = require('moment-timezone');
const cron = require('node-cron');
const { sendEmail } = require('../helpers/nodemailer');
const { Op, where } = require("sequelize");

const nowWIB = moment().format('YYYY-MM-DD');
moment.tz.setDefault('Asia/Jakarta');

cron.schedule('0 09 * * *', () => {
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
                // reminder h-1
                const nowWIB = moment().tz('Asia/Jakarta').format('YYYY-MM-DD');
                const planRealisasiTime = moment(item.realisasiAsset).subtract(1, 'days').format('YYYY-MM-DD')
                if (nowWIB == planRealisasiTime) {
                    sendEmail(item.User.dataValues.email, item.namaAsset);
                }

                // reminder h-0
                const todayRealisasiTime = moment(item.realisasiAsset).format('YYYY-MM-DD');
                if (nowWIB === todayRealisasiTime && item.action === 'realisasi waiting') {
                    sendEmail(item.User.dataValues.email, item.namaAsset);
                }

                // reminder melebih h-0 dan item.action === 'realisasi waiting'
                const pastRealisasiTime = moment(item.realisasiAsset).isBefore(nowWIB);
                if (pastRealisasiTime && item.action === 'realisasi waiting') {
                    sendEmail(item.User.dataValues.email, item.namaAsset);
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    getData();
}, {
    timezone: 'Asia/Jakarta'
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
                                [Op.like]: `%${filter.toUpperCase()}%`,
                            },
                            site: {
                                [Op.like]: `${req.user.site}`
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
                where: { userId: req.user.id, site: req.user.site },
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
            const { namaAsset, kodePN, nilaiAsset, quantityAsset, actionPlan, remark, areaKerja, benefit, planRealisasi } = req.body

            const totalAsset = quantityAsset * nilaiAsset
            const plan = moment.tz(planRealisasi, 'Asia/Jakarta').format('YYYY-MM-DD');

            if (quantityAsset <= 0) return res.status(400).json({ message: "Quantity Asset must be greater than 0" })

            const now = moment.tz(nowWIB, 'Asia/Jakarta').format('YYYY-MM-DD');
            if (plan < now) return res.status(400).json({ message: "Plan date must be in the future" })
            if (nilaiAsset < 0) return res.status(400).json({ message: "Nilai Asset must be greater than 0" })
            if (quantityAsset < 0) return res.status(400).json({ message: "Quantity Asset must be greater than 0" })

            let assetRealisasi;

            switch (kodePN) {
                case 'WORKSHOP':
                    assetRealisasi = moment(plan).subtract(120, 'days').format('YYYY-MM-DD');
                    break;
                case 'FIXTURE N FITTING':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'BUILDING':
                    assetRealisasi = moment(plan).subtract(90, 'days').format('YYYY-MM-DD');
                    break;
                case 'COMPUTER EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'SAFETY EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'OFFICE EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(30, 'days').format('YYYY-MM-DD');
                    break;
                case 'LEASEHOLD':
                    assetRealisasi = moment(plan).subtract(90, 'days').format('YYYY-MM-DD');
                    break;
                case 'PRODUCTION EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'SUPPORT EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'ENGINEERING EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(30, 'days').format('YYYY-MM-DD');
                    break;
                default:
                    return res.status(400).json({ message: "Invalid kodePN" });
            }

            let newAsset = await Asset.create({ site: req.user.site, namaAsset, kodePN, nilaiAsset, quantityAsset, actionPlan, userDept: req.user.dept, remark, areaKerja, totalNilaiAsset: totalAsset, benefit, planRealisasi: plan, realisasiAsset: assetRealisasi, userId: req.user.id })
            res.status(201).json(newAsset)
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
            const { site, namaAsset, kodePN, nilaiAsset, quantityAsset, actionPlan, remark, areaKerja, benefit, planRealisasi } = req.body

            const totalAsset = quantityAsset * nilaiAsset

            const plan = moment.tz(planRealisasi, 'Asia/Jakarta').format('YYYY-MM-DD');

            if (quantityAsset <= 0) return res.status(400).json({ message: "Quantity Asset must be greater than 0" })

            const now = moment.tz(nowWIB, 'Asia/Jakarta').format('YYYY-MM-DD');
            if (plan < now) return res.status(400).json({ message: "Plan date must be in the future" })
            if (nilaiAsset < 0) return res.status(400).json({ message: "Nilai Asset must be greater than 0" })
            if (quantityAsset < 0) return res.status(400).json({ message: "Quantity Asset must be greater than 0" })

            const asset = await Asset.findOne({ where: { id } })
            if (asset.userId !== req.user.id) return res.status(403).json({ message: "Cannot update other user's asset" })

            let assetRealisasi;

            switch (kodePN) {
                case 'WORKSHOP':
                    assetRealisasi = moment(plan).subtract(120, 'days').format('YYYY-MM-DD');
                    break;
                case 'FIXTURE N FITTING':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'BUILDING':
                    assetRealisasi = moment(plan).subtract(90, 'days').format('YYYY-MM-DD');
                    break;
                case 'COMPUTER EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'SAFETY EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'OFFICE EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(30, 'days').format('YYYY-MM-DD');
                    break;
                case 'LEASEHOLD':
                    assetRealisasi = moment(plan).subtract(90, 'days').format('YYYY-MM-DD');
                    break;
                case 'PRODUCTION EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'SUPPORT EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                    break;
                case 'ENGINEERING EQUIPMENT':
                    assetRealisasi = moment(plan).subtract(30, 'days').format('YYYY-MM-DD');
                    break;
                default:
                    return res.status(400).json({ message: "Invalid kodePN" });
            }

            await asset.update({ site, namaAsset, kodePN, nilaiAsset, quantityAsset, actionPlan, userDept: req.user.dept, remark, areaKerja, totalNilaiAsset: totalAsset, benefit, planRealisasi: plan, realisasiAsset: assetRealisasi, userId: req.user.id }, { where: { id } })
            res.status(200).json({ message: "Asset updated successfully" })
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

    static async updateAction(req, res) {
        try {
            const { id } = req.params
            const { action } = req.body
            const { hold, planRealisasi } = req.body

            const asset = await Asset.findOne({ where: { id } })
            if (asset.userId !== req.user.id) return res.status(403).json({ message: "Cannot update action other user's asset" })

            const kodePN = asset.dataValues.kodePN


            if (action) {
                await asset.update({ action: action }, { where: { id } })
            } else {
                const plan = moment.tz(planRealisasi, 'Asia/Jakarta').format('YYYY-MM-DD');
                let assetRealisasi;

                switch (kodePN) {
                    case 'WORKSHOP':
                        assetRealisasi = moment(plan).subtract(120, 'days').format('YYYY-MM-DD');
                        break;
                    case 'FIXTURE N FITTING':
                        assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                        break;
                    case 'BUILDING':
                        assetRealisasi = moment(plan).subtract(90, 'days').format('YYYY-MM-DD');
                        break;
                    case 'COMPUTER EQUIPMENT':
                        assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                        break;
                    case 'SAFETY EQUIPMENT':
                        assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                        break;
                    case 'OFFICE EQUIPMENT':
                        assetRealisasi = moment(plan).subtract(30, 'days').format('YYYY-MM-DD');
                        break;
                    case 'LEASEHOLD':
                        assetRealisasi = moment(plan).subtract(90, 'days').format('YYYY-MM-DD');
                        break;
                    case 'PRODUCTION EQUIPMENT':
                        assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                        break;
                    case 'SUPPORT EQUIPMENT':
                        assetRealisasi = moment(plan).subtract(60, 'days').format('YYYY-MM-DD');
                        break;
                    case 'ENGINEERING EQUIPMENT':
                        assetRealisasi = moment(plan).subtract(30, 'days').format('YYYY-MM-DD');
                        break;
                    default:
                        return res.status(400).json({ message: "Invalid kodePN" });
                }
                await asset.update({ action: hold, planRealisasi: planRealisasi, realisasiAsset: assetRealisasi }, { where: { id } })
            }


            res.status(200).json({ message: "Asset action updated successfully" })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AssetController