import purpleBestDressed from '../assets/images/purple_best_dressed_1790757132180.jpg';
import detectivesBestDressed from '../assets/images/detectives_best_dressed_1790757146372.jpg';

export interface Suspect {
  id: string;
  name: string;
  codename: string;
  role: string;
  tag: string;
  statusColor: string;
  attire: string;
  alibi: string;
  motive: string;
  flaw?: string;
  background?: string;
  characterDescription?: string;
  classification: string;
  stamp: string;
  thumbImg: string;
  fullImg: string;
  mugshotImg?: string;
  fingerprintLabel: string;
  clues: string[];
  interrogationAudioSummary: string;
  birthdate?: string;
  horoscope?: string;
  mbti?: string;
}

export interface RoomInfo {
  id: string;
  name: string;
  shortName?: string;
  floor: 'First Floor' | 'Second Floor';
  summary?: string;
  description: string;
  suspectsLinked: string;
  evidenceFound?: string;
  accessPassage: string;
  clueRating: 'CRITICAL' | 'EVIDENCE' | 'CORRIDOR';
}

export interface SyndicateRoundScores {
  operation1: number;
  operation2: number;
  finalDeduction: number;
  total: number;
}

export interface SyndicateTeam {
  name: string;
  colorName: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  members: string[];
  score: number;
  rank: number;
  highlight: string;
  rounds?: SyndicateRoundScores;
}

export interface PhotoItem {
  id: string;
  title: string;
  category: 'Teams' | 'Investigation' | 'Forensic' | 'Gala';
  caption: string;
  date: string;
  url: string;
  tags: string[];
}

export interface VideoChapter {
  id: string;
  title: string;
  duration: string;
  timestamp: string;
  description: string;
  thumbnail: string;
}

export interface ForensicResult {
  id: string;
  filename: string;
  title: string;
  roomName: string;
  category: string;
  description: string;
  suspectLinked?: string;
  logoType:
    | 'shears'
    | 'teabag'
    | 'autopsy'
    | 'powder'
    | 'wine'
    | 'spilled_wine'
    | 'vase'
    | 'health_report'
    | 'knife'
    | 'pills'
    | 'teacup'
    | 'vial'
    | 'water';
  initialImageUrl?: string;
}

export const MANOR_LOGOS = {
  main: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKUuRm5icsz_XWnhTJDVXSafev5FvFZHadBwICipO6nkw-64_AJq0t7FR14XL9MPRz7nLy9p5oukJTgtyLK1csdOULXYWuFItU93I3nan1GTxz83yl68fLGtIMbD5ChqSHLEaRP48E37HPYu7dTcMgWKDi3qDsf3UdEdgCCDX5JWRAvMIpnDf1JUIUxl8H0257w8ORhoIr76reQAynjKL_AXgkqvazi_n2fXe5xcZsYppZR-m9Nj30-6DoIe4S9mk",
  schedule: "https://lh3.googleusercontent.com/aida-public/AB6AXuClPJx5iyvtbcwiRZP-C0h_Bd1TX82MMF6XNE3tJnSYJ3g1FHWtRxjK5hC-Drn9XaUSC5U_uv37m7qI4h6avKyH3yTks-vD_xQonlaEzmvjk2BNxpTxfghhrGKfl3K9lKmUMD0v6wboXo8lsh8wmSHp3hJ5-jzG5GHMRPhAA3T7LlwjZotx-E2H8bZJtuMVCwKS1fV8DYgJ1K9oNQbKyG6teEGC-W9hCBOksuqcgbXTHSWjWu2rzzw2zGIwzrRPmyY",
  blueprint: "https://i.imgur.com/gAsGad2.jpeg",
  teamAssignmentChart: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn-zZKbHFpcIlWzszb9uvPUAbWWvF-Y4IMJiT7MekKaWXXuAUOxp-mAedh_tHV3aft8WvY9GDv_f62is5EL_Dao8d9wckUTtVmpQUmoj4pAoMJe78YQM55G-b01sc5cHmL9WJXsXK9ZrI4211CEHLK2VatoNdjtqN957BBaXdA4Sw0VZBsNAis4XFQ-Op7Lc28rEz2j8Fvv4JqofukAgXfDeebV1Dk1_phSfD7fOytBXNOHj1o5LJyFxX0uoTnAjI"
};

export const DR_ESTHER: Suspect = {
  id: 'esther',
  name: "Dr. Esther",
  codename: "The Forensic Mind",
  role: "Lead Pathologist & Chemical Analyst",
  tag: "EXAMINER",
  statusColor: "text-cyan-900 bg-cyan-100 border-cyan-400 font-bold",
  attire: "White lab coat, yellow collared shirt, blue nitrile examination gloves holding reagent tube, forensic ID badge.",
  alibi: '"Arrived with the emergency constabulary team at 08:45 AM to secure the body and evidence."',
  motive: "None. Dedicated forensic investigator upholding scientific truth.",
  flaw: "Conducted chemical spectrography proving Foxglove/Digoxin poison and cranial impact sequence.",
  classification: "DR. ESTHER • CHIEF EXAMINER",
  stamp: "EXAMINER",
  thumbImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmHUpYE2Ifq7jWyuNuYbSGGe4wMffmw-MeckdLIExEIMLicW_ql9P0F8T5ED1yurd1W9EmmLrUKdv_NRz-5SfIYcOcfSfGGVxiYgwEzX24AbC06kIyB5YnsDqTFBlRGXeWYrF4uhfnTMGVcWS363QKid74Sg10nN7faAws9C8NdTq-DeGhYbjcEnfhYu-irqscXrEZg5Ri6eN9cNdbXuVuMMWMiTsd-AlpJUCWz6AvVZyLYX6xkXZoCDhf39F5ukI",
  fullImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUSaKYHiO9O5N58RGO2vOm7J6kF8bsYYy4MLFwLOSbzyso4-z83HqfOQ725-yq0sxgaOpslGAYBCZ4R09-IM3cubQgi1WJ0pvPpH9aIErNbMlvlSCcies5h9c--1E_q0wVaWUgOxPf38vBP5SRm8pKLBCF1f44so5LHyztuvzzdfgpt9I3ZqsQa5j-cVWaVKxSyJCAQG31Sux9a0BUKDkwRNosEOST5VPLMq3pqYgSj7Ypx3Gbx9PJD8gd-NBjlu4",
  fingerprintLabel: "CERTIFIED OFFICIAL BADGE #402",
  clues: ["Centrifuge test tube: 98% Digoxin concentration", "Latent fingerprint lift sheets", "Time of death calculation: 08:28 AM ± 3 mins"],
  interrogationAudioSummary: "'The dual-vector assassination was almost foolproof—had the detectives not cross-referenced the tea residue with the bat cranial fracture.'",
  birthdate: "19 February 1894",
  horoscope: "Aquarius ♒",
  mbti: "INTP"
};

