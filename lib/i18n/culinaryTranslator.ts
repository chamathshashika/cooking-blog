import type { Ingredient, Instruction } from "@/lib/data";

/**
 * Dynamic Culinary Translation Engine
 * Translates database-fetched recipes into Italian when no manual translation exists in MongoDB.
 */

const titleReplacements: Array<[RegExp, string]> = [
  [/traditional sri lankan chicken curry/i, "Pollo al Curry Tradizionale dello Sri Lanka"],
  [/sri lankan chicken curry/i, "Pollo al Curry dello Sri Lanka"],
  [/chicken curry/i, "Curry di Pollo"],
  [/sri lankan string hoppers/i, "String Hoppers dello Sri Lanka (Idiyappam)"],
  [/string hoppers/i, "String Hoppers (Idiyappam)"],
  [/sri lankan prawn curry/i, "Curry di Gamberi dello Sri Lanka"],
  [/prawn curry/i, "Curry di Gamberi"],
  [/sri lankan mutton curry/i, "Curry di Montone dello Sri Lanka"],
  [/mutton curry/i, "Curry di Montone"],
  [/sri lankan fish curry/i, "Curry di Pesce dello Sri Lanka"],
  [/fish curry/i, "Curry di Pesce"],
  [/sri lankan dhal curry/i, "Curry di Lenticchie dello Sri Lanka (Parippu)"],
  [/dhal curry/i, "Curry di Lenticchie (Dhal)"],
  [/black pork curry/i, "Curry Nero di Maiale"],
  [/pork curry/i, "Curry di Maiale"],
  [/beef curry/i, "Curry di Manzo"],
  [/egg curry/i, "Curry di Uova"],
  [/potato curry/i, "Curry di Patate"],
  [/milk rice/i, "Riso al Latte dello Sri Lanka (Kiribath)"],
  [/kiribath/i, "Kiribath (Riso al Latte)"],
  [/pol sambol/i, "Pol Sambol (Sambol di Cocco)"],
  [/coconut sambol/i, "Sambol al Cocco Fresco"],
  [/seeni sambol/i, "Seeni Sambol (Sambol di Cipolle Caramellate)"],
  [/lunu miris/i, "Lunu Miris (Pesto di Peperoncino)"],
  [/kottu roti/i, "Kottu Roti dello Sri Lanka"],
  [/kottu/i, "Kottu Roti"],
  [/watalappam/i, "Watalappam al Cardamomo e Jaggery"],
  [/ambul thiyal/i, "Ambul Thiyal (Pesce Agrodolce del Sud)"],
];

/**
 * Translate recipe titles dynamically
 */
export function translateCulinaryTitle(title: string): string {
  if (!title) return title;

  for (const [pattern, translation] of titleReplacements) {
    if (pattern.test(title)) {
      return title.replace(pattern, translation);
    }
  }

  // Generic fallback transformations
  return title
    .replace(/\bSri Lankan\b/gi, "dello Sri Lanka")
    .replace(/\bTraditional\b/gi, "Tradizionale")
    .replace(/\bCurry\b/gi, "Curry");
}

/**
 * Translate cooking and preparation time expressions
 */
export function translateTime(timeStr?: string): string | undefined {
  if (!timeStr) return timeStr;

  return timeStr
    .replace(/\bminutes\b/gi, "minuti")
    .replace(/\bminute\b/gi, "minuto")
    .replace(/\bhours\b/gi, "ore")
    .replace(/\bhour\b/gi, "ora")
    .replace(/\bper batch\b/gi, "per infornata")
    .replace(/\bmins\b/gi, "min");
}

const unitReplacements: Array<[RegExp, string]> = [
  [/\btablespoons\b/gi, "cucchiai"],
  [/\btablespoon\b/gi, "cucchiaio"],
  [/\btbsp\b/gi, "cucchiai"],
  [/\bteaspoons\b/gi, "cucchiaini"],
  [/\bteaspoon\b/gi, "cucchiaino"],
  [/\btsp\b/gi, "cucchiaini"],
  [/\bcups\b/gi, "tazze"],
  [/\bcup\b/gi, "tazza"],
  [/\bcloves\b/gi, "spicchi"],
  [/\bclove\b/gi, "spicchio"],
  [/\bsprigs\b/gi, "rametti"],
  [/\bsprig\b/gi, "rametto"],
  [/\bstalks\b/gi, "gambi"],
  [/\bstalk\b/gi, "gambo"],
  [/\bpinch\b/gi, "pizzico"],
  [/\bto taste\b/gi, "a piacere"],
  [/\bor less to taste\b/gi, "o a piacere"],
  [/\bas needed\b/gi, "secondo necessità"],
  [/\babout\b/gi, "circa"],
  [/\bplus more as needed\b/gi, "più se necessario"],
  [/\bfor serving\b/gi, "per servire"],
  [/\bmedium\b/gi, "media"],
  [/\bsmall\b/gi, "piccola"],
];

