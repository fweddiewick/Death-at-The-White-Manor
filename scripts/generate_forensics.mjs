import fs from 'fs';
import path from 'path';

const reports = [
  {
    id: 'fr-1',
    filename: 'Amber_Shear Forensic',
    slug: 'Amber_Shear_Forensic',
    labRef: '831/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Garden Shear - Bloodstained',
    itemSubmitted: 'One (1) garden shear with reddish-brown staining.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Steel garden shear, length 9 1/2 inches. Reddish-brown staining observed on inner surfaces of blades and pivot joint. Traces also present near handle.',
    analysisType: 'BLOOD DETECTION & SEROLOGY',
    tests: [
      { name: 'Benzidine & Phenolphthalein', result: 'Positive (Blood Present)' },
      { name: 'Species Identification', result: 'Human Origin Confirmed' },
      { name: 'Blood Group Agglutination', result: 'Group A (Rh Positive)' },
      { name: 'Control Match (Sir White - Grp O)', result: 'DOES NOT MATCH' },
      { name: 'Reference Match (Mrs. Amber - Grp A)', result: 'CONSISTENT (Possible Match)' }
    ],
    remarks: 'The bloodstain does not belong to the deceased, Sir E. T. White. Serological reaction is consistent with that of Mrs. Amber (Group A, Rh+), however due to limited reference material and potential degradation, no absolute identification can be affirmed. Other forensic evidence on the shear was inadequate.',
    conclusion: 'Blood detected is of human origin. Does not belong to Sir E. T. White. Serological results consistent with Mrs. Amber (Group A, Rh+), but not conclusive. The significance in relation to the investigation remains uncertain.',
    summary: 'THE BLOOD ON THE GARDEN SHEAR DOES NOT BELONG TO THE DECEASED, SIR E. T. WHITE, BUT IS CONSISTENT WITH MRS. AMBER (GROUP A, RH POSITIVE), HOWEVER ITS RELATION TO THE INVESTIGATION IS INCONCLUSIVE.',
    badge: 'GARDEN SHEAR (BLOODSTAINED)'
  },
  {
    id: 'fr-2',
    filename: 'Amber_Tea Bag Forensic',
    slug: 'Amber_Tea_Bag_Forensic',
    labRef: '835/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Opened Tea Bag',
    itemSubmitted: 'One (1) opened tea bag containing loose tea leaves.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Tea bag of fine muslin paper, string and printed tag ("Finest Garden Tea"). Bag opened; contents consist of loose dried leaves and floral matter.',
    analysisType: 'BOTANICAL & MICROSCOPICAL',
    tests: [
      { name: 'Physical Examination', result: 'Twisted leaves + multi-coloured petal fragments' },
      { name: 'Floral Constituents Identified', result: 'Rose, Chamomile, Cornflower' },
      { name: 'Suspected Toxic Botanicals', result: 'Digitalis purpurea (Foxglove petals)' },
      { name: 'Aromatic Herbs', result: 'Hibiscus, Lavender' },
      { name: 'Synthetic Adulterants', result: 'None Detected' }
    ],
    remarks: 'Microscopical comparison of petal epidermis, trichomes and pollen grains confirmed presence of Foxglove (Digitalis purpurea) among common garden infusion botanicals.',
    conclusion: 'The opened tea bag contains a blend of domestic tea and multiple flower species, definitively including Foxglove.',
    summary: 'THE TEA LEAVES ARE MIXED WITH FEW TYPE OF FLOWERS, WHICH INCLUDES ROSE, CHAMOMILE, CORNFLOWER, FOXGLOVE, HIBISCUS, LAVENDER.',
    badge: 'OPENED TEA BAG SPECIMEN'
  },
  {
    id: 'fr-3',
    filename: "Bonus - White's Autopsy",
    slug: 'Bonus_Whites_Autopsy',
    labRef: '1045/26',
    caseRef: '3012/26',
    date: '22 April 1926',
    subject: 'Post-mortem Examination Report',
    itemSubmitted: 'Body of deceased male, approximately 40-45 years.',
    receivedFrom: 'Coroner of Singapore & Criminal Investigation Department.',
    receivedOn: '22 April 1926',
    reportedOn: '22 April 1926',
    analyst: 'Dr. L. M. Cartwright, M.B., Ch.B., F.R.C.S.',
    assistant: 'A. Tan, B.Sc.',
    desc: 'Deceased male found at foot of staircase. Multiple abrasions and contusions on right shoulder, back and lower limbs, consistent with a fall down stairs.',
    analysisType: 'PATHOLOGICAL & TOXICOLOGICAL',
    tests: [
      { name: 'Cranial Examination', result: 'No fatal fracture or lethal trauma' },
      { name: 'Heart Examination', result: 'Acute cardiac failure (pulmonary congestion)' },
      { name: 'Blood Toxicology', result: 'High concentration of Digitalis (Digitoxin)' },
      { name: 'Gastric Contents', result: 'Plant material matching Digitalis purpurea' },
      { name: 'Alcohol & Other Poisons', result: 'No significant presence detected' }
    ],
    remarks: 'Injuries from the fall down stairs were superficial and occurred post-mortem. The deceased suffered acute cardiac arrhythmia and collapse prior to falling.',
    conclusion: 'Primary cause: Cardiac failure due to digitalis toxicity. Fall down stairs: Occurred after death (post-mortem). Manner of death: Homicide (suspected poisoning).',
    summary: 'MALE, FORTIES. HIGH CONCENTRATION OF DIGITALIS IN BLOOD. CARDIAC FAILURE PRECEDED FALL. NO FATAL TRAUMA FROM FALLING DOWN THE STAIRS.',
    badge: 'POST-MORTEM AUTOPSY PROTOCOL'
  },
  {
    id: 'fr-4',
    filename: 'Cerulean_Powder Forensic',
    slug: 'Cerulean_Powder_Forensic',
    labRef: '830/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of White Crystalline Substance (Suspected Drug)',
    itemSubmitted: 'Small mound of white crystalline/powdery substance contained in folded paper packet.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'A small mound (approx. 1.2 grammes) of white crystalline substance, slightly granular, in a brown paper package. Odour faint and characteristic (opiate-like).',
    analysisType: 'ALKALOID & OPIOID ASSAY',
    tests: [
      { name: 'Dragendorff\'s Test', result: 'Orange precipitate (Positive)' },
      { name: 'Mayer\'s Test', result: 'Cream precipitate (Positive)' },
      { name: 'Marquis Reagent Test', result: 'Deep Purple colour (Positive for Opiates)' },
      { name: 'Meconic Acid Test', result: 'Purple crystals (Positive for Opium Extract)' },
      { name: 'Solubility (Acid/Base)', result: 'Soluble (Alkaline)' }
    ],
    remarks: 'Microscopic examination showed amorphous crystals with absence of starch adulterants. Physical and chemical reactions match pharmaceutical morphine alkaloid.',
    conclusion: 'The substance is identified as an opioid belonging to the morphine alkaloid group derived from Papaver somniferum (opium poppy).',
    summary: 'THE SUBSTANCE HAS BEEN IDENTIFIED AS AN OPIOID (MORPHINE GROUP); IT IS A CONTROLLED AND POTENT DRUG WITH NARCOTIC EFFECTS, AND ITS PRESENCE IS HIGHLY SUSPICIOUS AND MAY BE RELATED TO THE CASE.',
    badge: 'WHITE CRYSTALLINE POWDER'
  },
  {
    id: 'fr-5',
    filename: 'Cerulean_Sealed Wine Forensic',
    slug: 'Cerulean_Sealed_Wine_Forensic',
    labRef: '829/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Bottle of Red Wine (Unopened)',
    itemSubmitted: 'One (1) sealed bottle of red wine.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Standard Bordeaux red wine, vintage 1921. Bottle sealed with natural cork and wax capsule. Label intact: "Château Lafite, Bordeaux, 1921". No visible tampering or leakage.',
    analysisType: 'SEAL INTEGRITY & TOXICOLOGY',
    tests: [
      { name: 'Cork & Wax Seal Inspection', result: 'Capsule undisturbed, no puncture holes' },
      { name: 'Arsenic (Marsh Test)', result: 'Negative' },
      { name: 'Cyanide (Picrate Test)', result: 'Negative' },
      { name: 'Strychnine / Morphine', result: 'Negative' },
      { name: 'Alcohol by Volume & Acidity', result: '12.1% v/v, pH 3.6 (Normal Claret)' }
    ],
    remarks: 'Liquid clear when held to light. Normal aged tartrates observed. Wine is genuine Bordeaux with no evidence of tampering, perforation, or foreign additives.',
    conclusion: 'The wine shows no evidence of tampering or contamination. No poisons or deleterious substances detected.',
    summary: 'THE WINE IS CLEAN AND FREE FROM POISONS OR ADULTERANTS; IT IS NOT SUSPICIOUS AND IS UNLIKELY TO RELATE TO THE CASE.',
    badge: 'SEALED BOTTLE OF RED WINE'
  },
  {
    id: 'fr-6',
    filename: 'Dining_Spilled Wine Forensic',
    slug: 'Dining_Spilled_Wine_Forensic',
    labRef: '839/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Opened Bottle of Red Wine (Reserved specially for Sir E. F. White)',
    itemSubmitted: 'One (1) opened bottle of red wine with remaining liquid.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'One (1) opened bottle of red wine. Label indicates Château Saint-Émilion, Saint-Émilion Grand Cru, Vintage 1918. Approx. 380 ml remaining. Natural cork; capsule seal partially removed.',
    analysisType: 'CHEMICAL POISON ASSAY',
    tests: [
      { name: 'Alkaloids (Dragendorff)', result: 'Negative' },
      { name: 'Cyanides (Picrate Test)', result: 'Negative' },
      { name: 'Arsenic (Marsh Test)', result: 'Negative' },
      { name: 'Heavy Metals (H2S Test)', result: 'Negative' },
      { name: 'Cardiac Glycosides', result: 'Negative (No Digitalis Detected)' }
    ],
    remarks: 'Microscopy showed typical natural wine flora (yeast cells, tartrate crystals, grape pollen). No foreign fibres or synthetic poisons detected.',
    conclusion: 'The wine is genuine, clean and free from any poisons, toxic agents or foreign substances. It contains no detectable impurities or adulterants.',
    summary: 'THE WINE IS CLEAN AND FREE FROM ANY POISONS OR FOREIGN SUBSTANCES, AND ITS RELATION TO THE INVESTIGATION REMAINS INCONCLUSIVE.',
    badge: 'OPENED RED WINE BOTTLE'
  },
  {
    id: 'fr-7',
    filename: 'Dining_Vase Forensic',
    slug: 'Dining_Vase_Forensic',
    labRef: '834/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Flower Bouquet in Vase (Room 7)',
    itemSubmitted: 'One (1) Flower Arrangement in Glass Vase.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'A bouquet of mixed flowers arranged in a cut glass vase. Flowers include white daisies and yellow chrysanthemum, with greenery and filler stems.',
    analysisType: 'PALYNOLOGICAL & BOTANICAL',
    tests: [
      { name: 'Daisy (Bellis perennis) Pollen', result: 'Abundant (Spherical, spiny exine)' },
      { name: 'Chrysanthemum morifolium Pollen', result: 'Abundant (Spheroidal, echinulate)' },
      { name: 'Pollen Density per sq. mm', result: '254 grains (High Concentration)' },
      { name: 'Toxic Alkaloid Residue', result: 'Negative' },
      { name: 'Foreign Powder Contaminants', result: 'None Detected' }
    ],
    remarks: 'High concentration of pollen particles observed. Such heavy floral pollen counts are medically recognized triggers for acute asthma and respiratory attacks in allergic individuals.',
    conclusion: 'The bouquet consists of daisies and chrysanthemum with a high pollen load; no foreign or suspicious toxic substances detected.',
    summary: 'THE FLOWER BOUQUET CONTAINS DAISIES AND CHRYSANTHEMUM WITH A HIGH POLLEN COUNT WHICH MAY TRIGGER ASTHMA ATTACK.',
    badge: 'FLOWER BOUQUET IN VASE'
  },
  {
    id: 'fr-8',
    filename: 'Scarlet_Health Report Forensic',
    slug: 'Scarlet_Health_Report_Forensic',
    labRef: '832/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Medical Health Report belonging to Sir E. T. White',
    itemSubmitted: 'One (1) medical health report dated 14 February 1926.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Report printed on official Singapore General Hospital letterhead. Issue date: 14 February 1926. Paper stock, watermark ("S.G.H. 1926") and typing consistent with period.',
    analysisType: 'DOCUMENT FORENSICS & MEDICAL INQUEST',
    tests: [
      { name: 'Neurological Condition', result: 'Chronic Migraine Diagnosed' },
      { name: 'Cardiovascular System', result: 'Weak Heart (Hereditary Defect)' },
      { name: 'Blood Pressure', result: 'Elevated' },
      { name: 'Allergy History', result: 'Documented Severe Pollen Allergy (Asthma Trigger)' },
      { name: 'Authenticity & Watermark', result: 'Genuine S.G.H. Exemplar (No Erasures)' }
    ],
    remarks: 'The medical findings correspond with known hereditary cardiovascular conditions, chronic migraine, and hypersensitivity to floral pollens.',
    conclusion: 'The report is authentic and unmodified. Confirms pre-existing cardiac vulnerability and pulmonary asthma susceptibility.',
    summary: 'THE REPORT IS GENUINE. SIR E. T. WHITE SUFFERS FROM CHRONIC MIGRAINE, ALLERGY TO POLLEN WHICH WOULD TRIGGER ASTHMA, AND HEREDITARY HEART ISSUES.',
    badge: 'MEDICAL HEALTH REPORT'
  },
  {
    id: 'fr-9',
    filename: 'Scarlet_Knife Forensic',
    slug: 'Scarlet_Knife_Forensic',
    labRef: '833/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Pocket Knife',
    itemSubmitted: 'One (1) pocket knife with folding blade.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Pocket knife, overall length (open) 6 1/4 inches. Single folding blade, clip point. Blade length 2 3/4 inches; thickness 1/8 inch. Handle dark horn pattern.',
    analysisType: 'BLADE TRACE & SEROLOGICAL',
    tests: [
      { name: 'Blood Chemical Test (Benzidine)', result: 'Negative' },
      { name: 'Blood Chemical Test (Phenolphthalein)', result: 'Negative' },
      { name: 'Stain Discoloration Assay', result: 'Iron Oxidation (Rust) & Soil Only' },
      { name: 'Biological Tissue / Hair', result: 'None Detected' },
      { name: 'Wound Profile Comparison', result: 'Incompatible with Deceased Trauma' }
    ],
    remarks: 'Brownish discoloration near point caused by metallic oxidation and contact with vegetable matter. No human blood or tissue recovered.',
    conclusion: 'The pocket knife shows no signs of weapon use in the fatal assault. Edge characteristics do not correspond with any known case exhibits.',
    summary: 'THE POCKET KNIFE SHOWS NO CONCLUSIVE EVIDENCE CONNECTING IT TO THE OFFENCE; ITS RELATION TO THE INVESTIGATION REMAINS INCONCLUSIVE.',
    badge: 'FOLDING POCKET KNIFE'
  },
  {
    id: 'fr-10',
    filename: 'Study_Pills Forensic',
    slug: 'Study_Pills_Forensic',
    labRef: '836/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of a Few Bottles of Pills',
    itemSubmitted: 'Four (4) bottles containing tablets / capsules.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Four (4) labelled bottles containing tablets/capsules: Migraine Relief, Cardiac Tonic, Digestive Enzymes, Allergy & Rhinitis Tablets. Sealed manufacturer labels intact.',
    analysisType: 'PHARMACEUTICAL TOXICOLOGY',
    tests: [
      { name: 'Migraine Relief Formulation', result: 'Acetylsalicylic Acid, Paracetamol, Caffeine' },
      { name: 'Cardiac Tonic Formulation', result: 'Digitalis (Aerials), Strophanthus, Potassium' },
      { name: 'Digestive Enzymes Formulation', result: 'Pancreatin, Pepsin, Gentian Extract' },
      { name: 'Allergy Tablets Formulation', result: 'Chlorpheniramine Maleate, Phenylephrine' },
      { name: 'Purity & Deleterious Agents', result: 'Commercial Standards (No Adulterants)' }
    ],
    remarks: 'The cardiac tonic contains therapeutic digitalis within normal pharmaceutical limits. All preparations are genuine and safe when taken as prescribed.',
    conclusion: 'Pills correspond with recognised pharmacopoeial standards. No illicit or lethal poison tampering detected in these bottles.',
    summary: 'THE PILLS ARE SAFE FOR CONSUMPTION AND ARE PROPER MEDICATION TREATMENT FOR CHRONIC MIGRAINE, HEART HEALTH, GUT HEALTH AND ALLERGY & RHINITIS.',
    badge: 'PHARMACEUTICAL PILL BOTTLES'
  },
  {
    id: 'fr-11',
    filename: 'Study_Tea Cup Forensic',
    slug: 'Study_Tea_Cup_Forensic',
    labRef: '837/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Brewed Tea Samples (obtained from an English tea cup)',
    itemSubmitted: 'Brewed tea liquid residue (approx. 30 ml).',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Porcelain English tea cup with blue floral pattern containing approximately 30 ml amber-brown tea liquid residue with strong floral aroma.',
    analysisType: 'QUANTITATIVE TOXICOLOGY',
    tests: [
      { name: 'Tannins (Ferric Chloride)', result: 'Positive' },
      { name: 'Flavonoids (Shinoda Test)', result: 'Positive' },
      { name: 'Cardiac Glycosides (Keller-Kiliani)', result: 'POSITIVE (High Concentration)' },
      { name: 'Digitalis Glycosides (Legal\'s Test)', result: 'POSITIVE (Lethal Range)' },
      { name: 'Botanical Identification', result: 'Rose, Chamomile, Foxglove, Hibiscus, Lavender' }
    ],
    remarks: 'Colorimetric assay confirms an extraordinarily high concentration of cardiac glycosides consistent with crushed Digitalis purpurea (Foxglove) leaves infused in hot water.',
    conclusion: 'The brewed tea contains a lethal overdose of digitalis cardiac glycosides, capable of inducing rapid fatal arrhythmia.',
    summary: 'THE TEA CONTAINS TRACES OF ROSE, CHAMOMILE, CORNFLOWER, FOXGLOVE, HIBISCUS, LAVENDER, AND THE CHEMICAL TEST REVEALS A HIGH DOSAGE OF DIGITALIS IS PRESENT.',
    badge: 'LACED ENGLISH TEA CUP'
  },
  {
    id: 'fr-12',
    filename: 'Violet_Vial Forensic',
    slug: 'Violet_Vial_Forensic',
    labRef: '827/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Plant Material - Suspected Poison (Wolf\'s Bane)',
    itemSubmitted: 'One (1) dried flower specimen in glass vial sealed with cork.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Dried purple-blue flower with hooded upper sepal; 5 stamens. Stored inside clear glass apothecary vial with ground cork stopper.',
    analysisType: 'ALKALOID IDENTIFICATION',
    tests: [
      { name: 'Botanical Typing', result: 'Aconitum lycoctonum (Wolf\'s Bane)' },
      { name: 'Dragendorff\'s Test', result: 'Orange precipitate (Positive)' },
      { name: 'Mayer\'s Reagent', result: 'Cream precipitate (Positive)' },
      { name: 'Froehde\'s Reagent', result: 'Violet precipitate (Positive)' },
      { name: 'Alkaloid Confirmed', result: 'ACONITINE (Potent Cardiotoxin / Neurotoxin)' }
    ],
    remarks: 'Aconitine is a deadly neurotoxin with estimated human lethal dose of 1 to 2 milligrams. Its presence in a private residence is highly suspicious.',
    conclusion: 'The specimen is Wolf\'s Bane (Aconitum lycoctonum) containing lethal aconitine alkaloids.',
    summary: 'THE SPECIMEN HAS BEEN IDENTIFIED AS WOLF\'S BANE (ACONITUM LYCOCTONUM), A HIGHLY TOXIC PLANT CONTAINING LETHAL ALKALOIDS; ITS PRESENCE IS HIGHLY SUSPICIOUS AND MAY BE DIRECTLY RELATED TO THE CASE.',
    badge: 'WOLF\'S BANE VIAL SPECIMEN'
  },
  {
    id: 'fr-13',
    filename: 'Violet_Water Forensic',
    slug: 'Violet_Water_Forensic',
    labRef: '828/26',
    caseRef: '2147/26',
    date: '17 September 1926',
    subject: 'Examination of Drinking Glass - Fingerprints & Lipstick Stain',
    itemSubmitted: 'One (1) glass tumbler containing trace water.',
    receivedFrom: 'Inspector H. A. Pemberton, Criminal Investigation Department.',
    receivedOn: '15 September 1926',
    reportedOn: '17 September 1926',
    analyst: 'F. C. Standish, F.C.S., F.I.C.',
    assistant: 'A. Lawrence, B.Sc.',
    desc: 'Clear glass tumbler, 3 1/2 inches in height, partially filled with water (trace). Rim exhibits cosmetic stain. Exterior surface bears latent friction ridges.',
    analysisType: 'DACTYLOSCOPY & COSMETIC SPECTROSCOPY',
    tests: [
      { name: 'Fingerprint Fuming (Cyanoacrylate)', result: 'Three (3) Partial Ridge Impressions' },
      { name: 'Deceased Comparison (Sir White)', result: 'NO POINTS OF IDENTITY (Does not match)' },
      { name: 'Ridge Profile Assessment', result: 'Male in origin (Unidentified)' },
      { name: 'Lipstick Rouge Spectrogram', result: 'Wax base with eosin dye' },
      { name: 'Lipstick Match (Lady Violet)', result: 'POSITIVE MATCH TO REFERENCE SAMPLE' }
    ],
    remarks: 'The presence of both an unidentified male fingerprint and lipstick belonging to Lady L. T. Violet proves multiple individuals handled the glass prior to police arrival.',
    conclusion: 'Fingerprint does not belong to Sir E. T. White. Lipstick impression conclusively matches Lady Violet.',
    summary: 'THE FINGERPRINT ON THE GLASS DOES NOT BELONG TO THE DECEASED, SIR E. T. WHITE, BUT TO AN UNIDENTIFIED MAN; THE LIPSTICK STAIN BELONGS TO LADY L. T. VIOLET.',
    badge: 'WATER GLASS (FINGERPRINTS & LIPSTICK)'
  }
];