export const SIR_WHITE: Suspect = {
  id: 'white',
  name: "Sir Reginald White",
  codename: "The Grand Patriarch",
  role: "The Victim • Grand Conservator of White Manor",
  tag: "VICTIM",
  statusColor: "text-amber-800 bg-amber-100 border-amber-300",
  attire: "Pristine white bespoke suit, black silk waistcoat, silver tie, holding a goblet of vintage burgundy wine.",
  alibi: '"Host of the convocation; retreated to the private study at 8:15 AM to inspect estate shipping manifests."',
  motive: "Threatened to expose Lord Emerald's contraband syndicate and disinherit nephew Cerulean due to runaway gambling.",
  flaw: "Blood toxicology verified lethal Foxglove heart failure accelerated by blunt occipital trauma from behind.",
  classification: "DECEASED VICTIM (PRONOUNCED 08:30 AM)",
  stamp: "VICTIM",
  thumbImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjcjEVxpHpNgXzsP1XzWSr0shGRDV3gUwymEcORy5cj_qneBBr2ybYwcrhRp7E6Hd3HwnGjOgt-toNi89umq_8bsSXd7HMQa6e9LRlQAqX8pDcHyrm_lg6n7YgvaYXTWKgjPjT-IseDUL9vzjye5LdC1x3s7sm-wVe8_uMUInqUCOBPWNSo2Sr59LzngB-uqYSw3uLZV8rnvo1uGY9CDq3llJbfpjmdGXbvbpKJbfsdRZaHkVI0E7bUwrfCdDGqbA",
  fullImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK_F548lJ5Pdxun7ZCZUASvaD1t7-oJWJOvbpkhPYljVjaQIQU3-PjvSqmMIRRHKmBoszFjrVH24orSlRdXmSoi-8v_DNxNyvUmndk_k2VmUpNKVmcjmIC4jmHAmlkQFLWYl-W0rTUhWG-fno5eDYU46RGeRwZlvqgdYmok5s0E9czVxa_BsFqVtUWwjWWYECmqBLpa1gCORPU_vE6k3NqKkxqdm-lw_3wrk1EqE4HWnvFJwVQCK5kuDpjJ3BGhnU",
  fingerprintLabel: "RECORDED POST-MORTEM PRINTS",
  clues: ["Unsealed safe combination slip", "Shattered glass with Foxglove residue", "Handwritten draft disinheriting Cerulean"],
  interrogationAudioSummary: "Sir White's secretary recalled him shouting on the telephone regarding missing Straits shipping ledgers only 20 minutes before roll call.",
  birthdate: "3 September 1881",
  horoscope: "Virgo ♍",
  mbti: "ESTJ"
};