const ingredientNameMap: Record<string, string> = {
  "chicken, cut into medium-sized pieces": "Pollo tagliato a pezzi medi",
  "chicken": "Pollo a pezzi",
  "sri lankan curry powder": "Polvere di curry dello Sri Lanka",
  "salt": "Sale",
  "chilli powder": "Peperoncino in polvere",
  "turmeric powder": "Curcuma in polvere",
  "ground black pepper": "Pepe nero macinato",
  "black pepper powder": "Pepe nero macinato",
  "black pepper, crushed": "Pepe nero frantumato",
  "vinegar": "Aceto bianco o di cocco",
  "ground coriander": "Coriandolo macinato",
  "coconut oil or vegetable oil": "Olio di cocco o vegetale",
  "virgin coconut oil": "Olio vergine di cocco",
  "oil": "Olio di cocco",
  "mustard seeds": "Semi di senape",
  "curry leaves": "Foglie di curry fresche",
  "pandan leaf (rampe)": "Foglia di pandan (rampe)",
  "pandan leaves": "Foglie di pandan (rampe)",
  "cinnamon stick": "Stecca di cannella",
  "cloves": "Chiodi di garofano",
  "small cloves": "Chiodi di garofano",
  "cardamom pods, lightly crushed": "Baccelli di cardamomo schiacciati",
  "cardamom pods": "Baccelli di cardamomo",
  "small cardamom pods": "Baccelli di cardamomo",
  "lemongrass, tender lower section lightly bruised": "Citronella fresca contusa",
  "lemongrass": "Citronella fresca",
  "small stick lemongrass": "Bastoncino di citronella",
  "cumin seeds": "Semi di cumino",
  "fenugreek seeds": "Semi di fieno greco",
  "coriander seeds": "Semi di coriandolo",
  "garlic, finely chopped": "Aglio tritato finemente",
  "garlic, chopped": "Aglio tritato",
  "onion, chopped": "Cipolla tritata",
  "onions, chopped": "Cipolle tritate",
  "ginger, finely chopped": "Zenzero fresco tritato",
  "ginger": "Zenzero grattugiato",
  "green chilli, slit lengthways": "Peperoncino verde inciso per il lungo",
  "green chilli": "Peperoncino verde",
  "green chillies, sliced": "Peperoncini verdi a fette",
  "dried red chillies": "Peperoncini rossi secchi",
  "dried chillies": "Peperoncini rossi secchi",
  "sri lankan black roasted curry powder": "Curry tostato scuro dello Sri Lanka (black curry)",
  "coconut milk": "Latte di cocco denso",
  "full-fat coconut milk, for serving": "Latte di cocco intero caldo per servire",
  "fine rice flour suitable for string hoppers": "Farina di riso fine per string hoppers",
  "hot water": "Acqua bollente",
  "prawns, cleaned and washed": "Gamberi freschi puliti e sgusciati",
  "tomato, chopped": "Pomodoro a cubetti",
  "lemon juice": "Succo di limone fresco",
  "coriander leaves, chopped": "Coriandolo fresco tritato",
  "mutton, cut into cubes": "Carne di montone tagliata a cubetti",
};

/**
 * Translate ingredient list dynamically
 */
export function translateIngredients(
  ingredients?: Ingredient[]
): Ingredient[] | undefined {
  if (!ingredients || !Array.isArray(ingredients)) return ingredients;

  return ingredients.map((ing) => {
    let name = ing.name;
    const lowerName = ing.name.toLowerCase().trim();

    // Check exact map first
    if (ingredientNameMap[lowerName]) {
      name = ingredientNameMap[lowerName];
    } else {
      // Common culinary keyword replacements
      let translated = name;
      for (const [en, it] of Object.entries(ingredientNameMap)) {
        if (lowerName.includes(en)) {
          translated = translated.replace(new RegExp(en, "gi"), it);
        }
      }
      name = translated;
    }

    // Localize measurement / quantity
    let quantity = ing.quantity || ing.amount;
    if (quantity) {
      for (const [pattern, itUnit] of unitReplacements) {
        quantity = quantity.replace(pattern, itUnit);
      }
    }

    // Localize ingredient group
    let group = ing.group;
    if (group) {
      group = group
        .replace(/to season the prawns/gi, "Per marinare i gamberi")
        .replace(/to marinate the mutton/gi, "Per marinare il montone")
        .replace(/to marinate the chicken/gi, "Per marinare il pollo")
        .replace(/for the curry/gi, "Per il curry")
        .replace(/to finish/gi, "Per completare")
        .replace(/for serving/gi, "Per servire");
    }

    return {
      ...ing,
      name,
      quantity,
      amount: quantity,
      group,
    };
  });
}

const instructionStepTitles: Record<string, string> = {
  "season the prawns": "Marina i gamberi",
  "marinate the chicken": "Marina il pollo",
  "marinate the mutton": "Marina la carne",
  "fry the whole spices": "Tosta le spezie intere",
  "fry the spices and aromatics": "Rosola spezie e aromi",
  "add the spice powders and tomato": "Aggiungi spezie in polvere e pomodoro",
  "cook the prawns in coconut milk": "Cuoci i gamberi nel latte di cocco",
  "brown the mutton": "Sigilla la carne a fuoco vivace",
  "simmer in coconut milk": "Sobbolli nel latte di cocco",
  "finish and serve": "Completa e servi",
  "season and serve": "Condisci e servi",
};

/**
 * Translate instruction step titles and actions dynamically
 */
export function translateInstructions(
  instructions?: Instruction[]
): Instruction[] | undefined {
  if (!instructions || !Array.isArray(instructions)) return instructions;

  return instructions.map((inst) => {
    let title = inst.title;
    if (title) {
      const lowerTitle = title.toLowerCase().trim();
      if (instructionStepTitles[lowerTitle]) {
        title = instructionStepTitles[lowerTitle];
      }
    }

    return {
      ...inst,
      title,
    };
  });
}