function generateReportSvg(r) {
  const testsRows = r.tests
    .map(
      (t, idx) => `
      <tr style="background-color: ${idx % 2 === 0 ? '#f7f2e4' : '#ede5ce'};">
        <td style="padding: 5px 8px; border: 1px solid #735e46; font-family: 'Courier Prime', monospace; font-size: 11px; font-weight: bold; color: #2a1f14;">${escapeXml(t.name)}</td>
        <td style="padding: 5px 8px; border: 1px solid #735e46; font-family: 'Courier Prime', monospace; font-size: 11px; color: ${t.result.includes('POSITIVE') || t.result.includes('Positive') || t.result.includes('High') ? '#8b130e' : '#22381f'}; font-weight: bold;">${escapeXml(t.result)}</td>
      </tr>
    `
    )
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1200" width="100%" height="100%">
  <defs>
    <linearGradient id="parchment" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdfbf5" />
      <stop offset="50%" stop-color="#f5ede0" />
      <stop offset="100%" stop-color="#ebdcc6" />
    </linearGradient>
    <filter id="paper-texture" x="0%" y="0%" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
      <feDiffuseLighting in="noise" lighting-color="#fff" surfaceScale="1.2" result="light">
        <feDistantLight azimuth="60" elevation="50" />
      </feDiffuseLighting>
      <feBlend mode="multiply" in="SourceGraphic" in2="light" />
    </filter>
  </defs>

  <!-- Parchment Base -->
  <rect width="800" height="1200" fill="url(#parchment)" />
  <rect width="800" height="1200" fill="#201407" opacity="0.04" />

  <!-- Outer Double Border -->
  <rect x="20" y="20" width="760" height="1160" fill="none" stroke="#2c2118" stroke-width="2.5" />
  <rect x="25" y="25" width="750" height="1150" fill="none" stroke="#685641" stroke-width="1" />
  
  <!-- Corner Ornaments -->
  <circle cx="28" cy="28" r="4" fill="#685641" />
  <circle cx="772" cy="28" r="4" fill="#685641" />
  <circle cx="28" cy="1172" r="4" fill="#685641" />
  <circle cx="772" cy="1172" r="4" fill="#685641" />

  <!-- Header Metadata -->
  <text x="45" y="55" font-family="'Courier Prime', monospace" font-size="12px" fill="#2c2118">Lab. Ref. No. <tspan font-weight="bold" fill="#87110c">${escapeXml(r.labRef)}</tspan></text>
  <text x="45" y="75" font-family="'Courier Prime', monospace" font-size="12px" fill="#2c2118">Case Ref. No. <tspan font-weight="bold">${escapeXml(r.caseRef)}</tspan></text>

  <!-- Confidential Stamp Right -->
  <text x="755" y="55" text-anchor="end" font-family="'Courier Prime', monospace" font-size="13px" font-weight="bold" fill="#87110c" letter-spacing="1">CONFIDENTIAL.</text>
  <text x="755" y="72" text-anchor="end" font-family="'EB Garamond', Georgia, serif" font-size="10.5px" italic fill="#443425">For Official Use Only.</text>
  <text x="755" y="86" text-anchor="end" font-family="'EB Garamond', Georgia, serif" font-size="10.5px" italic fill="#443425">Not to be reproduced or communicated.</text>

  <!-- British Lion & Unicorn Crest Emblem -->
  <g transform="translate(365, 38)">
    <circle cx="35" cy="30" r="28" fill="#dfd0b6" stroke="#4a3723" stroke-width="1.5" />
    <path d="M 22 25 L 35 12 L 48 25 L 42 42 L 28 42 Z" fill="#87110c" opacity="0.85" />
    <text x="35" y="32" text-anchor="middle" font-family="'Playfair Display', serif" font-weight="bold" font-size="16px" fill="#fdfbf5">SGH</text>
    <text x="35" y="53" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="7.5px" font-weight="bold" fill="#2c2118">1926</text>
  </g>

  <!-- Hospital Title Headings -->
  <text x="400" y="140" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="bold" font-size="20px" fill="#1b120c" letter-spacing="1.5">SINGAPORE GENERAL HOSPITAL</text>
  <text x="400" y="160" text-anchor="middle" font-family="'Courier Prime', monospace" font-weight="bold" font-size="13px" fill="#3d2a1b" letter-spacing="2">FORENSIC SCIENCE LABORATORY</text>
  <text x="400" y="176" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="10px" fill="#604b39">OUTRAM ROAD, SINGAPORE</text>
  <text x="755" y="140" text-anchor="end" font-family="'Courier Prime', monospace" font-size="11px" fill="#2c2118">Date: <tspan font-weight="bold">${escapeXml(r.date)}</tspan></text>

  <!-- Report Banner Ribbon -->
  <rect x="160" y="190" width="480" height="26" fill="#f0e5cf" stroke="#3b2b1d" stroke-width="1.2" />
  <line x1="165" y1="193" x2="635" y2="193" stroke="#87110c" stroke-width="0.8" />
  <line x1="165" y1="213" x2="635" y2="213" stroke="#87110c" stroke-width="0.8" />
  <text x="400" y="208" text-anchor="middle" font-family="'Courier Prime', monospace" font-weight="bold" font-size="13px" fill="#24140a" letter-spacing="1.5">FORENSIC LABORATORY REPORT — SUMMARY SLIP</text>

  <!-- Metadata Table Grid -->
  <g transform="translate(45, 230)" font-family="'Courier Prime', monospace" font-size="11.5px">
    <text x="0" y="16" font-weight="bold" fill="#24140a">SUBJECT</text>
    <text x="130" y="16" fill="#24140a">: <tspan font-weight="bold" fill="#87110c">${escapeXml(r.subject)}</tspan></text>

    <text x="0" y="38" font-weight="bold" fill="#24140a">ITEM SUBMITTED</text>
    <text x="130" y="38" fill="#24140a">: ${escapeXml(r.itemSubmitted)}</text>

    <text x="0" y="60" font-weight="bold" fill="#24140a">RECEIVED FROM</text>
    <text x="130" y="60" fill="#24140a">: ${escapeXml(r.receivedFrom)}</text>

    <text x="0" y="82" font-weight="bold" fill="#24140a">DATES</text>
    <text x="130" y="82" fill="#24140a">: Received ${escapeXml(r.receivedOn)} | Reported ${escapeXml(r.reportedOn)}</text>

    <text x="0" y="104" font-weight="bold" fill="#24140a">EXAMINED BY</text>
    <text x="130" y="104" font-style="italic" font-weight="bold" fill="#1e3f22">: ${escapeXml(r.analyst)}</text>

    <text x="0" y="126" font-weight="bold" fill="#24140a">ASSISTED BY</text>
    <text x="130" y="126" fill="#24140a">: ${escapeXml(r.assistant)}</text>
  </g>

  <!-- Decorative Separator Line -->
  <line x1="45" y1="375" x2="755" y2="375" stroke="#756149" stroke-width="1" stroke-dasharray="4 3" />

  <!-- Section I: Description of Item -->
  <g transform="translate(45, 395)">
    <text x="0" y="14" font-family="'Courier Prime', monospace" font-weight="bold" font-size="12px" fill="#87110c">I. DESCRIPTION OF ITEM:</text>
    <foreignObject x="0" y="22" width="710" height="65">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'EB Garamond', Georgia, serif; font-size: 13.5px; line-height: 1.35; color: #22170f;">
        ${escapeXml(r.desc)}
      </div>
    </foreignObject>
  </g>

  <!-- Section II: Laboratory Analysis & Tests -->
  <g transform="translate(45, 485)">
    <text x="0" y="14" font-family="'Courier Prime', monospace" font-weight="bold" font-size="12px" fill="#87110c">II. ${escapeXml(r.analysisType)}:</text>
    <foreignObject x="0" y="24" width="710" height="210">
      <div xmlns="http://www.w3.org/1999/xhtml">
        <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #5a4732; background: #fffdf9;">
          <thead>
            <tr style="background: #3c2919; color: #fbf5e8;">
              <th style="padding: 6px 8px; text-align: left; font-family: 'Courier Prime', monospace; font-size: 11.5px; border: 1px solid #5a4732;">QUALITATIVE / QUANTITATIVE ASSAY</th>
              <th style="padding: 6px 8px; text-align: left; font-family: 'Courier Prime', monospace; font-size: 11.5px; border: 1px solid #5a4732;">LABORATORY OBSERVATION / RESULT</th>
            </tr>
          </thead>
          <tbody>
            ${testsRows}
          </tbody>
        </table>
      </div>
    </foreignObject>
  </g>

  <!-- Section III: Analyst Remarks & Conclusion -->
  <g transform="translate(45, 715)">
    <text x="0" y="14" font-family="'Courier Prime', monospace" font-weight="bold" font-size="12px" fill="#87110c">III. SPECIAL REMARKS &amp; FINDINGS:</text>
    <foreignObject x="0" y="22" width="710" height="60">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'EB Garamond', Georgia, serif; font-size: 13.5px; line-height: 1.35; color: #22170f;">
        ${escapeXml(r.remarks)}
      </div>
    </foreignObject>

    <text x="0" y="95" font-family="'Courier Prime', monospace" font-weight="bold" font-size="12px" fill="#87110c">IV. CONCLUSION:</text>
    <foreignObject x="0" y="103" width="710" height="55">
      <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'EB Garamond', Georgia, serif; font-size: 13.5px; line-height: 1.35; color: #22170f;">
        ${escapeXml(r.conclusion)}
      </div>
    </foreignObject>
  </g>

  <!-- Official Analyst Signature -->
  <g transform="translate(500, 890)">
    <text x="120" y="25" text-anchor="middle" font-family="'Playfair Display', serif" font-style="italic" font-weight="bold" font-size="23px" fill="#1b381e">F. C. Standish</text>
    <line x1="20" y1="35" x2="220" y2="35" stroke="#332214" stroke-width="1.2" />
    <text x="120" y="52" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="11px" font-weight="bold" fill="#24160d">Government Analyst</text>
    <text x="120" y="66" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="9.5px" fill="#5c4937">Straits Settlements Medical Service</text>
  </g>

  <!-- Rubber Stamp Red Seal Left -->
  <g transform="translate(65, 885) rotate(-5)">
    <rect width="180" height="50" rx="3" fill="none" stroke="#87110c" stroke-width="2" stroke-dasharray="8 3" opacity="0.85" />
    <text x="90" y="23" text-anchor="middle" font-family="'Courier Prime', monospace" font-weight="bold" font-size="11.5px" fill="#87110c" letter-spacing="1">FORENSIC SCIENCE LAB</text>
    <text x="90" y="40" text-anchor="middle" font-family="'Courier Prime', monospace" font-weight="bold" font-size="10px" fill="#87110c">SINGAPORE • 1926</text>
  </g>

  <!-- BOTTOM GRAND SUMMARY BOX -->
  <g transform="translate(40, 975)">
    <!-- Decorative Frame -->
    <rect x="0" y="0" width="720" height="150" fill="#fdfbf4" stroke="#24170d" stroke-width="2.5" />
    <rect x="4" y="4" width="712" height="142" fill="none" stroke="#87110c" stroke-width="1.2" />
    
    <!-- Corner brackets -->
    <path d="M 8 18 L 8 8 L 18 8" fill="none" stroke="#24170d" stroke-width="2" />
    <path d="M 712 18 L 712 8 L 702 8" fill="none" stroke="#24170d" stroke-width="2" />
    <path d="M 8 132 L 8 142 L 18 142" fill="none" stroke="#24170d" stroke-width="2" />
    <path d="M 712 132 L 712 142 L 702 142" fill="none" stroke="#24170d" stroke-width="2" />

    <!-- Summary Title Banner -->
    <text x="360" y="32" text-anchor="middle" font-family="'Playfair Display', Georgia, serif" font-weight="bold" font-size="18px" fill="#87110c" letter-spacing="3">SUMMARY:</text>

    <!-- Actual Verdict Text -->
    <foreignObject x="25" y="42" width="670" height="75">
      <div xmlns="http://www.w3.org/1999/xhtml" style="display: flex; align-items: center; justify-content: center; height: 100%; text-align: center; font-family: 'Courier Prime', monospace; font-weight: bold; font-size: 13.5px; line-height: 1.45; color: #1f1309; letter-spacing: 0.5px;">
        ${escapeXml(r.summary)}
      </div>
    </foreignObject>

    <!-- Footer Notice -->
    <text x="360" y="136" text-anchor="middle" font-family="'Courier Prime', monospace" font-size="10px" font-style="italic" fill="#5e4933">
      N.B. — This slip forms part of the official laboratory record.
    </text>
  </g>
</svg>`;
}

function escapeXml(unsafe) {
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Generate files
const outDir = path.resolve('/public/forensics');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

reports.forEach((r) => {
  const svgContent = generateReportSvg(r);
  // Write with slug name
  fs.writeFileSync(path.join(outDir, `${r.slug}.svg`), svgContent);
  // Write with space name
  fs.writeFileSync(path.join(outDir, `${r.filename}.svg`), svgContent);
  // Also write in /public directly so both /forensics/... and /... work!
  fs.writeFileSync(path.join('/public', `${r.filename}.svg`), svgContent);
  console.log(`Generated: ${r.filename}`);
});