export const SUSPECTS: Record<string, Suspect> = {
  cerulean: {
    id: 'cerulean',
    name: "Master Cerulean",
    codename: "Young Gentleman • Sporting • Hot-tempered",
    role: "Young Gentleman • Sporting • Hot-tempered",
    tag: "MURDERER",
    statusColor: "text-red-900 bg-red-100 border-red-400 font-bold",
    attire: "Navy blue tailored vest, matching trousers, crisp white dress shirt with sleeves rolled up.",
    alibi: '"I was inspecting the grandfather clock downstairs before stepping onto the second floor corridor."',
    background: "The young heir to a respectable family, Master Cerulean has always been known for his sporting talents and competitive nature. Though accustomed to the privileges of life at White Manor, his relationship with Sir White has become increasingly strained, particularly as questions surrounding his future and place within the household begin to emerge.",
    characterDescription: "A young gentleman of ambition and pride, Cerulean is easily frustrated when things do not go his way. Beneath his polished appearance lies a fiery temperament, and his loyalty to those close to him may sometimes cloud his judgment.",
    motive: "Strained relations with Sir White regarding his place in the household, sporting debts, and future inheritance.",
    classification: "CONVICTED PERPETRATOR • MURDERER",
    stamp: "MURDERER",
    thumbImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV1ZoGIf9iZA24-GP0F7EUnzn-iDwHgYTfFqy9cPWPv-D3loz84VC6_-nK8WU49UENTnONlFkua-Dw8G1FK_9Rwiq9VSIzNDyiCUn31zdUw0mmFbNvGsGG8eWcXRh9JMo3c8_-WU80r1Ey6Hbk9ScvzljvqxSEL-IDUzhKsToXva3eEcs_Fym7ppjhAIvCHJPNQN2mMzmgUaYdmogGGz4rVNgwRN9qeLKxaTQJkHK3MV32l_N4tv4Qfme5mQsytds",
    fullImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBdh9VTVOf68_0WDmaMBWt9Z0d5JwIlK1Aqkr3lSDUJ4JK2y7DH6xPofZHpgf-SPVvreCFYufYhCZeHFvcSigDdFcpWAChrNIzTqxLNEl1UoRf4YhDxUoa4bfksMtXB8bKpwzx91lVRsnseM-g_mNfV3uXYjXzxOU5-lANGVcSJ2FiYZF16h747LUqSVVWLsego6EzWM_3ChpsXmSaYEiCfqW6k4cM6Tv0mUmW4sMVGURNoxc6XaWVreLZnMioaMWY",
    mugshotImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7y2CysXekr0Dqk93RGAIb0LBnwr4nJn7p-8OYe9T-AOGrdsv6GB6rNHKj63GX7kUlqIuBllko4vTSDk7XjsSqPjyRcrjmohR1Yaxn5MY57mWZ9lZgQqwUgR4cON_AyXhSFiHznlt2__ejjKEANamLM1KOYnTLOaHF_Uz-eWsluwoyqEGiTyybWxFwTmksgdCyYm2sti3DWORi6yangXoD5a6iyJTJlicYxsjRkIcJUSm9Lv1O_lib95TBILFAJPo",
    fingerprintLabel: "LATENT RIDGE INDEX: WM-CER-04",
    clues: ["Mahogany bat discovered in sports kit", "Club betting receipts & vouchers", "Blue tailored vest cuff fabric sample"],
    interrogationAudioSummary: "Cerulean insisted he merely had an intense exchange with Sir White regarding his future standing and allowances at the manor.",
    birthdate: "14 April 1902",
    horoscope: "Aries ♈",
    mbti: "ESTP"
  },
  scarlet: {
    id: 'scarlet',
    name: "Miss Scarlet",
    codename: "Socialite • Ambitious • Persuasive",
    role: "Socialite • Ambitious • Persuasive",
    tag: "MURDERER",
    statusColor: "text-red-900 bg-red-100 border-red-400 font-bold",
    attire: "Glamorous red silk slit evening gown, diamond necklace, holding a martini cocktail glass.",
    alibi: '"I was mixing refreshments in the dining pantry and greeting arriving syndicate operatives."',
    background: "Scarlet is a charming and striking young woman who has become a familiar presence within White Manor's social circles. Her close association with Sir White has attracted whispers among the household, while her uncertain position and desire for a more secure future have made her ambitions the subject of much speculation.",
    characterDescription: "Confident, persuasive and socially astute, Scarlet knows how to command attention when she enters a room. Behind her graceful exterior lies a fiercely determined woman who is not easily discouraged when she wants something.",
    motive: "Seeking a more secure financial future and social prominence through her connections at White Manor.",
    classification: "CONVICTED PERPETRATOR • MURDERER",
    stamp: "MURDERER",
    thumbImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqa520n-hYFpRuu-PwJkpYF88gwCGb8l2-Jw05ogcqeFI8RFn_7_Gylvm6PeGmnZtrXbc8pLYHblCDD47luFu_oqAmW6NZWCRsCcK2ZccktQicfC4mrViCqv8gWeSXJMWXecSaXdsNsfw8_n5Z4SjRdZ2qjUJt5xs3sB0ODDoe41T9KERk8xEYXW7ocNS9pgQUndkSFfa1jPbDNh9f4KUIyjJqhcuAqCs53eiPf48RWfN62FpUMJzO_hgK8c1rOGo",
    fullImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD6EoE1Lse-kUI7ZMCa0MTLxzyB_E4XfQOBqSMcD4YQ1CYXOVN9YXva_6AInMeUH0qQBmY_fKZX0KMh2t-8E1JX_pI8deP280wGfAJNiLIykjpQULKmxkEpJIElI37JkNA8bjxHRIJQ3ud2uBlEcUt4vnO8z0WW-dHq2LbourGep7Wgv0zDncgelGv6_nOpi5LHalGGKQDmjvhgVjNAvEUMG2x07mKjRG7gPI36tUbONNq9aKbnZ2jQoxY4UYJzEM",
    fingerprintLabel: "PORCELAIN RIDGE INDEX: WM-SCA-02",
    clues: ["Velvet evening purse with dried botanicals", "Pantry porcelain teacup set", "Social correspondence letters"],
    interrogationAudioSummary: "Maintained that she was occupied in the pantry preparing morning refreshments and greeting guests throughout the morning hours.",
    birthdate: "8 November 1901",
    horoscope: "Scorpio ♏",
    mbti: "ENFJ"
  },
  emerald: {
    id: 'emerald',
    name: "Lord Emerald",
    codename: "Industrialist • Businessman • Influential",
    role: "Industrialist • Businessman • Influential",
    tag: "MASTERMIND",
    statusColor: "text-emerald-900 bg-emerald-100 border-emerald-400 font-bold",
    attire: "Deep emerald three-piece suit, black top hat, gold pocket watch chain, walking cane with gold tip.",
    alibi: '"I was taking fresh air on the veranda observing the misty Changi waters."',
    background: "A distinguished businessman and long-standing associate of Sir White, Lord Emerald has built considerable influence through his commercial interests in Singapore. His dealings with Sir White extend beyond friendship, with business arrangements and financial interests tying their fortunes closely together.",
    characterDescription: "Proud, authoritative and accustomed to getting his way, Lord Emerald carries himself with the confidence of a man who has spent decades wielding influence. He is rarely seen without his cane and top hat, and his courteous manner can quickly become cold when his interests are threatened.",
    motive: "Commercial arrangements and financial interests in Singapore tying his fortune closely to Sir White.",
    classification: "INTELLECTUAL MASTERMIND",
    stamp: "MASTERMIND",
    thumbImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCrR9JImKUSuzFLEByaYHqAXds4hiUkQTutKvMWf_BI0R3_UA_FiRYJPa0sqs6byIcm5BPwoyMXFwsDZHbhLNTjWSdz01gPiNdr4oMG52zOmkK-cCWFZU0NuTmTOv6MMiyweWPySfKUosB6tsgAA2TCZz197hDl5fehncvbs-FzpoLprnnYpnmrWpaYoSSPcOw3wpFJH9P_6xFxcQ8HLlvm7LZaKLYvuxfaI85VpHqxYDLEw6rX6pH5v0xpbmq7aJw",
    fullImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp0mtesfvCTtg4TPBl9GIP2XlQX6SmDSauNcy4k6gIzu3q5cOMd-5Oyn6DsdZLgbi07w89pt2ptQzZ_CZ1jpsdShSmB_ugv-I3aIG9fYPo-0QAUA9xRwqpaiL05skChukP0tnFugHhDw0r3tJbg7h8cyXJXd5VIFZ54S860k_xbInL86JOj7uhSFMI8KKXYWGDPBN4tRaztnXJnAG2e1rkaM7Pcw61L0J8n-hCr9WQtEJogVo_RiUZP82NQ7OE8lc",
    fingerprintLabel: "WAX SEAL INDEX: WM-EME-01",
    clues: ["Gold-tipped walking stick", "Straits shipping commercial contract", "Gold pocket watch stopped at 8:28 AM"],
    interrogationAudioSummary: "Affirmed that his commercial investments in Singapore were sound and his association with Sir White strictly professional.",
    birthdate: "12 January 1878",
    horoscope: "Capricorn ♑",
    mbti: "ENTJ"
  },
  amber: {
    id: 'amber',
    name: "Mrs. Amber",
    codename: "Housekeeper • Loyal Servant • Observant",
    role: "Housekeeper • Loyal Servant • Observant",
    tag: "SUSPECT",
    statusColor: "text-amber-900 bg-amber-100 border-amber-400 font-bold",
    attire: "Orange heritage dress, white protective apron with duster, grey hair in neat bun.",
    alibi: '"I was tidying up the linen closet on the second floor and preparing extra beddings."',
    background: "For many years, Mrs. Amber has served as the White household's trusted housekeeper. She has witnessed the family's triumphs, quarrels and secrets from behind the scenes, and knows the manor better than almost anyone—including its hidden corners and private routines.",
    characterDescription: "Quiet, observant and seemingly unassuming, Amber rarely involves herself in the affairs of her employers. Yet years of service have taught her that listening is often more valuable than speaking, and she may know considerably more than she lets on.",
    motive: "Quiet observer and keeper of decades of household secrets, grievances, and private routines.",
    classification: "PERSON OF INTEREST • INQUEST DOSSIER",
    stamp: "SUSPECT",
    thumbImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuAdb4cIv_Gpyf2FDjht2bE29j3uhvoUF8PzpYKEXFZNJN8fqPLKgfamb_K_I6ZTFiYlSu9j5WZRL0o_Ayh7UFdvJMM0Cc6vu6E3Jn9Cs0ppVgMhWGtJ1co70kYcZ4obOwDzaXoIk3n9OsqZfwgStPtQmJ9okqbaeVVurNQRMXVI9-Ww5bhKglmQr6rjE4KQ2tZ-l1_GEG1A4xB7CeOyFDq_WxlUNbFTxAtco6EdOPM-BOfKmiMCM8Fux6YZV_cj-ko",
    fullImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuDr6J7mZlfiqG2E8vR_OwCZZRwCoQdco58_GEJ5L1-7qX6IjIv5Qyql9uLBk_YLvpv1YYpKOCBWuORFmnxT5NHYdrVchN_mzW8nPh8m39BB8bz8f_YDJL0cblu8bjVzSDtGvSL8CBxGWKsPjg7GsjIRWsW0AWdTe5nHMupI2NWxpSr2-iuzHbueG4FS4njhjVX4WO2BljmgJSmDrUQvIMS2tO_I1uNL96E-24bn-Mq594W82snYJmFlgkxfmztP6SQ",
    fingerprintLabel: "BRASS KEYRING INDEX: WM-AMB-05",
    clues: ["Master skeleton keyring", "Linen closet housekeeping manifest", "Pantry cupboard key set"],
    interrogationAudioSummary: "Stated she went about her morning duties as usual, keeping to herself as she always does.",
    birthdate: "28 August 1881",
    horoscope: "Virgo ♍",
    mbti: "ISFJ"
  },
  violet: {
    id: 'violet',
    name: "Lady Violet",
    codename: "Lady of White Manor • Educated • Protective",
    role: "Lady of White Manor • Educated • Protective",
    tag: "SUSPECT",
    statusColor: "text-purple-900 bg-purple-100 border-purple-400 font-bold",
    attire: "Regal purple off-shoulder evening gown, opera length purple gloves, classic pearl necklace.",
    alibi: '"I was in the second-floor salon writing correspondence to my sister."',
    background: "Lady Violet is the elegant wife of Sir White and the lady of White Manor. Educated, accomplished and deeply invested in the estate, she has worked tirelessly to maintain the household's reputation and ensure that its future remains secure.",
    characterDescription: "Graceful and composed in public, Lady Violet possesses a strong will beneath her refined exterior. She expects loyalty from those around her and is fiercely protective of her marriage, her household and the future she has built at White Manor.",
    motive: "Fiercely protective of her marriage, her household, and the future she has built at White Manor.",
    classification: "PERSON OF INTEREST • INQUEST DOSSIER",
    stamp: "SUSPECT",
    thumbImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrBXSjdbVrD--0AClWeOpm2tN-Wvi6jyQRJp3x1Arog4fRzSmxRbx3JfeUOPRDih3dMqr3nsHT3d3RM3bv2VFTHRq8izsbdBTJlS-ZocF4WWVX8-Hl14vX1-prtO90pk3Bo30_HxMR2Fj92P-d_48pLdDBf-laMU4mKXlUQU0BuhKlz4ENy79Vn71Q5aa8gVbf8NGx_7wHlYaCm9ZdXgIONkzRqhBmtW8gMHHdmZOjg38RoXKwe3n-YPlc3zvCBNo",
    fullImg: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqqJ6U4DivQCetP6VTBfohwAwqSS5RXsY2PTXukfC4RQdxC-CMmktIRwKTV1wooveCINKHPYughixqUu2dPZTiwe__aqZpaDBNHvbbNbF5XILYz1DQPJXKCWJvJ6msE3vzkc31mlfasl7MTSlFdznhkHgQBTIfOwr_LBbuLbpa6SkKFkcFwGd3AnMO7bsW2dMU7KcpvUwwCdHWht_WqMoTJSXt7Gow0NIyUhQsuemfa2EMBF6rWcNl88nlB-4-nXE",
    fingerprintLabel: "VELVET BOX INDEX: WM-VIO-03",
    clues: ["Velvet jewelry casket", "Written salon correspondence", "Purple opera-length silk gloves"],
    interrogationAudioSummary: "Expressed devastation over the tragedy and stated her primary concern was preserving the dignity and reputation of White Manor.",
    birthdate: "5 May 1888",
    horoscope: "Taurus ♉",
    mbti: "INFJ"
  }
};

