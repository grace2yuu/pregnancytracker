import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Home, Calendar, Stethoscope, Baby, PartyPopper,
  Heart, Plus, Pencil, Trash2, Check, X, ChevronDown, ChevronUp,
  Star, Sparkles, Sun, BookOpen, ClipboardList, Wallet,
  Briefcase, Gift, Smile, Flower2, Apple, Clock, MapPin,
  Filter, ListChecks, TrendingUp, Notebook,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';

/* ============================================================
   STATIC DATA
   ============================================================ */

const BABY_SIZES = {
  1: { label: 'a tiny spark', emoji: '✨' },
  2: { label: 'a pinhead', emoji: '📍' },
  3: { label: 'a poppy seed', emoji: '🌱' },
  4: { label: 'a sesame seed', emoji: '🌰' },
  5: { label: 'an apple seed', emoji: '🍎' },
  6: { label: 'a sweet pea', emoji: '🫛' },
  7: { label: 'a blueberry', emoji: '🫐' },
  8: { label: 'a raspberry', emoji: '🍇' },
  9: { label: 'a cherry', emoji: '🍒' },
  10: { label: 'a strawberry', emoji: '🍓' },
  11: { label: 'a fig', emoji: '🍈' },
  12: { label: 'a lime', emoji: '🍋' },
  13: { label: 'a peach', emoji: '🍑' },
  14: { label: 'a lemon', emoji: '🍋' },
  15: { label: 'an apple', emoji: '🍎' },
  16: { label: 'an avocado', emoji: '🥑' },
  17: { label: 'a pear', emoji: '🍐' },
  18: { label: 'a bell pepper', emoji: '🫑' },
  19: { label: 'a tomato', emoji: '🍅' },
  20: { label: 'a banana', emoji: '🍌' },
  21: { label: 'a carrot', emoji: '🥕' },
  22: { label: 'a papaya', emoji: '🍈' },
  23: { label: 'a grapefruit', emoji: '🍊' },
  24: { label: 'an ear of corn', emoji: '🌽' },
  25: { label: 'a cauliflower', emoji: '🥦' },
  26: { label: 'a head of lettuce', emoji: '🥬' },
  27: { label: 'a cucumber', emoji: '🥒' },
  28: { label: 'an eggplant', emoji: '🍆' },
  29: { label: 'a butternut squash', emoji: '🎃' },
  30: { label: 'a cabbage', emoji: '🥬' },
  31: { label: 'a coconut', emoji: '🥥' },
  32: { label: 'a jicama', emoji: '🥔' },
  33: { label: 'a pineapple', emoji: '🍍' },
  34: { label: 'a cantaloupe', emoji: '🍈' },
  35: { label: 'a honeydew melon', emoji: '🍈' },
  36: { label: 'a head of romaine', emoji: '🥬' },
  37: { label: 'a bunch of swiss chard', emoji: '🌿' },
  38: { label: 'a leek', emoji: '🥬' },
  39: { label: 'a mini watermelon', emoji: '🍉' },
  40: { label: 'a small pumpkin', emoji: '🎃' },
};

const WEEKLY_MILESTONES = [
  { week: 1, dev: 'Your body is preparing — conception has not yet occurred.', task: 'Start taking a daily prenatal vitamin with folic acid.' },
  { week: 2, dev: 'Ovulation happens this week — the egg is ready to meet sperm.', task: 'Track your cycle and stay hydrated.' },
  { week: 3, dev: 'Fertilization! A tiny cluster of cells begins its journey.', task: 'Avoid alcohol and limit caffeine.' },
  { week: 4, dev: 'The embryo implants in the uterine wall.', task: 'Take a home pregnancy test if your period is late.' },
  { week: 5, dev: 'Tiny heart cells begin to form and beat.', task: 'Schedule your first prenatal appointment.' },
  { week: 6, dev: 'Facial features start to appear, and the heartbeat is detectable.', task: 'Stock up on saltines for morning sickness.' },
  { week: 7, dev: 'Baby doubles in size this week — arms and legs are forming.', task: 'Rest often — your body is doing big work.' },
  { week: 8, dev: 'Tiny fingers and toes are beginning to develop.', task: 'Sip ginger tea if nausea strikes.' },
  { week: 9, dev: 'Baby is now officially a fetus with all major organs forming.', task: 'Start a gentle prenatal yoga routine.' },
  { week: 10, dev: 'Vital organs are functional and bones are hardening.', task: 'Begin sharing the news with close family.' },
  { week: 11, dev: 'Baby is moving — though you can\'t feel it yet.', task: 'Start a pregnancy journal to capture memories.' },
  { week: 12, dev: 'Reflexes are developing — baby can curl tiny fingers.', task: 'Celebrate the end of the first trimester! 🌸' },
  { week: 13, dev: 'Vocal cords are forming and fingerprints appear.', task: 'Update your wardrobe with a few comfy basics.' },
  { week: 14, dev: 'Baby can make facial expressions — even tiny frowns.', task: 'Plan a babymoon getaway.' },
  { week: 15, dev: 'Baby is hearing your voice for the first time.', task: 'Start reading and singing to your bump.' },
  { week: 16, dev: 'You might start feeling the first flutters of movement.', task: 'Begin researching baby names.' },
  { week: 17, dev: 'Baby is developing fat to keep warm after birth.', task: 'Take maternity photos to capture the bump.' },
  { week: 18, dev: 'Baby can yawn, hiccup, and stretch in your belly.', task: 'Schedule your anatomy ultrasound.' },
  { week: 19, dev: 'A protective coating called vernix forms on baby\'s skin.', task: 'Start a baby registry with the essentials.' },
  { week: 20, dev: 'Halfway there! Baby has a full sleep-wake cycle.', task: 'Celebrate halfway with a special date night.' },
  { week: 21, dev: 'Baby\'s taste buds are developing — they taste what you eat.', task: 'Try a new healthy recipe this week.' },
  { week: 22, dev: 'Baby\'s eyebrows and eyelids are fully formed.', task: 'Set up your baby budget and savings plan.' },
  { week: 23, dev: 'Baby can hear your heartbeat clearly now.', task: 'Tour potential birthing facilities.' },
  { week: 24, dev: 'Baby is now viable — lungs continue developing rapidly.', task: 'Start a kick-count journal.' },
  { week: 25, dev: 'Baby\'s skin is becoming smoother and less translucent.', task: 'Plan your baby shower with a loved one.' },
  { week: 26, dev: 'Baby opens their eyes for the first time.', task: 'Talk to baby — your voice is comforting.' },
  { week: 27, dev: 'Brain activity is increasing rapidly.', task: 'Sign up for a childbirth class.' },
  { week: 28, dev: 'Welcome to the third trimester! Baby dreams during sleep.', task: 'Schedule your glucose screening test.' },
  { week: 29, dev: 'Baby is gaining steady weight and building strength.', task: 'Start packing your hospital bag.' },
  { week: 30, dev: 'Baby\'s eyes can now track light through your skin.', task: 'Take weekly bump photos to remember.' },
  { week: 31, dev: 'Lungs are nearly mature and baby is practicing breathing.', task: 'Install the car seat early to be ready.' },
  { week: 32, dev: 'Baby is settling into a head-down position.', task: 'Prepare a freezer meal stash.' },
  { week: 33, dev: 'Baby\'s bones are hardening — except the soft skull.', task: 'Wash and organize baby clothes.' },
  { week: 34, dev: 'Baby\'s immune system is gearing up.', task: 'Pre-register at the hospital.' },
  { week: 35, dev: 'Baby is plumping up with adorable rolls.', task: 'Set up the nursery and stock essentials.' },
  { week: 36, dev: 'Baby is officially considered late preterm.', task: 'Finalize your birth plan with your partner.' },
  { week: 37, dev: 'Baby is full term! Lungs are mature.', task: 'Practice your breathing techniques.' },
  { week: 38, dev: 'Baby is shedding the protective vernix coating.', task: 'Rest as much as you can — you\'re so close.' },
  { week: 39, dev: 'Baby is fully ready — just waiting for the right moment.', task: 'Keep your phone charged and bag by the door.' },
  { week: 40, dev: 'You did it, Mama! Baby is ready to meet you. 💛', task: 'Trust your body — you were made for this.' },
];

const DAILY_TIPS = [
  '🌸 Stay hydrated — aim for 8–10 glasses of water daily.',
  '🧘 A 10-minute stretch break does wonders for your back.',
  '🥑 Avocados pack folate, fiber, and healthy fats — a perfect snack.',
  '😴 Sleep on your left side to improve circulation to baby.',
  '🎧 Try a guided pregnancy meditation before bed.',
  '🚶 A short walk after meals helps digestion and mood.',
  '💛 Talk to your bump — baby loves the sound of your voice.',
];

const MOOD_EMOJIS = ['😊', '🥰', '😌', '😴', '😣'];
const MOOD_LABELS = ['Happy', 'Loved', 'Calm', 'Tired', 'Uncomfortable'];

