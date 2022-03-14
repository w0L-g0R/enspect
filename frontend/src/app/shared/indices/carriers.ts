import { Carrier } from '../models';

export const ebCarriers: readonly string[] = [
	"Kokskohle",
	"Anthrazit",
	"Steinkohlen-Briketts",
	"Sonstige Steinkohle",
	"Steinkohle",
	"Subbituminöse Kohle",
	"Sonstige Braunkohle",
	"Braunkohle",
	"Braunkohlen-Briketts",
	"Brenntorf",
	"Koks",
	"Rohöl",
	"NGL",
	"Erdöl",
	"Steinkohleteer",
	"Benzol",
	"Feedstocks",
	"Sonstiger Raffinerieeinsatz",
	"Motorbenzin",
	"Industriebenzin",
	"Flugbenzin",
	"Benzin",
	"Flugturbinenkraftstoff",
	"Sonstiges Petroleum",
	"Petroleum",
	"Diesel",
	"Gasöl für Heizzwecke",
	"Heizöl<1%S",
	"Heizöl>1%S",
	"Heizöl",
	"Flüssiggas",
	"Naphta",
	"Bitumen",
	"Schmiermittel",
	"Petrolkoks",
	"Sonstige",
	"Sonstige Prod. d. Erdölverarb.",
	"Raffinerie-Restgas",
	"Mischgas",
	"Erdgas",
	"Tiegelgas",
	"Hochofengas",
	"Gichtgas",
	"Kokereigas",
	"Industrieabfall",
	"Hausmüll nicht erneuerbar",
	"Brennbare Abfälle",
	"Scheitholz",
	"Hausmüll Bioanteil",
	"Pellets+Holzbriketts",
	"Holzabfall",
	"Holzkohle",
	"Ablaugen",
	"Deponiegas",
	"Klärgas",
	"Biogas",
	"Bioethanol",
	"Biodiesel",
	"Sonst. Biogene flüssig",
	"Sonst. Biogene fest",
	"Biogene Brenn- u. Treibstoffe",
	"Geothermie",
	"Umgebungswärme",
	"Solarwärme",
	"Reaktionswärme",
	"Umgebungswärme etc.",
	"WK<=1MW",
	"WK<=10MW",
	"WK>10MW",
	"Wasserkraft",
	"Wind",
	"Photovoltaik",
	"Wind und Photovoltaik",
	"Fernwärme",
	"Elektrische Energie",
	"KOHLE",
	"ÖL",
	"GAS",
	"ERNEUERBARE",
	"ABFÄLLE",
	"Gesamtenergiebilanz"
] as const

export const uaCarriers: readonly string[] = [
	"Steinkohle",
	"Braunkohle",
	"Braunkohlenbriketts",
	"Koks",
	"Petrolkoks",
	"Heizöl",
	"Gasöl für Heizzwecke ",
	"Diesel",
	"Benzin",
	"Petroleum",
	"Flüssiggas",
	"Erdgas",
	"Gichtgas",
	"Kokereigas",
	"Scheitholz",
	"Biogene Brenn- und Treibstoffe",
	"Brennbare Abfälle",
	"Brenntorf",
	"Umgebungswärme etc.",
	"Fernwärme",
	"Elektrische Energie",
	"Insgesamt"
] as const

export function isCarrier(possibleCarrier: string): boolean {
	return uaCarriers.includes(possibleCarrier) ||
		ebCarriers.includes(possibleCarrier)
		? true
		: false
}
