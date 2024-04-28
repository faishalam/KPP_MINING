const { Asset, User } = require("../models");
const { sendEmail } = require("./nodemailer");
const moment = require('moment-timezone');
const cron = require('node-cron');
moment.tz.setDefault('Asia/Jakarta');
const nowWIB = moment().format('YYYY-MM-DD');

cron.schedule('* * * * * *', () => {
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

            if (response.length === 0) return console.log("Asset not found");

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
