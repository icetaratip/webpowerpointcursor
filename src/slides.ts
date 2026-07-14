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
  images?: string[]
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
  },
  {
    id: 'who',
    kind: 'section',
    icon: 'landmark',
    kicker: 'ประวัติความเป็นมา',
    title: 'AI เป็นผู้ช่วยเขียนโปรแกรมใน IDE',
    lead: 'Cursor เป็นโปรแกรมแก้ไขโค้ด (AI Code Editor) ที่พัฒนาโดยบริษัท Anysphere Inc. ก่อตั้งในปี 2022 ถูกสร้างขึ้นโดยมีแนวคิดว่า AI ไม่ควรเป็นเพียงผู้ช่วยตอบคำถาม แต่ควรเป็นผู้ช่วยเขียนโปรแกรมภายใน IDE ทำให้นักพัฒนาสามารถสั่ง AI ให้สร้าง แก้ไข และอธิบายโค้ดได้โดยไม่ต้องสลับไปใช้เว็บไซต์ภายนอก',
    logos: [
      { src: brands.cursor, alt: 'Cursor' },
      { src: brands.vscode, alt: 'VS Code' },
      { src: brands.openai, alt: 'OpenAI' },
    ],
    body: [
      'ทีมผู้ก่อตั้งจาก MIT นำโดย Michael Truell วางตำแหน่ง Cursor ให้เป็น IDE ที่ออกแบบเพื่อ AI ตั้งแต่ต้น',
      'พัฒนาบนพื้นฐานของ Visual Studio Code (VS Code) ทำให้ใช้งานร่วมกับส่วนขยายของ VS Code ได้เกือบทั้งหมด',
      'ปัจจุบัน Cursor ได้รับความนิยมอย่างมากในหมู่นักพัฒนาซอฟต์แวร์ทั่วโลก',
      'ได้รับเงินลงทุนจากกองทุนชั้นนำ เช่น OpenAI Startup Fund, Andreessen Horowitz (a16z) และ Thrive Capital เพื่อสนับสนุนการเติบโตของบริษัทและการพัฒนาผลิตภัณฑ์ต่อไป',
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
    lead: 'Agent รับคำสั่ง → อ่านโปรเจกต์ → แก้หลายไฟล์พร้อมกัน ขณะที่ Tab เติมโค้ดตามบริบท',
    showIde: true,
    logos: [
      { src: brands.cursor, alt: 'Cursor' },
      { src: brands.vscode, alt: 'VS Code' },
    ],
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
          usdScale: 'M',
          note: 'มิถุนายน 2025',
        },
        {
          label: 'มูลค่าบริษัท',
          value: 29.3,
          display: '$29.3B',
          usdScale: 'B',
          note: 'พฤศจิกายน 2025 · Reuters',
        },
        {
          label: 'มูลค่าดีล SpaceX',
          value: 60,
          display: '$60B',
          usdScale: 'B',
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
    kind: 'grid',
    icon: 'blocks',
    kicker: 'ลักษณะธุรกิจ',
    title: 'ลักษณะธุรกิจ',
    lead: 'Cursor ดำเนินธุรกิจในรูปแบบ Software as a Service (SaaS) โดยให้บริการ AI Code Editor สำหรับนักพัฒนา ทีม และองค์กร',
    items: [
      { label: '01', text: 'นักพัฒนาซอฟต์แวร์', icon: 'code' },
      { label: '02', text: 'นักศึกษา', icon: 'school' },
      { label: '03', text: 'บริษัทด้านเทคโนโลยี', icon: 'building' },
      { label: '04', text: 'Startup', icon: 'rocket' },
      { label: '05', text: 'ทีมพัฒนาซอฟต์แวร์', icon: 'users' },
    ],
  },
  {
    id: 'features-1',
    kind: 'grid',
    icon: 'zap',
    kicker: 'จุดเด่นของ Cursor · ส่วนที่ 1',
    title: 'ความสามารถหลักด้าน AI',
    items: [
      { label: '01', text: 'AI เขียนโค้ดอัตโนมัติ', icon: 'zap' },
      { label: '02', text: 'AI แก้ไขโค้ดทั้งไฟล์', icon: 'file' },
      { label: '03', text: 'AI เข้าใจโปรเจกต์ทั้ง Repository', icon: 'folder' },
      { label: '04', text: 'Chat กับโค้ดภายในโปรเจกต์', icon: 'message' },
    ],
  },
  {
    id: 'features-2',
    kind: 'grid',
    icon: 'layers',
    kicker: 'จุดเด่นของ Cursor · ส่วนที่ 2',
    title: 'รองรับหลายภาษาและหลายโมเดล',
    items: [
      { label: '05', text: 'Auto Complete อัจฉริยะ', icon: 'sparkles' },
      {
        label: '06',
        text: 'รองรับหลายภาษา',
        icon: 'code',
        images: [
          '/logos/python.svg',
          '/logos/javascript.svg',
          '/logos/go.svg',
          '/logos/php.svg',
          '/logos/vue.svg',
          '/logos/nextdotjs.svg',
        ],
      },
      {
        label: '07',
        text: 'สามารถเลือกใช้โมเดล AI ได้หลายตัว เช่น GPT, Claude, Gemini และโมเดลอื่น ๆ ตามที่รองรับ',
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
    kind: 'section',
    icon: 'dollar',
    kicker: 'การสร้างรายได้',
    title: 'โมเดลธุรกิจแบบ Freemium',
    lead: 'Cursor มีโมเดลธุรกิจแบบ Freemium',
    body: [
      'นอกจากนี้ Cursor ยังมีต้นทุนหลักจากการเรียกใช้ API ของโมเดล AI จากผู้ให้บริการหลายราย จึงคิดค่าบริการแบบสมาชิกเพื่อครอบคลุมต้นทุนการประมวลผลและการพัฒนาผลิตภัณฑ์',
    ],
  },
  {
    id: 'pricing-hobby-pro',
    kind: 'split',
    icon: 'sparkles',
    kicker: 'แพ็กเกจ · Free & Pro',
    title: 'Free Plan และ Pro Plan',
    items: [
      {
        label: 'Free Plan',
        text: 'ใช้งานได้ฟรี · จำกัดจำนวนการใช้งาน AI บางฟีเจอร์',
        icon: 'check',
      },
      {
        label: 'Pro Plan',
        text: 'จ่ายค่าบริการรายเดือนหรือรายปี · ใช้งาน AI ได้มากขึ้น · เข้าถึงโมเดล AI ระดับสูง · ตอบสนองเร็วกว่า',
        icon: 'dollar',
      },
    ],
  },
  {
    id: 'pricing-team-ent',
    kind: 'split',
    icon: 'building',
    kicker: 'แพ็กเกจ · Business & Enterprise',
    title: 'Business / Enterprise',
    lead: 'สำหรับองค์กร',
    items: [
      {
        label: 'การจัดการผู้ใช้',
        text: 'ระบบจัดการผู้ใช้',
        icon: 'users',
      },
      {
        label: 'ความปลอดภัย',
        text: 'ความปลอดภัยและการควบคุมข้อมูล',
        icon: 'shield',
      },
      {
        label: 'สิทธิ์และทีมงาน',
        text: 'การจัดการสิทธิ์และทีมงาน',
        icon: 'network',
      },
      {
        label: 'องค์กรขนาดใหญ่',
        text: 'รองรับการใช้งานในบริษัทขนาดใหญ่',
        icon: 'building',
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
    kind: 'grid',
    icon: 'check',
    kicker: 'จุดเด่นของ Cursor',
    title: 'สรุปความสามารถที่โดดเด่น',
    items: [
      { label: '01', text: 'AI เขียนโค้ดอัตโนมัติ', icon: 'zap' },
      { label: '02', text: 'AI แก้ไขโค้ดทั้งไฟล์', icon: 'file' },
      { label: '03', text: 'AI เข้าใจโปรเจกต์ทั้ง Repository', icon: 'folder' },
      { label: '04', text: 'Chat กับโค้ดภายในโปรเจกต์', icon: 'message' },
      { label: '05', text: 'Auto Complete อัจฉริยะ', icon: 'sparkles' },
      {
        label: '06',
        text: 'รองรับหลายภาษา',
        icon: 'code',
        images: [
          '/logos/python.svg',
          '/logos/javascript.svg',
          '/logos/go.svg',
          '/logos/php.svg',
          '/logos/vue.svg',
          '/logos/nextdotjs.svg',
        ],
      },
      {
        label: '07',
        text: 'สามารถเลือกใช้โมเดล AI ได้หลายตัว เช่น GPT, Claude, Gemini และโมเดลอื่น ๆ ตามที่รองรับ',
        icon: 'cpu',
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
      'https://scontent.furt2-1.fna.fbcdn.net/v/t39.99422-6/725966975_1700989597767602_4934899488893531981_n.png?stp=dst-jpg_tt6&cstp=mx1440x1800&ctp=s1440x1800&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=mmIEDYv7cuMQ7kNvwEAIJfV&_nc_oc=AdoIC6WLcTPV57eDQaW1K09NjxsFV04s91UovLM-cgtve6ReeVAU7t5VAkK026caf1Zze92zFfU1dgOuOA6ogSo9&_nc_zt=14&_nc_ht=scontent.furt2-1.fna&_nc_gid=BwIjXFVqBmLih-6JVO_WHw&_nc_ss=7b2a8&oh=00_AQBdZs4aD0bsoIDQItpbGyez5Rr7qYEfYLCvihEAJ9y0nw&oe=6A5C3E13',
  },
  {
    id: 'future',
    kind: 'quote',
    icon: 'landmark',
    kicker: 'เงินลงทุนจาก Venture Capital',
    title: 'เงินทุนที่เร่งการเติบโตของ Cursor',
    lead: 'Cursor ได้รับเงินลงทุนจากกองทุน Venture Capital ชั้นนำ ได้แก่ OpenAI Startup Fund, Andreessen Horowitz (a16z) และ Thrive Capital เพื่อนำไปพัฒนาผลิตภัณฑ์ ขยายทีมงาน และเร่งการเติบโตของธุรกิจ AI Code Editor ทำให้บริษัทสามารถแข่งขันในตลาด AI สำหรับนักพัฒนาซอฟต์แวร์ได้อย่างรวดเร็ว',
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
      { label: 'ต้นทุน', text: 'ค่าใช้จ่ายโมเดลและ Cloud อยู่ในระดับสูง', icon: 'dollar' },
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
    kicker: 'สรุป',
    title: 'Cursor ช่วยให้สร้าง แก้ไข วิเคราะห์\nและตรวจโค้ดเร็วขึ้น',
    lead: 'Anysphere ประสบความสำเร็จจากการมองเห็นปัญหาของนักพัฒนา และนำ AI มาปรับเปลี่ยนกระบวนการเขียนโปรแกรม — ไม่จำเป็นต้องสร้างเทคโนโลยีทุกอย่างขึ้นมาใหม่ แต่แปลงสิ่งที่มีให้เป็นประสบการณ์ที่แก้ปัญหาลูกค้าได้ชัด',
    logos: [{ src: brands.cursor, alt: 'Cursor' }],
    body: [
      'รายได้: สมาชิก · ทีม · Enterprise · ค่าใช้ AI เพิ่มเติม',
      'จุดแข็ง: ใช้งานง่าย · เข้าใจทั้งโปรเจกต์ · รองรับองค์กร',
      'บทเรียน: Product-Led Growth · Freemium · Timing · แก้ปัญหาจริง',
    ],
    footnote: 'ขอบคุณ · Anysphere & Cursor Study',
  },
]
