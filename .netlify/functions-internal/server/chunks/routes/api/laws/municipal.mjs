import { d as defineEventHandler, c as createError } from '../../../_/nitro.mjs';
import { v as validateApiAccess } from '../../../_/validateApiAccess.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../../../_/apiTokens.mjs';
import 'crypto';

const municipalLaws = [
  {
    code: "Chapter 2 \xA7 01",
    title: "Resisting Arrest",
    description: "a. The act of resisting arrest shall be the act of willfully evading law enforcement on foot, or a person with the authority to execute the law as prescribed by the Law of the Land, in an attempt to resist penalization or punishment for offenses committed, or in an attempt to evade detainment and arrest.<br><br>i.  Officers shall require probable cause to make arrests, and reasonable suspicion to detain subjects, pursuant to the Constitution, Charter and Law.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 02",
    title: "Resisting Arrest with a Deadly Weapon",
    description: "a. Resisting arrest with a deadly weapon shall be the act of anyone that uses force to resist lawful arrest using a weapon of lethal force such as an automatic gun or any other lethal firearm with the ability to kill an individual and if a person intentionally prevents or obstructs a law enforcement official or a person acting in a law enforcement official's presence and at their direction from conducting an arrest, search, or transportation of the actor or another by using lethal force against the law enforcement official or another.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 03",
    title: "Manual Evasion",
    description: "a. The act of manual evasion shall be when one flees the scene of a crime or evades any law enforcement official by foot, without the use of any motor vehicle or aircraft after failing to comply with any and all visual, verbal, sonic signs or clearly interpretable actions or signals by an Officer.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 04",
    title: "Motor Evasion",
    description: "a. The act of motor evasion shall be when one flees the scene of a crime or evades any law enforcement official with the use of any motor vehicle or aircraft after failing to comply with any and all visual, verbal, sonic signs or clearly interpretable actions or signals by an Officer.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 05",
    title: "Failure to Comply",
    description: "a. The act of failure to comply shall be the act of refusing to obey a lawful order issued by a peace officer, in the commission of their duties as prescribed by law and permitted under the Constitution and Law of the Land.<br><br>i. The term 'Failure to Comply with a Lawful Order' encompasses the failure to adhere to a search directed towards one's person or personal property when law enforcement possesses probable cause to conduct such a search.<br><br>ii. Any person found guilty of failure to comply with lawful orders shall be subject to a fine not exceeding $200 (in-game amount) for the first offense, and a fine not exceeding $400 (in-game amount) for subsequent offenses within a designated time frame.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 06",
    title: "Obstruction of Roads, Sidewalks and Public Services",
    description: "a. Obstructing roads, sidewalks and public services shall be the act of obstructing, closing or tampering with the accessibility of a road, sidewalk or highway with any tool, object or themselves without legal authority or standing to do so and without being a commissioned officer closing an area for public safety interests.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 07",
    title: "Impersonation",
    description: "a. The act of impersonation shall be the act of establishing oneself as something that the person is not, in a blatantly negligent or malicious manner. Subjects shall only be penalized for impersonating persons employed within the Government of the District of Columbia, or actors of the District.<br><br>b. Persons may also be subject to subsection(a) if they create or distribute any material under the name or entity of a person or organization that the person does not belong to, or otherwise have the legal authority to represent the subject in such material, with the intent of spreading harmful and incorrect falsehoods.<br><br>i. Any person found guilty of impersonation shall be subject to a fine not exceeding $200 (in-game amount) for the first offense, and a fine not exceeding $400 (in-game amount) for subsequent offenses within a designated time frame",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 08",
    title: "Escape and Rescue from Prisons",
    description: "a. Escape and rescue from correctional facilities shall be the act of leaving a correctional facility, as a subject that is incarcerated, without legal authorization to do so.<br><br>i.  Only officials permitted in law may authorize subjects to be removed or transferred from correctional facilities- and such authorizations may only occur when the subject has a sentence commuted, or such a release is ordered by a judge for other circumstances, as prescribed by law.<br><br>b. Attempting to leave a correctional facility without authorization while incarcerated at that facility shall also be the act of escape and rescue.<br><br>c. Escape and rescue from Prisons shall also be the act when another individual aids the escape of an incarcerated person without sentence commutation or removal by judge; whether by monetary means, vehicular or verbal means.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 09",
    title: "Misuse of City Services",
    description: "a. The act of misuse of city services shall be the act of using the services of the city, specifically weapons, cars or aircrafts and providing them as gifts or rewards without authority under law to do so.<br><br>b. The act of misuse of city services shall also be the act of providing city services as defined in subsection (a) which are later commissioned in the act of a violent crime under this Code or Law.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 10",
    title: "Obstruction of Commerce",
    description: "a. Obstruction of commerce shall be the act of someone who intentionally obstructs the legal operation of any towing official under the Department of Transportation or any towing company approved by the Department of Commerce and Labor or the Council or any transportation service under the Department of Transportation or company approved by the Department of Commerce and Labor, when operating in a legal and constitutional fashion.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 11",
    title: "Falsification of City Records",
    description: "a. The act of falsification of city records shall be when an individual uses their capacity or power granted to them in a fashion not authorized by law and does so to replace true, correct and approved information into false, incorrect and unaffirmed information and later presents them as true, with intent to deceive.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 12",
    title: "Possession of Unlawful Instruments and Weapons",
    description: "a. Possession of unlawful instruments and weapons shall be the act when one possesses a firearm or lethal weapon that is specified by either federal or municipal law to be illegal or purchased from a dealer within the map instead of via a business, shop or the gun store.<br><br>b. Possession of unlawful instruments and weapons shall also be the act of possessing an item which is outlawed and deemed criminal by existing federal or municipal law.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 2 \xA7 13",
    title: "Obstruction of Criminal Investigations",
    description: "a. Obstruction of criminal investigation shall be the act of one who willfully, by means of bribery, extortion and other means to obstruct, delay, or prevent the communication of information relating to a violation of any criminal statute of the District of Columbia by any person to a criminal investigator or special prosecutor.",
    category: "Chapter 2"
  },
  {
    code: "Chapter 3 \xA7 01",
    title: "First Degree Murder",
    description: "a. First degree murder shall be the act of directly causing a death of another person with premeditation and malicious intent; a death resulting of any armed robbery, assault with a deadly weapon, kidnapping, escape and rescue or attempted escape and rescue, or any other violent offense that poses a risk of death to the victim and such risk is disregarded shall also be First Degree Murder.",
    category: "Chapter 3"
  },
  {
    code: "Chapter 3 \xA7 02",
    title: "Second Degree Murder",
    description: "a. Second degree murder shall be the act of directly causing a death of another person with malicious intent, lacking premeditation.",
    category: "Chapter 3"
  },
  {
    code: "Chapter 3 \xA7 03",
    title: "Manslaughter",
    description: "a. Manslaughter shall be the act of causing a death of another person with no premeditation or malicious intent, however still directly causing a death of another person as a result of criminal negligence.",
    category: "Chapter 3"
  },
  {
    code: "Chapter 3 \xA7 04",
    title: "Negligent Homicide",
    description: "a. Negligent homicide shall be the act of causing a death of another person with no premeditation or malicious intent, however still directly causing a death of another person as a result of gross negligence.",
    category: "Chapter 3"
  },
  {
    code: "Chapter 3 \xA7 05",
    title: "Involuntary Manslaughter",
    description: "a. Involuntary manslaughter shall be the act of killing another person as the result of a lawful act done with gross negligence with lack of care and awareness.",
    category: "Chapter 3"
  }
];
const municipal = defineEventHandler(async (event) => {
  validateApiAccess(event, "laws/municipal");
  try {
    const grouped = municipalLaws.reduce((acc, law) => {
      var _a, _b;
      const existing = acc.find((g) => g.label === law.category);
      if (existing) {
        existing.data.push({
          title: law.code,
          subtitle: law.title,
          content: law.description,
          excerp: ((_a = law.description) == null ? void 0 : _a.substring(0, 150)) + "..."
        });
      } else {
        acc.push({
          label: law.category,
          data: [
            {
              title: law.code,
              subtitle: law.title,
              content: law.description,
              excerp: ((_b = law.description) == null ? void 0 : _b.substring(0, 150)) + "..."
            }
          ]
        });
      }
      return acc;
    }, []);
    return grouped;
  } catch (error) {
    console.error("Error fetching municipal laws:", error);
    throw createError({
      statusCode: 500,
      message: "Failed to fetch municipal laws"
    });
  }
});

export { municipal as default };
//# sourceMappingURL=municipal.mjs.map
