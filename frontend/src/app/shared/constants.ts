import {
	CubeButtonStatesToFeaturesMap,
	Region,
	RegionAbbreviated,
} from './models';

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
	"W",
	"Bgld",
	"Nö",
	"Oö",
	"Stk",
	"Sbg",
	"Tir",
	"Vbg",
	"Ktn",
	"AUT"
] as const

export const regionAbbreviatonsMap: Record<Region, RegionAbbreviated> = {
	Wien: "W",
	Niederösterreich: "Nö",
	Oberösterreich: "Oö",
	Burgenland: "Bgld",
	Steiermark: "Stk",
	Salzburg: "Sbg",
	Tirol: "Tir",
	Vorarlberg: "Vbg",
	Kärnten: "Ktn",
	Austria: "AUT"
}

export const featuresNames: readonly string[] = [
	"balances",
	"regions",
	"years",
	"aggregates",
	"carriers",
	"usages"
] as const

export const CubeButtonStatesToFeaturesMapper: CubeButtonStatesToFeaturesMap = {
	digitOneStart: "balances",
	digitTwoStart: "regions",
	digitThreeStart: "years",
	digitFourStart: "aggregates",
	digitFiveStart: "carriers",
	digitSixStart: "usages"
}