export const ROOMS: Record<string, RoomInfo> = {
  study: {
    id: 'study',
    name: "Sir White's Study Room",
    shortName: "Study Room",
    floor: "First Floor",
    description: "Once the heart of Sir White's private affairs, the study now stands disturbed and strangely quiet. Papers, personal belongings and other objects lie scattered about, suggesting that something far more heated than an ordinary disagreement took place here.",
    suspectsLinked: "Miss Scarlet",
    accessPassage: "Direct door from Central Hallway; adjacent to primary staircase.",
    clueRating: "CRITICAL"
  },
  dining: {
    id: 'dining',
    name: "White Manor Dining Hall",
    shortName: "Dining Hall",
    floor: "First Floor",
    description: "The grand dining hall remains dressed for an evening of celebration, with the remnants of dinner and drinks still scattered across the tables. Yet beneath the warmth and elegance of the room lies a trail of small details that may reveal what happened after the guests retired.",
    suspectsLinked: "Lord Emerald",
    accessPassage: "Double doors leading into Kitchen and Main Living Hall.",
    clueRating: "EVIDENCE"
  },
  amber: {
    id: 'amber',
    name: "Mrs Amber's Bedroom",
    shortName: "Mrs Amber",
    floor: "Second Floor",
    description: "A modest room belonging to the White Manor's long-serving housekeeper, filled with simple belongings and reminders of a life spent caring for others. Among the personal effects are several curious items that may reveal more about the people of the household than expected.",
    suspectsLinked: "Master Cerulean",
    accessPassage: "Second floor west corridor near linen storage.",
    clueRating: "EVIDENCE"
  },
  cerulean: {
    id: 'cerulean',
    name: "Master Cerulean's Bedroom",
    shortName: "M. Cerulean",
    floor: "Second Floor",
    description: "Cerulean's room reflects the interests and ambitions of a young gentleman, surrounded by sporting memorabilia, personal possessions and the trappings of his privileged upbringing. But something about the room suggests that its occupant may have had more on his mind than sport and leisure.",
    suspectsLinked: "Lady Violet",
    accessPassage: "Second floor east corridor facing the stair landing.",
    clueRating: "CRITICAL"
  },
  violet: {
    id: 'violet',
    name: "Lady Violet's Bedroom",
    shortName: "Lady Violet",
    floor: "Second Floor",
    description: "An elegant and meticulously kept master bedroom, befitting Lady Violet's position within the White household. Yet the room bears unsettling signs that something occurred here which was never meant to be discovered.",
    suspectsLinked: "Mrs Amber",
    accessPassage: "Second floor west wing connecting to Madam Amber's room.",
    clueRating: "EVIDENCE"
  },
  scarlet: {
    id: 'scarlet',
    name: "Miss Scarlet's Bedroom",
    shortName: "Miss Scarlet",
    floor: "Second Floor",
    description: "Scarlet's bedroom is markedly different from the rest of the manor—personal, glamorous and filled with traces of a life that seems ready to disappear at a moment's notice. Look closely, however, and the room may reveal that Scarlet was preparing for more than simply another evening at the White Manor.",
    suspectsLinked: "None",
    accessPassage: "Second floor south wing facing the estate gardens.",
    clueRating: "CRITICAL"
  },
  lab: {
    id: 'lab',
    name: "Forensic Laboratory",
    shortName: "Forensic Lab",
    floor: "First Floor",
    description: "The evidence gathered from across White Manor has been brought here for closer examination. Every photograph, fingerprint, document and physical trace may hold a piece of the truth—but only careful analysis will reveal which clues are genuine and which are meant to mislead.",
    suspectsLinked: "None",
    accessPassage: "South passage connecting to garden terrace.",
    clueRating: "EVIDENCE"
  }
};