const SYMPTOM_OPTIONS = [
  'Nausea', 'Fatigue', 'Cravings', 'Back Pain',
  'Heartburn', 'Swelling', 'Insomnia', 'Headache', 'Other',
];

const APPT_TYPES = ['OB Visit', 'Ultrasound', 'Blood Work', 'Dentist', 'Other'];
const BUDGET_CATEGORIES = ['Nursery', 'Clothing', 'Gear', 'Medical', 'Baby Shower', 'Misc'];

const HOSPITAL_BAG_SEED = [
  { id: 'm1', section: 'Mama', name: 'Comfortable robe', packed: true, note: '' },
  { id: 'm2', section: 'Mama', name: 'Nursing bras (2)', packed: true, note: '' },
  { id: 'm3', section: 'Mama', name: 'Toiletries kit', packed: true, note: '' },
  { id: 'm4', section: 'Mama', name: 'Going-home outfit', packed: false, note: 'loose & comfy' },
  { id: 'm5', section: 'Mama', name: 'Slippers & cozy socks', packed: true, note: '' },
  { id: 'm6', section: 'Mama', name: 'Phone charger (long cable)', packed: true, note: '' },
  { id: 'm7', section: 'Mama', name: 'Lip balm & hair ties', packed: false, note: '' },
  { id: 'm8', section: 'Mama', name: 'Snacks & electrolyte drinks', packed: false, note: '' },
  { id: 'm9', section: 'Mama', name: 'Postpartum underwear', packed: false, note: '' },
  { id: 'b1', section: 'Baby', name: 'Going-home outfit', packed: true, note: 'newborn size' },
  { id: 'b2', section: 'Baby', name: 'Swaddle blankets (2)', packed: true, note: '' },
  { id: 'b3', section: 'Baby', name: 'Newborn hat & mittens', packed: true, note: '' },
  { id: 'b4', section: 'Baby', name: 'Onesies (3)', packed: true, note: '' },
  { id: 'b5', section: 'Baby', name: 'Diapers & wipes', packed: false, note: '' },
  { id: 'b6', section: 'Baby', name: 'Pacifier', packed: false, note: '' },
  { id: 'b7', section: 'Baby', name: 'Baby blanket', packed: false, note: '' },
  { id: 'b8', section: 'Baby', name: 'Car seat installed', packed: false, note: 'check base!' },
  { id: 'd1', section: 'Documents', name: 'Photo ID', packed: false, note: '' },
  { id: 'd2', section: 'Documents', name: 'Insurance card', packed: false, note: '' },
  { id: 'd3', section: 'Documents', name: 'Birth plan (printed)', packed: false, note: '' },
  { id: 'd4', section: 'Documents', name: 'Hospital paperwork', packed: false, note: '' },
  { id: 'd5', section: 'Documents', name: 'Pediatrician info', packed: false, note: '' },
  { id: 'd6', section: 'Documents', name: 'Emergency contact list', packed: false, note: '' },
  { id: 'd7', section: 'Documents', name: 'Notebook & pen', packed: false, note: '' },
];

/* ============================================================
   HELPERS
   ============================================================ */

const TRIMESTER = (w) => (w <= 13 ? 1 : w <= 26 ? 2 : 3);

const trimesterLabel = (t) => ['', 'First Trimester', 'Second Trimester', 'Third Trimester'][t];

const trimesterChipClass = (t) =>
  t === 1
    ? 'bg-lavender-soft text-lavender-700 border-lavender/40'
    : t === 2
    ? 'bg-sage-soft text-sage-700 border-sage/40'
    : 'bg-blush-soft text-blush-700 border-blush/40';

const trimesterDotClass = (t) =>
  t === 1 ? 'bg-lavender' : t === 2 ? 'bg-sage' : 'bg-blush';

const formatDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const formatShortDate = (iso) => {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const todayISO = () => new Date().toISOString().slice(0, 10);

const daysBetween = (iso) => {
  const today = new Date(); today.setHours(0,0,0,0);
  const target = new Date(iso + 'T00:00:00');
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
};

const weekFromDueDate = (dueIso) => {
  if (!dueIso) return 1;
  const due = new Date(dueIso + 'T00:00:00');
  const conception = new Date(due);
  conception.setDate(conception.getDate() - 280);
  const now = new Date();
  const diffDays = Math.floor((now - conception) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(40, Math.floor(diffDays / 7) + 1));
};

const defaultDueDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 16 * 7);
  return d.toISOString().slice(0, 10);
};

const uid = () => Math.random().toString(36).slice(2, 10);

/* ============================================================
   SEED DATA
   ============================================================ */

const seedAppointments = () => {
  const future = new Date(); future.setDate(future.getDate() + 9);
  const past = new Date(); past.setDate(past.getDate() - 18);
  return [
    {
      id: uid(),
      date: future.toISOString().slice(0, 10),
      time: '10:30',
      provider: 'Dr. Marisol Chen',
      type: 'Ultrasound',
      notes: 'Anatomy scan — bring partner.',
    },
    {
      id: uid(),
      date: past.toISOString().slice(0, 10),
      time: '09:00',
      provider: 'Dr. Marisol Chen',
      type: 'OB Visit',
      notes: 'Routine check-in. All looking great!',
    },
  ];
};

const seedHealthLogs = (w) => [
  { id: uid(), date: todayISO(), week: w, weight: 148, unit: 'lbs', mood: 1, energy: 4, symptoms: ['Cravings', 'Back Pain'], notes: 'Feeling strong this week 💛' },
  { id: uid(), date: todayISO(), week: Math.max(1, w - 2), weight: 145, unit: 'lbs', mood: 3, energy: 2, symptoms: ['Fatigue', 'Heartburn'], notes: 'Slept poorly two nights in a row.' },
  { id: uid(), date: todayISO(), week: Math.max(1, w - 4), weight: 143, unit: 'lbs', mood: 0, energy: 5, symptoms: ['Cravings'], notes: 'Best week so far!' },
];

const seedBudget = () => [
  { id: uid(), name: 'Convertible Crib', category: 'Nursery', estimated: 450, actual: 420, purchased: true },
  { id: uid(), name: 'Newborn Bundle (clothes)', category: 'Clothing', estimated: 180, actual: 165, purchased: true },
  { id: uid(), name: 'Stroller + Car Seat Combo', category: 'Gear', estimated: 650, actual: 0, purchased: false },
  { id: uid(), name: 'Hospital Bag Essentials', category: 'Medical', estimated: 120, actual: 95, purchased: true },
];

const seedJournal = () => {
  const t1 = new Date(); t1.setDate(t1.getDate() - 3);
  const t2 = new Date(); t2.setDate(t2.getDate() - 20);
  return [
    { id: uid(), date: t1.toISOString().slice(0, 10), mood: 1, title: 'First strong kicks 💛', body: 'Today I felt the strongest little kicks — right while sipping my morning tea. I had to put my hand on my belly and just smile for a whole minute.' },
    { id: uid(), date: t2.toISOString().slice(0, 10), mood: 0, title: 'Nursery paint day', body: 'Spent the afternoon picking paint swatches. We landed on a soft sage with cream trim. It already feels like a real little room.' },
  ];
};

const seedNames = () => [
  { id: uid(), name: 'Juniper', gender: 'Girl', meaning: 'Young, evergreen', notes: 'Earthy & timeless', favorite: true },
  { id: uid(), name: 'Theodore', gender: 'Boy', meaning: 'Gift of God', notes: 'Nickname Theo 💛', favorite: true },
  { id: uid(), name: 'Sage', gender: 'Neutral', meaning: 'Wise one', notes: '', favorite: false },
  { id: uid(), name: 'Eleanor', gender: 'Girl', meaning: 'Bright, shining light', notes: '', favorite: false },
];

const seedGuests = () => [
  { id: uid(), name: 'Mom (Linda)', rsvp: 'Yes', dietary: 'Gluten-free', gift: 'Handmade quilt', thankYouSent: true },
  { id: uid(), name: 'Sarah Bennett', rsvp: 'Yes', dietary: '', gift: 'Diaper bag', thankYouSent: false },
  { id: uid(), name: 'Aunt Carol', rsvp: 'Pending', dietary: '', gift: '', thankYouSent: false },
  { id: uid(), name: 'Jess & Maya', rsvp: 'Yes', dietary: 'Vegetarian', gift: 'Board books set', thankYouSent: true },
  { id: uid(), name: 'Cousin Riley', rsvp: 'No', dietary: '', gift: '', thankYouSent: false },
];

const seedMilestoneLogs = (currentWeek) => {
  const logs = {};
  if (currentWeek >= 12) logs[12] = { mood: 1, note: 'Made it through the first trimester! 🎉' };
  if (currentWeek >= 20) logs[20] = { mood: 0, note: 'Halfway date night at our favorite spot 💛' };
  return logs;
};

