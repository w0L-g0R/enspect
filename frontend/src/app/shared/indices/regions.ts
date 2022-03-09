import { Region, RegionAbbreviated } from '../models';

export const regions: readonly string[] = [
	"Wien",
	"Burgenland",
	"Niederösterreich",
	"Oberösterreich",
	"Steiermark",
	"Salzburg",
	"Tirol",
	"Vorarlberg",
	"Kärnten",
	"Austria"
] as const

export const regionAbbreviatons: readonly string[] = [
	"Wie",
	"Bgl",
	"Noe",
	"Ooe",
	"Stk",
	"Sbg",
	"Tir",
	"Vor",
	"Ktn",
	"AUT"
] as const

export const regionAbbreviatonsMap: Record<Region, RegionAbbreviated> = {
	Wien: "Wie",
	Niederösterreich: "Noe",
	Oberösterreich: "Ooe",
	Burgenland: "Bgl",
	Steiermark: "Stk",
	Salzburg: "Sbg",
	Tirol: "Tir",
	Vorarlberg: "Vor",
	Kärnten: "Ktn",
	Austria: "AUT"
}