export const SYNDICATES: SyndicateTeam[] = [
  {
    name: "Team Purple",
    colorName: "Violet Syndicate",
    badgeBg: "bg-purple-500/20",
    badgeBorder: "border-purple-600",
    badgeText: "text-purple-700",
    members: ["Christine Aw", "Irene Liao", "Lenis Lim", "Lionel Ho", "Peh Shi Ning", "Yee Ling Hui"],
    score: 172,
    rank: 1,
    highlight: "Grand Champion & Best Dressed Syndicate. Scored an astounding 88 pts in Final Deduction to claim 1st place.",
    rounds: { operation1: 51, operation2: 33, finalDeduction: 88, total: 172 }
  },
  {
    name: "Team Yellow",
    colorName: "Solar Operatives",
    badgeBg: "bg-yellow-500/20",
    badgeBorder: "border-yellow-600",
    badgeText: "text-yellow-700",
    members: ["Alexis Oo", "Clinton Chew", "Eddie Neo", "Eugenia Tan", "Yun Tan", "Zoe Chong"],
    score: 170,
    rank: 2,
    highlight: "Silver Podium Winner. Achieved the single highest Final Deduction score (90 pts) in the competition.",
    rounds: { operation1: 45, operation2: 35, finalDeduction: 90, total: 170 }
  },
  {
    name: "Team Blue",
    colorName: "Cerulean Inquest",
    badgeBg: "bg-blue-500/20",
    badgeBorder: "border-blue-600",
    badgeText: "text-blue-700",
    members: ["Chan Lai Mun", "Desmond Ang", "Michelle Tan", "Stephen Tan", "Tan Chia Yee", "Tang En Lin"],
    score: 167,
    rank: 3,
    highlight: "Bronze Podium Winner. Dominated Operation 1 with a tournament-high 60 pts and 75 pts in Final Deduction.",
    rounds: { operation1: 60, operation2: 32, finalDeduction: 75, total: 167 }
  },
  {
    name: "Team Green",
    colorName: "Emerald Trackers",
    badgeBg: "bg-emerald-500/20",
    badgeBorder: "border-emerald-600",
    badgeText: "text-emerald-700",
    members: ["Desmond Lee", "Lee Li Wei", "Mun Ming Chuen", "Norine Lin", "Nur Hazirah", "Rebecca Wee"],
    score: 136,
    rank: 4,
    highlight: "Scored a formidable 58 pts in Operation 1 and tied highest score in Operation 2 with 35 pts.",
    rounds: { operation1: 58, operation2: 35, finalDeduction: 43, total: 136 }
  },
  {
    name: "Team Orange",
    colorName: "Amber Shadows",
    badgeBg: "bg-orange-500/20",
    badgeBorder: "border-orange-600",
    badgeText: "text-orange-700",
    members: ["Aiden Koh", "Emily Lim", "Heather Ang", "Mack Tang", "Pamela Wong", "Wyn Chan"],
    score: 130,
    rank: 5,
    highlight: "Consistent field work with 52 pts in Operation 1 and 49 pts in the Final Deduction stage.",
    rounds: { operation1: 52, operation2: 29, finalDeduction: 49, total: 130 }
  },
  {
    name: "Team Red",
    colorName: "Crimson Sleuths",
    badgeBg: "bg-red-500/20",
    badgeBorder: "border-red-600",
    badgeText: "text-red-700",
    members: ["Adeline Poh", "Alice Kok", "James Chong", "Josephine Lee", "Nur Qurratu Ain", "Shawn Teo"],
    score: 117,
    rank: 6,
    highlight: "Strong early investigative pace with 55 pts in Operation 1 and 33 pts in Operation 2.",
    rounds: { operation1: 55, operation2: 33, finalDeduction: 29, total: 117 }
  }
];

export const SCHEDULE_EVENTS = [
  { time: "08:30 AM", title: "Roll Call & Mission Briefing", desc: "Arrival at Fairy Point 3, squad distribution, detective toolkit handout.", badge: "COMMENCEMENT" },
  { time: "09:00 AM", title: "Operation I: Crime Scene Sweep", desc: "Inspection of Sir White's study, initial cordoning, clue lifting.", badge: "CRIME SCENE" },
  { time: "10:30 AM", title: "Operation II: Suspect Interrogations", desc: "Live cross-examinations of Scarlet, Cerulean, Amber, Violet & Emerald.", badge: "INQUEST" },
  { time: "12:00 PM", title: "Detective Luncheon", desc: "Gourmet lunch spread at the manor veranda while reviewing squad notes.", badge: "INTERMISSION" },
  { time: "01:30 PM", title: "Operation III: Forensic Lab Analysis", desc: "Chemical reagent assays with Dr. Esther; Digoxin & fingerprint matching.", badge: "FORENSICS" },
  { time: "02:00 PM", title: "Investigative Deduction Workshop", desc: "Teams piece together timeline, financial motives, and weapon trajectory.", badge: "DEDUCTION" },
  { time: "02:30 PM", title: "Operation IV: Crime Scene Revisited", desc: "Final verification of the study safe, hidden ledger, and radiator bat.", badge: "SWEEP" },
  { time: "04:00 PM", title: "Final Deduction & Master Truth Reveal", desc: "Dr. Esther and Chief Inspector unmask the killer and puppet master.", badge: "CLIMAX" },
  { time: "05:30 PM", title: "Prize Giving & Accolades", desc: "Podium trophy presentation, Best Dressed awards, and goodie bags.", badge: "AWARDS" },
  { time: "06:00 PM", title: "Dinner Party & Toast", desc: "Celebratory team bonding feast and victory toast to Sir Reginald White.", badge: "FEAST" }
];

