const nodemailer = require("nodemailer");

async function sendEmail(email, data) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // bulan dimulai dari 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const formattedPlanRealisasi = formatDate(data.planRealisasi);
  const formattedRealisasiAsset = formatDate(data.realisasiAsset);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "assetmanagementkpp@gmail.com",
      pass: "wfqh fahc stpz uwjh",
    },
  });
  const sendMail = transporter.sendMail({
    from: "noreply",
    to: `${email}`,
    subject: "REMINDER YOUR ASSET IS OVERDUE",
    html: `
        <div style="max-width: 100%; height: 100%; text-align: center;">
          <table role="presentation" width="800" height="526" style="margin: 0 auto; background-color: #F9FAFB; padding-left: 70px; padding-right: 70px;">
            <tr>
              <td align="start" style="padding: 20px;">
                <img src="https://uccareer.id/assets/upload/company/thumbs/thumb300px-20220214-090222-0fdfc.png" alt="logoKPP" style="max-width: 100px; height: auto;" />
                <h1 style="font-size: 30px; font-weight: bold; text-align: start;">Reminder Asset Overdue</h1>
                <p>Hi, ${data.User.dataValues.username}<br/></p>
                <p style="margin-bottom: 20px;">Anda memiliki asset yang sudah melewati batas waktu realisasi, silahkan update status asset anda. Berikut informasi detail asset anda:</p>
                <table role="presentation" width="800" style="margin: 0 auto; background-color: #F9FAFB; padding-left: 70px; padding-right: 70px;">
                  <tr>
                    <td align="start" style="padding: 20px;">
                      <table role="presentation" width="800" style="margin: 0 auto; background-color: #F9FAFB; padding-left: 70px; padding-right: 70px;">
                        <tr>
                          <td align="start" style="padding: 20px;">
                            <p style="font-weight: bold;">Nama Asset: ${data.namaAsset}</p>
                            <p style="font-weight: bold;">Asset Number: ${data.assetNumber}</p>
                            <p style="font-weight: bold;">Plan Realisasi: ${formattedPlanRealisasi}</p>
                            <p style="font-weight: bold;">Realisasi Asset: ${formattedRealisasiAsset}</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                 <div style="margin-top: 30px; text-align: start;">
                  <a href="https://kpp-asset-management.vercel.app/dashboard" style="display: inline-block; background-color: #2563EB; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Visit Website
                  </a>
                </div>
                <p>Terima Kasih,<br/>Admin Asset Management</p>
              </td>
            </tr>
          </table>
        </div>
        `,
  });
  console.log("email berhasil dikirim");
}

module.exports = {
  sendEmail,
};
