import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

const mapsUrl = 'https://maps.app.goo.gl/TFNLNUt2Erat2fWK6';

const vCard = `BEGIN:VCARD
VERSION:3.0
N:;Transvolt Mobility Pvt. Ltd.;;;
FN:Transvolt Mobility Pvt. Ltd.
ORG:Transvolt Mobility Pvt. Ltd.
TITLE:EV Commercial Fleet Solutions
TEL;TYPE=WORK,VOICE:+918657526580
EMAIL;TYPE=WORK:info@transvolt.in
URL:https://transvolt.in
ADR;TYPE=WORK:;;5th Floor, Trade Link, Tower A, Kamala Mills;Lower Parel;Mumbai;400013;India
NOTE:Leading Electric Commercial Vehicle Fleet Operator
END:VCARD`;

async function generate() {
  const publicDir = path.resolve('public');
  
  // 1. Generate Maps SVG QR
  const mapsSvg = await QRCode.toString(mapsUrl, {
    type: 'svg',
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  fs.writeFileSync(path.join(publicDir, 'qr_head_office_maps.svg'), mapsSvg);
  console.log('Saved qr_head_office_maps.svg');

  // 2. Generate Contact Details SVG QR
  const contactSvg = await QRCode.toString(vCard, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: {
      dark: '#000000',
      light: '#ffffff'
    }
  });
  fs.writeFileSync(path.join(publicDir, 'qr_save_contact.svg'), contactSvg);
  console.log('Saved qr_save_contact.svg');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