export const PHOTO_GALLERY: PhotoItem[] = [
  {
    id: 'p1',
    title: "The Manor Portico Arrival",
    category: "Investigation",
    caption: "Detectives assembling outside Civil Service Club @ Changi (Fairy Point 3) at 8:30 AM sharp.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjcjEVxpHpNgXzsP1XzWSr0shGRDV3gUwymEcORy5cj_qneBBr2ybYwcrhRp7E6Hd3HwnGjOgt-toNi89umq_8bsSXd7HMQa6e9LRlQAqX8pDcHyrm_lg6n7YgvaYXTWKgjPjT-IseDUL9vzjye5LdC1x3s7sm-wVe8_uMUInqUCOBPWNSo2Sr59LzngB-uqYSw3uLZV8rnvo1uGY9CDq3llJbfpjmdGXbvbpKJbfsdRZaHkVI0E7bUwrfCdDGqbA",
    tags: ["Arrival", "Fairy Point 3", "Briefing"]
  },
  {
    id: 'p2',
    title: "Official Field Assignment Board",
    category: "Teams",
    caption: "The sealed team assignment grid displaying all 36 operatives across 6 color-coded syndicates.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAn-zZKbHFpcIlWzszb9uvPUAbWWvF-Y4IMJiT7MekKaWXXuAUOxp-mAedh_tHV3aft8WvY9GDv_f62is5EL_Dao8d9wckUTtVmpQUmoj4pAoMJe78YQM55G-b01sc5cHmL9WJXsXK9ZrI4211CEHLK2VatoNdjtqN957BBaXdA4Sw0VZBsNAis4XFQ-Op7Lc28rEz2j8Fvv4JqofukAgXfDeebV1Dk1_phSfD7fOytBXNOHj1o5LJyFxX0uoTnAjI",
    tags: ["Roster", "Teams", "Matrix"]
  },
  {
    id: 'p3',
    title: "Dr. Esther in the Toxicology Lab",
    category: "Forensic",
    caption: "Dr. Esther demonstrating the rapid colorimetric reaction confirming digitalis glycosides in the teacup.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUSaKYHiO9O5N58RGO2vOm7J6kF8bsYYy4MLFwLOSbzyso4-z83HqfOQ725-yq0sxgaOpslGAYBCZ4R09-IM3cubQgi1WJ0pvPpH9aIErNbMlvlSCcies5h9c--1E_q0wVaWUgOxPf38vBP5SRm8pKLBCF1f44so5LHyztuvzzdfgpt9I3ZqsQa5j-cVWaVKxSyJCAQG31Sux9a0BUKDkwRNosEOST5VPLMq3pqYgSj7Ypx3Gbx9PJD8gd-NBjlu4",
    tags: ["Forensics", "Dr Esther", "Toxicology"]
  },
  {
    id: 'p4',
    title: "Master Cerulean Taken into Custody",
    category: "Investigation",
    caption: "The moment the bloodied baseball bat was extracted from beneath the radiator in the study.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7y2CysXekr0Dqk93RGAIb0LBnwr4nJn7p-8OYe9T-AOGrdsv6GB6rNHKj63GX7kUlqIuBllko4vTSDk7XjsSqPjyRcrjmohR1Yaxn5MY57mWZ9lZgQqwUgR4cON_AyXhSFiHznlt2__ejjKEANamLM1KOYnTLOaHF_Uz-eWsluwoyqEGiTyybWxFwTmksgdCyYm2sti3DWORi6yangXoD5a6iyJTJlicYxsjRkIcJUSm9Lv1O_lib95TBILFAJPo",
    tags: ["Cerulean", "Arrest", "Evidence"]
  },
  {
    id: 'p5',
    title: "Miss Scarlet Under Interrogation",
    category: "Investigation",
    caption: "Operatives from Team Orange and Red grilling Miss Scarlet about the morning tea kettle schedule.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD6EoE1Lse-kUI7ZMCa0MTLxzyB_E4XfQOBqSMcD4YQ1CYXOVN9YXva_6AInMeUH0qQBmY_fKZX0KMh2t-8E1JX_pI8deP280wGfAJNiLIykjpQULKmxkEpJIElI37JkNA8bjxHRIJQ3ud2uBlEcUt4vnO8z0WW-dHq2LbourGep7Wgv0zDncgelGv6_nOpi5LHalGGKQDmjvhgVjNAvEUMG2x07mKjRG7gPI36tUbONNq9aKbnZ2jQoxY4UYJzEM",
    tags: ["Scarlet", "Inquest", "Pantry"]
  },
  {
    id: 'p6',
    title: "Lord Emerald Confronted with Ledgers",
    category: "Investigation",
    caption: "The 1923 opium contraband logbook produced on the table, dismantling Emerald's calm composure.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCp0mtesfvCTtg4TPBl9GIP2XlQX6SmDSauNcy4k6gIzu3q5cOMd-5Oyn6DsdZLgbi07w89pt2ptQzZ_CZ1jpsdShSmB_ugv-I3aIG9fYPo-0QAUA9xRwqpaiL05skChukP0tnFugHhDw0r3tJbg7h8cyXJXd5VIFZ54S860k_xbInL86JOj7uhSFMI8KKXYWGDPBN4tRaztnXJnAG2e1rkaM7Pcw61L0J8n-hCr9WQtEJogVo_RiUZP82NQ7OE8lc",
    tags: ["Emerald", "Mastermind", "Confrontation"]
  },
  {
    id: 'p7',
    title: "The Architectural Blueprint Inspection",
    category: "Forensic",
    caption: "Tactical teams cross-referencing floor stairwells and room lock times to pinpoint alibi gaps.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCdc78gPQ8BUH-_LdYVELZJ5VFImQW2r2ClcCEfNJFXxnG8nbBV9IZ9zgygvu0lkOJo8DMgRb_B3ErR9-J7MjmoAxPxDJ-4kTSHJHbKggr2zc5t4GT40uNS6UJwHQRA7LSp2bkfZLTOYhbAVVylXkJUmD9ALLB1hP1ka8Pn9sFitnMUMlLwGir5Wt5CwjbBiNPVlAr24SEdlvzS7-kXu9mIE_CGOHbxj9lVEhsbSG_gz51fHPw2DXapn6KaOFm1iQ",
    tags: ["Blueprint", "Manor Map", "Strategy"]
  },
  {
    id: 'p8',
    title: "Champions' Toast & Celebration",
    category: "Gala",
    caption: "All 36 detectives raising a toast to Sir Reginald White after successfully solving the 1926 mystery.",
    date: "17 Sep 2026",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDK_F548lJ5Pdxun7ZCZUASvaD1t7-oJWJOvbpkhPYljVjaQIQU3-PjvSqmMIRRHKmBoszFjrVH24orSlRdXmSoi-8v_DNxNyvUmndk_k2VmUpNKVmcjmIC4jmHAmlkQFLWYl-W0rTUhWG-fno5eDYU46RGeRwZlvqgdYmok5s0E9czVxa_BsFqVtUWwjWWYECmqBLpa1gCORPU_vE6k3NqKkxqdm-lw_3wrk1EqE4HWnvFJwVQCK5kuDpjJ3BGhnU",
    tags: ["Dinner", "Toast", "Celebration"]
  },
  {
    id: 'p9',
    title: "Best Dressed Syndicate: Team Purple",
    category: "Gala",
    caption: "All members of Team Purple in their matching navy jackets and 'SUSPECT EVERYONE' graphic tees.",
    date: "17 Sep 2026",
    url: "/src/assets/images/purple_best_dressed_1790757132180.jpg",
    tags: ["Best Dressed", "Team Purple", "Award"]
  },
  {
    id: 'p10',
    title: "Best Dressed Detectives: Alice, Clinton & En Lin",
    category: "Gala",
    caption: "Individual Best Dressed winners Alice Kok, Clinton Chew, and Tang En Lin in authentic vintage 1920s detective attire.",
    date: "17 Sep 2026",
    url: "/src/assets/images/detectives_best_dressed_1790757146372.jpg",
    tags: ["Best Dressed", "Trench Coat", "Sherlock", "Award"]
  }
];

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 'v1',
    title: "Act I: The Arrival & Crime Scene Sweep",
    duration: "03:42",
    timestamp: "09:00 AM",
    description: "Operatives arrive in vintage trench coats and bowler hats. Cordoning off the study room and documenting Sir White's desk.",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjcjEVxpHpNgXzsP1XzWSr0shGRDV3gUwymEcORy5cj_qneBBr2ybYwcrhRp7E6Hd3HwnGjOgt-toNi89umq_8bsSXd7HMQa6e9LRlQAqX8pDcHyrm_lg6n7YgvaYXTWKgjPjT-IseDUL9vzjye5LdC1x3s7sm-wVe8_uMUInqUCOBPWNSo2Sr59LzngB-uqYSw3uLZV8rnvo1uGY9CDq3llJbfpjmdGXbvbpKJbfsdRZaHkVI0E7bUwrfCdDGqbA"
  },
  {
    id: 'v2',
    title: "Act II: The Heated Interrogations",
    duration: "05:15",
    timestamp: "10:30 AM",
    description: "Intense inquiries across the dining hall and salon. Miss Scarlet's nervous composure and Cerulean's evasive alibis.",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDD6EoE1Lse-kUI7ZMCa0MTLxzyB_E4XfQOBqSMcD4YQ1CYXOVN9YXva_6AInMeUH0qQBmY_fKZX0KMh2t-8E1JX_pI8deP280wGfAJNiLIykjpQULKmxkEpJIElI37JkNA8bjxHRIJQ3ud2uBlEcUt4vnO8z0WW-dHq2LbourGep7Wgv0zDncgelGv6_nOpi5LHalGGKQDmjvhgVjNAvEUMG2x07mKjRG7gPI36tUbONNq9aKbnZ2jQoxY4UYJzEM"
  },
  {
    id: 'v3',
    title: "Act III: Forensic Breakthrough with Dr. Esther",
    duration: "04:10",
    timestamp: "01:30 PM",
    description: "Hands-on chemical color changes, fingerprint powder reveals, and the stunning discovery of Foxglove cardiac toxin.",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAUSaKYHiO9O5N58RGO2vOm7J6kF8bsYYy4MLFwLOSbzyso4-z83HqfOQ725-yq0sxgaOpslGAYBCZ4R09-IM3cubQgi1WJ0pvPpH9aIErNbMlvlSCcies5h9c--1E_q0wVaWUgOxPf38vBP5SRm8pKLBCF1f44so5LHyztuvzzdfgpt9I3ZqsQa5j-cVWaVKxSyJCAQG31Sux9a0BUKDkwRNosEOST5VPLMq3pqYgSj7Ypx3Gbx9PJD8gd-NBjlu4"
  },
  {
    id: 'v4',
    title: "Act IV: The Unmasking & Champions' Laurels",
    duration: "06:20",
    timestamp: "04:00 PM",
    description: "Chief Inspector pieces together the dual strike. Master Cerulean's arrest, Lord Emerald's exposure, and trophy awards.",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7y2CysXekr0Dqk93RGAIb0LBnwr4nJn7p-8OYe9T-AOGrdsv6GB6rNHKj63GX7kUlqIuBllko4vTSDk7XjsSqPjyRcrjmohR1Yaxn5MY57mWZ9lZgQqwUgR4cON_AyXhSFiHznlt2__ejjKEANamLM1KOYnTLOaHF_Uz-eWsluwoyqEGiTyybWxFwTmksgdCyYm2sti3DWORi6yangXoD5a6iyJTJlicYxsjRkIcJUSm9Lv1O_lib95TBILFAJPo"
  }
];