/* ============================================================
   ROOT APP
   ============================================================ */

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [profile, setProfile] = useState({ name: '', dueDate: defaultDueDate() });
  const [tab, setTab] = useState('home');

  const currentWeek = useMemo(() => weekFromDueDate(profile.dueDate), [profile.dueDate]);
  const trimester = TRIMESTER(currentWeek);
  const daysToGo = useMemo(() => Math.max(0, daysBetween(profile.dueDate)), [profile.dueDate]);

  const [appointments, setAppointments] = useState(seedAppointments);
  const [healthLogs, setHealthLogs] = useState(() => seedHealthLogs(weekFromDueDate(defaultDueDate())));
  const [budget, setBudget] = useState({ total: 3000, items: seedBudget() });
  const [journal, setJournal] = useState(seedJournal);
  const [bag, setBag] = useState(HOSPITAL_BAG_SEED);
  const [names, setNames] = useState(seedNames);
  const [guests, setGuests] = useState(seedGuests);
  const [milestoneLogs, setMilestoneLogs] = useState(() => seedMilestoneLogs(weekFromDueDate(defaultDueDate())));

  const tipIndex = useMemo(() => {
    const start = new Date(2024, 0, 1);
    const d = Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24));
    return d % DAILY_TIPS.length;
  }, []);

  const handleOnboard = (name, dueDate) => {
    setProfile({ name: name.trim(), dueDate });
    setOnboarded(true);
  };

  return (
    <div className="min-h-full bg-cream font-sans text-charcoal">
      {!onboarded && <OnboardingModal onSubmit={handleOnboard} initialDate={profile.dueDate} />}
      <div className="mx-auto max-w-lg pb-28">
        <div key={tab} className="fade-in">
          {tab === 'home' && (
            <Dashboard
              profile={profile}
              week={currentWeek}
              trimester={trimester}
              daysToGo={daysToGo}
              appointments={appointments}
              budget={budget}
              tip={DAILY_TIPS[tipIndex]}
              goTo={setTab}
            />
          )}
          {tab === 'journey' && (
            <JourneyTab
              currentWeek={currentWeek}
              milestoneLogs={milestoneLogs}
              setMilestoneLogs={setMilestoneLogs}
              journal={journal}
              setJournal={setJournal}
            />
          )}
          {tab === 'health' && (
            <HealthTab
              appointments={appointments}
              setAppointments={setAppointments}
              healthLogs={healthLogs}
              setHealthLogs={setHealthLogs}
              currentWeek={currentWeek}
            />
          )}
          {tab === 'baby' && (
            <BabyTab
              budget={budget}
              setBudget={setBudget}
              names={names}
              setNames={setNames}
              bag={bag}
              setBag={setBag}
            />
          )}
          {tab === 'shower' && (
            <ShowerTab guests={guests} setGuests={setGuests} />
          )}
        </div>
      </div>
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

/* ============================================================
   ONBOARDING
   ============================================================ */

function OnboardingModal({ onSubmit, initialDate }) {
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState(initialDate);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/30 p-5 backdrop-blur-sm">
      <div className="scale-in w-full max-w-md rounded-2xl bg-white p-6 shadow-soft">
        <div className="mb-4 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blush-soft">
            <Flower2 className="h-7 w-7 text-blush" />
          </div>
          <h2 className="text-2xl font-bold text-charcoal">Welcome, Mama! 🌸</h2>
          <p className="mt-1 text-sm text-charcoal/70">Let's set up your tracker.</p>
        </div>
        <div className="space-y-4">
          <Field label="Your name (optional)">
            <input
              type="text"
              aria-label="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Emma"
              className="w-full rounded-xl border border-charcoal/10 bg-cream px-4 py-3 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40"
            />
          </Field>
          <Field label="Due date">
            <input
              type="date"
              aria-label="Due date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-cream px-4 py-3 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40"
            />
          </Field>
          <button
            onClick={() => dueDate && onSubmit(name, dueDate)}
            aria-label="Start my journey"
            className="mt-2 w-full rounded-full bg-blush py-3 text-sm font-bold text-white shadow-soft transition hover:bg-blush/90 active:scale-[0.99]"
          >
            Start My Journey →
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD
   ============================================================ */

function Dashboard({ profile, week, trimester, daysToGo, appointments, budget, tip, goTo }) {
  const baby = BABY_SIZES[week] || BABY_SIZES[40];
  const greetingName = profile.name ? `, ${profile.name}` : ', Mama';

  const upcoming = appointments
    .filter((a) => daysBetween(a.date) >= 0)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const totalEst = budget.items.reduce((s, i) => s + Number(i.estimated || 0), 0);
  const totalSpent = budget.items.reduce((s, i) => s + Number(i.actual || 0), 0);
  const budgetPct = Math.min(100, (totalSpent / Math.max(1, budget.total)) * 100);

  return (
    <div className="px-5 pt-7">
      <header className="mb-5">
        <p className="text-sm text-charcoal/60">Hello{greetingName} 🌸</p>
        <h1 className="mt-1 text-3xl font-bold leading-tight">
          You're <span className="text-blush">{week} weeks</span> in
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <TrimesterBadge trimester={trimester} />
          <span className="text-xs text-charcoal/60">· {daysToGo} days to go</span>
        </div>
      </header>

      <Card className="mb-4 bg-gradient-to-br from-blush-soft via-white to-lavender-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-charcoal/60">Baby is the size of</p>
            <p className="mt-1 text-xl font-bold">{baby.label}</p>
            <p className="mt-1 text-xs text-charcoal/60">Week {week} of 40</p>
          </div>
          <div className="text-5xl" aria-hidden="true">{baby.emoji}</div>
        </div>
        <div className="mt-4">
          <ProgressBar value={(week / 40) * 100} />
          <div className="mt-1 flex justify-between text-[10px] text-charcoal/50">
            <span>W1</span><span>W10</span><span>W20</span><span>W30</span><span>W40</span>
          </div>
        </div>
      </Card>

      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-charcoal/60">Countdown</p>
            <p className="mt-1 text-2xl font-bold text-blush">{daysToGo} days</p>
            <p className="text-xs text-charcoal/60">until {formatDate(profile.dueDate)}</p>
          </div>
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blush-soft">
            <Heart className="h-7 w-7 text-blush" />
          </div>
        </div>
      </Card>

      <Card className="mb-4 cursor-pointer transition hover:shadow-lg" onClick={() => goTo('health')}>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-charcoal/60">Next appointment</p>
          <Calendar className="h-4 w-4 text-sage" />
        </div>
        {upcoming ? (
          <div>
            <p className="font-bold">{upcoming.type}</p>
            <p className="text-sm text-charcoal/70">{formatDate(upcoming.date)} · {upcoming.time}</p>
            <p className="text-xs text-charcoal/60">{upcoming.provider}</p>
          </div>
        ) : (
          <p className="text-sm text-charcoal/60">No upcoming visits — tap to add one ✨</p>
        )}
      </Card>

      <Card className="mb-4 cursor-pointer transition hover:shadow-lg" onClick={() => goTo('baby')}>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-charcoal/60">Baby budget</p>
          <Wallet className="h-4 w-4 text-lavender" />
        </div>
        <div className="flex items-baseline justify-between">
          <p className="text-lg font-bold">${totalSpent.toLocaleString()}</p>
          <p className="text-xs text-charcoal/60">of ${budget.total.toLocaleString()}</p>
        </div>
        <div className="mt-2">
          <ProgressBar value={budgetPct} />
        </div>
        <p className="mt-1 text-[11px] text-charcoal/60">${totalEst.toLocaleString()} estimated across {budget.items.length} items</p>
      </Card>

      <Card className="mb-4 bg-sage-soft">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70">
            <Sun className="h-5 w-5 text-sage" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-sage/90">Today's tip</p>
            <p className="mt-1 text-sm leading-relaxed">{tip}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   JOURNEY TAB (Milestones + Journal)
   ============================================================ */

function JourneyTab({ currentWeek, milestoneLogs, setMilestoneLogs, journal, setJournal }) {
  const [subTab, setSubTab] = useState('milestones');

  return (
    <div className="px-5 pt-7">
      <SectionHeader icon={<BookOpen className="h-5 w-5 text-blush" />} title="My Journey" sub="Weekly milestones & journal entries" />
      <div className="mb-4 flex gap-2 rounded-full bg-white p-1 shadow-soft">
        <SubTabButton active={subTab === 'milestones'} onClick={() => setSubTab('milestones')} label="Milestones" />
        <SubTabButton active={subTab === 'journal'} onClick={() => setSubTab('journal')} label="Journal" />
      </div>
      {subTab === 'milestones' ? (
        <MilestonesView currentWeek={currentWeek} logs={milestoneLogs} setLogs={setMilestoneLogs} />
      ) : (
        <JournalView journal={journal} setJournal={setJournal} />
      )}
    </div>
  );
}

function MilestonesView({ currentWeek, logs, setLogs }) {
  const containerRef = useRef(null);
  const currentRef = useRef(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [currentWeek]);

  const grouped = useMemo(() => {
    return {
      1: WEEKLY_MILESTONES.filter((m) => TRIMESTER(m.week) === 1),
      2: WEEKLY_MILESTONES.filter((m) => TRIMESTER(m.week) === 2),
      3: WEEKLY_MILESTONES.filter((m) => TRIMESTER(m.week) === 3),
    };
  }, []);

  return (
    <div ref={containerRef} className="space-y-6 fade-in">
      {[1, 2, 3].map((t) => (
        <div key={t}>
          <div className="mb-2 flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${trimesterDotClass(t)}`} />
            <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal/70">{trimesterLabel(t)}</h3>
          </div>
          <div className="space-y-3">
            {grouped[t].map((m) => (
              <MilestoneCard
                key={m.week}
                milestone={m}
                isCurrent={m.week === currentWeek}
                refEl={m.week === currentWeek ? currentRef : null}
                log={logs[m.week]}
                onLog={(data) => setLogs({ ...logs, [m.week]: data })}
                onClear={() => {
                  const next = { ...logs }; delete next[m.week]; setLogs(next);
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function MilestoneCard({ milestone, isCurrent, refEl, log, onLog, onClear }) {
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState(log?.mood ?? 0);
  const [note, setNote] = useState(log?.note ?? '');
  const t = TRIMESTER(milestone.week);
  const baby = BABY_SIZES[milestone.week];

  const save = () => {
    onLog({ mood, note });
    setOpen(false);
  };

  return (
    <div
      ref={refEl}
      className={`rounded-2xl bg-white p-5 shadow-soft transition ${isCurrent ? 'ring-2 ring-blush/60' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${trimesterDotClass(t)}/20 text-lg font-bold`}>
            {milestone.week}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold">Week {milestone.week}</p>
              {isCurrent && (
                <span className="rounded-full bg-blush px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  This week
                </span>
              )}
            </div>
            <p className="text-xs text-charcoal/60">Size of {baby.label} {baby.emoji}</p>
          </div>
        </div>
        {log && (
          <span className="rounded-full bg-sage-soft px-2 py-1 text-xs">
            ✅ {MOOD_EMOJIS[log.mood]}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-charcoal/80">{milestone.dev}</p>
      <div className="mt-2 rounded-xl bg-cream p-3 text-sm">
        <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal/50">Mama's task</p>
        <p className="mt-0.5">{milestone.task}</p>
      </div>

      {log && !open && (
        <div className="mt-3 rounded-xl bg-blush-soft/60 p-3 text-sm">
          <p className="text-[11px] font-bold uppercase tracking-wider text-charcoal/60">My note</p>
          <p className="mt-0.5">{log.note || <span className="italic text-charcoal/50">No note yet</span>}</p>
        </div>
      )}

      {open ? (
        <div className="mt-3 space-y-3 rounded-xl bg-cream p-3">
          <div>
            <p className="mb-1 text-xs font-bold text-charcoal/70">How did this week feel?</p>
            <div className="flex gap-2">
              {MOOD_EMOJIS.map((e, i) => (
                <button
                  key={i}
                  aria-label={`Mood ${MOOD_LABELS[i]}`}
                  onClick={() => setMood(i)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition ${
                    mood === i ? 'bg-blush text-white shadow-soft' : 'bg-white'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          <textarea
            aria-label="Week note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="A short note from this week…"
            rows={2}
            className="w-full rounded-xl border border-charcoal/10 bg-white px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40"
          />
          <div className="flex gap-2">
            <button onClick={save} className="flex-1 rounded-full bg-sage py-2 text-sm font-bold text-white">Save</button>
            <button onClick={() => setOpen(false)} className="rounded-full bg-white px-4 py-2 text-sm text-charcoal/70">Cancel</button>
            {log && (
              <button onClick={() => { onClear(); setOpen(false); }} aria-label="Remove log" className="rounded-full bg-white px-3 py-2 text-charcoal/60">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="mt-3 text-xs font-bold text-blush hover:underline"
          aria-label={log ? 'Edit week log' : 'Log this week'}
        >
          {log ? 'Edit log' : '+ Log this week'}
        </button>
      )}
    </div>
  );
}

/* ============================================================
   JOURNAL
   ============================================================ */

function JournalView({ journal, setJournal }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const sorted = [...journal].sort((a, b) => b.date.localeCompare(a.date));

  const saveEntry = (entry) => {
    if (entry.id) {
      setJournal(journal.map((j) => (j.id === entry.id ? entry : j)));
    } else {
      setJournal([{ ...entry, id: uid() }, ...journal]);
    }
    setEditing(null);
    setAdding(false);
  };

  return (
    <div className="space-y-3 fade-in">
      <button
        onClick={() => { setAdding(true); setEditing({ date: todayISO(), mood: 0, title: '', body: '' }); }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blush py-3 text-sm font-bold text-white shadow-soft"
        aria-label="Add journal entry"
      >
        <Plus className="h-4 w-4" /> New entry
      </button>

      {(adding || editing) && (
        <JournalEditor
          entry={editing}
          onSave={saveEntry}
          onCancel={() => { setEditing(null); setAdding(false); }}
        />
      )}

      {sorted.length === 0 && !adding && (
        <EmptyState emoji="📝" text="No entries yet — tap above to capture your first thought ✨" />
      )}

      <div className="relative pl-4">
        <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-blush-soft" />
        <div className="space-y-3">
          {sorted.map((j) => (
            <JournalCard
              key={j.id}
              entry={j}
              onEdit={() => setEditing(j)}
              onDelete={() => setJournal(journal.filter((x) => x.id !== j.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function JournalEditor({ entry, onSave, onCancel }) {
  const [date, setDate] = useState(entry.date);
  const [title, setTitle] = useState(entry.title);
  const [body, setBody] = useState(entry.body);
  const [mood, setMood] = useState(entry.mood);

  return (
    <div className="scale-in rounded-2xl bg-white p-5 shadow-soft">
      <p className="mb-3 text-sm font-bold">{entry.id ? 'Edit entry' : 'New entry'}</p>
      <div className="space-y-3">
        <Field label="Date">
          <input type="date" aria-label="Entry date" value={date} onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <Field label="Title">
          <input type="text" aria-label="Entry title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="A line for today…"
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <Field label="Mood">
          <div className="flex gap-2">
            {MOOD_EMOJIS.map((e, i) => (
              <button key={i} aria-label={`Mood ${MOOD_LABELS[i]}`} onClick={() => setMood(i)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-lg transition ${mood === i ? 'bg-blush text-white shadow-soft' : 'bg-cream'}`}>
                {e}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Write something">
          <textarea rows={4} aria-label="Entry body" value={body} onChange={(e) => setBody(e.target.value)}
            placeholder="What do you want to remember from today?"
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <div className="flex gap-2">
          <button onClick={() => onSave({ id: entry.id, date, title, body, mood })}
            className="flex-1 rounded-full bg-sage py-2 text-sm font-bold text-white">Save</button>
          <button onClick={onCancel} className="rounded-full bg-cream px-4 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

function JournalCard({ entry, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative rounded-2xl bg-white p-5 shadow-soft">
      <div className="absolute -left-3 top-6 h-3 w-3 rounded-full bg-blush" />
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl" aria-hidden="true">{MOOD_EMOJIS[entry.mood]}</span>
            <p className="text-xs text-charcoal/60">{formatDate(entry.date)}</p>
          </div>
          <p className="mt-1 font-bold">{entry.title || 'Untitled'}</p>
          <p className={`mt-1 text-sm text-charcoal/80 ${open ? '' : 'line-clamp-2'}`}>{entry.body}</p>
        </div>
        <div className="flex shrink-0 gap-1">
          <IconButton ariaLabel="Edit entry" onClick={onEdit}><Pencil className="h-4 w-4" /></IconButton>
          <IconButton ariaLabel="Delete entry" onClick={onDelete}><Trash2 className="h-4 w-4" /></IconButton>
        </div>
      </div>
      {entry.body && entry.body.length > 90 && (
        <button onClick={() => setOpen(!open)} className="mt-2 text-xs font-bold text-blush">
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

/* ============================================================
   HEALTH TAB (Appointments + Symptoms)
   ============================================================ */

function HealthTab({ appointments, setAppointments, healthLogs, setHealthLogs, currentWeek }) {
  const [subTab, setSubTab] = useState('appts');

  return (
    <div className="px-5 pt-7">
      <SectionHeader icon={<Stethoscope className="h-5 w-5 text-sage" />} title="Health & Care" sub="Appointments and weekly check-ins" />
      <div className="mb-4 flex gap-2 rounded-full bg-white p-1 shadow-soft">
        <SubTabButton active={subTab === 'appts'} onClick={() => setSubTab('appts')} label="Appointments" />
        <SubTabButton active={subTab === 'log'} onClick={() => setSubTab('log')} label="Symptoms Log" />
      </div>
      {subTab === 'appts' ? (
        <AppointmentsView appointments={appointments} setAppointments={setAppointments} />
      ) : (
        <HealthLogView logs={healthLogs} setLogs={setHealthLogs} currentWeek={currentWeek} />
      )}
    </div>
  );
}

function AppointmentsView({ appointments, setAppointments }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [showPast, setShowPast] = useState(false);

  const today = todayISO();
  const upcoming = appointments.filter((a) => a.date >= today).sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const past = appointments.filter((a) => a.date < today).sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time));

  const save = (appt) => {
    if (appt.id) setAppointments(appointments.map((a) => (a.id === appt.id ? appt : a)));
    else setAppointments([...appointments, { ...appt, id: uid() }]);
    setEditing(null);
    setAdding(false);
  };

  return (
    <div className="space-y-3 fade-in">
      <button onClick={() => { setAdding(true); setEditing({ date: todayISO(), time: '10:00', provider: '', type: 'OB Visit', notes: '' }); }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-sage py-3 text-sm font-bold text-white shadow-soft"
        aria-label="Add appointment">
        <Plus className="h-4 w-4" /> New appointment
      </button>

      {(adding || editing) && <AppointmentEditor appt={editing} onSave={save} onCancel={() => { setAdding(false); setEditing(null); }} />}

      {upcoming.length > 0 && (
        <>
          <div className="rounded-2xl bg-blush-soft p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-blush">Next up ✨</p>
            <p className="mt-1 font-bold">{upcoming[0].type}</p>
            <p className="text-sm text-charcoal/70">{formatDate(upcoming[0].date)} · {upcoming[0].time} · {upcoming[0].provider}</p>
            {upcoming[0].notes && <p className="mt-1 text-xs text-charcoal/70">{upcoming[0].notes}</p>}
          </div>
          {upcoming.slice(1).map((a) => (
            <AppointmentCard key={a.id} a={a} onEdit={() => setEditing(a)} onDelete={() => setAppointments(appointments.filter((x) => x.id !== a.id))} />
          ))}
        </>
      )}

      {upcoming.length === 0 && !adding && <EmptyState emoji="🩺" text="No upcoming appointments. Add one to stay on track!" />}

      {past.length > 0 && (
        <div className="rounded-2xl bg-white shadow-soft">
          <button onClick={() => setShowPast(!showPast)} className="flex w-full items-center justify-between px-5 py-3 text-sm font-bold" aria-label="Toggle past appointments">
            <span>Past appointments ({past.length})</span>
            {showPast ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showPast && (
            <div className="space-y-2 px-3 pb-3">
              {past.map((a) => (
                <AppointmentCard key={a.id} a={a} onEdit={() => setEditing(a)} onDelete={() => setAppointments(appointments.filter((x) => x.id !== a.id))} flat />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function AppointmentCard({ a, onEdit, onDelete, flat }) {
  return (
    <div className={`${flat ? 'bg-cream' : 'bg-white shadow-soft'} rounded-2xl p-4`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-sage-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sage">{a.type}</span>
          </div>
          <p className="mt-1 font-bold">{a.provider || 'Provider TBD'}</p>
          <p className="flex items-center gap-1.5 text-xs text-charcoal/70">
            <Clock className="h-3 w-3" /> {formatDate(a.date)} · {a.time}
          </p>
          {a.notes && <p className="mt-1 text-xs text-charcoal/70">{a.notes}</p>}
        </div>
        <div className="flex gap-1">
          <IconButton ariaLabel="Edit appointment" onClick={onEdit}><Pencil className="h-4 w-4" /></IconButton>
          <IconButton ariaLabel="Delete appointment" onClick={onDelete}><Trash2 className="h-4 w-4" /></IconButton>
        </div>
      </div>
    </div>
  );
}

function AppointmentEditor({ appt, onSave, onCancel }) {
  const [date, setDate] = useState(appt.date);
  const [time, setTime] = useState(appt.time);
  const [provider, setProvider] = useState(appt.provider);
  const [type, setType] = useState(appt.type);
  const [notes, setNotes] = useState(appt.notes);

  return (
    <div className="scale-in rounded-2xl bg-white p-5 shadow-soft">
      <p className="mb-3 text-sm font-bold">{appt.id ? 'Edit appointment' : 'New appointment'}</p>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <Field label="Date">
            <input type="date" aria-label="Appointment date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
          </Field>
          <Field label="Time">
            <input type="time" aria-label="Appointment time" value={time} onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
          </Field>
        </div>
        <Field label="Provider">
          <input type="text" aria-label="Provider name" value={provider} onChange={(e) => setProvider(e.target.value)} placeholder="Dr. Name"
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <Field label="Type">
          <select aria-label="Appointment type" value={type} onChange={(e) => setType(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40">
            {APPT_TYPES.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Notes">
          <textarea rows={2} aria-label="Appointment notes" value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <div className="flex gap-2">
          <button onClick={() => onSave({ id: appt.id, date, time, provider, type, notes })}
            className="flex-1 rounded-full bg-sage py-2 text-sm font-bold text-white">Save</button>
          <button onClick={onCancel} className="rounded-full bg-cream px-4 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HEALTH LOG (symptoms + weight chart)
   ============================================================ */

function HealthLogView({ logs, setLogs, currentWeek }) {
  const [unit, setUnit] = useState('lbs');
  const [weight, setWeight] = useState('');
  const [mood, setMood] = useState(0);
  const [energy, setEnergy] = useState(3);
  const [symptoms, setSymptoms] = useState([]);
  const [notes, setNotes] = useState('');

  const toggleSym = (s) => setSymptoms(symptoms.includes(s) ? symptoms.filter((x) => x !== s) : [...symptoms, s]);

  const submit = () => {
    if (!weight) return;
    setLogs([
      { id: uid(), date: todayISO(), week: currentWeek, weight: Number(weight), unit, mood, energy, symptoms, notes },
      ...logs,
    ]);
    setWeight(''); setMood(0); setEnergy(3); setSymptoms([]); setNotes('');
  };

  const chartData = useMemo(() => {
    const sorted = [...logs].sort((a, b) => a.week - b.week);
    return sorted.map((l) => ({ week: `W${l.week}`, weight: l.unit === 'kg' ? +(l.weight * 2.20462).toFixed(1) : l.weight }));
  }, [logs]);

  return (
    <div className="space-y-3 fade-in">
      <Card>
        <p className="mb-3 text-sm font-bold">This week's check-in 💛</p>
        <div className="space-y-3">
          <Field label="Weight">
            <div className="flex gap-2">
              <input type="number" aria-label="Weight" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0"
                className="flex-1 rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
              <div className="flex rounded-full bg-cream p-1 text-xs font-bold">
                <button aria-label="Use lbs" onClick={() => setUnit('lbs')} className={`rounded-full px-3 py-1 ${unit === 'lbs' ? 'bg-blush text-white' : 'text-charcoal/60'}`}>lbs</button>
                <button aria-label="Use kg" onClick={() => setUnit('kg')} className={`rounded-full px-3 py-1 ${unit === 'kg' ? 'bg-blush text-white' : 'text-charcoal/60'}`}>kg</button>
              </div>
            </div>
          </Field>
          <Field label="Mood">
            <div className="flex gap-2">
              {MOOD_EMOJIS.map((e, i) => (
                <button key={i} aria-label={MOOD_LABELS[i]} onClick={() => setMood(i)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${mood === i ? 'bg-blush text-white shadow-soft' : 'bg-cream'}`}>{e}</button>
              ))}
            </div>
          </Field>
          <Field label="Energy">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} aria-label={`Energy ${n}`} onClick={() => setEnergy(n)}>
                  <Star className={`h-7 w-7 ${n <= energy ? 'fill-blush text-blush' : 'text-charcoal/20'}`} />
                </button>
              ))}
            </div>
          </Field>
          <Field label="Symptoms">
            <div className="flex flex-wrap gap-2">
              {SYMPTOM_OPTIONS.map((s) => (
                <button key={s} aria-label={`Toggle ${s}`} onClick={() => toggleSym(s)}
                  className={`rounded-full border px-3 py-1 text-xs transition ${symptoms.includes(s) ? 'border-blush bg-blush text-white' : 'border-charcoal/15 bg-white text-charcoal/70'}`}>
                  {s}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Notes">
            <textarea rows={2} aria-label="Health notes" value={notes} onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
          </Field>
          <button onClick={submit} disabled={!weight}
            className="w-full rounded-full bg-blush py-2.5 text-sm font-bold text-white shadow-soft disabled:opacity-50">
            Save check-in
          </button>
        </div>
      </Card>

      <Card>
        <div className="mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-lavender" />
          <p className="text-sm font-bold">Weight trend</p>
        </div>
        {chartData.length > 0 ? (
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE2DA" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }} />
                <Line type="monotone" dataKey="weight" stroke="#F4B8C1" strokeWidth={3} dot={{ fill: '#C4B5D4', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <EmptyState emoji="📈" text="Log a check-in to see your trend." />
        )}
      </Card>

      <div className="space-y-2">
        <p className="px-1 text-xs font-bold uppercase tracking-wider text-charcoal/60">History</p>
        {logs.length === 0 && <EmptyState emoji="📓" text="No check-ins yet — log your first above." />}
        {logs.map((l) => <HealthLogCard key={l.id} log={l} onDelete={() => setLogs(logs.filter((x) => x.id !== l.id))} />)}
      </div>
    </div>
  );
}

function HealthLogCard({ log, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between" aria-label="Toggle log details">
        <div className="flex items-center gap-3">
          <span className="text-xl">{MOOD_EMOJIS[log.mood]}</span>
          <div className="text-left">
            <p className="text-sm font-bold">Week {log.week} · {log.weight} {log.unit}</p>
            <p className="text-xs text-charcoal/60">{formatDate(log.date)}</p>
          </div>
        </div>
        {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>
      {open && (
        <div className="mt-3 space-y-2 border-t border-cream pt-3">
          <p className="text-xs">Energy: {'⭐'.repeat(log.energy)}</p>
          {log.symptoms.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {log.symptoms.map((s) => <span key={s} className="rounded-full bg-cream px-2 py-0.5 text-[11px]">{s}</span>)}
            </div>
          )}
          {log.notes && <p className="text-xs text-charcoal/70">{log.notes}</p>}
          <button onClick={onDelete} className="flex items-center gap-1 text-xs text-charcoal/50 hover:text-blush">
            <Trash2 className="h-3 w-3" /> Remove
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   BABY TAB (Budget + Names + Hospital Bag)
   ============================================================ */

function BabyTab({ budget, setBudget, names, setNames, bag, setBag }) {
  const [subTab, setSubTab] = useState('budget');

  return (
    <div className="px-5 pt-7">
      <SectionHeader icon={<Baby className="h-5 w-5 text-blush" />} title="For Baby" sub="Budget, names & the hospital bag" />
      <div className="mb-4 flex gap-1 rounded-full bg-white p-1 shadow-soft">
        <SubTabButton active={subTab === 'budget'} onClick={() => setSubTab('budget')} label="Budget" />
        <SubTabButton active={subTab === 'names'} onClick={() => setSubTab('names')} label="Names" />
        <SubTabButton active={subTab === 'bag'} onClick={() => setSubTab('bag')} label="Bag" />
      </div>
      {subTab === 'budget' && <BudgetView budget={budget} setBudget={setBudget} />}
      {subTab === 'names' && <NamesView names={names} setNames={setNames} />}
      {subTab === 'bag' && <BagView bag={bag} setBag={setBag} />}
    </div>
  );
}

function BudgetView({ budget, setBudget }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);
  const [editingTotal, setEditingTotal] = useState(false);
  const [draftTotal, setDraftTotal] = useState(budget.total);

  const totalEst = budget.items.reduce((s, i) => s + Number(i.estimated || 0), 0);
  const totalSpent = budget.items.reduce((s, i) => s + Number(i.actual || 0), 0);

  const byCategory = useMemo(() => {
    const map = {};
    BUDGET_CATEGORIES.forEach((c) => { map[c] = { estimated: 0, actual: 0 }; });
    budget.items.forEach((i) => {
      map[i.category].estimated += Number(i.estimated || 0);
      map[i.category].actual += Number(i.actual || 0);
    });
    return map;
  }, [budget.items]);

  const save = (item) => {
    if (item.id) setBudget({ ...budget, items: budget.items.map((b) => b.id === item.id ? item : b) });
    else setBudget({ ...budget, items: [...budget.items, { ...item, id: uid() }] });
    setEditing(null); setAdding(false);
  };

  return (
    <div className="space-y-3 fade-in">
      <Card className="bg-gradient-to-br from-blush-soft via-white to-lavender-soft">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-charcoal/60">Total budget</p>
            {editingTotal ? (
              <div className="mt-1 flex items-center gap-2">
                <input type="number" aria-label="Total budget" value={draftTotal} onChange={(e) => setDraftTotal(e.target.value)}
                  className="w-28 rounded-xl border border-charcoal/10 bg-white px-3 py-1.5 text-sm" />
                <button onClick={() => { setBudget({ ...budget, total: Number(draftTotal) || 0 }); setEditingTotal(false); }}
                  aria-label="Save total" className="rounded-full bg-sage p-1.5 text-white"><Check className="h-4 w-4" /></button>
                <button onClick={() => { setDraftTotal(budget.total); setEditingTotal(false); }} aria-label="Cancel"
                  className="rounded-full bg-white p-1.5 text-charcoal/60"><X className="h-4 w-4" /></button>
              </div>
            ) : (
              <button onClick={() => setEditingTotal(true)} className="mt-1 flex items-center gap-2 text-2xl font-bold" aria-label="Edit total budget">
                ${budget.total.toLocaleString()} <Pencil className="h-4 w-4 text-charcoal/40" />
              </button>
            )}
          </div>
          <Wallet className="h-8 w-8 text-blush" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-center">
          <div className="rounded-xl bg-white/70 p-2">
            <p className="text-[10px] uppercase tracking-wider text-charcoal/60">Estimated</p>
            <p className="text-sm font-bold">${totalEst.toLocaleString()}</p>
          </div>
          <div className="rounded-xl bg-white/70 p-2">
            <p className="text-[10px] uppercase tracking-wider text-charcoal/60">Spent</p>
            <p className="text-sm font-bold">${totalSpent.toLocaleString()}</p>
          </div>
        </div>
      </Card>

      <Card>
        <p className="mb-3 text-sm font-bold">By category</p>
        <div className="space-y-2">
          {BUDGET_CATEGORIES.map((c) => {
            const { estimated, actual } = byCategory[c];
            if (estimated === 0 && actual === 0) return null;
            const pct = Math.min(100, (actual / Math.max(1, estimated)) * 100);
            return (
              <div key={c}>
                <div className="flex items-baseline justify-between text-xs">
                  <span className="font-bold">{c}</span>
                  <span className="text-charcoal/60">${actual} / ${estimated}</span>
                </div>
                <ProgressBar value={pct} />
              </div>
            );
          })}
        </div>
      </Card>

      <button onClick={() => { setAdding(true); setEditing({ name: '', category: 'Nursery', estimated: '', actual: '', purchased: false }); }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-blush py-3 text-sm font-bold text-white shadow-soft"
        aria-label="Add budget item">
        <Plus className="h-4 w-4" /> Add item
      </button>

      {(adding || editing) && <BudgetEditor item={editing} onSave={save} onCancel={() => { setAdding(false); setEditing(null); }} />}

      <div className="space-y-2">
        {budget.items.map((i) => (
          <BudgetItemCard key={i.id} item={i}
            onEdit={() => setEditing(i)}
            onTogglePurchased={() => setBudget({ ...budget, items: budget.items.map((b) => b.id === i.id ? { ...b, purchased: !b.purchased } : b) })}
            onDelete={() => setBudget({ ...budget, items: budget.items.filter((b) => b.id !== i.id) })}
          />
        ))}
        {budget.items.length === 0 && <EmptyState emoji="🛍️" text="No items yet — add your first to start tracking." />}
      </div>
    </div>
  );
}

function BudgetItemCard({ item, onEdit, onTogglePurchased, onDelete }) {
  return (
    <div className={`rounded-2xl bg-white p-4 shadow-soft transition ${item.purchased ? '' : 'opacity-60'}`}>
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-lavender-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-lavender">{item.category}</span>
            {item.purchased && <span className="rounded-full bg-sage-soft px-2 py-0.5 text-[10px] font-bold text-sage">✓ Bought</span>}
          </div>
          <p className="mt-1 font-bold">{item.name}</p>
          <p className="text-xs text-charcoal/60">Est ${item.estimated || 0} · Spent ${item.actual || 0}</p>
        </div>
        <div className="flex gap-1">
          <IconButton ariaLabel="Toggle purchased" onClick={onTogglePurchased}>
            <Check className={`h-4 w-4 ${item.purchased ? 'text-sage' : 'text-charcoal/40'}`} />
          </IconButton>
          <IconButton ariaLabel="Edit item" onClick={onEdit}><Pencil className="h-4 w-4" /></IconButton>
          <IconButton ariaLabel="Delete item" onClick={onDelete}><Trash2 className="h-4 w-4" /></IconButton>
        </div>
      </div>
    </div>
  );
}

function BudgetEditor({ item, onSave, onCancel }) {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [estimated, setEstimated] = useState(item.estimated);
  const [actual, setActual] = useState(item.actual);
  const [purchased, setPurchased] = useState(item.purchased);

  return (
    <div className="scale-in rounded-2xl bg-white p-5 shadow-soft">
      <p className="mb-3 text-sm font-bold">{item.id ? 'Edit item' : 'New item'}</p>
      <div className="space-y-3">
        <Field label="Item name">
          <input type="text" aria-label="Item name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <Field label="Category">
          <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40">
            {BUDGET_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Estimated $">
            <input type="number" aria-label="Estimated cost" value={estimated} onChange={(e) => setEstimated(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
          </Field>
          <Field label="Actual $">
            <input type="number" aria-label="Actual cost" value={actual} onChange={(e) => setActual(e.target.value)}
              className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
          </Field>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" aria-label="Purchased" checked={purchased} onChange={(e) => setPurchased(e.target.checked)}
            className="h-4 w-4 rounded border-charcoal/30 accent-sage" />
          Purchased
        </label>
        <div className="flex gap-2">
          <button onClick={() => onSave({ id: item.id, name, category, estimated: Number(estimated) || 0, actual: Number(actual) || 0, purchased })}
            className="flex-1 rounded-full bg-sage py-2 text-sm font-bold text-white">Save</button>
          <button onClick={onCancel} className="rounded-full bg-cream px-4 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   NAMES
   ============================================================ */

function NamesView({ names, setNames }) {
  const [filter, setFilter] = useState('All');
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const filtered = names
    .filter((n) => filter === 'All' || n.gender === filter)
    .sort((a, b) => (b.favorite ? 1 : 0) - (a.favorite ? 1 : 0));

  const save = (n) => {
    if (n.id) setNames(names.map((x) => x.id === n.id ? n : x));
    else setNames([...names, { ...n, id: uid() }]);
    setEditing(null); setAdding(false);
  };

  return (
    <div className="space-y-3 fade-in">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {['All', 'Girl', 'Boy', 'Neutral'].map((g) => (
          <button key={g} aria-label={`Filter ${g}`} onClick={() => setFilter(g)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${filter === g ? 'bg-blush text-white shadow-soft' : 'bg-white text-charcoal/60'}`}>
            {g}
          </button>
        ))}
      </div>

      <button onClick={() => { setAdding(true); setEditing({ name: '', gender: 'Girl', meaning: '', notes: '', favorite: false }); }}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-lavender py-3 text-sm font-bold text-white shadow-soft"
        aria-label="Add name">
        <Plus className="h-4 w-4" /> Add a name
      </button>

      {(adding || editing) && <NameEditor item={editing} onSave={save} onCancel={() => { setAdding(false); setEditing(null); }} />}

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((n) => (
          <div key={n.id} className="rounded-2xl bg-white p-4 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="min-w-0 flex-1">
                {n.favorite && <Sparkles className="mb-1 h-4 w-4 text-blush" />}
                <p className="truncate font-bold">{n.name}</p>
                <GenderPill gender={n.gender} />
              </div>
              <button onClick={() => setNames(names.map((x) => x.id === n.id ? { ...x, favorite: !x.favorite } : x))}
                aria-label="Toggle favorite" className="shrink-0">
                <Heart className={`h-5 w-5 ${n.favorite ? 'fill-blush text-blush' : 'text-charcoal/30'}`} />
              </button>
            </div>
            {n.meaning && <p className="mt-2 line-clamp-2 text-xs italic text-charcoal/60">"{n.meaning}"</p>}
            {n.notes && <p className="mt-1 line-clamp-2 text-xs text-charcoal/70">{n.notes}</p>}
            <div className="mt-2 flex gap-1">
              <IconButton ariaLabel="Edit name" onClick={() => setEditing(n)}><Pencil className="h-3.5 w-3.5" /></IconButton>
              <IconButton ariaLabel="Delete name" onClick={() => setNames(names.filter((x) => x.id !== n.id))}><Trash2 className="h-3.5 w-3.5" /></IconButton>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && <EmptyState emoji="👶" text="No names here yet — add one above ✨" />}
    </div>
  );
}

function GenderPill({ gender }) {
  const cls =
    gender === 'Girl' ? 'bg-blush-soft text-blush' :
    gender === 'Boy' ? 'bg-lavender-soft text-lavender' :
    'bg-sage-soft text-sage';
  return <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${cls}`}>{gender}</span>;
}

function NameEditor({ item, onSave, onCancel }) {
  const [name, setName] = useState(item.name);
  const [gender, setGender] = useState(item.gender);
  const [meaning, setMeaning] = useState(item.meaning);
  const [notes, setNotes] = useState(item.notes);
  const [favorite, setFavorite] = useState(item.favorite);

  return (
    <div className="scale-in rounded-2xl bg-white p-5 shadow-soft">
      <p className="mb-3 text-sm font-bold">{item.id ? 'Edit name' : 'New name'}</p>
      <div className="space-y-3">
        <Field label="Name">
          <input type="text" aria-label="Name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <Field label="Gender">
          <div className="flex gap-2">
            {['Girl', 'Boy', 'Neutral'].map((g) => (
              <button key={g} aria-label={`Set gender ${g}`} onClick={() => setGender(g)}
                className={`flex-1 rounded-full px-3 py-2 text-xs font-bold ${gender === g ? 'bg-blush text-white shadow-soft' : 'bg-cream text-charcoal/70'}`}>
                {g}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Meaning (optional)">
          <input type="text" aria-label="Meaning" value={meaning} onChange={(e) => setMeaning(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <Field label="Notes (optional)">
          <textarea rows={2} aria-label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" aria-label="Favorite" checked={favorite} onChange={(e) => setFavorite(e.target.checked)} className="h-4 w-4 accent-blush" />
          Favorite ✨
        </label>
        <div className="flex gap-2">
          <button onClick={() => onSave({ id: item.id, name, gender, meaning, notes, favorite })}
            className="flex-1 rounded-full bg-sage py-2 text-sm font-bold text-white">Save</button>
          <button onClick={onCancel} className="rounded-full bg-cream px-4 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   HOSPITAL BAG
   ============================================================ */

function BagView({ bag, setBag }) {
  const [newItems, setNewItems] = useState({ Mama: '', Baby: '', Documents: '' });

  const sections = ['Mama', 'Baby', 'Documents'];
  const packed = bag.filter((b) => b.packed).length;
  const pct = (packed / bag.length) * 100;

  const toggle = (id) => setBag(bag.map((b) => b.id === id ? { ...b, packed: !b.packed } : b));
  const updateNote = (id, note) => setBag(bag.map((b) => b.id === id ? { ...b, note } : b));
  const remove = (id) => setBag(bag.filter((b) => b.id !== id));
  const addItem = (section) => {
    if (!newItems[section].trim()) return;
    setBag([...bag, { id: uid(), section, name: newItems[section].trim(), packed: false, note: '' }]);
    setNewItems({ ...newItems, [section]: '' });
  };

  return (
    <div className="space-y-4 fade-in">
      <Card className="bg-gradient-to-br from-lavender-soft via-white to-blush-soft">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/70">
            <Briefcase className="h-6 w-6 text-lavender" />
          </div>
          <div className="flex-1">
            <p className="text-xs uppercase tracking-wider text-charcoal/60">Hospital bag</p>
            <p className="text-lg font-bold">{packed} of {bag.length} items packed 🧳</p>
            <div className="mt-2"><ProgressBar value={pct} /></div>
          </div>
        </div>
      </Card>

      {sections.map((section) => (
        <Card key={section}>
          <p className="mb-3 text-sm font-bold">For {section}</p>
          <div className="space-y-2">
            {bag.filter((b) => b.section === section).map((b) => (
              <BagItem key={b.id} item={b} onToggle={() => toggle(b.id)} onNote={(n) => updateNote(b.id, n)} onRemove={() => remove(b.id)} />
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input type="text" aria-label={`Add to ${section}`} value={newItems[section]}
              onChange={(e) => setNewItems({ ...newItems, [section]: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && addItem(section)}
              placeholder={`Add to ${section.toLowerCase()}…`}
              className="flex-1 rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
            <button onClick={() => addItem(section)} aria-label={`Add ${section} item`}
              className="rounded-full bg-blush px-3 text-white">
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
}

function BagItem({ item, onToggle, onNote, onRemove }) {
  const [editing, setEditing] = useState(false);
  return (
    <div className="rounded-xl bg-cream p-3">
      <div className="flex items-center gap-3">
        <button onClick={onToggle} aria-label={`Mark ${item.name}`}
          className={`flex h-6 w-6 items-center justify-center rounded-md border transition ${item.packed ? 'border-sage bg-sage text-white' : 'border-charcoal/20 bg-white'}`}>
          {item.packed && <Check className="h-4 w-4" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className={`text-sm ${item.packed ? 'text-charcoal/50 line-through' : ''}`}>{item.name}</p>
          {item.note && !editing && <p className="text-xs italic text-charcoal/50">{item.note}</p>}
        </div>
        <button onClick={() => setEditing(!editing)} aria-label="Add note" className="text-charcoal/40 hover:text-blush">
          <Pencil className="h-3.5 w-3.5" />
        </button>
        <button onClick={onRemove} aria-label="Remove item" className="text-charcoal/40 hover:text-blush">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
      {editing && (
        <input type="text" aria-label="Item note" value={item.note} onChange={(e) => onNote(e.target.value)}
          onBlur={() => setEditing(false)} placeholder="Optional note…"
          className="mt-2 w-full rounded-lg border border-charcoal/10 bg-white px-2 py-1 text-xs outline-none focus:border-lavender" autoFocus />
      )}
    </div>
  );
}

/* ============================================================
   BABY SHOWER
   ============================================================ */

function ShowerTab({ guests, setGuests }) {
  const [editing, setEditing] = useState(null);
  const [adding, setAdding] = useState(false);

  const counts = useMemo(() => ({
    total: guests.length,
    yes: guests.filter((g) => g.rsvp === 'Yes').length,
    no: guests.filter((g) => g.rsvp === 'No').length,
    pending: guests.filter((g) => g.rsvp === 'Pending').length,
  }), [guests]);

  const save = (g) => {
    if (g.id) setGuests(guests.map((x) => x.id === g.id ? g : x));
    else setGuests([...guests, { ...g, id: uid() }]);
    setEditing(null); setAdding(false);
  };

  return (
    <div className="px-5 pt-7">
      <SectionHeader icon={<PartyPopper className="h-5 w-5 text-blush" />} title="Baby Shower" sub="Plan a celebration to remember 🎉" />

      <div className="mb-4 grid grid-cols-4 gap-2">
        <Stat label="Invited" value={counts.total} tone="lavender" />
        <Stat label="Yes" value={counts.yes} tone="sage" />
        <Stat label="No" value={counts.no} tone="blush" />
        <Stat label="Pending" value={counts.pending} tone="cream" />
      </div>

      <button onClick={() => { setAdding(true); setEditing({ name: '', rsvp: 'Pending', dietary: '', gift: '', thankYouSent: false }); }}
        className="mb-3 flex w-full items-center justify-center gap-2 rounded-full bg-blush py-3 text-sm font-bold text-white shadow-soft"
        aria-label="Add guest">
        <Plus className="h-4 w-4" /> Add guest
      </button>

      {(adding || editing) && <GuestEditor guest={editing} onSave={save} onCancel={() => { setAdding(false); setEditing(null); }} />}

      <div className="space-y-2">
        {guests.map((g) => (
          <GuestCard key={g.id} guest={g}
            onEdit={() => setEditing(g)}
            onToggleThanks={() => setGuests(guests.map((x) => x.id === g.id ? { ...x, thankYouSent: !x.thankYouSent } : x))}
            onDelete={() => setGuests(guests.filter((x) => x.id !== g.id))}
          />
        ))}
        {guests.length === 0 && <EmptyState emoji="💌" text="No guests yet — start your list above!" />}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }) {
  const cls =
    tone === 'lavender' ? 'bg-lavender-soft text-lavender' :
    tone === 'sage' ? 'bg-sage-soft text-sage' :
    tone === 'blush' ? 'bg-blush-soft text-blush' :
    'bg-cream text-charcoal/70';
  return (
    <div className={`rounded-2xl p-3 text-center ${cls}`}>
      <p className="text-xl font-bold">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">{label}</p>
    </div>
  );
}

function GuestCard({ guest, onEdit, onToggleThanks, onDelete }) {
  const rsvpCls =
    guest.rsvp === 'Yes' ? 'bg-sage-soft text-sage' :
    guest.rsvp === 'No' ? 'bg-blush-soft text-blush' :
    'bg-lavender-soft text-lavender';
  return (
    <div className="rounded-2xl bg-white p-4 shadow-soft">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-bold">{guest.name}</p>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${rsvpCls}`}>{guest.rsvp}</span>
          </div>
          {guest.dietary && <p className="mt-1 text-xs text-charcoal/60">🍽️ {guest.dietary}</p>}
          {guest.rsvp === 'Yes' && guest.gift && (
            <p className="mt-1 flex items-center gap-1 text-xs text-charcoal/70">
              <Gift className="h-3 w-3 text-blush" /> {guest.gift}
            </p>
          )}
          {guest.rsvp === 'Yes' && guest.gift && (
            <label className="mt-2 flex items-center gap-2 text-xs">
              <input type="checkbox" aria-label="Thank you sent" checked={guest.thankYouSent} onChange={onToggleThanks}
                className="h-3.5 w-3.5 accent-sage" />
              Thank you sent
            </label>
          )}
        </div>
        <div className="flex gap-1">
          <IconButton ariaLabel="Edit guest" onClick={onEdit}><Pencil className="h-4 w-4" /></IconButton>
          <IconButton ariaLabel="Delete guest" onClick={onDelete}><Trash2 className="h-4 w-4" /></IconButton>
        </div>
      </div>
    </div>
  );
}

function GuestEditor({ guest, onSave, onCancel }) {
  const [name, setName] = useState(guest.name);
  const [rsvp, setRsvp] = useState(guest.rsvp);
  const [dietary, setDietary] = useState(guest.dietary);
  const [gift, setGift] = useState(guest.gift);
  const [thankYouSent, setThankYouSent] = useState(guest.thankYouSent);

  return (
    <div className="scale-in mb-3 rounded-2xl bg-white p-5 shadow-soft">
      <p className="mb-3 text-sm font-bold">{guest.id ? 'Edit guest' : 'New guest'}</p>
      <div className="space-y-3">
        <Field label="Name">
          <input type="text" aria-label="Guest name" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        <Field label="RSVP">
          <select aria-label="RSVP" value={rsvp} onChange={(e) => setRsvp(e.target.value)}
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40">
            <option>Pending</option><option>Yes</option><option>No</option>
          </select>
        </Field>
        <Field label="Dietary notes">
          <input type="text" aria-label="Dietary" value={dietary} onChange={(e) => setDietary(e.target.value)}
            placeholder="Allergies, preferences…"
            className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
        </Field>
        {rsvp === 'Yes' && (
          <>
            <Field label="Gift received">
              <input type="text" aria-label="Gift" value={gift} onChange={(e) => setGift(e.target.value)} placeholder="e.g. Diaper bag"
                className="w-full rounded-xl border border-charcoal/10 bg-cream px-3 py-2 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/40" />
            </Field>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" aria-label="Thank you sent" checked={thankYouSent} onChange={(e) => setThankYouSent(e.target.checked)} className="h-4 w-4 accent-sage" />
              Thank you note sent
            </label>
          </>
        )}
        <div className="flex gap-2">
          <button onClick={() => onSave({ id: guest.id, name, rsvp, dietary, gift, thankYouSent })}
            className="flex-1 rounded-full bg-sage py-2 text-sm font-bold text-white">Save</button>
          <button onClick={onCancel} className="rounded-full bg-cream px-4 py-2 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   SHARED UI
   ============================================================ */

function Card({ children, className = '', onClick }) {
  return (
    <div onClick={onClick} className={`rounded-2xl bg-white p-5 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-charcoal/70">{label}</span>
      {children}
    </label>
  );
}

function ProgressBar({ value }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-cream">
      <div
        className="h-full rounded-full bg-gradient-to-r from-blush to-lavender transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function TrimesterBadge({ trimester }) {
  const cls =
    trimester === 1 ? 'bg-lavender-soft text-lavender' :
    trimester === 2 ? 'bg-sage-soft text-sage' :
    'bg-blush-soft text-blush';
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${cls}`}>
      {trimesterLabel(trimester)}
    </span>
  );
}

function IconButton({ children, onClick, ariaLabel }) {
  return (
    <button onClick={onClick} aria-label={ariaLabel}
      className="flex h-8 w-8 items-center justify-center rounded-full text-charcoal/50 transition hover:bg-cream hover:text-blush">
      {children}
    </button>
  );
}

function EmptyState({ emoji, text }) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-soft">
      <p className="text-3xl">{emoji}</p>
      <p className="mt-2 text-sm text-charcoal/60">{text}</p>
    </div>
  );
}

function SectionHeader({ icon, title, sub }) {
  return (
    <header className="mb-5">
      <div className="flex items-center gap-2">
        {icon}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <p className="mt-1 text-xs text-charcoal/60">{sub}</p>
    </header>
  );
}

function SubTabButton({ active, onClick, label }) {
  return (
    <button onClick={onClick} aria-label={label}
      className={`flex-1 rounded-full px-3 py-2 text-xs font-bold transition ${active ? 'bg-blush text-white shadow-soft' : 'text-charcoal/60'}`}>
      {label}
    </button>
  );
}

/* ============================================================
   BOTTOM NAV
   ============================================================ */

function BottomNav({ tab, setTab }) {
  const items = [
    { key: 'home', label: 'Home', Icon: Home },
    { key: 'journey', label: 'Journey', Icon: Calendar },
    { key: 'health', label: 'Health', Icon: Stethoscope },
    { key: 'baby', label: 'Baby', Icon: Baby },
    { key: 'shower', label: 'Shower', Icon: PartyPopper },
  ];
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex justify-center">
      <div className="mx-auto w-full max-w-lg">
        <div className="m-3 flex items-stretch justify-around rounded-full bg-white px-2 py-2 shadow-soft ring-1 ring-charcoal/5">
          {items.map(({ key, label, Icon }) => {
            const active = tab === key;
            return (
              <button key={key} onClick={() => setTab(key)} aria-label={label}
                className="relative flex flex-1 flex-col items-center gap-0.5 py-1">
                <Icon className={`h-5 w-5 transition ${active ? 'text-blush' : 'text-charcoal/50'}`}
                  fill={active ? 'currentColor' : 'none'} strokeWidth={active ? 2.2 : 2} />
                <span className={`text-[10px] font-bold ${active ? 'text-blush' : 'text-charcoal/50'}`}>{label}</span>
                {active && <span className="absolute -bottom-0.5 h-0.5 w-6 rounded-full bg-blush" />}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
