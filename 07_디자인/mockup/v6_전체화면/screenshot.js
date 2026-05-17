const puppeteer = require('puppeteer');
const path = require('path');

const BASE = '/Users/yechanshon/Desktop/shonz_vibe/haru_anbu/07_디자인/mockup/v6_전체화면';
const OUT = path.join(BASE, 'screenshots');

const pages = [
  // Guardian
  { file: 'guardian/g01-home.html', out: 'guardian/g01-home.png' },
  { file: 'guardian/g02-ai-report.html', out: 'guardian/g02-ai-report.png' },
  { file: 'guardian/g03-chat.html', out: 'guardian/g03-chat.png' },
  { file: 'guardian/g04-ai-guide.html', out: 'guardian/g04-ai-guide.png' },
  { file: 'guardian/g05-mypage.html', out: 'guardian/g05-mypage.png' },
  { file: 'guardian/g06-alert.html', out: 'guardian/g06-alert.png' },
  { file: 'guardian/g07-settings.html', out: 'guardian/g07-settings.png' },
  { file: 'guardian/g08-billing.html', out: 'guardian/g08-billing.png' },
  { file: 'guardian/g09-prescription.html', out: 'guardian/g09-prescription.png' },
  { file: 'guardian/g10-timeline.html', out: 'guardian/g10-timeline.png' },
  // Nurse
  { file: 'nurse/n01-dashboard.html', out: 'nurse/n01-dashboard.png' },
  { file: 'nurse/n02-patients.html', out: 'nurse/n02-patients.png' },
  { file: 'nurse/n03-checklist.html', out: 'nurse/n03-checklist.png' },
  { file: 'nurse/n04-mypage.html', out: 'nurse/n04-mypage.png' },
  { file: 'nurse/n05-sos.html', out: 'nurse/n05-sos.png' },
  { file: 'nurse/n06-handoff.html', out: 'nurse/n06-handoff.png' },
  { file: 'nurse/n07-chat.html', out: 'nurse/n07-chat.png' },
  { file: 'nurse/n08-schedule.html', out: 'nurse/n08-schedule.png' },
  { file: 'nurse/n09-prescription.html', out: 'nurse/n09-prescription.png' },
  { file: 'nurse/n10-timeline.html', out: 'nurse/n10-timeline.png' },
  // Patient
  { file: 'patient/p01-home.html', out: 'patient/p01-home.png' },
  { file: 'patient/p02-family.html', out: 'patient/p02-family.png' },
  { file: 'patient/p03-help.html', out: 'patient/p03-help.png' },
  // Onboarding
  { file: 'onboarding/ob01-splash.html', out: 'onboarding/ob01-splash.png' },
  { file: 'onboarding/ob02-login.html', out: 'onboarding/ob02-login.png' },
  { file: 'onboarding/ob03-role.html', out: 'onboarding/ob03-role.png' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2 });

  for (const p of pages) {
    const url = 'file://' + path.join(BASE, p.file);
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
    await new Promise(r => setTimeout(r, 500));

    await page.screenshot({
      path: path.join(OUT, p.out),
      clip: { x: 0, y: 0, width: 430, height: 932 }
    });
    console.log('✓ ' + p.out);
  }

  await browser.close();
  console.log('\nDone! ' + pages.length + ' screenshots saved.');
})();
