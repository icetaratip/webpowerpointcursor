import type { IconName } from './icons'
import type { ChartConfig } from './Charts'
import { brands } from './brands'

export type SlideKind =
  | 'cover'
  | 'section'
  | 'split'
  | 'grid'
  | 'timeline'
  | 'quote'
  | 'closing'
  | 'chart'
  | 'team'
  | 'demo'

export interface SlideItem {
  label: string
  text: string
  icon?: IconName
  image?: string
  logo?: string
}

export interface Slide {
  id: string
  kind: SlideKind
  kicker?: string
  title: string
  lead?: string
  body?: string[]
  items?: SlideItem[]
  meta?: string[]
  footnote?: string
  icon?: IconName
  chart?: ChartConfig
  layout?: 'stack' | 'side'
  logos?: { src: string; alt: string }[]
  heroImage?: string
  showIde?: boolean
}

export const slides: Slide[] = [
  {
    id: 'cover',
    kind: 'cover',
    icon: 'sparkles',
    kicker: 'Case Study · AI Code Editor',
    title: 'Anysphere\n& Cursor',
    lead: 'Cursor คือโปรแกรมเขียนโค้ดที่มี AI เป็นองค์ประกอบสำคัญตั้งแต่แรก — ไม่ใช่ปลั๊กอินเสริม แต่เป็น IDE ที่สร้าง แก้ไข วิเคราะห์ และตรวจสอบโค้ดให้ได้ในที่เดียว',
    logos: [
      { src: brands.cursor, alt: 'Cursor' },
      { src: brands.openai, alt: 'OpenAI' },
      { src: brands.vscode, alt: 'VS Code' },
    ],
    footnote: 'นำเสนอจากเอกสารวิเคราะห์ Anysphere & Cursor · กด → เพื่อดูต่อ',
  },
  {
    id: 'who',
    kind: 'section',
    icon: 'landmark',
    kicker: 'ความเป็นมา',
    title: 'สร้างโดย Anysphere ปี 2022',
    lead: 'Anysphere เป็น Startup ด้านปัญญาประดิษฐ์และเครื่องมือพัฒนาซอฟต์แวร์ ก่อตั้งที่สหรัฐอเมริกา โดยทีมผู้ก่อตั้งจาก Massachusetts Institute of Technology (MIT)',
    logos: [{ src: brands.vscode, alt: 'VS Code' }],
    body: [
      'ผู้ก่อตั้งมองว่า IDE ในอดีตยังไม่ถูกออกแบบมาเพื่อทำงานร่วมกับ AI อย่างเต็มรูปแบบ',
      'เครื่องมือส่วนใหญ่มักนำ AI ไปเพิ่มเป็นฟังก์ชันเสริม แต่ไม่ได้เปลี่ยนกระบวนการพัฒนาซอฟต์แวร์ทั้งหมด',
      'บริษัทจึงพัฒนา Cursor ให้เป็น AI Code Editor ที่ AI เป็นแกนกลางตั้งแต่เริ่มต้น',
    ],
  },
  {
    id: 'team',
    kind: 'team',
    icon: 'users',
    kicker: 'ทีมผู้ก่อตั้ง · จาก MIT',
    title: 'ผู้นำที่สร้าง Cursor',
    lead: 'สี่ผู้ก่อตั้งจาก MIT ที่มองเห็นว่า IDE ควรออกแบบมาเพื่อ AI ตั้งแต่ต้น ไม่ใช่แค่ติดปลั๊กอินทีหลัง',
    items: [
      {
        label: 'CEO',
        text: 'Michael Truell — ประธานเจ้าหน้าที่บริหาร',
        image: '/team/michael-truell.jpg',
      },
      {
        label: 'Co-founder',
        text: 'Aman Sanger',
        image: '/team/aman-sanger.jpg',
      },
      {
        label: 'Co-founder',
        text: 'Sualeh Asif',
        image: '/team/sualeh-asif.png',
      },
      {
        label: 'Co-founder',
        text: 'Arvid Lunnemark',
        image: '/team/arvid-lunnemark.jpg',
      },
    ],
  },
  {
    id: 'what-i-am',
    kind: 'section',
    icon: 'bot',
    kicker: 'Cursor ทำอะไรได้',
    title: 'AI Code Editor ที่สั่งงานด้วยภาษาธรรมชาติ',
    lead: 'ผู้ใช้คุยกับ Cursor เป็นภาษาคนได้ — อ่านโค้ด แก้ไขหลายไฟล์ ค้นหาข้อผิดพลาด และช่วยดำเนินงานภายในโปรเจกต์',
    logos: [{ src: brands.cursor, alt: 'Cursor' }],
    body: [
      'Cursor ไม่ได้ทำหน้าที่เพียงเติมโค้ดอัตโนมัติ',
      'ถูกพัฒนาให้เป็น AI Coding Agent — รับคำสั่ง วิเคราะห์โปรเจกต์ และดำเนินงานเกี่ยวกับการเขียนโปรแกรมได้หลายขั้นตอน',
      'ฐานต่อยอดจากโครงสร้าง Visual Studio Code จึงย้ายมาใช้ได้ง่าย และรองรับ Extension จำนวนมาก',
    ],
  },
  {
    id: 'ide-demo',
    kind: 'demo',
    icon: 'terminal',
    kicker: 'ตัวอย่างการทำงานใน IDE',
    title: 'เห็นภาพ Cursor ทำงานจริง',
    lead: 'Agent รับคำสั่งภาษาธรรมชาติ → อ่านโปรเจกต์ → แก้หลายไฟล์พร้อมกัน ขณะที่ Tab เติมโค้ดตามบริบท',
    showIde: true,
    logos: [
      { src: brands.cursor, alt: 'Cursor' },
      { src: brands.vscode, alt: 'VS Code' },
    ],
    footnote: 'ภาพจำลอง UI · แสดง Chat / Agent · Multi-file Editing · Code Completion',
  },
  {
    id: 'highlights',
    kind: 'chart',
    icon: 'gauge',
    kicker: 'ตัวเลขสำคัญ',
    title: 'จาก Startup สู่สินทรัพย์เชิงกลยุทธ์',
    lead: 'ตัวเลขสำคัญจากเส้นทางของ Anysphere และ Cursor',
    chart: {
      type: 'stats',
      points: [
        {
          label: 'ปีก่อตั้ง',
          value: 2022,
          display: '2022',
          note: 'Anysphere · สหรัฐฯ · ทีม MIT',
        },
        {
          label: 'รายได้ประจำปี (ARR)',
          value: 500,
          display: '$500M+',
          note: 'มิถุนายน 2025',
        },
        {
          label: 'มูลค่าบริษัท',
          value: 29.3,
          display: '$29.3B',
          note: 'พฤศจิกายน 2025 · Reuters',
        },
        {
          label: 'มูลค่าดีล SpaceX',
          value: 60,
          display: '$60B',
          note: 'ประกาศ 16 มิ.ย. 2026',
        },
      ],
    },
    logos: [
      { src: brands.spacex, alt: 'SpaceX' },
      { src: brands.openai, alt: 'OpenAI' },
    ],
    footnote: 'Fortune 500 ใช้มากกว่าครึ่งหนึ่ง · Seed เริ่มต้น $8M จาก OpenAI Startup Fund',
  },
  {
    id: 'business',
    kind: 'split',
    icon: 'blocks',
    kicker: '01 · ลักษณะธุรกิจ',
    title: 'Anysphere คือ SaaS',
    lead: 'ธุรกิจประเภท Software as a Service ให้บริการซอฟต์แวร์ช่วยพัฒนาโปรแกรมด้วย AI — ผลิตภัณฑ์หลักคือ Cursor',
    meta: [
      'Artificial Intelligence',
      'Developer Tools',
      'Software Development',
      'Cloud Computing',
      'Generative AI',
      'Software as a Service',
    ],
    body: [
      'กลุ่มอุตสาหกรรมครอบคลุม AI, เครื่องมือนักพัฒนา, การพัฒนาซอฟต์แวร์, คลาวด์, Generative AI และ SaaS',
      'โมเดลธุรกิจหลักคือ Subscription — สมาชิกรายเดือนหรือรายปี เพื่อเข้าถึงความสามารถของ AI ในระดับที่สูงขึ้น',
    ],
  },
  {
    id: 'features-1',
    kind: 'split',
    icon: 'zap',
    kicker: 'ความสามารถของ Cursor · ส่วนที่ 1',
    title: 'ถาม AI · เติมโค้ด · สั่ง Agent',
    lead: 'สี่ความสามารถหลักที่ช่วยเขียนโปรแกรมเร็วขึ้นโดยไม่ต้องออกจาก IDE',
    items: [
      {
        label: 'AI Chat — ถาม–ตอบเกี่ยวกับโค้ด',
        text: 'สนทนากับ Cursor เพื่อถามโค้ด ขอคำอธิบาย หรือแนวทางแก้บั๊ก',
        icon: 'message',
      },
      {
        label: 'Code Completion — เติมโค้ดอัตโนมัติ',
        text: 'คาดการณ์และเติมโค้ดขณะพิมพ์ ลดงานพิมพ์ซ้ำ',
        icon: 'zap',
      },
      {
        label: 'Agent Mode — สั่งงานหลายขั้นตอน',
        text: 'มอบหมายงานใหญ่ได้ เช่น เพิ่ม Login สร้างหน้าเว็บ หรือแก้บั๊กทั้งระบบ',
        icon: 'bot',
      },
      {
        label: 'Codebase Understanding — เข้าใจทั้งโปรเจกต์',
        text: 'อ่านโครงสร้างโค้ดจริงในโปรเจกต์ แล้วตอบและแก้โดยอ้างอิงจากไฟล์ที่มีอยู่',
        icon: 'folder',
      },
    ],
  },
  {
    id: 'features-2',
    kind: 'split',
    icon: 'layers',
    kicker: 'ความสามารถของ Cursor · ส่วนที่ 2',
    title: 'แก้หลายไฟล์ · ดีบัก · เครื่องมือทีม',
    lead: 'ทำงานข้ามไฟล์ วิเคราะห์ Error และตั้งกฎให้ AI สำหรับทั้งทีม',
    items: [
      {
        label: 'Multi-file Editing — แก้หลายไฟล์พร้อมกัน',
        text: 'แก้ Backend และ Frontend ในครั้งเดียวให้สอดคล้องกัน',
        icon: 'file',
      },
      {
        label: 'Refactoring & Debugging — ปรับโครงสร้างและหาบั๊ก',
        text: 'วิเคราะห์ Error ค้นหาสาเหตุ และเสนอแนวทางแก้ไข',
        icon: 'bug',
      },
      {
        label: 'Cloud Agent & Team — เครื่องมือสำหรับทีม',
        text: 'Agent, Rules, Skills, MCP, CLI สำหรับกำหนดพฤติกรรม AI ของทีม',
        icon: 'cloud',
      },
      {
        label: 'หลายโมเดล AI — เลือกโมเดลตามงาน',
        text: 'เชื่อมต่อโมเดลจากผู้ให้บริการหลายราย ตามงานแต่ละประเภท',
        icon: 'cpu',
      },
    ],
  },
  {
    id: 'problem',
    kind: 'grid',
    icon: 'target',
    kicker: '02 · ปัญหาที่ Cursor เกิดมาเพื่อแก้',
    title: 'การพัฒนาซอฟต์แวร์แบบเดิมเสียเวลาตรงไหน',
    lead: 'Cursor นำ AI เข้าไปอยู่ในโปรแกรมเขียนโค้ดโดยตรง — การถาม การสร้าง การแก้ไข และการตรวจสอบ เกิดขึ้นในสภาพแวดล้อมเดียวกัน',
    items: [
      { label: '01', text: 'นักพัฒนาต้องใช้เวลาค้นหาเอกสารและตัวอย่างโค้ด', icon: 'book' },
      { label: '02', text: 'ต้องเขียนโค้ดพื้นฐานหรือโค้ดซ้ำจำนวนมาก', icon: 'code' },
      { label: '03', text: 'ทำความเข้าใจโปรเจกต์ขนาดใหญ่ใช้เวลานาน', icon: 'folder' },
      { label: '04', text: 'แก้ข้อผิดพลาดอาจต้องตรวจสอบหลายไฟล์', icon: 'bug' },
      { label: '05', text: 'Chatbot ทั่วไปอาจไม่เข้าใจโครงสร้างโปรเจกต์ทั้งหมด', icon: 'message' },
      { label: '06', text: 'ต้องคัดลอกโค้ดไปมาระหว่าง Chatbot กับ IDE', icon: 'swap' },
      { label: '07', text: 'ทีมพัฒนาต้องการส่งมอบงานให้รวดเร็วขึ้น', icon: 'rocket' },
    ],
  },
  {
    id: 'customers',
    kind: 'section',
    icon: 'users',
    kicker: '03 · ใครใช้ Cursor',
    title: 'จากผู้เริ่มต้นถึงองค์กรชั้นนำ',
    lead: 'ลูกค้ามีทั้งผู้ใช้รายบุคคล ทีมขนาดเล็ก และองค์กรขนาดใหญ่ — ถูกนำไปใช้ในองค์กรชั้นนำ เช่น NVIDIA, Uber และ Adobe',
    logos: [
      { src: brands.nvidia, alt: 'NVIDIA' },
      { src: brands.uber, alt: 'Uber' },
      { src: brands.adobe, alt: 'Adobe' },
    ],
    items: [
      { label: 'นักพัฒนาซอฟต์แวร์', text: 'เขียนและส่งมอบโค้ดเร็วขึ้นในงานประจำวัน', icon: 'code' },
      { label: 'โปรแกรมเมอร์อิสระ', text: 'ทำงานหลายโปรเจกต์ด้วยความช่วยเหลือจาก Agent', icon: 'briefcase' },
      { label: 'นักเรียนและนักศึกษา', text: 'เรียนรู้และทดลองเขียนโปรแกรมได้เร็วขึ้น', icon: 'school' },
      { label: 'ผู้เริ่มต้นเขียนโปรแกรม', text: 'มีคู่คิดอธิบายโค้ดและแก้บั๊กใน IDE เดียวกัน', icon: 'graduation' },
      { label: 'Startup', text: 'ต้องการพัฒนาผลิตภัณฑ์อย่างรวดเร็ว', icon: 'rocket' },
      { label: 'บริษัทพัฒนาซอฟต์แวร์', text: 'เพิ่มความเร็วทีมส่งมอบ', icon: 'building' },
      { label: 'ทีมเทคโนโลยีในองค์กร', text: 'มาตรฐานและกฎ AI ร่วมกันผ่าน Rules / Skills', icon: 'network' },
      { label: 'องค์กรขนาดใหญ่', text: 'เพิ่มประสิทธิภาพทีมพัฒนาทั้งองค์กร', icon: 'office' },
    ],
  },
  {
    id: 'revenue-model',
    kind: 'chart',
    icon: 'dollar',
    kicker: '04 · การสร้างรายได้',
    title: 'Subscription เป็นแกนหลัก',
    lead: 'รายได้เกิดจากค่าสมาชิกบุคคล ค่าสมาชิกแบบทีม สัญญา Enterprise และค่าใช้บริการ AI เพิ่มเติม',
    layout: 'side',
    chart: {
      type: 'donut',
      title: 'โครงสร้างรายได้ (สัดส่วนเชิงแนวคิด)',
      points: [
        { label: 'บุคคล (Pro)', value: 35 },
        { label: 'ทีม (Teams)', value: 30 },
        { label: 'Enterprise', value: 25 },
        { label: 'Usage / AI extras', value: 10 },
      ],
    },
    body: [
      'บางบริการคิดตามปริมาณการใช้โมเดล AI หรือทรัพยากร โดยเฉพาะงานที่ใช้โมเดลขนาดใหญ่หรือ Agent ทำงานนาน',
      'แพ็กเกจฟรี (Hobby) ช่วยลดอุปสรรคในการทดลอง และเป็นกลยุทธ์ดึงดูดผู้ใช้งานใหม่',
    ],
  },
  {
    id: 'pricing-hobby-pro',
    kind: 'split',
    icon: 'sparkles',
    kicker: 'แพ็กเกจ · Hobby & Pro',
    title: 'ทดลองฟรี แล้วอัปเกรดเมื่อพร้อม',
    items: [
      {
        label: 'Hobby (ฟรี)',
        text: 'ทดลองใช้งานโดยไม่เสียค่าใช้จ่าย แต่มีข้อจำกัดด้านจำนวนการใช้ Agent และการเติมโค้ดอัตโนมัติ',
        icon: 'check',
      },
      {
        label: 'Pro (บุคคล)',
        text: 'เริ่มต้นประมาณ 20 ดอลลาร์สหรัฐต่อเดือน (ราคาและโควตาอาจแตกต่างตามแพ็กเกจ)',
        icon: 'dollar',
      },
      {
        label: 'สิทธิ์ใน Pro',
        text: 'ใช้ Agent ได้มากขึ้น · เข้าถึงโมเดล AI ชั้นนำ · Cloud Agent · MCP, Skills และ Hooks',
        icon: 'bot',
      },
      {
        label: 'เพิ่มเติมใน Pro',
        text: 'เครื่องมือตรวจสอบข้อผิดพลาด และปริมาณการประมวลผลมากกว่าแพ็กเกจฟรี',
        icon: 'wrench',
      },
    ],
  },
  {
    id: 'pricing-team-ent',
    kind: 'chart',
    icon: 'building',
    kicker: 'แพ็กเกจ · Teams & Enterprise',
    title: 'ขยายจากทีมสู่ทั้งองค์กร',
    lead: 'ทีมคิดตามจำนวนที่นั่ง (Per Seat) ส่วน Enterprise เพิ่มชั้นความปลอดภัยและการจัดการ',
    layout: 'side',
    chart: {
      type: 'bars',
      title: 'ราคา Teams Standard (มิ.ย. 2026)',
      unit: '$',
      points: [
        { label: 'รายปี / คน / เดือน', value: 32 },
        { label: 'รายเดือน / คน / เดือน', value: 40 },
        { label: 'Pro บุคคล (อ้างอิง)', value: 20 },
      ],
    },
    items: [
      {
        label: 'Enterprise · การจัดการ',
        text: 'จัดการสมาชิก · สิทธิ์ · งบประมาณ · โมเดล AI ที่อนุญาต',
        icon: 'users',
      },
      {
        label: 'Enterprise · ความปลอดภัย',
        text: 'Audit Log · ความเป็นส่วนตัว · ซัพพอร์ต · สัญญาองค์กร',
        icon: 'shield',
      },
    ],
  },
  {
    id: 'growth',
    kind: 'chart',
    icon: 'trending',
    kicker: '05 · รูปแบบการเติบโต',
    title: 'Product-Led Growth',
    lead: 'Cursor เติบโตด้วยคุณภาพผลิตภัณฑ์เป็นเครื่องยนต์หลัก — ไม่ต้องพึ่งพนักงานขายตั้งแต่ก้าวแรก',
    layout: 'side',
    chart: {
      type: 'funnel',
      title: 'กรวยแปลงผู้ใช้ → องค์กร',
      points: [
        { label: 'ดาวน์โหลด & ทดลองฟรี', value: 100 },
        { label: 'เห็นว่า AI ลดเวลาทำงาน', value: 78 },
        { label: 'สมัครแพ็กเกจชำระเงิน', value: 55 },
        { label: 'แนะนำเข้าทีม', value: 40 },
        { label: 'อัปเกรดเป็น Team', value: 28 },
        { label: 'ขยายเป็น Enterprise', value: 16 },
      ],
    },
    footnote: 'ขยายจากนักพัฒนารายบุคคลเข้าสู่องค์กรขนาดใหญ่ได้ตามธรรมชาติ',
  },
  {
    id: 'strengths',
    kind: 'split',
    icon: 'check',
    kicker: '06 · จุดเด่นของ Cursor',
    title: 'ทำไม Cursor ถึงต่างจากเครื่องมืออื่น',
    items: [
      {
        label: 'AI เป็นศูนย์กลาง',
        text: 'ไม่ได้เพิ่ม AI เป็นเพียงส่วนเสริม แต่ปรับกระบวนการเขียนโปรแกรมให้ทำงานร่วมกับ AI ได้ตลอดเวลา',
        icon: 'brain',
      },
      {
        label: 'ง่ายสำหรับผู้ใช้ VS Code',
        text: 'ต่อยอดจาก VS Code เรียนรู้และย้ายมาใช้ได้ง่าย รองรับ Extension จำนวนมาก',
        icon: 'puzzle',
      },
      {
        label: 'เข้าใจโค้ดทั้งโปรเจกต์',
        text: 'ดึงข้อมูลจากหลายไฟล์มาตอบและแก้ ทำให้เหมาะกับงานที่ซับซ้อนกว่าหนึ่งฟังก์ชัน',
        icon: 'folder',
      },
      {
        label: 'หลายโมเดล · ทุกสเกล',
        text: 'เลือกโมเดลตามงานได้ และมีแพ็กเกจตั้งแต่ฟรี บุคคล ทีม ถึง Enterprise',
        icon: 'layers',
      },
    ],
  },
  {
    id: 'competitors',
    kind: 'section',
    icon: 'git',
    kicker: '07 · คู่แข่งสำคัญ',
    title: 'สนามแข่ง AI สำหรับนักพัฒนา',
    lead: 'จุดแตกต่างสำคัญ: Cursor วางตำแหน่งตนเองเป็นโปรแกรมเขียนโค้ดที่มี AI เป็นศูนย์กลาง — ขณะที่คู่แข่งบางรายเริ่มจาก Plugin, CLI หรือเว็บ',
    logos: [
      { src: brands.github, alt: 'GitHub' },
      { src: brands.openai, alt: 'OpenAI' },
      { src: brands.anthropic, alt: 'Anthropic' },
      { src: brands.google, alt: 'Google' },
      { src: brands.amazon, alt: 'Amazon' },
      { src: brands.replit, alt: 'Replit' },
      { src: brands.microsoft, alt: 'Microsoft' },
    ],
    meta: [
      'GitHub Copilot',
      'Claude Code',
      'OpenAI Codex',
      'Google Gemini Code Assist',
      'Windsurf',
      'Amazon Q Developer',
      'Replit',
      'VS Code + ส่วนเสริม AI',
    ],
  },
  {
    id: 'funding',
    kind: 'chart',
    icon: 'trending',
    kicker: '08 · การเติบโตและการลงทุน',
    title: 'มูลค่าบริษัทพุ่งแบบก้าวกระโดด',
    lead: 'จาก Seed ปี 2023 สู่ข้อตกลง SpaceX ปี 2026 — ภายในเวลาไม่กี่ปี',
    chart: {
      type: 'line',
      title: 'Company Valuation (พันล้าน USD)',
      unit: 'B',
      points: [
        { label: '2023', value: 0.05, note: 'หลัง Seed (โดยประมาณ)' },
        { label: 'มิ.ย.25', value: 9.9 },
        { label: 'พ.ย.25', value: 29.3 },
        { label: 'มิ.ย.26', value: 60 },
      ],
    },
    body: [
      '2023 — เงินลงทุนเริ่มต้น 8 ล้านดอลลาร์ · OpenAI Startup Fund เป็นผู้นำการลงทุน',
      'มิ.ย. 2025 — ระดมทุน 900 ล้าน · ARR > 500 ล้าน · Fortune 500 ใช้กว่าครึ่งหนึ่ง',
      'พ.ย. 2025 — Reuters: ระดมทุน ~2.3 พันล้าน · มูลค่า ~29.3 พันล้าน',
    ],
  },
  {
    id: 'investors',
    kind: 'section',
    icon: 'landmark',
    kicker: 'นักลงทุนชั้นนำ',
    title: 'เงินทุน ความน่าเชื่อถือ และเครือข่าย',
    lead: 'การมีนักลงทุนด้านเทคโนโลยีที่มีชื่อเสียงช่วยเพิ่มเงินทุน ความน่าเชื่อถือ เครือข่าย และโอกาสในการขยายธุรกิจ',
    items: [
      {
        label: 'OpenAI Startup Fund',
        text: 'ผู้นำการลงทุนรอบเริ่มต้นปี 2023',
        logo: brands.openai,
      },
      {
        label: 'Andreessen Horowitz (a16z)',
        text: 'Marc Andreessen · นักลงทุนด้านเทคโนโลยีชั้นนำ',
        image: brands.a16zPerson,
      },
      {
        label: 'Thrive Capital',
        text: 'สนับสนุนการเติบโตระยะยาว',
        logo: brands.thrive,
      },
      {
        label: 'Accel',
        text: 'เครือข่าย Startup และสเกลระดับโลก',
        icon: 'network',
      },
      {
        label: 'DST Global',
        text: 'ขยายโอกาสในตลาดระหว่างประเทศ',
        logo: brands.dst,
      },
    ],
  },
  {
    id: 'spacex',
    kind: 'quote',
    icon: 'rocket',
    kicker: 'จุดเปลี่ยน · 16 มิถุนายน 2026',
    title: 'SpaceX เข้าซื้อ Anysphere\n~60 พันล้านดอลลาร์',
    lead: 'ข้อตกลงในรูปแบบหุ้นทั้งหมด มีแผนปิดธุรกรรมภายในไตรมาสที่ 3 ของปี 2026 — แสดงว่า Cursor ไม่ได้เป็นเพียงเครื่องมือช่วยเติมโค้ด แต่เป็นสินทรัพย์เชิงกลยุทธ์ในตลาด AI สำหรับองค์กร',
    logos: [{ src: brands.spacex, alt: 'SpaceX' }],
    heroImage:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzZtLr1I8kOalGvDsKxNuAVq_JRaPdZijAAHvJ1qzUwK1G8HWxvyAEdnA&s=10',
  },
  {
    id: 'future',
    kind: 'quote',
    icon: 'brain',
    kicker: 'วิสัยทัศน์ของ Cursor',
    title: 'จากผู้พิมพ์ทุกบรรทัด\nสู่ผู้กำหนดเป้าหมาย',
    lead: 'อุตสาหกรรมกำลังเข้าสู่ยุคที่ AI Agent รับงานขนาดใหญ่และทำงานได้นานขึ้นโดยต้องการคำสั่งจากมนุษย์น้อยลง — นักพัฒนาเปลี่ยนบทบาทเป็นผู้กำหนดเป้าหมาย ตรวจสอบ และควบคุมงานของ AI Agent',
  },
  {
    id: 'success',
    kind: 'grid',
    icon: 'check',
    kicker: '09 · ปัจจัยที่ทำให้ Cursor ประสบความสำเร็จ',
    title: '10 เหตุผลที่ Startup นี้โตได้',
    items: [
      { label: '01', text: 'มองเห็นปัญหาที่เกิดขึ้นจริงในกลุ่มนักพัฒนา', icon: 'eye' },
      { label: '02', text: 'เข้าสู่ตลาดในช่วงที่ Generative AI กำลังเติบโต', icon: 'trending' },
      { label: '03', text: 'สร้างผลิตภัณฑ์ที่ช่วยประหยัดเวลาได้อย่างชัดเจน', icon: 'zap' },
      { label: '04', text: 'ใช้พื้นฐานของ VS Code ทำให้ผู้ใช้เรียนรู้ได้ง่าย', icon: 'puzzle' },
      { label: '05', text: 'ใช้รูปแบบ Freemium ให้ทดลองก่อนชำระเงิน', icon: 'check' },
      { label: '06', text: 'ขยายจากผู้ใช้รายบุคคลไปสู่ทีมและองค์กร', icon: 'users' },
      { label: '07', text: 'พัฒนาฟีเจอร์ใหม่อย่างต่อเนื่อง', icon: 'wrench' },
      { label: '08', text: 'ได้รับเงินทุนจากนักลงทุนที่มีชื่อเสียง', icon: 'dollar' },
      { label: '09', text: 'โมเดล Subscription สร้างรายได้ต่อเนื่อง', icon: 'gauge' },
      { label: '10', text: 'ให้บริการลูกค้าทั่วโลกผ่านระบบออนไลน์', icon: 'cloud' },
    ],
  },
  {
    id: 'risks',
    kind: 'grid',
    icon: 'alert',
    kicker: '10 · ความเสี่ยงและข้อจำกัด',
    title: 'Cursor ยังไม่สมบูรณ์แบบ — และต้องพูดตรง ๆ',
    lead: 'แม้จะเติบโตเร็ว แต่ยังมีความเสี่ยงที่ผู้ใช้และองค์กรควรรู้',
    items: [
      { label: 'คุณภาพโค้ด', text: 'AI อาจสร้างโค้ดผิดพลาดหรือมีช่องโหว่', icon: 'bug' },
      { label: 'การตรวจสอบ', text: 'ผู้ใช้ยังต้องตรวจสอบผลลัพธ์จาก AI', icon: 'eye' },
      { label: 'ต้นทุน', text: 'ค่าใช้จ่ายด้านโมเดล AI และ Cloud อยู่ในระดับสูง', icon: 'dollar' },
      { label: 'การแข่งขัน', text: 'มีการแข่งขันจากบริษัทเทคโนโลยีขนาดใหญ่', icon: 'git' },
      { label: 'ความเป็นส่วนตัว', text: 'มีความกังวลเรื่องความเป็นส่วนตัวของ Source Code', icon: 'lock' },
      { label: 'พึ่งพาภายนอก', text: 'อาจพึ่งพาโมเดล AI จากผู้ให้บริการภายนอก', icon: 'cpu' },
      { label: 'ราคา', text: 'รูปแบบราคาอาจเปลี่ยนแปลงตามต้นทุนการประมวลผล', icon: 'gauge' },
      { label: 'ทักษะ', text: 'พึ่งพา AI มากเกินไปอาจขาดความเข้าใจพื้นฐาน', icon: 'graduation' },
      { label: 'กฎหมาย', text: 'กฎหมายลิขสิทธิ์และ AI อาจส่งผลต่อธุรกิจในอนาคต', icon: 'scale' },
    ],
  },
  {
    id: 'closing',
    kind: 'closing',
    icon: 'sparkles',
    kicker: '11 · สรุป',
    title: 'Cursor ช่วยให้สร้าง\nแก้ไข วิเคราะห์ และตรวจโค้ดเร็วขึ้น',
    lead: 'Anysphere ประสบความสำเร็จจากการมองเห็นปัญหาของนักพัฒนา และนำ AI มาปรับเปลี่ยนกระบวนการเขียนโปรแกรม — ไม่จำเป็นต้องสร้างเทคโนโลยีทุกอย่างขึ้นมาใหม่ แต่แปลงสิ่งที่มีให้เป็นประสบการณ์ที่แก้ปัญหาลูกค้าได้ชัด',
    logos: [{ src: brands.cursor, alt: 'Cursor' }],
    body: [
      'รายได้: สมาชิกรายเดือน/ปี · แพ็กเกจทีม · Enterprise · ค่าใช้ AI เพิ่มเติม',
      'จุดแข็งของ Cursor: ใช้งานง่าย · เข้าใจโค้ดทั้งโปรเจกต์ · รองรับทั้งบุคคลและองค์กร',
      'บทเรียน: Product-Led Growth + Freemium + Timing + แก้ปัญหาจริง',
    ],
    footnote: 'ขอบคุณ · Anysphere & Cursor Case Study',
  },
]