export const TRUTH_STEPS = [
  {
    step: 1,
    time: "Circa 1923 - 1926",
    title: "The Illicit Straits Maritime Syndicate",
    lead: "Lord Emerald & Sir Reginald White",
    color: "border-emerald-600 bg-emerald-950/20 text-emerald-900",
    desc: "Sir Reginald White and Lord Emerald co-founded an illicit shipping operation transporting contraband through Malacca disguised as Ceylon tea. By September 1926, Sir White suffered a crisis of conscience and announced his intent to destroy the ledgers and confess to authorities. Lord Emerald decided White could not be allowed to speak."
  },
  {
    step: 2,
    time: "08:15 AM - The Study",
    title: "The Poisoned Brew: Digitalis Glycoside",
    lead: "Miss Scarlet (Promised 40% Estate Equity)",
    color: "border-red-600 bg-red-950/20 text-red-900",
    desc: "Promised lucrative shares in the Emerald Straits enterprise, Miss Scarlet brewed a concentrated infusion of Foxglove (Digitalis Purpurea) into Sir White's morning peppermint tea. At 8:15 AM, Sir White drank the tea, causing severe cardiac arrhythmias, blurred vision, and physical collapse at his desk."
  },
  {
    step: 3,
    time: "08:28 AM - The Final Blow",
    title: "The Fatal Blow: Master Cerulean",
    lead: "Master Cerulean / Navy (Indebted Nephew)",
    color: "border-blue-600 bg-blue-950/20 text-blue-950",
    desc: "Having procured the master key from Madam Amber under false pretenses, Cerulean entered the study to force his uncle to open the safe and pay off his $15,000 gambling debts. Finding White already gasping from the poison and refusing to cooperate, Cerulean panicked, grabbed the mahogany baseball bat, and struck him from behind."
  },
  {
    step: 4,
    time: "08:35 AM - Post-Crime Complications",
    title: "The Secondary Theft & Broken Alibis",
    lead: "Lady Violet & Madam Amber",
    color: "border-purple-600 bg-purple-950/20 text-purple-900",
    desc: "Lady Violet entered the unlocked study minutes later, discovered her husband's body, grabbed the family jewelry collection from the open bureau, and fled, tearing her purple silk shawl on the latch. Madam Amber, horrified that her key facilitated the tragedy, attempted to hide the botanical garden shears."
  },
  {
    step: 5,
    time: "04:00 PM - Case Solved",
    title: "The Syndicates Triumph",
    lead: "Team Red, Blue, Green, Orange, Yellow, Purple",
    color: "border-amber-600 bg-amber-950/20 text-amber-950",
    desc: "Through chemical residue testing, fingerprint reconstruction on the bat handle, and deciphering Lord Emerald's telegrams, the six detective syndicates cracked both murder vectors simultaneously. Justice was served at Fairy Point 3!"
  }
];

export const FORENSIC_RESULTS: ForensicResult[] = [
  {
    id: 'fr-1',
    filename: 'Amber_Shear Forensic',
    title: "Shear (found in Mrs Amber's Bedroom)",
    roomName: "Mrs Amber's Bedroom",
    category: "Botanical Extraction Tool",
    description: "Heavy pruning shears recovered from Mrs Amber's bedroom examined for plant sap and cutting patterns matching digitalis stems.",
    suspectLinked: "Mrs Amber",
    logoType: 'shears',
    initialImageUrl: "https://i.imgur.com/GC4OsJc.png"
  },
  {
    id: 'fr-2',
    filename: 'Amber_Tea Bag Forensic',
    title: "Tea Bag (found in Mrs Amber's Bedroom)",
    roomName: "Mrs Amber's Bedroom",
    category: "Infusion & Herb Residue",
    description: "Dried tea bag retrieved from Mrs Amber's drawer, submitted for toxicological inspection and botanical leaf typing.",
    suspectLinked: "Mrs Amber",
    logoType: 'teabag',
    initialImageUrl: "https://i.imgur.com/YQtrOBF.png"
  },
  {
    id: 'fr-3',
    filename: "Bonus - White's Autopsy",
    title: "White's Autopsy (Bonus Forensic Report)",
    roomName: "Forensic Laboratory",
    category: "Official Post-Mortem Report",
    description: "Declassified anatomical and toxicological autopsy protocol of Sir Reginald White conducted by Dr. Esther.",
    suspectLinked: "Sir Reginald White",
    logoType: 'autopsy',
    initialImageUrl: "https://i.imgur.com/WzJxQtb.png"
  },
  {
    id: 'fr-4',
    filename: 'Cerulean_Powder Forensic',
    title: "Powder (found in Cerulean's Bedroom)",
    roomName: "Master Cerulean's Bedroom",
    category: "Chemical Powder Specimen",
    description: "Fine white crystalline powder discovered hidden in Cerulean's desk, tested for chemical reagents and narcotic traces.",
    suspectLinked: "Master Cerulean",
    logoType: 'powder',
    initialImageUrl: "https://i.imgur.com/SeoJ5sr.png"
  },
  {
    id: 'fr-5',
    filename: 'Cerulean_Sealed Wine Forensic',
    title: "Sealed Wine (found in Cerulean's Bedroom)",
    roomName: "Master Cerulean's Bedroom",
    category: "Beverage & Seal Integrity",
    description: "Vintage sealed wine bottle recovered from Cerulean's wardrobe, analyzed for unbroken wax seal and cork inspection.",
    suspectLinked: "Master Cerulean",
    logoType: 'wine',
    initialImageUrl: "https://i.imgur.com/2V59kOX.png"
  },
  {
    id: 'fr-6',
    filename: 'Dining_Spilled Wine Forensic',
    title: "Spilled Wine (found in Dining Hall)",
    roomName: "White Manor Dining Hall",
    category: "Fluid Residue & Stains",
    description: "Dark red wine stain sample lifted from the grand dining table cloth, analyzed for alcohol purity and additives.",
    suspectLinked: "Lord Emerald",
    logoType: 'spilled_wine',
    initialImageUrl: "https://i.imgur.com/QzOBloz.png"
  },
  {
    id: 'fr-7',
    filename: 'Dining_Vase Forensic',
    title: "Vase (found in Dining Hall)",
    roomName: "White Manor Dining Hall",
    category: "Porcelain & Water Flora",
    description: "Ornate dining room flower vase inspected for concealed items, flower stem cuttings, and fingerprint ridges.",
    suspectLinked: "Lord Emerald",
    logoType: 'vase',
    initialImageUrl: "https://i.imgur.com/MvXQPBs.png"
  },
  {
    id: 'fr-8',
    filename: 'Scarlet_Health Report Forensic',
    title: "Health Report (found in Scarlet's Bedroom)",
    roomName: "Miss Scarlet's Bedroom",
    category: "Confidential Medical Record",
    description: "Private health consultation dossier recovered from Miss Scarlet's vanity table detailing medical history and prescriptions.",
    suspectLinked: "Miss Scarlet",
    logoType: 'health_report',
    initialImageUrl: "https://i.imgur.com/MhRH5ec.png"
  },
  {
    id: 'fr-9',
    filename: 'Scarlet_Knife Forensic',
    title: "Knife (found in Scarlet's Bedroom)",
    roomName: "Miss Scarlet's Bedroom",
    category: "Bladed Edge & Tool Marks",
    description: "Concealed ornamental knife discovered in Miss Scarlet's bedroom examined for edge damage, microscopic traces, and fingerprints.",
    suspectLinked: "Miss Scarlet",
    logoType: 'knife',
    initialImageUrl: "https://i.imgur.com/6FqFWQr.png"
  },
  {
    id: 'fr-10',
    filename: 'Study_Pills Forensic',
    title: "Pills (found in Sir White's Study Room)",
    roomName: "Sir White's Study Room",
    category: "Pharmaceutical Tablets",
    description: "Unlabelled medicinal pills retrieved beside Sir White's writing blotter, tested for cardiac stimulants and digitalis toxins.",
    suspectLinked: "Sir Reginald White",
    logoType: 'pills',
    initialImageUrl: "https://i.imgur.com/bXOoTSe.png"
  },
  {
    id: 'fr-11',
    filename: 'Study_Tea Cup Forensic',
    title: "Tea Cup (found in Sir White's Study Room)",
    roomName: "Sir White's Study Room",
    category: "Porcelain & Beverage Residue",
    description: "The porcelain tea cup found on Sir White's desk with dried peppermint tea sediment and lethal foxglove glycosides.",
    suspectLinked: "Miss Scarlet",
    logoType: 'teacup',
    initialImageUrl: "https://i.imgur.com/8kMufGy.png"
  },
  {
    id: 'fr-12',
    filename: 'Violet_Vial Forensic',
    title: "Vial (found in Lady Violet's Bedroom)",
    roomName: "Lady Violet's Bedroom",
    category: "Glass Reagent Ampoule",
    description: "Amber glass apothecary vial recovered from Lady Violet's boudoir jewelry chest, analyzed for chemical compounds.",
    suspectLinked: "Lady Violet",
    logoType: 'vial',
    initialImageUrl: "https://i.imgur.com/aivziTI.png"
  },
  {
    id: 'fr-13',
    filename: 'Violet_Water Forensic',
    title: "Water (found in Lady Violet's Bedroom)",
    roomName: "Lady Violet's Bedroom",
    category: "Liquid Sample & Mineral Analysis",
    description: "Carafe water sample taken from Lady Violet's nightstand submitted for contamination analysis and dissolved minerals.",
    suspectLinked: "Lady Violet",
    logoType: 'water',
    initialImageUrl: "https://i.imgur.com/UEzm8Co.png"
  }
];

export interface BestDressedWinner {
  name: string;
  squad: string;
  badgeBg: string;
  badgeText: string;
  description: string;
}

export const BEST_DRESSED_DETECTIVES: BestDressedWinner[] = [
  {
    name: "Alice Kok",
    squad: "Team Red",
    badgeBg: "bg-red-500/20",
    badgeText: "text-red-700",
    description: "Authentic 1920s tweed houndstooth newsboy flat cap and matching plaid tailored jacket."
  },
  {
    name: "Clinton Chew",
    squad: "Team Yellow",
    badgeBg: "bg-yellow-500/20",
    badgeText: "text-yellow-700",
    description: "Master Sherlock Holmes attire: Vintage Inverness tweed cape coat, deerstalker cap, and brass magnifying glass."
  },
  {
    name: "Tang En Lin",
    squad: "Team Blue",
    badgeBg: "bg-blue-500/20",
    badgeText: "text-blue-700",
    description: "Classic double-breasted 1920s khaki investigator trench coat with tweed flat cap and magnifying loupe."
  },
  {
    name: "All Members of Team Purple",
    squad: "Team Purple",
    badgeBg: "bg-purple-500/20",
    badgeText: "text-purple-700",
    description: "Unified syndicate styling: Navy blue track jackets, custom 'SUSPECT EVERYONE' graphic tees, and detective badges."
  }
];

export const BEST_DRESSED_PHOTOS = [
  {
    title: "Best Dressed Syndicate: Team Purple",
    caption: "All members of Team Purple (Christine Aw, Irene Liao, Lenis Lim, Lionel Ho, Peh Shi Ning, Yee Ling Hui) sporting their unified navy blue jackets and 'SUSPECT EVERYONE' graphic tees.",
    url: "https://i.imgur.com/HSIJYfB.jpg",
    fallbackUrl: purpleBestDressed
  },
  {
    title: "Best Dressed Detectives: Alice Kok, Clinton Chew & Tang En Lin",
    caption: "The individual Best Dressed laureates: Alice Kok (plaid tweed newsboy cap & jacket), Tang En Lin (classic trench coat & magnifier), and Clinton Chew (Sherlock Holmes Inverness tweed cape & deerstalker cap).",
    url: "https://i.imgur.com/2XOCUHJ.jpg",
    fallbackUrl: detectivesBestDressed
  }
];

